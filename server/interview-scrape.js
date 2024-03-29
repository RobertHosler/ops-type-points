/*jshint esversion: 6 */

// const https = require("https");
const request = require("request-promise");
const cheerio = require("cheerio");
const { enneaConvertName } = require("./enneagrammer-db");
const dbUrl = new URL("https://www.enneagrammer.com/database-list");
const googleDocUrl = new URL(
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTds56tuzP-iSCVWnQ_hi3MqLVTZ8ObYHNYABKQFLOP7_E79K0uGAaeyQxT5pbW01jzfnqXt5eQOr2U/pubhtml"
);

const urlOptions = {
  uri: googleDocUrl,
  headers: {
    "User-Agent": "request",
  },
};

function scrape() {
  const timerName = "scrape interviews-db";
  console.time(timerName);
  return new Promise((resolve, reject) => {
    console.log("requesting...", dbUrl.toString());
    request(urlOptions, (error, response, html) => {
      if (!error && response.statusCode == 200) {
        console.log("nice, we did it");
        const $ = cheerio.load(html);
        const data = buildData($);
        resolve(data);
        //custom-table-block custom-table-block-bordered custom-table-block-1 custom-table-inited
      } else {
        console.log("darn, it broke", error, response.statusCode);
        reject([]);
      }
    });
  });
}

const logNames = ["Billy Graham", "Vincent Cassel"];

function buildData($) {
  const results = [];
  let i = 1;
  const dataRow = $("table tbody tr td"); //[i].children;
  let name;
  let instinct;
  let type;
  let trifix;
  dataRow.each((x, data) => {
    const colText = $(data).text();
    if (x % 4 === 0) {
      name = enneaConvertName(colText);
    } else if (x % 4 === 1) {
      instinct = colText.toLowerCase().trim();
    } else if (x % 4 === 2) {
      type = colText.trim();
    } else if (x % 4 === 3) {
      trifix = colText;
      if (logNames.includes(name)) {
        console.log(name, instinct, type, trifix);
      }
      const result = {
        name: name,
        instinct: instinct,
        type: type,
        trifix: trifix,
      };
      if (x > 4) {
        results.push(result);
      }
    }
  });
  return results;
}

exports.scrape = scrape;
