/*jshint esversion: 6 */
var assert = require("assert");
const { dbCompare } = require("../server/db-compare");

const eTypeMap = new Map();
eTypeMap.set("Mickey Rourke", {
  name: "Mickey Rourke",
  eType: "8w9",
  instinct: "so/sx",
  trifix: "863",
});
eTypeMap.set("Ridley Scott", {
  name: "Ridley Scott",
  eType: "8w9",
  instinct: "sp/sx",
  trifix: "853",
});
const scrapeData = [
  {
    name: "Mickey Rourk",
    type: "8w9",
    instinct: "so/sx",
    trifix: "863",
  },
  {
    name: "Ridley Scott",
    type: "8w9",
    instinct: "sp/so",
    trifix: "853",
  },
];

describe("DbCompare", function () {
  describe("compareEnnea()", function () {
    it("should find one type mismatch", function () {
      const result = dbCompare.compareEnnea(scrapeData, eTypeMap);
      console.log(result.typeMismatch);
      assert.equal(result.typeMismatch.length, 1, result.typeMismatch.length);
    });
    it("should find one name exclusive to db", function () {
      const result = dbCompare.compareEnnea(scrapeData, eTypeMap);
      console.log(result.exclusiveToDb);
      assert.equal(result.exclusiveToDb.length, 1, result.exclusiveToDb.length);
    });
    it("should find one name exclusive to scrape", function () {
      const result = dbCompare.compareEnnea(scrapeData, eTypeMap);
      console.log(result.exclusiveToScrape);
      assert.equal(result.exclusiveToScrape.length, 1, result.exclusiveToScrape.length);
    });
  });
});
