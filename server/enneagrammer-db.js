/*jshint esversion: 6 */

const { getRecordPicture } = require("./airtable");

const opsKey = process.env.OP_DATABASE_KEY || require("./local-api").key;
const HOST = "https://api.airtable.com/v0/apptRQDj4AV89IiNn/";
const TABLE_NAME = "Enneagrammer DB";
const VIEW = "Grid view";
const MAX_RECORD = 10000;
const fields = ["Name", "Instinct", "Type", "Trifix", "Picture", "Sex"];

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
  { org: "Mr. Rogers", result: "Fred Rogers" },
  { org: "Dr. Drew", result: "Dr. Drew Pinsky" },
  { org: "Kris Jenner", result: "Kris Kardashian Jenner" },
  { org: "Kim Kardashian", result: "Kim Kardashian West" },
  { org: "Neil deGrasse Tyson", result: "Neil DeGrasse Tyson" },
  { org: "Joaquin Pheonix", result: "Joaquin Phoenix" },
  { org: "Eminem", result: "Marshall 'Eminem' Mathers" },
  { org: "Alistair Crowley", result: "Aleister Crowley" },
  { org: "\"The Situation\"", result: "Mike 'The Situation' Sorrentino" },
  { org: "Dwayne Johnson", result: "Dwayne 'The Rock' Johnson" },
  { org: "50 Cent", result: "Curtis '50 Cent' Jackson" },
  { org: "R Kelly", result: "Robert Kelly" },
  { org: "Freddy Mercury", result: "Freddie Mercury" },
  { org: "Leonardo Dicaprio", result: "Leonardo DiCaprio" },
  { org: "The Weekend", result: "The Weeknd" },
];
function convertName(name) {
  name = name.trim();
  converterList.forEach((converter) => {
    if (converter.org === name) {
      // console.log("Converting Name - ", converter.org, "- to - |" + converter.result + "|");
      name = converter.result;
    }
  });
  const slashIndex = name.indexOf("(");
  if (slashIndex > -1) {
    const beforeName = name;
    name = name.substring(0, slashIndex).trim();
    // console.log("Trimmed Name () - ", beforeName, "- to |" + name + "|");
  }
  return name;
}

function convertRecords(records) {
  const result = new Map();
  records.forEach((record) => {
    //TODO: put in map
    if (!record.fields.Name || record.fields.Name.trim().length === 0) {
      return;//skip empty names
    }
    const name = convertName(record.fields.Name);
    const coreEType = record.fields.Type && record.fields.Type.length ? record.fields.Type.substring(0, 1) : '?';
    const wing = record.fields.Type && record.fields.Type.length > 2 ? record.fields.Type.substring(2, 3) : '?';
    result.set(name, {
      name: name,
      coreEType: coreEType,
      coreETypeLong: getCoreETypeLong(coreEType),
      wing: wing,
      eType: record.fields.Type,
      instinct: record.fields.Instinct ? record.fields.Instinct.toLowerCase() : '??/??',
      trifix: record.fields.Trifix,
      sex: record.fields.Sex,
      pictureUrl: getRecordPicture(record)
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
    fullEType = eType.instinct + " " + coreType + " " + trifix;
  } else if (eType.instinct) {
    fullEType = eType.instinct + " " + coreType;
  } else if (eType.instinct && trifix) {
    fullEType = eType.eType + " " + trifix;
  } else {
    fullEType = eType.eType;
  }
  return fullEType;
}

function buildTritype(s) {
  if (s && s.length === 11) {
    const parts = s.split(' ');
    if (parts.length === 3) {
      let tritype = parts[0].substring(0, 1) + parts[1].substring(0, 1) + parts[2].substring(0, 1);
      // console.log('tritype', tritype);
      return tritype;
    } else {
      console.log('tritype part length issue', s);
      return s;
    }
  } else {
    return s;
  }
}

function getCoreETypeLong(coreEType) {
  switch(coreEType) {
    case '1':
      return 'One';
    case '2':
      return 'Two';
    case '3':
      return 'Three';
    case '4':
      return 'Four';
    case '5':
      return 'Five';
    case '6':
      return 'Six';
    case '7':
      return 'Seven';
    case '8':
      return 'Eight';
    case '9':
      return 'Nine';
  }
}

function mergeMaps(nameMap, eTypeMap) {
  const matches = [];
  let i = 0;
  eTypeMap.forEach((eVal, eKey) => {
    const nameVal = nameMap.get(eKey);
    if (nameVal) {
      nameVal.coreEType = eVal.coreEType; // 9
      nameVal.coreETypeLong = eVal.coreETypeLong; // nine
      nameVal.wing = eVal.wing; // 1
      nameVal.eType = eVal.eType; // 9w1
      nameVal.instinct = eVal.instinct; // so/sp
      nameVal.trifix = buildTritype(eVal.trifix); // 963 (no wings)
      nameVal.fullEType = buildFullEType(eVal);
      nameVal.tags ? nameVal.tags.push("Enneagrammer") : nameVal.tags = ["Enneagrammer"];
      if (eval.pictureUrl) {
        nameVal.pictureUrl = eVal.pictureUrl;
      }
      matches.push(eKey);
    } else {
      // Add to nameMap
      i++;
      nameMap.set(eKey, {
        name: eKey,
        coreEType: eVal.coreEType,
        coreETypeLong: eVal.coreETypeLong,
        wing: eVal.wing,
        eType: eVal.eType, // 9w1
        instinct: eVal.instinct,
        trifix: buildTritype(eVal.trifix),
        pictureUrl: eVal.pictureUrl,
        fullEType: buildFullEType(eVal),
        tags: ["Enneagrammer"],
        sex: eVal.sex,
        trans: false
      });
    }
  });
  console.log("E-Type and OP-Type Matches", matches.length, "New Persons", i);
}

exports.url = url;
exports.convertRecords = convertRecords;
exports.mergeMaps = mergeMaps;
