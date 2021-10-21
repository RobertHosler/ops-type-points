/*jshint esversion: 6 */

const opsKey = process.env.OP_DATABASE_KEY || require("./local-api").key;
const HOST = "https://api.airtable.com/v0/apptRQDj4AV89IiNn/";
const TABLE_NAME = "Enneagrammer DB";
const VIEW = "Grid view";
const MAX_RECORD = 10000;
const fields = ["Name", "Instinct", "Type", "Trifix", "Picture"];

const url = new URL(HOST + TABLE_NAME);
url.searchParams.append("view", VIEW);
url.searchParams.append("api_key", opsKey);
url.searchParams.append("maxRecords", MAX_RECORD);
fields.forEach((field) => {
  url.searchParams.append("fields", field);
});

const converterList = [
  { org: "Dr. Phil", result: "Dr. Phil McGraw" },
  { org: "Ellen Degeneres", result: "Ellen DeGeneres" },
  { org: "Gordon Ramsey", result: "Gordon Ramsay" },
  { org: "Gwenyth Paltrow", result: "Gwyneth Paltrow" },
  { org: "Hilary Clinton", result: "Hillary Clinton" },
  { org: "Jay Z", result: "Jay-Z" },
  { org: "John Jones (UFC)", result: "Jon Jones" },
  { org: "Judge Judyy", result: "Judge Judy" },
  { org: "Lady GaGa", result: "Lady Gaga" },
  { org: "Oprah", result: "Oprah Winfrey" },
  { org: "Ross Matthews", result: "Ross Mathews" },
  { org: "Russel Crowe", result: "Russell Crowe" },
  { org: "Russel Brand", result: "Russell Brand" },
  { org: "Samuel L Jackson", result: "Samuel L. Jackson" },
  { org: "Shaq", result: "Shaquille O’Neal" },
  { org: "Whoopi Goldberg", result: "Whoopie Goldberg" },
];
function convertName(name) {
  name = name.trim();
  converterList.forEach((converter) => {
    if (converter.org === name) {
      // console.log("Converting Name - ", converter.org, "- to - |" + converter.result + "|");
      name = converter.result;
    }
  });
  return name;
}

function convertRecords(records) {
  const result = new Map();
  records.forEach((record) => {
    //TODO: put in map
    const name = convertName(record.fields.Name);
    result.set(name, {
      name: name,
      eType: record.fields.Type,
      instinct: record.fields.Instinct,
      trifix: record.fields.Trifix,
      pictureUrl:
        record.fields.Picture && record.fields.Picture.length > 0
          ? record.fields.Picture[0].url
          : "",
    });
  });
  return result;
}

function buildFullEType(eType) {
  let fullEType;
  if (eType.instinct && eType.trifix) {
    fullEType = eType.instinct + " - " + eType.eType + " - " + eType.trifix;
  } else if (eType.instinct) {
    fullEType = eType.instinct + " - " + eType.eType;
  } else if (eType.instinct && eType.trifix) {
    fullEType = eType.eType + " - " + eType.trifix;
  } else {
    fullEType = eType.eType;
  }
  return fullEType;
}

function mergeMaps(nameMap, eTypeMap) {
  const matches = [];
  let i = 0;
  // nameMap.forEach((nameVal, nameKey) => {
  //   const eType = eTypeMap.get(nameKey);
  //   if (eType) {
  //     nameVal.eType = eType.eType;
  //     nameVal.instinct = eType.instinct;
  //     nameVal.trifix = eType.trifix;
  //     nameVal.fullEType = buildFullEType(eType);
  //     matches.push(nameKey);
  //   }
  // });
  eTypeMap.forEach((eVal, eKey) => {
    const nameVal = nameMap.get(eKey);
    if (nameVal) {
      nameVal.eType = eVal.eType;
      nameVal.instinct = eVal.instinct;
      nameVal.trifix = eVal.trifix;
      nameVal.fullEType = buildFullEType(eVal);
      matches.push(eKey);
    } else {
      // Add to nameMap
      i++;
      nameMap.set(eKey, {
        name: eKey,
        instinct: eVal.instinct,
        trifix: eVal.trifix,
        pictureUrl: eVal.pictureUrl,
        fullEType: buildFullEType(eVal),
      });
    }
  });
  console.log("E-Type and OP-Type Matches", matches.length, "New Persons", i);
}

exports.url = url;
exports.convertRecords = convertRecords;
exports.mergeMaps = mergeMaps;
