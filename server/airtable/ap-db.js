/*jshint esversion: 6 */

const logger = require("../logger")
const { getRecordPicture, getLastModified, compareModifiedDates } = require("./airtable");

const HOST = "https://api.airtable.com/v0/appS1nbL2o9NAoOpQ/";
const TABLE_NAME = "AP DB";
const VIEW = "Grid view";
const MAX_RECORD = 10000;
const fields = [
  "Name",
  "Alt-Name",
  "AP Core",
  "AP Subtype",
  "Links",
  "Sex",
  "Tags",
  "Picture",
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
    logger.debug("Trimmed Name () - ", beforeName, "- to |" + name + "|");
  }
  return name;
}

function convertRecords(records) {
  const result = new Map();
  records.forEach((record) => {
    // TODO: put in map
    if (!record.fields.Name || record.fields.Name.trim().length === 0) {
      return; //skip empty names
    }
    const name = convertName(record.fields.Name);
    let tags = ["AP"];
    (record.fields.Tags ? record.fields.Tags : []).forEach(tag => {
      if (tag === 'Class Typing') {
        tags.push('AP Class Typing');
      } else {
        tags.push(tag);
      }
    });
    if (tags.includes('Removed')) {
      logger.debug(name + ' Removed');
      return;
    }
    let classLink = record.fields.Links;
    result.set(name, {
      name: name,
      altName: record.fields["Alt-Name"],
      apType: record.fields["AP Core"],
      apSubtype: record.fields["AP Subtype"],
      sex: record.fields.Sex,
      tags: tags,
      apLink: classLink,
      pictureUrl: getRecordPicture(record.fields.Picture),
      lastModified: getLastModified(record),
      created: record.fields['Created Date']
    });
  });
  return result;
}

function mergeMaps(nameMap, eTypeMap) {
  const matches = [];
  let i = 0;
  eTypeMap.forEach((eVal, eKey) => {
    let nameVal = nameMap.get(eKey);
    if (!nameVal) {
      nameVal = nameMap.get(eVal.altName);
    }
    if (nameVal) {
      // Merge
      nameVal.apType = eVal.apType; // FVLE
      nameVal.apSubtype = eVal.apSubtype; // 0202
      nameVal.tags = nameVal.tags ? nameVal.tags : [];
      eVal.tags.forEach(tag => {
        if (!nameVal.tags.includes(tag)) {
          nameVal.tags.push(tag);
        }
      });
      nameVal.enneaTags = nameVal.enneaTags ? nameVal.enneaTags : [];
      if (eVal.tags.includes("Speculation")) {
        nameVal.enneaTags.push("Speculation");
      }
      let personTags = nameVal.personTags ? nameVal.personTags : [];
      if (nameVal.tags.includes("Community Member") && !personTags.includes("Community Member")) {
        personTags.push("Community Member");
      }
      nameVal.personTags = personTags;
      if (eVal.pictureUrl) {
        nameVal.pictureUrl = eVal.pictureUrl;
      }
      nameVal.apLink = eVal.apLink;
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
      let ytLink = '';
      let personTags = [];
      if (!eVal.tags.includes('Community Member')) {
        ytLink = 'https://www.youtube.com/results?search_query='+ eKey + ' interview';
      } else {
        personTags.push("Community Member");
      }
      let apTags = [];
      if (eVal.tags.includes("Speculation")) {
        apTags.push("Speculation");
      }
      nameMap.set(eKey, {
        name: eKey,
        apType: eVal.apType,
        apSubtype: eVal.apSubtype,
        pictureUrl: eVal.pictureUrl,
        tags: eVal.tags,
        personTags: personTags,
        apTags: apTags,
        apLink: eVal.apLink,
        ytLink: ytLink,
        sex: eVal.sex,
        trans: false,
        lastModified: eVal.lastModified,
        created: eVal.created
      });
    }
  });
  logger.trace("AP Matches", matches.length, "New Persons", i);
}

exports.url = url;
exports.convertRecords = convertRecords;
exports.mergeMaps = mergeMaps;
exports.enneaConvertName = convertName;
