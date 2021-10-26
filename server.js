/*jshint esversion: 6 */
const setup = "Server Setup";
console.time(setup);
const express = require("express");
const app = express();
const http = require("http");
const server = http.Server(app);
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

function fireBlob(blob) {
  if (blob.ready) {
    console.log("blob firing", blob.name);
    blob.fire();
  } else {
    // console.log("blob waiting", blob.name);
    setTimeout(() => {
      fireBlob(blob);
    }, 200);
  }
}

const ioState = {
  sockets: [],
  nineTypesMap: new Map(),
  termMap: new Map(),
  sourceMap: new Map(),
  typeMap: new Map(),
  nameMap: new Map(),
  childrenMap: new Map(),
  eTypeMap: new Map(),
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
    console.log("new socketio connection");
    ioState.sockets.push(socket);

    socket.on("disconnect", function () {
      console.log("removed socketio connection");
      ioState.sockets.splice(ioState.sockets.indexOf(socket), 1);
    });

    socket.on("authenticate", function (pw) {
      if (pw === (process.env.OP_DATABASE_KEY || require("./server/local-api").key)) {
        socket.emit('authenticateComplete', true);
      } else {
        socket.emit('authenticateComplete', false);
      }
    });

    socket.on("refresh", function () {
      refreshAirtableData(socket);
    });

    ioState.shared.forEach((retrievable) => {
      socket.on(retrievable.listener, () => {
        socket.emit(retrievable.trigger, retrievable.getVal());
      });
      socket.emit(retrievable.trigger, retrievable.getVal());
    });
  });
}
ioSetup(ioState);

const typedPersons = require("./server/ops-typed-persons");
const terms = require("./server/ops-terms");
const nineTypes = require("./server/e9-terms");
const enneagrammer = require("./server/enneagrammer-db");
const airtable = require("./server/airtable");

function errorHandler(reason) {
  console.log("promise rejected with reason...", reason);
}

function refreshAirtableData(socket) {
  fetchAirtableData().then((result) => {
    // once complete, emit that refresh is complete and broadcast updates
    ioState.nineTypesMap = result.nineTypesMap;
    ioState.termMap = result.termMap;
    ioState.sourceMap = result.sourceMap;
    ioState.typeMap = result.typeMap;
    ioState.nameMap = result.nameMap;
    ioState.childrenMap = result.childrenMap;
    ioState.eTypeMap = result.eTypeMap;
    ioState.shared.forEach((retrievable) => {
      ioState.broadcast(retrievable.trigger, retrievable.getVal());
    });
    if (socket) {
      socket.emit("refreshComplete", "complete");
    }
  }, () => {
    //rejected
  });
}
refreshAirtableData();

function fetchAirtableData() {
  console.time("fetch-airtable-data");
  return new Promise((resolve, reject) => {
    let personsComplete = false;
    let definitionsComplete = false;
    let nineTypesComplete = false;
    let completeSteps = [personsComplete, definitionsComplete, nineTypesComplete];
    let nineTypesMap;
    let termMap;
    let sourceMap;
    let typeMap;
    let nameMap;
    let childrenMap;
    let eTypeMap;
    // get Persons
    airtable
      .getAll({
        name: "OP Database",
        url: typedPersons.listUrl,
      })
      .then((records) => {
        // handle Persons
        const result = typedPersons.convertPersons(records);
        typeMap = result.types;
        nameMap = result.names;
      }, errorHandler)
      .then(() => {
        return airtable.getAll({
          name: "Enneagrammer DB",
          url: enneagrammer.url,
        });
      }, errorHandler)
      .then((records) => {
        const result = enneagrammer.convertRecords(records);
        eTypeMap = result;
      })
      .then(() => {
        enneagrammer.mergeMaps(nameMap, eTypeMap);
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
        console.log('attempt resolve', completeSteps.every(v => v === true));
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
          });
        }
      }
  });
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
