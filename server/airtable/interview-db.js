/*jshint esversion: 6 */

const { getRecordPicture, compareModifiedDates, getLastModified } = require("./airtable");

const opsKey = process.env.OP_DATABASE_KEY || require("../local-api").key;
const HOST = "https://api.airtable.com/v0/appcD3UjS4Do1PHEd/";
const TABLE_NAME = "Interviews";
const VIEW = "Grid view";
const MAX_RECORD = 12000;
const fields = [
  "Name",
  "Alt-Name",
  "OP Type",
  "WSS Type",
  "Picture",
  "Sex",
  "Binyamin",
  "ENFP Male",
  "WSS",
  "Other",
  "Notes",
  "Tags",
  "Override Picture",
  "Last Modified",
  "Created Date",
];

const url = new URL(HOST + TABLE_NAME);
url.searchParams.append("view", VIEW);
url.searchParams.append("api_key", opsKey);
url.searchParams.append("maxRecords", MAX_RECORD);
fields.forEach((field) => {
  url.searchParams.append("fields", field);
});

const converterList = [
  { org: "Dwayne Johnson", result: "Dwayne 'The Rock' Johnson" },
  { org: "Eminem", result: "Marshall 'Eminem' Mathers" },
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

//convert 'MF NeTe PCBS' to 'MF-Ne/Te-PC/B(S)'
function formatType(typeArr) {
  let result =
    typeArr[0] +
    "-" +
    typeArr[1].slice(0, 2) +
    "/" +
    typeArr[1].slice(2) +
    "-" +
    typeArr[2].slice(0, 2) +
    "/" +
    typeArr[2].slice(2, 3) +
    "(" +
    typeArr[2].slice(3, 4) +
    ")";
  return result;
}

function convertRecords(records) {
  const result = new Map();
  records.forEach((record) => {
    const name = convertName(record.fields.Name);
    const opsType = record.fields["OP Type"];
    const wssType = record.fields["WSS Type"];
    const wssLink = record.fields.WSS;
    const bin = record.fields.Binyamin;
    const enfp = record.fields["ENFP Male"];
    const other = record.fields.Other;
    const tags = record.fields.Tags ? record.fields.Tags : [];
    if (tags.includes("Hide")) {
      return;
    }
    if (opsType) {
      tags.push("OPS");
    }
    if (wssType) {
      tags.push("WSS");
    }
    if (bin) {
      // tags.push("Binyamin");
    }
    if (enfp) {
      // tags.push("ENFP Male");
    }
    if (!enfp || !bin) {
      // tags.push("YouTube");
    }
    tags.push("Community Member");
    let ytLink = '';
    if (bin) {
      ytLink = bin.split('\n')[0];
    } else if (enfp) {
      ytLink = enfp.split('\n')[0];
    } else if (wssLink) {
      ytLink = wssLink.split('\n')[0];
    } else if (other) {
      ytLink = other.split('\n')[0];
    }
    result.set(name, {
      name: name,
      altName: record.fields["Alt-Name"],
      opType: opsType,
      wssType: wssType,
      binLink: bin,
      enfpLink: enfp,
      wssLink: wssLink,
      ytLink: ytLink,
      otherLinks: other,
      notes: record.fields.Notes,
      tags: tags,
      overridePicture: record.fields["Override Picture"],
      sex: record.fields.Sex ? record.fields.Sex[0] : 'Unknown',
      pictureUrl: getRecordPicture(record.fields.Picture),
      lastModified: getLastModified(record)
    });
  });
  return result;
}

function mergeMaps(nameMap, interviewMap) {
  const matches = [];
  let i = 0;
  interviewMap.forEach((val, key) => {
    let nameVal = nameMap.get(key);
    if (!nameVal && val.altName) {
      nameVal = nameMap.get(val.altName);
    }
    if (nameVal) {
      // Merge records
      nameVal.wssType = val.wssType;
      nameVal.wssLink = val.link;
      let tags = nameVal.tags ? nameVal.tags : [];
      val.tags.forEach((tag) => {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      });
      nameVal.tags = tags;
      if (val.pictureUrl && val.overridePicture) {
        nameVal.pictureUrl = val.pictureUrl;
      }
      nameVal.binLink = val.binLink;
      nameVal.enfpLink = val.enfpLink;
      nameVal.otherLinks = val.otherLinks;
      nameVal.ytLink = val.ytLink;
      nameVal.sex = nameVal.sex ? nameVal.sex : val.sex;
      nameVal.trans = nameVal.trans ? nameVal.trans : false;
      if (compareModifiedDates(nameVal.lastModified, val.lastModified) > 0) {
        nameVal.lastModified = val.lastModified;
      }
      matches.push(key);
    } else {
      // Add new record
      i++;
      let tags = val.tags;
      let type = "";
      let coreNeed = "";
      let deciderNeed = "";
      let observerNeed = "";
      let deciderLetter = "";
      let observerLetter = "";
      let infoAnimal = "";
      let energyAnimal = "";
      let animalBalance = "";
      let sensoryMod = "";
      let deMod = "";
      let mod = "";
      let s1 = "";
      let s2 = "";
      let animals = "";
      if (val.opType && val.opType.length === 12) {
        let typeArr = val.opType.split(" ");
        type = formatType(typeArr);
        coreNeed =
          typeArr[1].startsWith("N") || typeArr[1].startsWith("S")
            ? "Observer"
            : "Decider";
        deciderLetter = typeArr[1].includes("F") ? "F" : "T";
        observerLetter = typeArr[1].includes("S") ? "S" : "N";
        deciderNeed =
          typeArr[1].includes("Fe") || typeArr[1].includes("Te") ? "De" : "Di";
        observerNeed =
          typeArr[1].includes("Se") || typeArr[1].includes("Ne") ? "Oe" : "Oi";
        let animals2 = typeArr[2].substring(0, 2);
        infoAnimal = animals2.includes("B") ? "B" : "C";
        energyAnimal = animals2.includes("P") ? "P" : "S";
        animalBalance =
          typeArr[2].endsWith("P") || typeArr[2].endsWith("S")
            ? "Info"
            : "Energy";
        sensoryMod = typeArr[0].substring(0, 1);
        deMod = typeArr[0].substring(1, 2);
        mod = typeArr[0];
        s1 = typeArr[1].substring(0, 2);
        s2 = typeArr[1].substring(2, 4);
        animals = type.substring(9, 13);
      }
      nameMap.set(key, {
        name: key,
        type: type,
        s1: s1,
        s2: s2,
        mod: mod,
        animals: animals,
        coreNeed: coreNeed,
        deciderNeed: deciderNeed,
        observerNeed: observerNeed,
        deciderLetter: deciderLetter,
        observerLetter: observerLetter,
        infoAnimal: infoAnimal,
        energyAnimal: energyAnimal,
        animalBalance: animalBalance,
        sensoryMod: sensoryMod,
        deMod: deMod,
        wssType: val.wssType,
        wssLink: val.wssLink,
        pictureUrl: val.pictureUrl,
        sex: val.sex,
        trans: false,
        tags: tags,
        binLink: val.binLink,
        enfpLink: val.enfpLink,
        otherLinks: val.otherLinks,
        ytLink: val.ytLink,
        lastModified: val.lastModified
      });
    }
  });
  // console.log(matches);
  console.log("Interview Matches", matches.length, "New Records", i);
}

exports.url = url;
exports.convertRecords = convertRecords;
exports.mergeMaps = mergeMaps;