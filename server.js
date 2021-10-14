/*jshint esversion: 6 */
const express = require("express");
const app = express();
const http = require("http");
const https = require("https");
const { emit, off } = require("process");
const server = http.Server(app);
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:4200",
    methods: ["GET", "POST"]
  }
});

const PORT = process.env.PORT || 8080;
const INDEX = '/index.html';

app.use(express.static('./dist/ops-type-points'));
app.get('/*', function(req, res) { 
  res.sendFile('index.html', {root: 'dist/ops-type-points/'})
});

var sockets = [];

let records;

// Build terms map, terms -> list of definitions
// Build terms list, list of term names (keys to the map)
const termMap = new Map();

// Build sources map, source -> list of definitions
// Build sources list, list of source names (keys to the map)
const sourceMap = new Map();

const tenCoins = '/tenCoins?maxRecords=10000';

function getData(url, callback, offset) {
  let host = url.host;
  let path = url.pathname + url.search + (offset ? '&offset=' + offset : '');
  // console.log(host, path);
  https.request({
    hostname: host,
    path: path
  }, response => {
    var str = '';
  
    //another chunk of data has been received, so append it to `str`
    response.on('data', chunk => {
      str += chunk;
    });
  
    //the whole response has been received, so we just print it out here
    response.on('end', () => {
      callback(str);
    });
  }).end();
}

const typedPersons = require('./server/ops-typed-persons');
const listUrl = typedPersons.urlMap.get('list');

const terms = require('./server/ops-terms');
const definitionsUrl = terms.urlMap.get('definitions');

function convertDefinitionsResult(json) {
  const result = JSON.parse(json);
  const definitionRecords = result.records;
  definitionRecords.forEach(record => {
    const termName = record.fields['Term Name'] ? record.fields['Term Name'][0] : '';
    if (termName) {
      // console.log(termName, ' - ', record.fields.Definition);
      const sourceName = record.fields['Definition Source Name'] ? record.fields['Definition Source Name'][0] : '';
      const sourceUrl = record.fields['Definition Source Url'] ? record.fields['Definition Source Url'][0] : '';

      // Add to source map
      if (sourceMap.get(sourceName)) {
        const source = sourceMap.get(sourceName);
        source.definitions.push({
          term: termName,
          definition: record.fields.Definition
        });
        sourceMap.set(sourceName, source);
      } else {
        sourceMap.set(sourceName, {
          definitions: [{
            term: termName,
            definition: record.fields.Definition
          }],
          url: sourceUrl
        });
      }

      // Add to terms map
      if (termMap.get(termName)) {
        // term in map
        const term = termMap.get(termName);
        term.definitions.push({
          definition: record.fields.Definition,
          sourceName: sourceName,
          sourceUrl: sourceUrl
        });
        termMap.set(termName, term);
      } else {
        // term not yet in map
        termMap.set(termName, {
          definitions: [{
              definition: record.fields.Definition,
              sourceName: sourceName,
              sourceUrl: sourceUrl
          }],
          tags: [],
          types: [],
          altNames: record.fields['Alt Names'] ? record.fields['Alt Names'][0] : []
        });
      }
    } else {
      // No Term Name
    }
  });
  const offset = result.offset;
  console.log("Term fetch", offset, termMap.size, sourceMap.size);
  if (offset) {
    getData(definitionsUrl, convertDefinitionsResult, offset);
  }
}

getData(definitionsUrl, convertDefinitionsResult);

const typeMap = new Map();
const nameMap = new Map();

const personExclusions = ['Jesus'];
const tagExclusions = ['Community Member'];
const communityInclusions = ['Roqb Hosler'];

function convertPersonListResult(json) {
  const result = JSON.parse(json);
  const typeRecords = result.records;
  typeRecords.forEach(record => {
    const typedPerson = {
      name: record.fields.Name,
      type: record.fields.Type,
      pictureUrl: record.fields.Picture && record.fields.Picture.length > 0 ? record.fields.Picture[0].url : '',
      tags: record.fields.Tags
    };
    if (personExclusions.includes(record.fields.Name)) {
      return;
    }
    let tagExclusionFound = false;
    if (record.fields.Tags) {
      record.fields.Tags.forEach(tag => {
        if (tagExclusions.includes(tag)) {
          tagExclusionFound = true;
        }
      });
    }
    if (tagExclusionFound && !communityInclusions.includes(record.fields.Name)) {
      return;
    }
    if (record.fields.Type) {
      if (typeMap.get(record.fields.Type)) {
        typeMap.get(record.fields.Type).push(typedPerson);
      } else {
        typeMap.set(record.fields.Type, [typedPerson]);
      }
    }
    if (record.fields.Name) {
      nameMap.set(record.fields.Name, typedPerson);
    }
  });
  const offset = result.offset;
  console.log("Person Fetch", offset, nameMap.size, typeMap.size);
  if (offset) {
    getData(listUrl, convertPersonListResult, offset);
  }
}

getData(listUrl, convertPersonListResult);

function broadcast(event, data) {
  sockets.forEach(socket => {
      socket.emit(event, data);
  });
}

io.on('connection', function(socket) {
  console.log("new socket");
  sockets.push(socket);
  
  socket.on('disconnect', function() {
    console.log("removed socket");
    sockets.splice(sockets.indexOf(socket), 1);
  });

  socket.on('getTerms', () => {
    socket.emit('terms', Array.from(termMap));
  });
  socket.emit('terms', Array.from(termMap));

  socket.on('getSources', () => {
    socket.emit('sources', Array.from(sourceMap));
  });
  socket.emit('sources', Array.from(sourceMap));

  socket.on('getNames', () => {
    socket.emit('nameMap', Array.from(nameMap));
  });
  socket.emit('nameMap', Array.from(nameMap));

  socket.on('getTypes', () => {
    socket.emit('types', Array.from(typeMap));
  });
  socket.emit('types', Array.from(typeMap));

});

server.listen(PORT, () => {
  console.log('Listening on port ', PORT);
});