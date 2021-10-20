/*jshint esversion: 6 */

import { request } from "https";
const API_KEY = process.env.OP_DATABASE_KEY || require("./local-api").key;
const MAX_RECORD = 10000;
const AIRTABLE_BASE = 'https://api.airtable.com/v0/';

function buildUrl(dbKey, table, view, fields) {
  const url = new URL(AIRTABLE_BASE + dbKey + '/' + table);
  url.searchParams.append("api_key", API_KEY);
  url.searchParams.append("maxRecords", MAX_RECORD);
  url.searchParams.append("view", view);
  fields.forEach((field) => {
    url.searchParams.append("fields", field);
  });
  return url;
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
  request(
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
  ).end();
}

function getAllData(input) {
  const url = buildUrl(input.url);
  const records = [];
  const getter = (offset) => {
    // Invoke Get
    getData(url, offset, (json) => {
      // Handle Get
      const result = JSON.parse(json);
      records.push(result.records); // combine records
      const offset = result.offset;
      console.log("fetch status", input.name, records.size, offset);
      if (offset) {
        // Reinvoke Get
        getter(offset);
      } else {
        // Handle End
        input.callback(records);
      }
    });
  };
  getter();
}

const model = {
  url: url,
  callback: (records) => {
    // called after request complete
  },
};

exports.airtable = {
    buildUrl: buildUrl,
    getAll: getAllData
};