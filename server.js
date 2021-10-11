/*jshint esversion: 6 */

//Install express server
// const express = require('express');
// const http = require('http');
// const path = require('path');
// const {Server} = require('socket.io');

// const app = express();

// var server = http.createServer(app);
// var io = new Server(server);

// app.get('/*', function(req, res) {
//   res.sendFile('index.html', {root: 'dist/ops-type-points/'});
// });

// io.on('connection', function(socket) {
//   console.log("new socket");
//   sockets.push(socket);
  
//   socket.on('disconnect', function() {
//     console.log("removed socket");
//     sockets.splice(sockets.indexOf(socket), 1);
//   });
// });

// Start the app by listening on the default Heroku port
// server.listen(process.env.PORT || 8080);

// Serve only the static files form the dist directory

// const server = express()
//   .use((req, res) => res.sendFile(INDEX, { root: 'dist/ops-type-points' }))
//   .listen(PORT, () => console.log(`Listening on ${PORT}`));

// const io = new Server(server);


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

var sockets = [];

let records;

// Build terms map, terms -> list of definitions
// Build terms list, list of term names (keys to the map)
const termMap = new Map();

// Build sources map, source -> list of definitions
// Build sources list, list of source names (keys to the map)
const sourceMap = new Map();
sourceMap.set('sourceName', {
  definitions: [{
    term: '',
    definition: ''
  }],
  url: ''
});

const tenCoins = '/tenCoins?maxRecords=10000';

function getData(url, callback, offset) {
  let host = url.host;
  let path = url.pathname + url.search + (offset ? '&offset=' + offset : '');
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
      // console.log(str);
      callback(str);
    });
  }).end();
}

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
  console.log(termMap.size);
  if (offset) {
    getData(definitionsUrl, convertDefinitionsResult, offset);
  }
}

getData(definitionsUrl, convertDefinitionsResult);

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

  // socket.on('getRecords', () => {
  //   if (!records) {
  //     records = 'placeholder';
  //     console.log('getting records');
  //     getData(tenCoins, data => {
  //       records = JSON.parse(data);
  //       broadcast('records', records);
  //     });
  //   } else {
  //     socket.emit('records', records);
  //   }
  // });

  socket.on('getTerms', () => {
    socket.emit('terms', Array.from(termMap));
  });

  socket.on('getSources', () => {
    socket.emit('sources', Array.from(sourceMap));
  });

  socket.emit('terms', Array.from(termMap));
  socket.emit('sources', Array.from(sourceMap));

});

server.listen(PORT, () => {
  console.log('Listening on port ', PORT);
});