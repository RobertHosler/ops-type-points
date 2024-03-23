/*jshint esversion: 6 */

const { buildKey } = require("./airtable/airtable");

/**
 * Create list of names which differ between the two lists
 */
function compareNames(names1, names2) {
  let result = names2.splice();
  for (let n1 of names1) {
    const index = result.indexOf(n1);
    if (index > -1) {
      // Found - we remove it
      result = result.splice(index, 1);
    } else {
      // Not found - we add it
      result.push(n1);
    }
  }
  return result;
}

function compareEnnea(scrapeData, enneaDb) {
  const result = {
    exclusiveToDb: [],
    exclusiveToScrape: scrapeData.slice(),
    typeMismatch: [],
  };
  for (let [key, eVal] of enneaDb) {
    let nameFound = false;
    for (let i = 0; i < result.exclusiveToScrape.length; i++) {
      let data = result.exclusiveToScrape[i];
      const eName1 = buildKey(eVal.name);
      const eName2 = buildKey(eVal.altName);
      const externalName = buildKey(data.name);
      if (
        !nameFound &&
        (eName1 === externalName || (eName2 && eName2 === externalName))
      ) {
        // Name Match - Check type match
        const fullTypeOverlay = eVal.instinct + " " + eVal.eType + " " + eVal.trifix + eVal.overlay;
        const fullType = (eVal.instinct + " " + eVal.eType + " " + (eVal.trifix ? eVal.trifix : "")).trim();
        const scrapeData = data.instinct + " " + data.type + " " + data.trifix;
        if (
          compareValues(eVal.instinct, data.instinct) &&
          compareValues(eVal.eType, data.type) &&
          compareValues(eVal.trifix, data.trifix)
        ) {
          // Match!
        } else if (compareValues(fullTypeOverlay, scrapeData)) {
          // Overlay match!
        } else {
          // Type mismatch on name
          const mismatch = {
            name: eVal.name,
            t1: eVal.trifix && eVal.overlay ? fullTypeOverlay : fullType,
            t2: scrapeData,
          };
          console.log("Mismatch", mismatch);
          result.typeMismatch.push(mismatch);
        }
        // Remove from the exclusions lists
        nameFound = true;
        result.exclusiveToScrape.splice(i, 1);
        break;
      }
    }
    if (!nameFound && !eVal.tags.includes('Community Member') && !eVal.tags.includes('Exclusive')) {
      result.exclusiveToDb.push(eVal);
    }
  }
  result.exclusiveToDb.sort(sortName);
  result.exclusiveToScrape.sort(sortName);
  result.typeMismatch.sort(sortName);
  return result;
}

function sortName(a, b) {
  if (a.name > b.name) {
    return 1;
  }
  if (b.name > a.name) {
    return -1;
  }
  return 0;
}

function compareValues(s1, s2) {
  // if one defined, the other should be defined and equal
  // if one empty, the other should also be empty
  if (!s1 && !s2) {
    return true;
  } else if ((s1 && !s2) || (s2 && !s1)) {
    return false;
  } else if (s1.toLowerCase().trim() === s2.toLowerCase().trim()) {
    return true;
  }
  return false;
}

function compareAP(scrapeData, apDb) {
  const result = {
    exclusiveToDb: [],
    exclusiveToScrape: scrapeData.slice(),
    typeMismatch: [],
  };
  for (let [key, val] of apDb) {
    let nameFound = false;
    const name1 = buildKey(val.name);
    const name2 = buildKey(val.altName);
    for (let i = 0; i < result.exclusiveToScrape.length; i++) {
      let data = result.exclusiveToScrape[i];
      const externalName = buildKey(data.name);
      if ( !nameFound && (name1 === externalName || (name2 && name2 === externalName)) ) {
        const match = compareValues(val.apType, data.apCore) &&
            compareValues(val.apSubtype, data.apSubtype); // same name - compare types
        if (!match) {
          console.log(val.name, val.apType, val.apSubtype, data.apCore, data.apSubtype);
          const type1 = val.apSubtype ? val.apType + " " + val.apSubtype : val.apType;
          const type2 = data.apSubtype ? data.apCore + " " + data.apSubtype : data.apCore;
          const mismatch = {
            name: val.name,
            t1: type1,
            t2: type2,
          };
          result.typeMismatch.push(mismatch);
        }
        // Remove from the exclusions lists
        nameFound = true;
        result.exclusiveToScrape.splice(i, 1);
        break;
      }

    }
    if (!nameFound && !val.tags.includes('Community Member') && !val.tags.includes('Exclusive')) {
      result.exclusiveToDb.push(val);
    }
  }
  result.exclusiveToDb.sort(sortName);
  result.exclusiveToScrape.sort(sortName);
  result.typeMismatch.sort(sortName);
  const firstX = 10;
  console.log('exclusiveToDb - first '+firstX, result.exclusiveToDb.slice(0, firstX));
  console.log('exclusiveToScrape - first '+firstX, result.exclusiveToScrape.slice(0, firstX));
  console.log('exclusiveToDb:' + result.exclusiveToDb.length,
      'exclusiveToScrape:' + result.exclusiveToScrape.length,
      'typeMismatch:' + result.typeMismatch.length);
  return result;
}

exports.dbCompare = {
  compareNames: compareNames,
  compareEnnea: compareEnnea,
  compareAP: compareAP,
};
