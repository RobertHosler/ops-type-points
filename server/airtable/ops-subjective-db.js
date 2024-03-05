/*jshint esversion: 6 */

const { getRecordPicture, compareModifiedDates, getLastModified, buildKey } = require("./airtable");

const HOST = "https://api.airtable.com/v0/appg1oZhulu8BvATT/";
const TABLE_NAME = "OPS";
const VIEW = "Grid view";
const MAX_RECORD = 12000;
const fields = [
  "Name",
  "Alt-Name",
  "MBTI",
  "OP Type",
  "Picture",
  "Sex",
  "Links",
  "Notes",
  "Tags",
  "Complete",
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
  // { org: "Dwayne Johnson", result: "Dwayne 'The Rock' Johnson" },
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
    if (!record.fields.Complete) {
      return;
    }
    const opsType = record.fields["OP Type"];
    const tags = record.fields.Tags ? record.fields.Tags : [];
    if (opsType) {
      tags.push("OPS");
    }
    tags.push("Subjective");
    result.set(buildKey(name), {
      name: name,
      altName: record.fields["Alt-Name"],
      opType: opsType,
      links: record.fields.Links ? record.fields.Links : [],
      notes: record.fields.Notes,
      tags: tags,
      sex: record.fields.Sex ? record.fields.Sex[0] : 'Unknown',
      pictureUrl: getRecordPicture(record.fields.Picture),
      lastModified: getLastModified(record),
      created: record.fields['Created Date']
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
    if (nameVal && nameVal.type) {
      return; // don't override an existing OP Type
    } else {
      // create new record / OPS Type
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
          typeArr[1].startsWith("N") || typeArr[1].startsWith("S") ?
            "Observer" : "Decider";
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
          typeArr[2].endsWith("P") || typeArr[2].endsWith("S") ?
            "Info" : "Energy";
        sensoryMod = typeArr[0].substring(0, 1);
        deMod = typeArr[0].substring(1, 2);
        mod = typeArr[0];
        s1 = typeArr[1].substring(0, 2);
        s2 = typeArr[1].substring(2, 4);
        animals = type.substring(9, 13);
      }
      let ytLink = 'https://www.youtube.com/results?search_query='+ key + ' interview';

      if (nameVal) {
        // Merge records
        let tags = nameVal.tags ? nameVal.tags : [];
        let opsTags = nameVal.opsTags ? nameVal.opsTags : [];
        val.tags.forEach((tag) => {
          if (!tags.includes(tag)) {
            tags.push(tag);
          }
          if (!opsTags.includes(tag)) {
            opsTags.push(tag);
          }
        });
        nameVal.tags = tags;
        nameVal.opsTags = opsTags;
        let personTags = nameVal.personTags ? nameVal.personTags : [];
        if (tags.includes("Community Member") && !personTags.includes("Community Member")) {
          personTags.push("Community Member");
        }
        nameVal.personTags = personTags;
        if (val.pictureUrl && val.overridePicture) {
          nameVal.pictureUrl = val.pictureUrl;
        }
        let links = nameVal.otherLinks ? nameVal.otherLinks : [];
        val.links.forEach((link) => {
          if (!links.includes(link)) {
            links.push(link);
          }
        });
        nameVal.otherLinks = links;
        nameVal.sex = nameVal.sex ? nameVal.sex : val.sex;
        nameVal.trans = nameVal.trans ? nameVal.trans : false;
        if (compareModifiedDates(nameVal.lastModified, val.lastModified) > 0) {
          nameVal.lastModified = val.lastModified;
        }
        if (compareModifiedDates(nameVal.created, val.created) > 0) {
          nameVal.created = val.created;
        }

        nameVal.type = type;
        nameVal.s1 = s1;
        nameVal.s2 = s2;
        nameVal.mod = mod;
        nameVal.animals = animals;
        nameVal.coreNeed = coreNeed;
        nameVal.deciderNeed = deciderNeed;
        nameVal.observerNeed = observerNeed;
        nameVal.deciderLetter = deciderLetter;
        nameVal.observerLetter = observerLetter;
        nameVal.infoAnimal = infoAnimal;
        nameVal.energyAnimal = energyAnimal;
        nameVal.animalBalance = animalBalance;
        nameVal.sensoryMod = sensoryMod;
        nameVal.deMod = deMod;

        matches.push(key);
      } else {
        // create new nameVal
        let personTags = [];
        if (tags.includes("Community Member")) {
          personTags.push("Community Member");
        }
        nameMap.set(key, {
          name: val.name,
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
          sex: val.sex,
          trans: false,
          tags: tags,
          opsTags: tags,
          personTags: personTags,
          otherLinks: val.links,
          ytLink: ytLink,
          lastModified: val.lastModified,
          created: val.created
        });
      }
    }
  });
  // console.log(matches);
  console.log("Subjective Matches", matches.length, "New Records", i);
}

exports.url = url;
exports.convertRecords = convertRecords;
exports.mergeMaps = mergeMaps;
