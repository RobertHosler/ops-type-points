/*jshint esversion: 6 */

const { resolve } = require("@angular/compiler-cli/src/ngtsc/file_system");
var now = require("performance-now");

/**
 * List of terms to remove if string starts with them.
 *
 * TODO: update to replace with longer versions?
 */
const shortTerms = ["mr", "dr", "ms", "mrs", "miss"];

/**
 * List of strings that won't count for matching.
 *
 * TODO: Update to only exclude during partial matching? - or split list
 */
const excludedStrings = [
  " ",
  "of",
  "de",
  "the",
  "i",
  "ii",
  "iii",
  "iv",
  "v",
  "vi",
  "vii",
  "viii",
  "ix",
  "x",
  "xi",
  "xii",
  "xiii",
  "xiv",
  "xv",
  "xvi",
  "xvii",
  "xviii",
  "xix",
  "xx",
  "england",
  "great",
  "britain",
  "france",
  "emperor",
  "duke",
  "king",
  "and",
  "royal",
  "princess",
  "holy",
  "united",
  "kingdom",
  "russia",
  "viscount",
  "brazil",
];

/**
 * List of potential matches confirmed to not be matches.  caps shouldn't matter at this point
 */
const excludedMatches = [
  { n1: "richard burton", n2: "richard francis burton" },
  { n1: "john adams", n2: "john quincey adams" },
  { n1: "Muhammad Ali", n2: "Muhammad Ali Jinnah" },
  { n1: "Pat Robertson", n2: "Robert Pattinson" },
  { n1: "George H. W. Bush", n2: "George W. Bush" },
  { n1: "Rich Benjamin", n2: "Richard Benjamin" },
  { n1: "David Bayer", n2: "David Ayer" },
  { n1: "Karl Ove Knarsgaard", n2: "Karl Rove" },
  { n1: "Colleen Ballinger", n2: "Lee Lin Chin" },
  { n1: "Dwayne 'The Rock' Johnson", n2: "John Wayne" },
  { n1: "William Pitt the Younger", n2: "William Pitt, 1st Earl of Chatham" },
  { n1: "William James", n2: "William James Sidis" },
  { n1: "Tom Jones", n2: "Tommy Lee Jones" },
  { n1: "Martin Luther", n2: "Martin Luther King Jr." },
  { n1: "John Paul DeJoria", n2: "John Paul White" },
  { n1: "Ron Paul", n2: "Aaron Paul" },
  { n1: "Ian Douglas Smith", n2: "Dr. Ian Smith" },
];

const timer = "similar names";

function findSimilarPromise(nameMap, max) {
  const promise = new Promise((resolve, reject) => {
    let names = [];
    let emptyCount = 0;
    nameMap.forEach((record) => {
      if (record.name && record.name.trim().length > 0) {
        names.push(record.name);
      } else {
        emptyCount++;
      }
    });
    console.log("finding similar... names...", names.length, emptyCount);
    setTimeout(() => {
      let results = findSimilar(names, max);
      console.log("finding similar... results...", results.length);
      resolve(results);
    }, 0);
  });
  return promise;
}

function findSimilar(names, max, threshold, excludedMatches) {
  console.time(timer);
  const checkedNames = [];
  const results = [];
  if (!threshold) {
    threshold = 8;
  }
  // for each name pair...
  let time = now();
  for (let i = 0; i < names.length; i++) {
    let n1 = names[i];
    if (i != 0 && i % 100 === 0) {
      let timeNow = now();
      console.log("Similar in progress", n1, i, results.length, timeNow - time);
      time = timeNow;
    }
    for (let j = i + 1; j < names.length; j++) {
      let n2 = names[j];
      let points = 0;
      // compare individual strings (removing special characters)
      let n1Clean = cleanName(n1);
      let n2Clean = cleanName(n2);

      let n1NoSpace = n1Clean.replace(" ", "");
      let n2NoSpace = n2Clean.replace(" ", "");

      let n1Arr = n1Clean.split(" ");
      let n2Arr = n2Clean.split(" ");

      if (n1Arr.length === 1) {
        // Compare more aggressively?
        let s1 = n1Arr[0];
        for (let y = 0; y < n2Arr.length; y++) {
          let s2 = n2Arr[y];
          if (s2.startsWith(s1)) {
            points += 10;
            break;
          }
        }
      } else if (n2Arr.length === 1) {
        // Compare more aggressively?
        let s2 = n2Arr[0];
        for (let x = 0; x < n1Arr.length; x++) {
          let s1 = n1Arr[x];
          if (s2.startsWith(s1)) {
            points += 10;
            break;
          }
        }
      } else {
        for (let x = 0; x < n1Arr.length; x++) {
          let s1 = n1Arr[x];
          for (let y = 0; y < n2Arr.length; y++) {
            let s2 = n2Arr[y];
            points += compareStrings(s1, s2);
          }
        }
      }
      points += compareStrings(n1NoSpace, n2NoSpace) * 2;
      points += compareStrings(n1Clean, n2Clean) * 2;

      if (points > 0 && points > threshold - 1) {
        // Add Result
        const result = { points: points, n1: n1, n2: n2 };
        // console.log("pushing similar", result);
        results.push(result);
      }
    }
  }
  // console.log("similar results", results);
  // sort by points
  results.sort((a, b) => {
    if (a.points > b.points) {
      return -1;
    }
    if (a.points < b.points) {
      return 1;
    }
    return 0;
  });
  console.timeEnd(timer);
  console.log("Similar Names Length", names.length, results.length);
  return results;
}
// names.forEach((n1) => {
//   count++;
//   if (count % 100 === 0) {
//     console.log("Similar", count, results.length);
//   }
//   if (results.length >= max) {
//     return results;
//   }
//   names.forEach((n2) => {
//     if (
//       n1 === "Ben Arthur" ||
//       n2 === "Ben Arthur" ||
//       n1 === n2 ||
//       checkedNames.includes(n2) ||
//       (excludedMatches && excludeMatch(excludedMatches, n1, n2))
//     ) {
//       return; // skip same names, known non-matches, and already checked names as n1
//     }
//     let points = 0;
//     // compare individual strings (removing special characters)
//     let n1Clean = cleanName(n1);
//     let n2Clean = cleanName(n2);

//     let n1NoSpace = n1Clean.replace(" ", "");
//     let n2NoSpace = n2Clean.replace(" ", "");

//     let n1Arr = n1Clean.split(" ");
//     let n2Arr = n2Clean.split(" ");

//     let includesAll1 = true;
//     let includesAll2 = true;
//     n1Arr.forEach((s1) => {
//       if (includesAll1) {
//         // set to false if the string doesn't contain one part
//         // ex: shaq in shaqelle o'neal
//         includesAll1 = n2Clean.includes(s1);
//       }
//       n2Arr.forEach((s2) => {
//         if (includesAll2) {
//           // set to false if the string doesn't contain one part
//           includesAll2 = n1Clean.includes(s2);
//         }
//         points += compareStrings(s1, s2) * 3;
//       });
//     });
//     if (includesAll1 || includesAll2) {
//       if (n1Arr.length === 1 || n2Arr.length === 1) {
//         points += 10; // rare check - bonus points - unlikely to match anything else
//       } else if (n1Arr.length > 1 && n2Arr.length > 1) {
//         points += 4; // rare check - bonus points
//       } else {
//         points++; //short name
//       }
//     }
//     points += compareStrings(n1NoSpace, n2NoSpace) * 2;
//     points += compareStrings(n1Clean, n2Clean) * 2;

//     if (points > threshold - 1) {
//       // Add Result
//       results.push({ points: points, n1: n1, n2: n2 });
//     }
//   });
//   checkedNames.push(n1); // no longer needs compared to other strings - compared to every other name
// });
// return results;
// }

function compareStrings(s1, s2) {
  let points = 0;
  if (
    s1.trim().length === 0 ||
    s2.trim().length === 0 ||
    excludedStrings.includes(s1) ||
    excludedStrings.includes(s2)
  ) {
    return points;
  }
  if (s1 === s2) {
    points += 1;
  }
  if (s1.startsWith(s2) || s2.startsWith(s1)) {
    //overlaps with s1===s2
    points += 1;
  }
  if (s1.includes(s2) || s2.includes(s1)) {
    //overlaps with s1===s2
    points += 1;
  }
  if (replaceVowels(s1) === replaceVowels(s2)) {
    points += 1;
  }
  if (removeVowels(s1) === removeVowels(s2)) {
    //overlaps with replaceVowels
    points += 1;
  }
  if (matchMinusOne(s1, s2) || matchMinusOne(s2, s1)) {
    //overlaps with single vowel being off
    points += 3;
  }
  return points;
}

function cleanName(name) {
  name = name.toLowerCase();
  let stFound = false;
  shortTerms.forEach((st) => {
    if (!stFound && name.startsWith(st)) {
      name = name.replace(st, "");
      stFound = true;
    }
  });
  name = name.replace(/\(/g, "");
  name = name.replace(/\)/g, "");
  name = name.replace(/'/g, "");
  name = name.replace(/"/g, "");
  name = name.replace(/\&/g, "");
  name = name.replace(/,/g, "");
  name = name.replace(/`/g, "");
  name = name.replace(/\./g, "");
  name = name.replace(/-/g, " ");
  return name.trim();
}

function matchMinusOne(s1, s2) {
  let result = false;
  for (var i = 1; i < s1.length - 1; i++) {
    let s1a = s1.slice(0, i) + s1.slice(i + 1);
    if (excludedStrings.includes(s1a)) {
      continue;
    }
    if (s1a === s2) {
      result = true;
      break;
    }
    if (s1.length === s2.length) {
      // same length - possible letter off ex: Ramsey vs Ramsay
      let s2a = s2.slice(0, i) + s2.slice(i + 1);
      if (s2a === s1a) {
        result = true;
        break;
      }
    }
  }
  return result;
}

function removeVowels(s) {
  s = s.replace(/e/g, "");
  s = s.replace(/a/g, "");
  s = s.replace(/i/g, "");
  s = s.replace(/o/g, "");
  s = s.replace(/u/g, "");
  s = s.replace(/y/g, "");
  return s;
}

function replaceVowels(s) {
  s = s.replace(/e/g, "@");
  s = s.replace(/a/g, "@");
  s = s.replace(/i/g, "@");
  s = s.replace(/o/g, "@");
  s = s.replace(/u/g, "@");
  s = s.replace(/y/g, "@");
  return s;
}

/**
 * Determine if we should bypass the single match limit
 *
 * if name only has one word in it, ex: shaq
 *
 * if name is length 2 and includes a short term, ex: mr rogers vs fred rogers
 *  - short term should not be the only match though, ex: mr rogers vs mr green
 *
 */
function singleMatchCheck(matches, n1Arr, n2Arr) {
  let result = n1Arr.length === 1 || n2Arr.length === 1;
  if (!result) {
    // can't always expect these short terms to be included
    shortTerms.forEach((st) => {
      if (!result && (n1Arr.includes(st) || n2Arr.includes(st))) {
        if (![matches[0].s1, matches[0].s2].includes(st)) {
          result = true;
        }
      }
    });
  }
  return result;
}

function excludeMatch(excludedMatches, n1, n2) {
  let result = false;
  excludedMatches.forEach((val) => {
    if (result) {
      return;
    }
    if (
      (val.n1.toLowerCase().trim() === n1.toLowerCase().trim() &&
        val.n2.toLowerCase().trim() === n2.toLowerCase().trim()) ||
      (val.n1.toLowerCase().trim() === n2.toLowerCase().trim() &&
        val.n2.toLowerCase().trim() === n1.toLowerCase().trim())
    ) {
      result = true;
    }
  });
  return result;
}

exports.findSimilarPromise = findSimilarPromise;
exports.findSimilar = findSimilar;
exports.cleanName = cleanName;
