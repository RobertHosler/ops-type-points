/*jshint esversion: 6 */

const { getRecordPicture, compareModifiedDates, getLastModified, buildKey } = require("./airtable");

const HOST = "https://api.airtable.com/v0/appcD3UjS4Do1PHEd/";
const TABLE_NAME = "Interviews";
const VIEW = "Grid view";
const MAX_RECORD = 12000;
const fields = [
  "Name",
  "Alt-Name",
  "OP Type",
  "Social Type",
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
  "Not Community",
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
    if (!record.fields.Name) {
      return;
    }
    const name = convertName(record.fields.Name);
    const opsType = record.fields["OP Type"];
    const socialType = record.fields["Social Type"];
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
    let ytLink = '';
    if (!record.fields["Not Community"]) {
      tags.push("Community Member");
    } else {
      ytLink = 'https://www.youtube.com/results?search_query='+ name + ' interview';
    }
    if (bin) {
      ytLink = bin.split('\n')[0];
    } else if (enfp) {
      ytLink = enfp.split('\n')[0];
    } else if (wssLink) {
      ytLink = wssLink.split('\n')[0];
    } else if (other) {
      ytLink = other.split('\n')[0];
    }
    result.set(buildKey(name), {
      name: name,
      altName: record.fields["Alt-Name"],
      opType: opsType,
      socialType: socialType,
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
      lastModified: getLastModified(record),
      created: record.fields['Created Date']
    });
  });
  return result;
}

function addTypeToPerson(person, newType) {
  if (newType && newType.length === 12) {
    let typeArr = newType.split(" ");
    type = formatType(typeArr);
    person.coreNeed = typeArr[1].startsWith("N") || typeArr[1].startsWith("S") ? "Observer" : "Decider";
    person.deciderLetter = typeArr[1].includes("F") ? "F" : "T";
    person.observerLetter = typeArr[1].includes("S") ? "S" : "N";
    person.deciderNeed = typeArr[1].includes("Fe") || typeArr[1].includes("Te") ? "De" : "Di";
    person.observerNeed = typeArr[1].includes("Se") || typeArr[1].includes("Ne") ? "Oe" : "Oi";
    let animals2 = typeArr[2].substring(0, 2);
    person.infoAnimal = animals2.includes("B") ? "B" : "C";
    person.energyAnimal = animals2.includes("P") ? "P" : "S";
    person.animalBalance = typeArr[2].endsWith("P") || typeArr[2].endsWith("S") ? "Info" : "Energy";
    person.sensoryMod = typeArr[0].substring(0, 1);
    person.deMod = typeArr[0].substring(1, 2);
    person.mod = typeArr[0];
    person.s1 = typeArr[1].substring(0, 2);
    person.s2 = typeArr[1].substring(2, 4);
    person.animals = type.substring(9, 13);
    person.type = type;
  } else {
    person.type = newType;
  }
}

function mergeMaps(nameMap, interviewMap) {
  const matches = [];
  let i = 0;
  interviewMap.forEach((val, key) => {
    let nameVal = nameMap.get(key);
    if (!nameVal && val.altName) {
      let altKey = buildKey(val.altName);
      nameVal = nameMap.get(altKey);
    }
    if (nameVal) {
      // Merge records
      nameVal.wssType = val.wssType;
      nameVal.socialType = nameVal.socialType ? nameVal.socialType : val.socialType;
      nameVal.wssLink = val.link;
      let tags = nameVal.tags ? nameVal.tags : [];
      val.tags.forEach((tag) => {
        if (!tags.includes(tag)) {
          tags.push(tag);
        }
      });
      const override = tags.includes('Override');
      if (override) {
        const index = tags.indexOf('Override');
        tags.splice(index, 1);
        // Overriding type source
        addTypeToPerson(nameVal, val.opType);
      }
      nameVal.tags = tags;
      let personTags = nameVal.personTags ? nameVal.personTags : [];
      if (tags.includes("Community Member") && !personTags.includes("Community Member")) {
        personTags.push("Community Member");
      }
      nameVal.personTags = personTags;
      let opsTags = nameVal.opsTags ? nameVal.opsTags : [];
      if (tags.includes("Speculation") && !opsTags.includes("Speculation")) {
        opsTags.push("Speculation");
      }
      nameVal.opsTags = opsTags;
      if (val.overridePicture) {
        nameVal.pictureUrl = val.pictureUrl;
      }
      nameVal.binLink = val.binLink;
      nameVal.enfpLink = val.enfpLink;
      nameVal.otherLinks = val.otherLinks;
      nameVal.ytLink = val.ytLink ? val.ytLink : nameVal.ytLink;
      nameVal.sex = nameVal.sex ? nameVal.sex : val.sex;
      nameVal.trans = nameVal.trans ? nameVal.trans : false;
      if (compareModifiedDates(nameVal.lastModified, val.lastModified) > 0) {
        nameVal.lastModified = val.lastModified;
      }
      if (compareModifiedDates(nameVal.created, val.created) > 0) {
        nameVal.created = val.created;
      }
      matches.push(key);
    } else {
      // Add new record
      i++;
      let tags = val.tags;
      let opsTags = [];
      let personTags = [];
      if (tags.includes('Community Member')) {
        personTags.push("Community Member");
      }
      if (tags.includes("Speculation")) {
        opsTags.push("Speculation");
      }
      let newPerson = {
        name: val.name,
        type: val.opType,
        socialType: val.socialType,
        pictureUrl: val.pictureUrl,
        wssType: val.wssType,
        wssLink: val.wssLink,
        sex: val.sex,
        trans: false,
        tags: tags,
        personTags: personTags,
        binLink: val.binLink,
        enfpLink: val.enfpLink,
        otherLinks: val.otherLinks,
        ytLink: val.ytLink,
        lastModified: val.lastModified,
        created: val.created
      };
      addTypeToPerson(newPerson, val.opType);
      nameMap.set(key, newPerson);
    }
  });
  // console.log(matches);
  console.log("Interview Matches", matches.length, "New Records", i);
}

exports.url = url;
exports.convertRecords = convertRecords;
exports.mergeMaps = mergeMaps;
