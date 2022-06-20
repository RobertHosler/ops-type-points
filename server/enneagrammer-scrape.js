/*jshint esversion: 6 */

// const https = require("https");
const request = require("request-promise");
const cheerio = require("cheerio");
const { enneaConvertName } = require("./airtable/enneagrammer-db");
const dbUrl = new URL("https://www.enneagrammer.com/database-list");
const googleDocUrl = new URL(
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vT9zrP0r8ehO-tg8vfZhU9G-KRYmrh1F08gctGE87-4gT7wE5q30YUoL2Cgq-Kpg-2agqsHjtbfLDTP/pubhtml"
);

const urlOptions = {
  uri: googleDocUrl,
  headers: {
    "User-Agent": "request",
  },
};

function scrape() {
  const timerName = "scrape [mer]-db";
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
  const numberOfColumns = 5;
  dataRow.each((x, data) => {
    const colText = $(data).text();
    if (x % numberOfColumns === 0) {
      name = enneaConvertName(colText);
    } else if (x % numberOfColumns === 1) {
      instinct = colText.toLowerCase().trim();
    } else if (x % numberOfColumns === 2) {
      type = colText.trim();
    } else if (x % numberOfColumns === 3) {
      trifix = colText;
      if (trifix) {
        trifix = trifix.replace(/[^0-9\(\)]/g, '');
      }
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
