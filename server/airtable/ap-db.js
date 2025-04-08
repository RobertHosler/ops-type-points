/*jshint esversion: 6 */

const logger = require("../logger")
const { getRecordPicture, getLastModified, compareModifiedDates, buildKey, MAX_RECORD } = require("./airtable");

const HOST = "https://api.airtable.com/v0/appS1nbL2o9NAoOpQ/";
const TABLE_NAME = "AP DB";
const VIEW = "Grid view - hide spec";
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
      if (tag === 'Speculative') {
        tags.push('Soft');
      } else if (tag === 'Class Typing') {
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
    result.set(buildKey(name), {
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

function mergeMaps(nameMap, apTypeMap) {
  const matches = [];
  let i = 0;
  apTypeMap.forEach((val, key) => {
    let nameVal = nameMap.get(key);
    if (!nameVal) {
      nameVal = nameMap.get(val.altName);
    }
    if (nameVal) {
      // Merge
      nameVal.apEpisode = val.episode;
      nameVal.apType = val.apType; // FVLE
      nameVal.apSubtype = val.apSubtype; // 0202
      nameVal.tags = nameVal.tags ? nameVal.tags : [];
      val.tags.forEach(tag => {
        if (!nameVal.tags.includes(tag)) {
          nameVal.tags.push(tag);
        }
      });
      nameVal.apTags = nameVal.apTags ? nameVal.apTags : [];
      if (val.tags.includes("Soft")) {
        nameVal.apTags.push("Soft");
      }
      let personTags = nameVal.personTags ? nameVal.personTags : [];
      if (nameVal.tags.includes("Community Member") && !personTags.includes("Community Member")) {
        personTags.push("Community Member");
      }
      nameVal.personTags = personTags;
      if (val.pictureUrl) {
        nameVal.pictureUrl = val.pictureUrl;
      }
      nameVal.apLink = val.apLink;
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
        ytLink = 'https://www.youtube.com/results?search_query=' + key + ' interview';
      } else {
        personTags.push("Community Member");
      }
      let apTags = [];
      if (val.tags.includes("Soft")) {
        apTags.push("Soft");
      }
      nameMap.set(key, {
        name: val.name,
        apEpisode: val.episode,
        apType: val.apType,
        apSubtype: val.apSubtype,
        pictureUrl: val.pictureUrl,
        tags: val.tags,
        personTags: personTags,
        apTags: apTags,
        apLink: val.apLink,
        ytLink: ytLink,
        sex: val.sex,
        trans: false,
        lastModified: val.lastModified,
        created: val.created
      });
    }
  });
  logger.trace("AP Matches", matches.length, "New Persons", i);
}

exports.url = url;
exports.convertRecords = convertRecords;
exports.mergeMaps = mergeMaps;
exports.enneaConvertName = convertName;
