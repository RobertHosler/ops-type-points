/*jshint esversion: 6 */

const { getRecordPicture, getLastModified, compareModifiedDates, buildKey } = require("./airtable");

const HOST = "https://api.airtable.com/v0/app2KuryAPU7YdO32/";
const TABLE_NAME = "OPS DB";
const VIEW = "Grid view";
const MAX_RECORD = 10000;
const fields = [
  "Name",
  "Alt-Name",
  "Type",
  "Social Type",
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
url.searchParams.append("maxRecords", MAX_RECORD);
fields.forEach((field) => {
  url.searchParams.append("fields", field);
});

function convertName(name) {
  name = name.trim();
  const slashIndex = name.indexOf("(");
  if (slashIndex > -1) {
    const beforeName = name;
    name = name.substring(0, slashIndex).trim();
    // console.log("Trimmed Name () - ", beforeName, "- to |" + name + "|");
  }
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
      ytLink = 'https://www.youtube.com/results?search_query=' + name + ' interview';
    }

    const links = record.fields.Links;
    const classLink = record.fields["Class Link"];
    result.set(buildKey(name), {
      name: name,
      type: record.fields.Type,
      socialType: record.fields["Social Type"],
      altName: record.fields["Alt-Name"],
      sex: record.fields.Sex,
      tags: tags,
      opsLinks: links,
      classLink: classLink,
      opsClassNumber: record.fields["Class Number"],
      ytLink: ytLink,
      pictureUrl: getRecordPicture(record.fields.Picture),
      collageUrl: getRecordPicture(record.fields.Collage),
      lastModified: getLastModified(record),
      created: record.fields['Created Date']
    });
  });
  return result;
}

function addTypeToPerson(person, newType) {
  if (newType && newType.length === 12) {
    let typeArr = newType.split(/[\s-]/); // split on spaces and dashes
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

function mergeMaps(nameMap, newMap) {
  const matches = [];
  let i = 0;
  newMap.forEach((val, key) => {
    let nameVal = nameMap.get(key);
    if (!nameVal) {
      // look for altName as well
      let altKey = buildKey(val.altName);
      nameVal = nameMap.get(altKey);
    }
    if (nameVal) {
      // Merge
      if (nameVal.name !== val.name) {
        const oldName = nameVal.name;
        const newName = val.name;
        nameVal.name = newName; // replace name
        console.log('Replaced name', oldName, newName);
      }
      const override = val.tags && val.tags.includes('Override');
      if (override) {
        const index = val.tags.indexOf('Override');
        val.tags.splice(index, 1);
      }
      const incomplete = nameVal.tags && nameVal.tags.includes('Incomplete');
      if (val.type && !nameVal.type || (incomplete || override)) {
        // Override the nameVal type if its marked as incomplete
        addTypeToPerson(nameVal, val.type);
        // console.log(key, nameVal.type, nameVal.tags);
        if (incomplete) {
          // remove incomplete tag - it might be added back
          let tags = nameVal.tags;
          const index = tags.indexOf('Incomplete');
          tags.splice(index, 1);
          nameVal.tags = tags;
        }
      }
      nameVal.socialType = nameVal.socialType ? nameVal.socialType : val.socialType;
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
      if (val.classLink) {
        nameVal.classLink = val.classLink;
      }
      nameVal.opsClassNumber = val.opsClassNumber;
      nameVal.otherLinks = val.otherLinks;
      nameVal.ytLink = val.ytLink ? val.ytLink : nameVal.ytLink;
      nameVal.sex = val.sex ? val.sex : nameVal.sex;
      if (compareModifiedDates(nameVal.lastModified, val.lastModified) > 0) {
        nameVal.lastModified = val.lastModified;
      }
      if (compareModifiedDates(nameVal.created, val.created) > 0) {
        nameVal.created = val.created;
      }
      matches.push(key);
    } else {
      // Add to nameMap
      i++;
      let ytLink = '';
      let personTags = [];
      if (!val.tags.includes('Community Member')) {
        ytLink = 'https://www.youtube.com/results?search_query=' + val.name + ' interview';
      } else {
        personTags.push("Community Member");
      }
      let opsTags = [];
      if (val.tags.includes("Speculation")) {
        opsTags.push("Speculation");
      }
      let newPerson = {
        name: val.name,
        type: val.type,
        socialType: val.socialType,
        pictureUrl: val.pictureUrl,
        tags: val.tags, // tags for searching
        personTags: personTags,
        opsTags: opsTags, // tags which appear in popover
        classLink: val.classLink,
        opsClassNumber: val.opsClassNumber,
        ytLink: ytLink,
        sex: val.sex,
        trans: false,
        lastModified: val.lastModified,
        created: val.created
      };
      addTypeToPerson(newPerson, val.type);
      nameMap.set(key, newPerson);
    }
  });
  console.log("OPS DB Matches", matches.length, "New Persons", i);
}

exports.url = url;
exports.convertRecords = convertRecords;
exports.mergeMaps = mergeMaps;
