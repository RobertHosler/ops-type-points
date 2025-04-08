/*jshint esversion: 6 */
const setup = "Server Setup";
console.time(setup);
const express = require("express");
const app = express();
const path = require('path');
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

// disable for local testing that doesn't require airtable due to api limits
let enableAirtable = true;
if (process.env.NODE_ENV === 'development') {
  console.log('Running locally', process.env.NODE_ENV);
  enableAirtable = false; // limited by default locally even when enabled - see airtable.js
} else {
  console.log('Not running locally', process.env.NODE_ENV);
}


// Serve static images from the 'public/images' folder
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// Configure npm to use the built angular app
app.use(express.static("./dist/ops-type-points"));

// Example route to get an image
app.get('/images/:imageName', (req, res) => {
  const imageName = req.params.imageName;
  res.sendFile(path.join(__dirname, 'public/images', imageName));
});
app.get("/*", function (req, res) {
  console.log("serving app");
  res.sendFile("index.html", { root: "dist/ops-type-points/" });
});

// Run server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log("Listening on port ", PORT);
});

/**
 * Manages the requests from the socket connections, returning the requested data.
 */
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
        return ioState.termMap ? Array.from(ioState.termMap) : [];
      },
    },
    {
      listener: "getSources",
      trigger: "sources",
      getVal: () => {
        return ioState.sourceMap ? Array.from(ioState.sourceMap) : [];
      },
    },
    {
      listener: "getParents",
      trigger: "parents",
      getVal: () => {
        return ioState.childrenMap ? Array.from(ioState.childrenMap) : [];
      },
    },
    {
      listener: "getTypes",
      trigger: "types",
      getVal: () => {
        return ioState.typeMap ? Array.from(ioState.typeMap) : [];
      },
    },
    {
      listener: "getNineTypes",
      trigger: "nineTypes",
      getVal: () => {
        return ioState.nineTypesMap ? Array.from(ioState.nineTypesMap) : [];
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
const { findSimilarPromise } = require("./server/similar-names");
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

const days = 7;
const refreshEnabled = true; // don't refresh due to airtable api limits
const refreshTimer = 60 * 60 * 1000 * 24 * days;  // refresh once a week
function refreshAirtableData(socket) {
  logger.debug("Refreshing data");
  fetchAirtableData()
    .then((result) => {
      logger.debug("Refreshing complete", result);
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
      (reason) => {
        logger.debug("Refreshing failed", reason);
      }
    ).then(() => {
      if (refreshEnabled) {
        setTimeout(refreshAirtableData, refreshTimer);
      } else {
        logger.debug("auto-refresh disabled - manual refresh required");
      }
    });
}
refreshAirtableData();

function fetchAirtableData() {
  console.time("fetch-airtable-data");

  return new Promise((resolve, reject) => {

    const resultMaps = {
      nineTypesMap: null,
      termMap: null,
      sourceMap: null,
      typeMap: null,
      nameMap: null,
      childrenMap: null,
      eTypeMap: null,
      fayTypeMap: null,
      wssMap: null,
      interviewMap: null,
      opsExtraMap: null,
      subjectiveMap: null,
      apMap: null,
    };

    airtable.refreshImages();

    const primaryDataSources = [ // must execute first
      {
        name: "OP Database", // jana & ryan DB
        url: typedPersons.listUrl,
        convert: typedPersons.convertPersons,
        process: (result) => {
          resultMaps.nameMap = result.names;
          resultMaps.typeMap = result.types;
        },
        enabled: enableAirtable
      },
      {
        name: "Definitions",
        url: terms.urlMap.get("definitions"),
        convert: terms.convertDefinitions,
        process: (result) => {
          resultMaps.termMap = result.terms;
          resultMaps.sourceMap = result.sources;
        },
        enabled: enableAirtable
      }];

    // Define a list of data sources and their respective processing functions
    const dataSources = [
      {
        name: "OPS DB", // my ops database
        url: opsExtra.url,
        convert: opsExtra.convertRecords,
        process: (result) => {
          resultMaps.opsExtraMap = result;
        },
        merge: opsExtra.mergeMaps,
        enabled: enableAirtable
      },
      {
        name: "Enneagrammer DB",
        url: enneagrammer.url,
        convert: enneagrammer.convertRecords,
        process: (result) => {
          resultMaps.eTypeMap = result;
        },
        merge: enneagrammer.mergeMaps,
        enabled: enableAirtable
      },
      { // TODO: needs work to be properly converted
        name: "Enneagrammer Scrape",
        fetch: scrape, // scrapes from enneagrammer DB
        convert: (result) => {
          const mapResult = new Map();
          result.forEach((record) => {
            record.tags = ['Enneagrammer'];
            mapResult.set(record.name, record);
          });
          resultMaps.eTypeMap = mapResult;
          return mapResult;
        },
        merge: enneagrammer.mergeMaps,
        enabled: false
      },
      {
        name: "WSS DB",
        url: wss.url,
        convert: wss.convertRecords,
        process: (result) => {
          resultMaps.wssMap = result;
        },
        merge: wss.mergeMaps,
        enabled: enableAirtable
      },
      {
        name: "AP DB",
        url: apDb.url,
        convert: apDb.convertRecords,
        process: (result) => {
          resultMaps.apMap = result;
        },
        merge: apDb.mergeMaps,
        enabled: false // enableAirtable - deprecated, using AP Scrape now
      },
      {
        name: "AP Scrape",
        // url: apDb.url,
        fetch: scrapeAP,
        convert: (result) => {
          const mapResult = new Map();
          result.forEach((record) => {
            record.tags = ['AP'];
            mapResult.set(record.name, record);
          });
          resultMaps.apMap = mapResult;
          return mapResult;
        },
        merge: apDb.mergeMaps,
        enabled: true
      },
      {
        name: "Terms Children",
        url: terms.urlMap.get("children"),
        convert: (records) => {
          return terms.convertChildren(records, resultMaps.termMap)
        },
        process: (result) => {
          resultMaps.childrenMap = result.children;
        },
        enabled: enableAirtable
      },
      {
        name: "Nine Types",
        url: nineTypes.nineTypesUrl,
        convert: nineTypes.convert,
        process: (result) => {
          resultMaps.nineTypesMap = result.nineTypes;
        },
        enabled: enableAirtable
      },
      {
        name: "Subjective Personality DB", // 'subjective' tagged typings
        url: subjective.url,
        convert: subjective.convertRecords,
        process: (result) => {
          resultMaps.subjectiveMap = result;
        },
        merge: subjective.mergeMaps,
        enabled: false // unused
      },
      {
        name: "Faytabase", // 'faytabase' tagged typings
        url: faytabase.url,
        convert: faytabase.convertRecords,
        process: (result) => {
          resultMaps.fayTypeMap = result;
        },
        merge: faytabase.mergeMaps,
        enabled: false // unused
      },
      {
        name: "Community Interview DB", // youtube & community typings
        url: interviews.url,
        convert: interviews.convertRecords,
        process: (result) => {
          resultMaps.interviewMap = result;
        },
        merge: interviews.mergeMaps,
        enabled: false // unused
      },
    ];

    // Helper to fetch and process data
    function fetchData(source) {
      logger.debug("Fetching data for: ", source.name);
      var fetchPromise = new Promise((resolve, reject) => {
        resolve([]);
      });
      if (source.enabled) {
        if (source.fetch) {
          fetchPromise = source.fetch();
        } else if (source.url) {
          fetchPromise = airtable
            .getAll({
              name: source.name,
              url: source.url,
            });
        }
      }
      return fetchPromise.then((records) => {
        const result = source.convert(records);
        if (source.process) {
          source.process(result);
        }
        if (source.merge) {
          source.merge(resultMaps.nameMap, result);
        }
        if (!source.process && !source.merge) {
          console.log('could not process or merge map from ' + source.name);
        }
      })
        .catch(errorHandler);
    }

    // First, fetch the primary data source before starting the others
    Promise.all(primaryDataSources.map((source) => fetchData(source)))
      .then(() => {
        // Now fetch the other data sources
        return Promise.all(dataSources.map((source) => fetchData(source)));
      })
      .then(() => {
        const deleteKeys = [];
        resultMaps.nameMap.forEach((val, key) => {
          val.key = key; // add key to record for convenience in frontend
          if (val.tags.includes('Community Member')) {
            deleteKeys.push(key);
          }
        });
        deleteKeys.forEach(key => { // remove excluded - TODO: get from database?
          resultMaps.nameMap.delete(key);
        });
      })
      .then(() => {
        console.timeEnd("fetch-airtable-data");
        resolve(resultMaps);
      })
      .catch(errorHandler);

  });
}
