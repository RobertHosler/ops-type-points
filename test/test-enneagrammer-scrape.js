/*jshint esversion: 6 */

var assert = require("assert");
const { scrape } = require("../server/enneagrammer-scrape");

describe("Enneagrammer Scrape", function () {
  describe("scrape()", function () {
    it("should log the scrape data", function () {
      scrape().then((result) => {
        console.log(result.length, result[result.length-1]);
        assert.equal(!!result, true);
      });
    });
  });
});
