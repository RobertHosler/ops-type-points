/*jshint esversion: 6 */

const { getRecordPicture, getLastModified, compareModifiedDates, buildKey } = require("./airtable");

const HOST = "https://api.airtable.com/v0/appPbUnkpJUadoSO1/";
const TABLE_NAME = "Faytabase";
const VIEW = "Grid view";
const MAX_RECORD = 10000;
const fields = [
  "Name",
  "Alt-Name",
  "Instinct",
  "Type",
  "Trifix",
  "Picture",
  "Sex",
  "Tags",
  "Collage",
  "Links",
  "Notes",
  "Last Modified",
  "Created Date",
];

const url = new URL(HOST + TABLE_NAME);
url.searchParams.append("view", VIEW);
url.searchParams.append("maxRecords", MAX_RECORD);
fields.forEach((field) => {
  url.searchParams.append("fields", field);
});

const converterList = [
  { org: "Dr. Phil", result: "Dr. Phil McGraw" },
  { org: "Shaq", result: "Shaquille O’Neal" },
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
      return; //skip empty names
    }
    const name = convertName(record.fields.Name);
    const coreEType =
      record.fields.Type && record.fields.Type.length
        ? record.fields.Type.substring(0, 1)
        : "?";
    const wing =
      record.fields.Type && record.fields.Type.length > 2
        ? record.fields.Type.substring(2, 3)
        : "?";
    let tags = ["Faytabase"];
    (record.fields.Tags ? record.fields.Tags : []).forEach(tag => {
        tags.push(tag);
    });
    if (tags.includes('Hide')) {
      console.log('Faytabase: ' + name + ' Hidden');
      return;
    }
    result.set(buildKey(name), {
      name: name,
      altName: record.fields["Alt-Name"],
      coreEType: coreEType,
      coreETypeLong: getCoreETypeLong(coreEType),
      wing: wing,
      eType: record.fields.Type,
      instinct: record.fields.Instinct
        ? record.fields.Instinct.toLowerCase()
        : "??/??",
      trifix: record.fields.Trifix,
      sex: record.fields.Sex,
      tags: tags,
      enneaTags: tags,
      enneaNotes: record.fields.Notes,
      enneaLinks: record.fields.Links,
      pictureUrl: getRecordPicture(record.fields.Picture),
      collageUrl: getRecordPicture(record.fields.Collage),
      lastModified: getLastModified(record),
      created: record.fields['Created Date']
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
    const parts = s.split(" ");
    if (parts.length === 3) {
      let tritype =
        parts[0].substring(0, 1) +
        parts[1].substring(0, 1) +
        parts[2].substring(0, 1);
      // console.log('tritype', tritype);
      return tritype;
    } else {
      console.log("tritype part length issue", s);
      return s;
    }
  } else {
    return s;
  }
}

function getCoreETypeLong(coreEType) {
  switch (coreEType) {
    case "1":
      return "One";
    case "2":
      return "Two";
    case "3":
      return "Three";
    case "4":
      return "Four";
    case "5":
      return "Five";
    case "6":
      return "Six";
    case "7":
      return "Seven";
    case "8":
      return "Eight";
    case "9":
      return "Nine";
  }
}

function mergeMaps(nameMap, eTypeMap) {
  const matches = [];
  let i = 0;
  eTypeMap.forEach((eVal, eKey) => {
    let nameVal = nameMap.get(eKey);
    if (!nameVal) {
      let altKey = buildKey(eVal.altName);
      nameVal = nameMap.get(altKey);
    }
    if (nameVal) {
      // Merge
      nameVal.coreEType = eVal.coreEType; // 9
      nameVal.coreETypeLong = eVal.coreETypeLong; // nine
      nameVal.wing = eVal.wing; // 1
      nameVal.eType = eVal.eType; // 9w1
      nameVal.instinct = eVal.instinct; // so/sp
      nameVal.fullEType = buildFullEType(eVal);
      nameVal.fullTrifix = eVal.trifix; // 9w1 6w5 3w4 (may contain wings)
      nameVal.trifix = buildTritype(eVal.trifix); // 963 (no wings)
      nameVal.tags = nameVal.tags ? nameVal.tags : [];
      nameVal.enneaTags = nameVal.enneaTags ? nameVal.enneaTags : [];
      eVal.tags.forEach(tag => {
        if (!nameVal.tags.includes(tag)) {
          nameVal.tags.push(tag);
        }
        if (!nameVal.enneaTags.includes(tag)) {
          nameVal.enneaTags.push(tag);
        }
      });
      if (eVal.pictureUrl) {
        nameVal.pictureUrl = eVal.pictureUrl;
      }
      nameVal.enneaNotes = eVal.notes;
      nameVal.enneaLinks = eVal.enneaLinks;
      if (compareModifiedDates(nameVal.lastModified, eVal.lastModified) > 0) {
        nameVal.lastModified = eVal.lastModified;
      }
      if (compareModifiedDates(nameVal.created, eVal.created) > 0) {
        nameVal.created = eVal.created;
      }
      matches.push(eKey);
    } else {
      // Add to nameMap
      i++;
      let ytLink = 'https://www.youtube.com/results?search_query='+ eKey + ' interview';
      nameMap.set(eKey, {
        name: eVal.name,
        coreEType: eVal.coreEType,
        coreETypeLong: eVal.coreETypeLong,
        wing: eVal.wing,
        eType: eVal.eType, // 9w1
        instinct: eVal.instinct,
        fullTrifix: eVal.trifix,
        trifix: buildTritype(eVal.trifix),
        pictureUrl: eVal.pictureUrl,
        collageUrl: eVal.collageUrl,
        fullEType: buildFullEType(eVal),
        tags: eVal.tags,
        enneaTags: eVal.enneaTags,
        enneaNotes: eVal.enneaNotes,
        enneaLinks: eVal.enneaLinks,
        ytLink: ytLink,
        sex: eVal.sex,
        trans: false,
        lastModified: eVal.lastModified,
        created: eVal.created
      });
    }
  });
  console.log("Faytabase Matches", matches.length, "New Persons", i);
}

exports.url = url;
exports.convertRecords = convertRecords;
exports.mergeMaps = mergeMaps;
exports.enneaConvertName = convertName;
