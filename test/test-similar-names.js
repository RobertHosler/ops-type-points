/*jshint esversion: 6 */

var assert = require("assert");
const { cleanName, findSimilar } = require("../server/similar-names");

describe("SimilarNames", function () {
  describe("cleanName", function () {
    it("should remove mr, dr, ms, miss, mrs", function () {
      assert.equal(cleanName("Mr. Rogers"), "rogers");
      assert.equal(cleanName("Dr. Phil"), "phil");
      assert.equal(cleanName("Ms. Dynamite"), "dynamite");
    });
  });
  describe("cleanName", function () {
    it("should remove parenthesis", function () {
      assert.equal(
        cleanName("Billy (Goonsquad) (YouTube)"),
        "billy goonsquad youtube"
      );
    });
  });
  describe("cleanName", function () {
    it("should remove quotes", function () {
      assert.equal(
        cleanName("Billy 'Goonsquad' \"YouTube\""),
        "billy goonsquad youtube"
      );
    });
  });
  describe("cleanName", function () {
    it("should remove ampersands", function () {
      assert.equal(cleanName("Happy & Sleepy & Dopey"), "happy  sleepy  dopey");
    });
  });
  describe("cleanName", function () {
    it("should remove these things ```", function () {
      assert.equal(cleanName("`Happy`"), "happy");
    });
  });
  describe("cleanName", function () {
    it("should remove dashes", function () {
      assert.equal(
        cleanName("This - That - The - Other"),
        "this   that   the   other"
      );
    });
  });
  describe("cleanName", function () {
    it("should remove periods and commas", function () {
      assert.equal(cleanName("This. That. The, Other,"), "this that the other");
    });
  });
  describe("cleanName", function () {
    it("should trim", function () {
      assert.equal(cleanName("  Billy Porter  "), "billy porter");
    });
  });
});

describe("findSimilar", function () {
  describe("findSimilar", function () {
    it("should not point names which don't match at all", function () {
      testArray = ["Don Draper", "Peggy Olsen"];
      const result = findSimilar(testArray, 0);
      assert.equal(result.length, 0, result.length);
    });
  });
  describe("findSimilar", function () {
    it("should find Mr Rogers", function () {
      testArray = ["Mr. Rogers", "Fred Rogers"];
      const result = findSimilar(testArray);
      assert.equal(result[0].points > 0, true, result[0].points + 'points');
    });
  });
  describe("findSimilar", function () {
    it("should find James", function () {
      testArray = ["James Dean", "James and the Giant Peach"];
      const result = findSimilar(testArray, 0);
      assert.equal(result[0].points > 0, true, result[0].points + 'points');
    });
  });
  describe("findSimilar", function () {
    it("should find Weird Al", function () {
      testArray = ["Al Yankovic", "Weird Al Yankovic"];
      const result = findSimilar(testArray);
      assert.equal(result[0].points > 0, true, result[0].points + 'points');
    });
  });
  describe("findSimilar", function () {
    it("should find one vowel off", function () {
      testArray = ["Gordon Ramsay", "Gordon Ramsey"];
      const result = findSimilar(testArray);
      assert.equal(result[0].points > 0, true, result[0].points + 'points');
    });
  });
  describe("findSimilar", function () {
    it("should find one constant off", function () {
      testArray = ["Gordon Ramsay", "Gordon Ramsey"];
      const result = findSimilar(testArray);
      assert.equal(result[0].points > 0, true, result[0].points + 'points');
    });
  });
  describe("findSimilar", function () {
    it("should find R Kelly", function () {
      testArray = ["R Kelly", "Robert Kelly"];
      const result = findSimilar(testArray);
      assert.equal(result[0].points > 0, true, result[0].points + 'points');
    });
  });
  describe("findSimilar", function () {
    it("should find Dr Drew", function () {
      testArray = ["Dr. Drew", "Dr. Drew Pinsky"];
      const result = findSimilar(testArray);
      assert.equal(result[0].points > 0, true, result[0].points + 'points');
    });
  });
  describe("findSimilar", function () {
    it("should find Shaq", function () {
      testArray = ["Shaq", "Shaquille O’Neal"];
      const result = findSimilar(testArray);
      assert.equal(result[0].points > 0, true, result[0].points + 'points');
    });
  });
  describe("findSimilar", function () {
    it("should find Jay-Z", function () {
      testArray = ["Jay Z", "Jay-Z"];
      const result = findSimilar(testArray);
      assert.equal(result[0].points > 0, true, result[0].points + 'points');
    });
  });
  describe("findSimilar", function () {
    it("should find ay vs ie", function () {
      testArray = ["Jeff Ramsay", "Jeff Ramsie"];
      const result = findSimilar(testArray);
      assert.equal(result[0].points > 0, true, result[0].points + 'points');
    });
  });
  describe("findSimilar", function () {
    it("should find ay vs i", function () {
      testArray = ["Jeff Ramsay", "Jeff Ramsi"];
      const result = findSimilar(testArray);
      assert.equal(result[0].points > 0, true, result[0].points + 'points');
    });
  });
  describe("findSimilar", function () {
    it("should find J Spainy", function () {
      testArray = ["J Spainy", "Jay Spainey"];
      const result = findSimilar(testArray);
      assert.equal(result[0].points > 0, true, result[0].points + 'points');
    });
  });
  describe("findSimilar", function () {
    it("should find Richard Blackwater", function () {
      testArray = ["Richard Blackwater", "Rich Blackwater"];
      const result = findSimilar(testArray);
      assert.equal(result[0].points > 0, true, result[0].points + 'points');
    });
  });
  describe("findSimilar", function () {
    it("should find James Blackwater", function () {
      testArray = ["James Blackwater", "James Black water"];
      const result = findSimilar(testArray);
      assert.equal(result[0].points > 0, true, result[0].points + 'points');
    });
  });
  describe("findSimilar", function () {
    it("should find John Adams", function () {
      testArray = ["John Quincy Adams", "John Adams"];
      const result = findSimilar(testArray);
      assert.equal(result[0].points > 0, true, result[0].points + 'points');
    });
  });
  describe("findSimilar", function () {
    it("should find Dr Phil", function () {
      testArray = ["Phillip Water", "Dr. Phil"];
      const result = findSimilar(testArray);
      assert.equal(result[0].points > 0, true, result[0].points + 'points');
    });
  });
  describe("findSimilar", function () {
    it("should find Robbie", function () {
      testArray = ["Robbie Tinman", "Robby Tinman"];
      const result = findSimilar(testArray);
      assert.equal(result[0].points > 0, true, result[0].points + 'points');
    });
  });
  describe("findSimilar", function () {
    it("should find LL vs L", function () {
      testArray = ["Hillary Clinton", "Hilary Clinton"];
      const result = findSimilar(testArray);
      assert.equal(result[0].points > 0, true, result[0].points + 'points');
    });
  });
  describe("findSimilar", function () {
    it("should find Ellen", function () {
      testArray = ["Ellen Degeneres", "Ellen DeGeneres"];
      const result = findSimilar(testArray);
      assert.equal(result[0].points > 0, true, result[0].points + 'points');
    });
  });
  describe("findSimilar", function () {
    it("should find Gwen", function () {
      testArray = ["Gwenyth Paltrow", "Gwyneth Paltrow"];
      const result = findSimilar(testArray);
      assert.equal(result[0].points > 0, true, result[0].points + 'points');
    });
  });
  describe("findSimilar", function () {
    it("should find Judge Judyy", function () {
      testArray = ["Judge Judyy", "Judge Judy"];
      const result = findSimilar(testArray);
      assert.equal(result[0].points > 0, true, result[0].points + 'points');
    });
  });
  describe("findSimilar", function () {
    it("should find Russells", function () {
      testArray = ["Russel Brand", "Russell Crowe"];
      const result = findSimilar(testArray);
      assert.equal(result[0].points > 0, true, result[0].points + 'points');
    });
  });
  describe("findSimilar", function () {
    it("should find Pheonix", function () {
      testArray = ["Joaquin Pheonix", "Joaquin Phoenix"];
      const result = findSimilar(testArray);
      assert.equal(result[0].points > 0, true, result[0].points + 'points');
    });
  });
  describe("findSimilar", function () {
    it("should find Crowley", function () {
      testArray = ["Alistair Crowley", "Aleister Crowley"];
      const result = findSimilar(testArray);
      assert.equal(result[0].points > 0, true, result[0].points + 'points');
    });
  });
});