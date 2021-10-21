/*jshint esversion: 6 */

const https = require("https");
const API_KEY = process.env.OP_DATABASE_KEY || require("./local-api").key;
const MAX_RECORD = 10000;
const AIRTABLE_BASE = "https://api.airtable.com/v0/";

function buildUrl(dbKey, table, view, fields) {
  const url = new URL(AIRTABLE_BASE + dbKey + "/" + table);
  url.searchParams.append("api_key", API_KEY);
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
function getDataSafe(input, offset, callback) {
  requests++;
  if (requests < 5) {
    // console.log("safe request", input.name, requests);
    getData(input.url, offset, callback);
    setTimeout(() => {
      requests--;
    //   console.log("safe request", input.name, "COMPLETE", requests);
      if (requests === 0) {
          console.log("safe requests queue empty");
      }
    }, 1000);
  } else {
    // console.log("safety pause", input.name, requests);
    setTimeout(() => {
      requests--;
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
function getData(url, offset, callback) {
  let host = url.host;
  let path = url.pathname + url.search + (offset ? "&offset=" + offset : "");
  // console.log(host, path);
  https
    .request(
      {
        hostname: host,
        path: path,
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
        });
      }
    )
    .end();
}

function getAllData(input) {
  console.log("getAllData", input.name);
  const myPromise = new Promise((resolve, reject) => {
    const allRecords = [];
    const getter = (offset) => {
      // Invoke Get
      getDataSafe(input, offset, (json) => {
        // Handle Get
        const result = JSON.parse(json);
        const records = result.records ? result.records : [];
        records.forEach((record) => {
          allRecords.push(record); // combine records
        });
        const offset = result.offset;
        if (offset) {
          // Reinvoke Get
          // console.log("getAllData", input.name, allRecords.length);
          getter(offset);
        } else {
          // Handle End
          console.log("getAllData", input.name, allRecords.length, "COMPLETE");
          resolve(allRecords);
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