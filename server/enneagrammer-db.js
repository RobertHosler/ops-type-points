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
  { org: "Ave Gardner", result: "Ava Gardner" },
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
      coreEType: record.fields.Type.substring(0, 1),
      wing: record.fields.Type.substring(2, 3),
      eType: record.fields.Type,
      instinct: record.fields.Instinct ? record.fields.Instinct.toLowerCase() : '',
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
  let coreType;
  let trifix;
  if (eType.trifix && eType.trifix.startsWith(eType.eType)) {
    // full fix (9w1 3w4 6w7) in place of core type (9w1) for reduced redundancy
    coreType = eType.trifix;
  } else {
    coreType = eType.eType;
    trifix = eType.trifix;
  }
  if (eType.instinct && trifix) {
    fullEType = eType.instinct + " - " + coreType + " - " + trifix;
  } else if (eType.instinct) {
    fullEType = eType.instinct + " - " + coreType;
  } else if (eType.instinct && trifix) {
    fullEType = eType.eType + " - " + trifix;
  } else {
    fullEType = eType.eType;
  }
  return fullEType;
}

function mergeMaps(nameMap, eTypeMap) {
  const matches = [];
  let i = 0;
  eTypeMap.forEach((eVal, eKey) => {
    const nameVal = nameMap.get(eKey);
    if (nameVal) {
      nameVal.coreEType = eVal.coreEType; // 9
      nameVal.wing = eVal.wing; // 1
      nameVal.eType = eVal.eType; // 9w1
      nameVal.instinct = eVal.instinct; // so/sp
      nameVal.trifix = eVal.trifix; // 963 or 9w1 6w7 3w4
      nameVal.fullEType = buildFullEType(eVal);
      matches.push(eKey);
    } else {
      // Add to nameMap
      i++;
      nameMap.set(eKey, {
        name: eKey,
        coreEType: eVal.coreEType,
        wing: eVal.wing,
        instinct: eVal.instinct,
        trifix: eVal.trifix,
        pictureUrl: eVal.pictureUrl,
        fullEType: buildFullEType(eVal),
        tags: ["Enneagram Type Only"],
      });
    }
  });
  console.log("E-Type and OP-Type Matches", matches.length, "New Persons", i);
}

exports.url = url;
exports.convertRecords = convertRecords;
exports.mergeMaps = mergeMaps;
