/*jshint esversion: 6 */
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

function broadcast(event, data) {
  sockets.forEach((socket) => {
    socket.emit(event, data);
  });
}

function ioSetup(shared) {
  console.log("IO Setup");
  io.on("connection", function (socket) {
    console.log("new socket");
    sockets.push(socket);

    socket.on("disconnect", function () {
      console.log("removed socket");
      sockets.splice(sockets.indexOf(socket), 1);
    });

    shared.forEach((retrievable) => {
      socket.on(retrievable.listener, () => {
        socket.emit(retrievable.trigger, retrievable.val);
      });
      socket.emit(retrievable.trigger, retrievable.val);
    });
  });
}

const typedPersons = require("./server/ops-typed-persons");
const terms = require("./server/ops-terms");
const nineTypes = require("./server/e9-terms");
const airtable = require("./server/airtable");

var sockets = [];
let nineTypesMap;
let termMap;
let sourceMap;
let typeMap;
let nameMap;
let childrenMap;

function errorHandler(reason) {
  console.log("promise rejected with reason...", reason);
}

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
  .then(startIo);

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
    // get Children
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
  .then(startIo);

airtable
  .getAll({
    name: "Nine Types",
    url: nineTypes.nineTypesUrl,
  })
  .then((records) => {
    const result = nineTypes.convert(records);
    nineTypesMap = result.nineTypes;
  }, errorHandler)
  .then(startIo);

// Wait for maps to complete before starting the io
function startIo() {
  if (
    nineTypesMap &&
    termMap &&
    sourceMap &&
    typeMap &&
    nameMap &&
    childrenMap
  ) {
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
