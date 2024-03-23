/*jshint esversion: 6 */

// const https = require("https");
const request = require("request-promise");
const cheerio = require("cheerio");
const databaseUrl = new URL("https://www.attitudinalpsyche.com/theory/database/");

const urlOptions = {
  uri: databaseUrl,
  headers: {
    "User-Agent": "request",
  },
};

function scrapeAP() {
  const timerName = "scrape ap-db";
  console.time(timerName);
  return new Promise((resolve, reject) => {
    console.log("requesting...", databaseUrl.toString());
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

const logNames = ["Chris Martin", "Brit Marling"];

function buildData($) {
  const results = [];
  let i = 1;
  const dataRow = $("table tbody tr td");
  let name;
  let apCore;
  let apSubtype;
  let instinct;
  let trifix;
  const numberOfColumns = 5;
  dataRow.each((x, data) => {
    const colText = $(data).text();
    if (x % numberOfColumns === 0) {
      name = convertName(colText);
    } else if (x % numberOfColumns === 1) {
      apCore = colText.toLowerCase().trim();
    } else if (x % numberOfColumns === 2) {
      apSubtype = colText.trim();
    } else if (x % numberOfColumns === 3) {
      instinct = colText.trim();
    } else if (x % numberOfColumns === 4) {
      trifix = colText;
      const result = {
        name: name,
        apCore: apCore,
        apSubtype: apSubtype,
        instinct: instinct,
        trifix: trifix,
      };
      if (logNames.includes(name)) {
        // console.log(result);
      }
      results.push(result);
    }
  });

  ['FVLE', 'FLVE', 'EVLF', 'ELVF', 
  'LVFE', 'LFVE', 'EVFL', 'EFVL', 
  'VLFE', 'VFLE', 'ELFV', 'EFLV', 
  'VFEL', 'VEFL', 'LFEV', 'LEFV',
  'VLEF', 'VELF', 'FLEV', 'FELV',
  'LVEF', 'LEVF', 'FVEL', 'FEVL'].forEach(type => {
    addSoft($, results, type);
  });

  return results;
}

function addSoft($, results, apType) {
  let softTypings = $("strong:contains('" + apType + "')").parent().text();
  softTypings = softTypings.substring(5).trim().split(',');
  // console.log('SoftTyping - ', softTypings);
  softTypings.forEach(s => {
    const name = s.trim();
    const result = {
      name: name,
      apCore: apType
    };
    results.push(result);
  });
}

function convertName(name) {
  name = name.trim();
  const dashIndex = name.indexOf("–");
  if (dashIndex > -1) {
    // const beforeName = name;
    name = name.substring(0, dashIndex).trim();
    // console.log("Trimmed |", beforeName, "| to |" + name + "|");
  }
  return name;
}

exports.scrapeAP = scrapeAP;
