/*jshint esversion: 6 */

const { getRecordPicture, getLastModified, compareModifiedDates } = require("./airtable");

const opsKey = process.env.OP_DATABASE_KEY || require("../local-api").key;
const HOST = "https://api.airtable.com/v0/app2KuryAPU7YdO32/";
const TABLE_NAME = "OPS DB";
const VIEW = "Grid view";
const MAX_RECORD = 10000;
const fields = [
  "Name",
  "Alt-Name",
  "Type",
  "Picture",
  "Sex",
  "Tags",
  "Links",
  "Notes",
  "Class Number",
  "Class Link",
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
  // { org: "Dr. Phil", result: "Dr. Phil McGraw" },
];

function convertName(name) {
  name = name.trim();
  const slashIndex = name.indexOf("(");
  if (slashIndex > -1) {
    const beforeName = name;
    name = name.substring(0, slashIndex).trim();
    // console.log("Trimmed Name () - ", beforeName, "- to |" + name + "|");
  }
  converterList.forEach((converter) => {
    if (converter.org === name) {
      // console.log("Converting Name - ", converter.org, "- to - |" + converter.result + "|");
      name = converter.result;
    }
  });
  return name;
}

function parseLink(linkString) {
  let link = null;
  console.log(linkString);
  let leftText = linkString.indexOf('[');
  leftText = leftText > -1 ? leftText : 0;
  let rightText = linkString.indexOf(']');
  let leftHref = linkString.indexOf('(', rightText);
  let rightHref = linkString.lastIndexOf(')');
  if (rightText > -1 && leftHref > -1 && rightHref > -1) {
    link = {};
    link.text = linkString.substring(leftText, rightText);
    link.href = linkString.substring(leftHref + 1, rightHref);
  }
  return link;
}

function convertRecords(records) {
  const result = new Map();
  records.forEach((record) => {
    if (!record.fields.Name || record.fields.Name.trim().length === 0) {
      return; //skip empty names
    }
    const name = convertName(record.fields.Name);
    let tags = ["OPS"];
    (record.fields.Tags ? record.fields.Tags : []).forEach(tag => {
      if (tag === 'Class Typing') {
        tags.push('OPS Class Typing');
      } else {
        tags.push(tag);
      }
    });
    if (tags.includes('Removed')) {
      console.log(name + ' Removed'); // skipping this person since they are removed
      return;
    }
    let ytLink = '';
    if (!tags.includes('Community Member')) {
      ytLink = 'https://www.youtube.com/results?search_query='+ name + ' interview';
    }

    const links = record.fields.Links;
    const classLink = record.fields["Class Link"];
    result.set(name, {
      name: name,
      type: record.fields.Type,
      altName: record.fields["Alt-Name"],
      sex: record.fields.Sex,
      tags: tags,
      // enneaNotes: record.fields.Notes,
      opsLinks: links,
      classLink: classLink,
      ytLink: ytLink,
      pictureUrl: getRecordPicture(record.fields.Picture),
      collageUrl: getRecordPicture(record.fields.Collage),
      lastModified: getLastModified(record)
    });
  });
  return result;
}

//convert 'MF-NeTe-PCBS' to 'MF-Ne/Te-PC/B(S)'
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

function mergeMaps(nameMap, typeMap) {
  const matches = [];
  let i = 0;
  typeMap.forEach((val, key) => {
    let nameVal = nameMap.get(key);
    if (!nameVal) {
      nameVal = nameMap.get(val.altName);
    }
    if (nameVal) {
      // Merge
      // nameVal.type = formatType(val.type.split('-'));
      nameVal.tags = nameVal.tags ? nameVal.tags : [];
      val.tags.forEach(tag => {
        if (!nameVal.tags.includes(tag)) {
          nameVal.tags.push(tag);
        }
      });
      let personTags = nameVal.personTags ? nameVal.personTags : [];
      if (nameVal.tags.includes("Community Member") && !personTags.includes("Community Member")) {
        personTags.push("Community Member");
      }
      nameVal.personTags = personTags;
      if (val.pictureUrl) {
        nameVal.pictureUrl = val.pictureUrl;
      }
      nameVal.classLink = val.classLink;
      nameVal.otherLinks = val.otherLinks;
      nameVal.ytLink = val.ytLink ? val.ytLink : nameVal.ytLink;
      nameVal.sex = nameVal.sex ? nameVal.sex : val.sex;
      if (compareModifiedDates(nameVal.lastModified, val.lastModified) > 0) {
        nameVal.lastModified = val.lastModified;
      }
      matches.push(key);
    } else {
      // Add to nameMap
      i++;
      let ytLink = '';
      let personTags = [];
      if (!val.tags.includes('Community Member')) {
        ytLink = 'https://www.youtube.com/results?search_query='+ key + ' interview';
      } else {
        personTags.push("Community Member");
      }
      let opsTags = [];
      if (val.tags.includes("Speculation")) {
        opsTags.push("Speculation");
      }
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
      if (val.type && val.type.length === 12) {
        let typeArr = val.type.split("-");
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
      console.log(key, val.classLink);
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
        pictureUrl: val.pictureUrl,
        tags: val.tags, // tags for searching
        personTags: personTags,
        opsTags: opsTags, // tags which appear in popover
        classLink: val.classLink,
        ytLink: ytLink,
        sex: val.sex,
        trans: false,
        lastModified: val.lastModified
      });
    }
  });
  console.log("OPS DB Matches", matches.length, "New Persons", i);
}

exports.url = url;
exports.convertRecords = convertRecords;
exports.mergeMaps = mergeMaps;
