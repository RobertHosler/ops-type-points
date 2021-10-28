/*jshint esversion: 6 */

const { getRecordPicture } = require("./airtable");

const opsKey = process.env.OP_DATABASE_KEY || require("./local-api").key;
const HOST = "https://api.airtable.com/v0/apphGksK3AXCVIcCr/";
const TABLE_NAME = "WSS DB";
const VIEW = "Grid view";
const MAX_RECORD = 12000;
const fields = ["Name", "Type", "Picture", "Sex", "Link"];
const hideMissingPictures = true;

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
    console.log("Trimmed Name () - ", beforeName, "- to |" + name + "|");
  }
  return name;
}

function convertRecords(records) {
  const result = new Map();
  records.forEach((record) => {
    const name = convertName(record.fields.Name);
    result.set(name, {
      name: name,
      type: record.fields.Type,
      link: record.fields.Link,
      pictureUrl: getRecordPicture(record),
    });
  });
  return result;
}

function mergeMaps(nameMap, wssMap) {
  const matches = [];
  let i = 0;
  wssMap.forEach((wssVal, wssKey) => {
    const nameVal = nameMap.get(wssKey);
    if (nameVal) {
      nameVal.wssType = wssVal.type;
      nameVal.wssLink = wssVal.link;
      nameVal.tags ? nameVal.tags.push("WSS") : (nameVal.tags = ["WSS"]);
      matches.push(wssKey);
    } else {
      // Add to nameMap
      i++;
      if (!hideMissingPictures || (hideMissingPictures && wssVal.pictureUrl)) {
        nameMap.set(wssKey, {
          name: wssKey,
          wssType: wssVal.type,
          wssLink: wssVal.link,
          pictureUrl: wssVal.pictureUrl,
          sex: wssVal.sex,
        });
      }
    }
  });
  // console.log(matches);
  console.log("WSS Matches", matches.length, "New Persons", i);
}

exports.url = url;
exports.convertRecords = convertRecords;
exports.mergeMaps = mergeMaps;
