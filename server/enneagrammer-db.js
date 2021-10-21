/*jshint esversion: 6 */

const opsKey = process.env.OP_DATABASE_KEY || require("./local-api").key;
const HOST = "https://api.airtable.com/v0/apptRQDj4AV89IiNn/";
const TABLE_NAME = "Enneagrammer DB";
const VIEW = "Grid view";
const MAX_RECORD = 10000;
const fields = ["Name", "Instinct", "Type", "Trifix"];

const url = new URL(HOST + TABLE_NAME);
url.searchParams.append("view", VIEW);
url.searchParams.append("api_key", opsKey);
url.searchParams.append("maxRecords", MAX_RECORD);
fields.forEach((field) => {
  url.searchParams.append("fields", field);
});

function convertRecords(records) {
  const result = new Map();
  records.forEach((record) => {
    //TODO: put in map
    const name = record.fields.Name;
    result.set(name, {
      name: name,
      eType: record.fields.Type,
      instinct: record.fields.Instinct,
      trifix: record.fields.Trifix,
    });
  });
  return result;
}

function mergeMaps(nameMap, eTypeMap) {
  const matches = [];
  nameMap.forEach((nameVal, nameKey) => {
    const eType = eTypeMap.get(nameKey);
    if (eType) {
      nameVal.eType = eType.eType;
      nameVal.instinct = eType.instinct;
      nameVal.trifix = eType.trifix;
      matches.push(nameKey);
    }
  });
  console.log("E-Type and OP-Type Matches", matches.length);
}

exports.url = url;
exports.convertRecords = convertRecords;
exports.mergeMaps = mergeMaps;