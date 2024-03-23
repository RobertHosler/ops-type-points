/*jshint esversion: 6 */
const setup = "Server Setup";
console.time(setup);
const express = require("express");
const app = express();
const http = require("http");
const server = http.Server(app);
const logger = require("./server/logger");
const io = require("socket.io")(server, {
  cors: {
    // Allow access from local 4200 - angular dev server can hit the npm server
    origin: "http://localhost:4200",
    methods: ["GET", "POST"],
  },
});
// Configure npm to use the built angular app
app.use(express.static("./dist/ops-type-points"));
app.get("/*", function (req, res) {
  res.sendFile("index.html", { root: "dist/ops-type-points/" });
});
// Run server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log("Listening on port ", PORT);
});

const ioState = {
  sockets: [],
  nineTypesMap: new Map(),
  termMap: new Map(),
  sourceMap: new Map(),
  typeMap: new Map(),
  nameMap: new Map(),
  childrenMap: new Map(),
  eTypeMap: new Map(),
  apMap: new Map(),
  shared: [
    {
      listener: "getNames",
      trigger: "names",
      getVal: () => {
        return Array.from(ioState.nameMap);
      },
    },
    {
      listener: "getTerms",
      trigger: "terms",
      getVal: () => {
        return Array.from(ioState.termMap);
      },
    },
    {
      listener: "getSources",
      trigger: "sources",
      getVal: () => {
        return Array.from(ioState.sourceMap);
      },
    },
    {
      listener: "getParents",
      trigger: "parents",
      getVal: () => {
        return Array.from(ioState.childrenMap);
      },
    },
    {
      listener: "getTypes",
      trigger: "types",
      getVal: () => {
        return Array.from(ioState.typeMap);
      },
    },
    {
      listener: "getNineTypes",
      trigger: "nineTypes",
      getVal: () => {
        return Array.from(ioState.nineTypesMap);
      },
    },
  ],
  broadcast: (event, data) => {
    ioState.sockets.forEach((socket) => {
      socket.emit(event, data);
    });
  },
};

function ioSetup(ioState) {
  io.on("connection", function (socket) {
    logger.debug("new socketio connection", socket.conn.id);
    
    ioState.sockets.push(socket);

    socket.on("disconnect", function () {
      logger.debug("removed socketio connection", socket.conn.id);
      ioState.sockets.splice(ioState.sockets.indexOf(socket), 1);
    });

    socket.on("authenticate", function (pw) {
      if (
        pw ===
        (process.env.OP_DATABASE_KEY || require("./server/local-api").key)
      ) {
        socket.emit("authenticateComplete", true);
      } else {
        socket.emit("authenticateComplete", false);
      }
    });

    socket.on("findSimilar", function (max) {
      findSimilarRecords(socket, max);
    });

    socket.on("compareEnnea", function () {
      scrape().then((result) => {
        // const scrapeNames = [];
        // result.forEach(row => {
        //   scrapeNames.push(row.name.trim().toLowerCase());
        // });
        // const enneaDbNames = [];
        // ioState.eTypeMap.forEach((val, key) => {
        //   enneaDbNames.push(val.name.trim().toLowerCase());
        // });
        // console.log('comparing...', scrapeNames.length, enneaDbNames.length);
        const nameDifferences = dbCompare.compareEnnea(result, ioState.eTypeMap);
        socket.emit('compareEnneaComplete', nameDifferences);
      });
    });

    socket.on("compareAP", function () {
      scrapeAP().then((result) => {
        const nameDifferences = dbCompare.compareAP(result, ioState.apMap);
        socket.emit('compareAPComplete', nameDifferences);
      });
    });

    socket.on("refresh", function () {
      refreshAirtableData(socket);
    });

    ioState.shared.forEach((retrievable) => {
      socket.on(retrievable.listener, () => {
        socket.emit(retrievable.trigger, retrievable.getVal());
      });
      // socket.emit(retrievable.trigger, retrievable.getVal());
    });
  });
}
ioSetup(ioState);

const typedPersons = require("./server/airtable/ops-typed-persons");
const terms = require("./server/airtable/ops-terms");
const nineTypes = require("./server/airtable/e9-terms");
const enneagrammer = require("./server/airtable/enneagrammer-db");
const faytabase = require("./server/airtable/faytabase-db");
const wss = require("./server/airtable/wss-db");
const interviews = require("./server/airtable/interview-db");
const opsExtra = require("./server/airtable/ops-db");
const subjective = require("./server/airtable/ops-subjective-db");
const apDb = require("./server/airtable/ap-db");
const airtable = require("./server/airtable/airtable");
const {  findSimilarPromise } = require("./server/similar-names");
const { scrape } = require("./server/enneagrammer-scrape");
const { scrapeAP } = require("./server/attitudinal-scrape");
const { dbCompare } = require("./server/db-compare");

function errorHandler(reason) {
  console.log("promise rejected with reason...", reason);
}

function findSimilarRecords(socket, max) {
  logger.debug("finding similar...");
  findSimilarPromise(ioState.nameMap, max).then(
    (results) => {
      if (socket) {
        try {
          // console.log(JSON.stringify(results), socket.conn.id);
          socket.emit("refreshComplete", "complete");
          socket.emit("findSimilarComplete1", "success");
          socket.emit("findSimilarComplete", results);
        } catch (error) {
          console.log(error);
        }
      }
    },
    () => {
      //rejected
    }
  );
  logger.debug("finding similar... async...")
}

const mins = 60;
const refreshTimer = 60 * 1000 * mins;
function refreshAirtableData(socket) {
  logger.debug("Refreshing data");
  fetchAirtableData().then(
    (result) => {
      // once complete, emit that refresh is complete and broadcast updates
      ioState.nineTypesMap = result.nineTypesMap;
      ioState.termMap = result.termMap;
      ioState.sourceMap = result.sourceMap;
      ioState.typeMap = result.typeMap;
      ioState.nameMap = result.nameMap;
      ioState.childrenMap = result.childrenMap;
      ioState.eTypeMap = result.eTypeMap;
      ioState.apMap = result.apMap;
      ioState.shared.forEach((retrievable) => {
        ioState.broadcast(retrievable.trigger, retrievable.getVal());
      });
      if (socket) {
        socket.emit("refreshComplete", "complete");
      }
    },
    () => {
      //rejected
    }
  ).then(() => {
    logger.debug("Refreshing complete");
    setTimeout(refreshAirtableData, refreshTimer);
  });
}
refreshAirtableData();

/**
 * Creates a promise which does not resolve until all airtable requests have completed.
 */
function fetchAirtableData() {
  console.time("fetch-airtable-data");
  return new Promise((resolve, reject) => {
    let personsComplete = false;
    let definitionsComplete = false;
    let nineTypesComplete = false;
    let completeSteps = [
      personsComplete,
      definitionsComplete,
      nineTypesComplete,
    ];
    let nineTypesMap;
    let termMap;
    let sourceMap;
    let typeMap;
    let nameMap;
    let childrenMap;
    let eTypeMap;
    let fayTypeMap;
    let wssMap;
    let interviewMap;
    let opsExtraMap;
    let subjectiveMap;
    let apMap;

    // get Persons - combining data from multiple sources
    airtable
      // Fetch OPS Database ("Airtable")
      .getAll({
        name: "OP Database",
        url: typedPersons.listUrl,
      })
      // Process OPS Data from "Airtable"
      .then((records) => {
        const result = typedPersons.convertPersons(records);
        typeMap = result.types;
        nameMap = result.names;
      }, errorHandler)
      // Fetch Enneagram Data
      .then(() => {
        return airtable.getAll({
          name: "Enneagrammer DB",
          url: enneagrammer.url,
        });
      }, errorHandler)
      // Process Enneagram Data
      .then((records) => {
        const result = enneagrammer.convertRecords(records);
        eTypeMap = result;
      })
      // Fetch More OPS Data (Roqb's DB)
      .then(() => {
        return airtable.getAll({
          name: "OPS DB",
          url: opsExtra.url,
        });
      }, errorHandler)
      // Process Extra OPS Data
      .then((records) => {
        const result = opsExtra.convertRecords(records);
        opsExtraMap = result;
      })
      .then(() => {
        return airtable.getAll({
          name: "Faytabase",
          url: faytabase.url,
        });
      }, errorHandler)
      .then((records) => {
        const result = faytabase.convertRecords(records);
        fayTypeMap = result;
      })
      .then(() => {
        return airtable.getAll({
          name: "WSS DB",
          url: wss.url,
        });
      }, errorHandler)
      .then((records) => {
        const result = wss.convertRecords(records);
        wssMap = result;
      })
      .then(() => {
        return airtable.getAll({
          name: "Interview DB",
          url: interviews.url,
        });
      })
      .then((records) => {
        const result = interviews.convertRecords(records);
        interviewMap = result;
      })
      .then(() => {
        return airtable.getAll({
          name: "Subjective Personality DB",
          url: subjective.url,
        });
      })
      .then((records) => {
        const result = subjective.convertRecords(records);
        subjectiveMap = result;
      })
      .then(() => {
        return airtable.getAll({
          name: "AP DB",
          url: apDb.url,
        });
      })
      .then((records) => {
        const result = apDb.convertRecords(records);
        apMap = result;
      })
      .then(() => {
        // Merge Map Results Together
        opsExtra.mergeMaps(nameMap, opsExtraMap);
        interviews.mergeMaps(nameMap, interviewMap);
        enneagrammer.mergeMaps(nameMap, eTypeMap);
        faytabase.mergeMaps(nameMap, fayTypeMap);
        wss.mergeMaps(nameMap, wssMap);
        subjective.mergeMaps(nameMap, subjectiveMap);
        apDb.mergeMaps(nameMap, apMap);
        nameMap.forEach((val, key) => {
          val.key = key;
        });
      })
      .then(() => {
        personsComplete = true;
        attemptResolve();
      });

    // get Definitions
    airtable
      .getAll({
        name: "Definitions",
        url: terms.urlMap.get("definitions"),
      })
      .then((records) => {
        // handle Definitions
        const result = terms.convertDefinitions(records);
        termMap = result.terms;
        sourceMap = result.sources;
      }, errorHandler)
      // get Children
      .then(() => {
        return airtable.getAll({
          name: "Children",
          url: terms.urlMap.get("children"),
        });
      }, errorHandler)
      .then((records) => {
        // handle Children
        const result = terms.convertChildren(records, termMap);
        childrenMap = result.children;
      })
      .then(() => {
        definitionsComplete = true;
        attemptResolve();
      });

    airtable
      .getAll({
        name: "Nine Types",
        url: nineTypes.nineTypesUrl,
      })
      .then((records) => {
        const result = nineTypes.convert(records);
        nineTypesMap = result.nineTypes;
      }, errorHandler)
      .then(() => {
        nineTypesComplete = true;
        attemptResolve();
      });

    function attemptResolve() {
      console.log(
        "attempt resolve",
        completeSteps.every((v) => v === true)
      );
      if (personsComplete && definitionsComplete && nineTypesComplete) {
        console.timeEnd("fetch-airtable-data");
        resolve({
          nineTypesMap: nineTypesMap,
          termMap: termMap,
          sourceMap: sourceMap,
          typeMap: typeMap,
          nameMap: nameMap,
          childrenMap: childrenMap,
          eTypeMap: eTypeMap,
          apMap: apMap,
        });
      }
    }
  }, errorHandler);
}

// Wait for maps to complete before starting the io
function startIo() {
  if (
    nineTypesMap &&
    termMap &&
    sourceMap &&
    typeMap &&
    nameMap &&
    childrenMap &&
    eTypeMap
  ) {
    // console.timeЕnd(setup);
    ioSetup([
      {
        listener: "getNames",
        trigger: "names",
        val: Array.from(nameMap),
      },
      {
        listener: "getTerms",
        trigger: "terms",
        val: Array.from(termMap),
      },
      {
        listener: "getSources",
        trigger: "sources",
        val: Array.from(sourceMap),
      },
      {
        listener: "getParents",
        trigger: "parents",
        val: Array.from(childrenMap),
      },
      {
        listener: "getTypes",
        trigger: "types",
        val: Array.from(typeMap),
      },
      {
        listener: "getNineTypes",
        trigger: "nineTypes",
        val: Array.from(nineTypesMap),
      },
    ]);
  }
}
