/*jshint esversion: 6 */

// const https = require("https");
const request = require("request-promise");
const cheerio = require("cheerio");
const logger = require("./logger");
const databaseUrl = new URL("https://www.attitudinalpsyche.com/database/");

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
        logger.debug("scrape ap-db - nice, we did it");
        const $ = cheerio.load(html);
        const data = buildData($);
        resolve(data);
        //custom-table-block custom-table-block-bordered custom-table-block-1 custom-table-inited
      } else {
        logger.error("scrape ap-db - darn, it broke", error, response.statusCode);
        reject([]);
      }
    });
  });
}

const logNames = ["Condoleezza Rice", "Chris Martin"];

function buildData($) {
  const results = [];
  const dataColumns = $("table tbody tr td"); // select all data columns
  let episode;
  let episodeCol = 0;
  let name;
  let nameCol = 1;
  let apCore;
  let apCoreCol = 2;
  let apSubtype;
  let apSubtypeCol = 3;
  const numberOfColumns = 13;
  dataColumns.each((x, data) => { // for each column in the table
    const colText = $(data).text();
    if (x % numberOfColumns === episodeCol) {
      episode = colText; //.trim();
    } else if (x % numberOfColumns === nameCol) {
      name = convertName(colText);
    } else if (x % numberOfColumns === apCoreCol) {
      apCore = colText.toUpperCase().trim();
    } else if (x % numberOfColumns === apSubtypeCol) {
      apSubtype = colText.trim();
      const result = {
        episode: episode,
        name: name,
        apType: apCore,
        apSubtype: apSubtype
      };
      if (logNames.includes(name)) {
        logger.debug(result);
      }
      if (apCore) {
        results.push(result);
      }
    }
  });

  // ['FVLE', 'FLVE', 'EVLF', 'ELVF',
  //   'LVFE', 'LFVE', 'EVFL', 'EFVL',
  //   'VLFE', 'VFLE', 'ELFV', 'EFLV',
  //   'VFEL', 'VEFL', 'LFEV', 'LEFV',
  //   'VLEF', 'VELF', 'FLEV', 'FELV',
  //   'LVEF', 'LEVF', 'FVEL', 'FEVL'].forEach(type => {
  //     addSoft($, results, type);
  //   });

  logger.info("Ap Scrape - " + results.length);
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
