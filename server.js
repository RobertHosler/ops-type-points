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
const nineTypesUrl = terms.urlMap.get('nineTypes');

const nineTypesMap = new Map();
const nineTypesSetMap = new Map();

function convertNineTypesResult(json) {
  const result = JSON.parse(json);
  const records = result.records;
  records.forEach(record => {
    const typeName = record.fields['Type Name'] ? record.fields['Type Name'][0] : '';
    const descriptionSetName = record.fields['Description Set Name'] ? record.fields['Description Set Name'][0] : '';
    const text = record.fields.Text;
    if (nineTypesSetMap.get(descriptionSetName)) {
      nineTypesSetMap.get(descriptionSetName)[typeName.toLowerCase()].push(text);
    } else {
      const set = {
        one: [],
        two: [],
        three: [],
        four: [],
        five: [],
        six: [],
        seven: [],
        eight: [],
        nine: []
      };
      set[typeName.toLowerCase()].push(text);
      nineTypesSetMap.set(descriptionSetName, set);
    }

    // if (nineTypesMap.get(typeName)) {
    //   nineTypesMap.get(typeName)
    // } else {
    //   nineTypesMap.set(typeName, {
    //     descriptions: [
    //       {
    //         set: descriptionSetName,
    //         text: text
    //       }
    //     ]
    //   });
      
    //   sourceMap.set(sourceName, {
    //     definitions: [{
    //       term: termName,
    //       definition: record.fields.Definition
    //     }],
    //     url: sourceUrl
    //   });
    // }
  });
  const offset = result.offset;
  console.log("Nine Types fetch", nineTypesMap.size, nineTypesSetMap.size, offset);
  if (offset) {
    getData(nineTypesUrl, convertNineTypesResult, offset);
  }
}
getData(nineTypesUrl, convertNineTypesResult);

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
  console.log("Term fetch", termMap.size, sourceMap.size, offset);
  if (offset) {
    getData(definitionsUrl, convertDefinitionsResult, offset);
  }
}

getData(definitionsUrl, convertDefinitionsResult);

const typeMap = new Map();
const nameMap = new Map();

function convertPersonListResult(json) {
  const result = JSON.parse(json);
  const typeRecords = result.records ? result.records : [];
  typeRecords.forEach(record => {
    const typedPerson = {
      name: record.fields.Name,
      type: record.fields.Type,
      pictureUrl: record.fields.Picture && record.fields.Picture.length > 0 ? record.fields.Picture[0].url : '',
      tags: record.fields.Tags,
      coreNeed: record.fields['Single Observer vs Decider'] ?
        record.fields['Single Observer vs Decider'] === 'Single Decider / Double Observer' ? 'Decider' :
        record.fields['Single Observer vs Decider'] === 'Single Observer / Double Decider' ? 'Observer' : '' : '',
      deciderNeed: record.fields['Decider Human Need'],
      observerNeed: record.fields['Observer Human Need'],
      observerLetter: record.fields['Savior Observer'] ?
        record.fields['Savior Observer'] === 'Sensory' ? 'S' :
        record.fields['Savior Observer'] === 'Intuition' ? 'N' : '' : '',
      deciderLetter: record.fields['Savior Decider'] ?
        record.fields['Savior Decider'] === 'Feeling' ? 'F' : 
        record.fields['Savior Decider'] === 'Thinking' ? 'T' : '': '',
      infoAnimal: record.fields['Blast vs Consume'] ?
        record.fields['Blast vs Consume'] === 'Blast' ? 'B' :
        record.fields['Blast vs Consume'] === 'Consume' ? 'C' : '': '',
      energyAnimal: record.fields['Play vs Sleep'] ?
        record.fields['Play vs Sleep'] === 'Play' ? 'P' : 
        record.fields['Play vs Sleep'] === 'Sleep' ? 'S' : '' : '',
      animalBalance: record.fields['Energy vs Info Dom'],
      sensoryMod: record.fields['Sensory Sexual'] ?
        record.fields['Sensory Sexual'] === 'Masculine' ? 'M' :
        record.fields['Sensory Sexual'] === 'Feminine' ?'F' : '' : '',
      deMod: record.fields['De Sexual'] ?
        record.fields['De Sexual'] === 'Masculine' ? 'M' :
        record.fields['De Sexual'] === 'Feminine' ? 'F' : '' : '',
      sex: record.fields['Biological Sex'],
      trans: record.fields.Transgender
    };
    if (typedPersons.exclusions.includes(record.fields.Name)) {
      return;
    }
    let tagExclusionFound = false;
    if (record.fields.Tags) {
      record.fields.Tags.forEach(tag => {
        if (tag === 'Community Member') {
          tagExclusionFound = true;
        }
      });
    }
    if (tagExclusionFound && !typedPersons.inclusions.includes(record.fields.Name)) {
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
  console.log("Person Fetch", nameMap.size, typeMap.size, offset);
  if (offset) {
    getData(listUrl, convertPersonListResult, offset);
  }
}

getData(listUrl, convertPersonListResult);

function convertChildrenResult(json) {
  const result = JSON.parse(json);
  // console.log(result);
  const relRecords = result.records ? result.records : [];
  relRecords.forEach(record=> {
    
  });
}

getData(terms.urlMap.get('children'), convertChildrenResult);

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

  socket.on('getNineTypes', () => {
    socket.emit('nineTypes', Array.from(nineTypesSetMap));
  });
  socket.emit('nineTypes', Array.from(nineTypesSetMap));

});

server.listen(PORT, () => {
  console.log('Listening on port ', PORT);
});