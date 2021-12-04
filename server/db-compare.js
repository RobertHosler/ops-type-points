/*jshint esversion: 6 */

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
      if (
        !nameFound &&
        eVal.name.toLowerCase().trim() === data.name.toLowerCase().trim()
      ) {
        // Name Match - Check type match
        if (
          compareValues(eVal.instinct, data.instinct) &&
          compareValues(eVal.eType, data.type) &&
          compareValues(eVal.trifix, data.trifix)
        ) {
          // Match!
        } else {
          // Type mismatch on name
          const mismatch = {
            name: eVal.name,
            t1:
              eVal.instinct +
              " " +
              eVal.eType +
              " " +
              (eVal.trifix ? eVal.trifix : ""),
            t2: data.instinct + " " + data.type + " " + data.trifix,
          };
          console.log(mismatch);
          result.typeMismatch.push(mismatch);
        }
        // Remove from the exclusions lists
        nameFound = true;
        result.exclusiveToScrape.splice(i, 1);
        break;
      }
    }
    if (!nameFound) {
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

exports.dbCompare = {
  compareNames: compareNames,
  compareEnnea: compareEnnea,
};