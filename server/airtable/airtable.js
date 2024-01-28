/*jshint esversion: 6 */

const https = require("https");
const logger = require("../logger")
const API_TOKEN = process.env.OP_DATABASE_TOKEN || require("../local-api").token;
const MAX_RECORD = 10000;
const AIRTABLE_BASE = "https://api.airtable.com/v0/";

function buildUrl(dbKey, table, view, fields) {
  const url = new URL(AIRTABLE_BASE + dbKey + "/" + table);
  url.searchParams.append("maxRecords", MAX_RECORD);
  url.searchParams.append("view", view);
  fields.forEach((field) => {
    url.searchParams.append("fields", field);
  });
  return url;
}

/**
 * Wrap getData call to ensure we aren't calling it too often.
 */
let requests = 0;
let totalRequests = 0;
const maxRequests = 5; // max per second
function getDataSafe(input, offset, callback) {
  if (requests < maxRequests) {
    logger.trace("safe request", input.name, requests);
    getData(input, offset, callback);
  } else {
    logger.trace("safety pause", input.name, requests);
    setTimeout(() => {
      getDataSafe(input, offset, callback);
    }, 200);
  }
}

/**
 * Retrieve data from the provided airtable url
 *
 * @param {*} url
 * @param {*} callback
 * @param {*} offset
 */
function getData(input, offset, callback) {
  requests++;
  let host = input.url.host;
  let path = input.url.pathname + input.url.search + (offset ? "&offset=" + offset : "");
  const timerName = input.name + "|" + offset;
  console.time(timerName);
  logger.trace(host, path);
  const req = https
    .request(
      {
        hostname: host,
        path: path,
        headers: {
          Authorization: ('Bearer ' + API_TOKEN)            
        }
      },
      (response) => {
        var str = "";

        //another chunk of data has been received, so append it to `str`
        response.on("data", (chunk) => {
          str += chunk;
        });

        //the whole response has been received, so we just print it out here
        response.on("end", () => {
          callback(str);
          console.timeEnd(timerName);
          totalRequests++;
          console.log("Total Requests", totalRequests)
          setTimeout(() => {
            requests--;
            logger.trace("safe request", input.name, "COMPLETE", requests);
            if (requests === 0) {
            logger.trace("safe requests queue empty");
            }
          }, 1000);
        });
      }
    );
  req.on("error", (e) => {
    console.error("HttpRequest -", input.name, e);
    callback();
  });
  req.end();
}

/**
 * Creates a promise which resolves once all datasets have been retrieved.
 */
function getAllData(input) {
  logger.debug("getAllData", input.name);
  const myPromise = new Promise((resolve, reject) => {
    const allRecords = [];
    const getter = (offset) => {
      // Invoke Get
      getDataSafe(input, offset, (json) => {
        // Handle Get
        if (!json) {
          const reason = "data unavailable -" + input.name;
          console.error(reason);
          reject(reason);
        } else {
          logger.debug("data available -", input.name);
          const result = JSON.parse(json);
          const records = result.records ? result.records : [];
          records.forEach((record) => {
            allRecords.push(record); // combine records
          });
          const offset = result.offset;
          if (offset) {
            // Reinvoke Get
            logger.trace("getAllData", input.name, allRecords.length);
            getter(offset);
          } else {
            // Handle End
            logger.debug("getAllData", input.name, allRecords.length, "COMPLETE");
            resolve(allRecords);
          }          
        }
      });
    };
    getter();
  });
  return myPromise;
}

// Example input for getAll
const modelInput = {
  name: "modelName",
  url: new URL("https://api.airtable.com/"),
};

exports.getAll = getAllData;
exports.buildUrl = buildUrl;

exports.getRecordPicture = (pictureField) => {
  if( pictureField && pictureField.length > 0) {
    if (pictureField[0].thumbnails) {
      return pictureField[0].thumbnails.large.url;
    } else if (pictureField[0].url) {
      return pictureField[0].url; // backup method for some data which doesn't have thumbnails?
    }
  }
  return '';
};

exports.compareModifiedDates = (a, b) => {
  if (!a && !b) {
    return 0;
  }
  if (a && !b) {
    return 1;
  }
  if (b && !a) {
    return -1;
  }
  return Date.parse(b) - Date.parse(a);
};

exports.getLastModified = (record) => {
  let lastModified = record.fields["Last Modified"];
  if (!lastModified) {
    lastModified = record.fields["Created Date"];
  }
  return lastModified;
}
