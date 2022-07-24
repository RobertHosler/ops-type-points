/*jshint esversion: 6 */

const { getRecordPicture, getLastModified, compareModifiedDates } = require("./airtable");

const opsKey = process.env.OP_DATABASE_KEY || require("../local-api").key;
const HOST = "https://api.airtable.com/v0/apptRQDj4AV89IiNn/";
const TABLE_NAME = "Enneagrammer DB";
const VIEW = "Grid view";
const MAX_RECORD = 10000;
const fields = [
  "Name",
  "Alt-Name",
  "Instinct",
  "Type",
  "Trifix",
  "Picture",
  "Sex",
  "Tags",
  "Collage",
  "Links",
  "Notes",
  "Last Modified",
  "Created Date",
];

const url = new URL(HOST + TABLE_NAME);
url.searchParams.append("view", VIEW);
url.searchParams.append("api_key", opsKey);
url.searchParams.append("maxRecords", MAX_RECORD);
fields.forEach((field) => {
  url.searchParams.append("fields", field);
});

const converterList = [
  { org: "Dr. Phil", result: "Dr. Phil McGraw" },
  { org: "Ellen Degeneres", result: "Ellen DeGeneres" },
  { org: "Gordon Ramsey", result: "Gordon Ramsay" },
  { org: "Gwenyth Paltrow", result: "Gwyneth Paltrow" },
  { org: "Hilary Clinton", result: "Hillary Clinton" },
  { org: "Jay Z", result: "Jay-Z" },
  { org: "John Jones (UFC)", result: "Jon Jones" },
  { org: "Judge Judyy", result: "Judge Judy" },
  { org: "Lady GaGa", result: "Lady Gaga" },
  { org: "Oprah", result: "Oprah Winfrey" },
  { org: "Ross Matthews", result: "Ross Mathews" },
  { org: "Russel Crowe", result: "Russell Crowe" },
  { org: "Russel Brand", result: "Russell Brand" },
  { org: "Paul Reubens", result: "Paul Reubens (Pee-wee Herman)" },
  { org: "Samuel L Jackson", result: "Samuel L. Jackson" },
  { org: "Shaq", result: "Shaquille O'Neal" },
  { org: "Ave Gardner", result: "Ava Gardner" },
  { org: "Mr. Rogers", result: "Fred Rogers" },
  { org: "Dr. Drew", result: "Dr. Drew Pinsky" },
  { org: "Gary V", result: "Gary Vaynerchuk" },
  { org: "Kris Jenner", result: "Kris Kardashian Jenner" },
  { org: "Kim Kardashian", result: "Kim Kardashian West" },
  { org: "Neil deGrasse Tyson", result: "Neil DeGrasse Tyson" },
  { org: "Joaquin Pheonix", result: "Joaquin Phoenix" },
  { org: "Eminem", result: "Marshall 'Eminem' Mathers" },
  { org: "Alistair Crowley", result: "Aleister Crowley" },
  { org: '"The Situation"', result: "Mike 'The Situation' Sorrentino" },
  { org: "Dwayne Johnson", result: "Dwayne 'The Rock' Johnson" },
  { org: "50 Cent", result: "Curtis '50 Cent' Jackson" },
  { org: "R Kelly", result: "Robert 'R Kelly' Kelly" },
  { org: "Giselle Bundchen​", result: "Gisele Bundchen​" },
  { org: "Freddy Mercury", result: "Freddie Mercury" },
  { org: "Leonardo Dicaprio", result: "Leonardo DiCaprio" },
  { org: "The Weeknd", result: "Abel 'The Weeknd' Tesfaye" },
  { org: "Doland Trump", result: "Donald Trump" },
  { org: "Malcom X", result: "Malcolm X" },
  { org: "William Buckley", result: "William F. Buckley" },
  { org: "Mitch McConnel", result: "Mitch McConnell" },
  { org: "Katharine Hepburn", result: "Katherine Hepburn" },
  { org: "W. A. Mozart", result: "Wolfgang Amadeus Mozart" },
  { org: "PJ Harvey", result: "Polly Jean 'PJ' Harvey" },
  { org: "Katherine Hepburn", result: "Katharine Hepburn" },
  { org: "Dennis Villeneuve", result: "Denis Villeneuve" },
  { org: "Timothée Chalamet", result: "Timothee Chalamet" },
  { org: "Gabor Mate", result: "Gabor Maté" },
  { org: "John Jones", result: "Jon Jones" },
  { org: "Giselle Bundchen", result: "Gisele Bundchen" },
];
function convertName(name) {
  name = name.trim();
  const slashIndex = name.indexOf("(");
  if (slashIndex > -1) {
    const beforeName = name;
    name = name.substring(0, slashIndex).trim();
    // console.log("Trimmed Name () - ", beforeName, "- to |" + name + "|");
  }
  converterList.forEach((converter) => {
    if (converter.org === name) {
      // console.log("Converting Name - ", converter.org, "- to - |" + converter.result + "|");
      name = converter.result;
    }
  });
  return name;
}

function parseLink(linkString) {
  let link = null;
  console.log(linkString);
  let leftText = linkString.indexOf('[');
  leftText = leftText > -1 ? leftText : 0;
  let rightText = linkString.indexOf(']');
  let leftHref = linkString.indexOf('(', rightText);
  let rightHref = linkString.lastIndexOf(')');
  if (rightText > -1 && leftHref > -1 && rightHref > -1) {
    link = {};
    link.text = linkString.substring(leftText, rightText);
    link.href = linkString.substring(leftHref + 1, rightHref);
  }
  return link;
}

function convertRecords(records) {
  const result = new Map();
  records.forEach((record) => {
    //TODO: put in map
    if (!record.fields.Name || record.fields.Name.trim().length === 0) {
      return; //skip empty names
    }
    const name = convertName(record.fields.Name);
    const coreEType =
      record.fields.Type && record.fields.Type.length
        ? record.fields.Type.substring(0, 1)
        : "?";
    const wing =
      record.fields.Type && record.fields.Type.length > 2
        ? record.fields.Type.substring(2, 3)
        : "?";
    let tags = ["Enneagrammer"];
    (record.fields.Tags ? record.fields.Tags : []).forEach(tag => {
      if (tag === 'Class Typing') {
        tags.push('Academy Typing (DAA)');
      } else {
        tags.push(tag);
      }
    });
    if (tags.includes('Removed')) {
      console.log(name + ' Removed');
      return;
    }

    const instinct = record.fields.Instinct
      ? record.fields.Instinct.toLowerCase()
      : "";
    const eType = record.fields.Type;
    const fullTrifix = record.fields.Trifix;
    const trifix = buildTritype(fullTrifix);
    const dirtyOverlay = buildDirtyOverlay(fullTrifix);
    const overlay = cleanOverlay(dirtyOverlay, trifix);
    
    const fullEType = buildFullEType(instinct, eType, fullTrifix);
    const fullETypeOverlay = buildFullETypeOverlay(instinct, eType, trifix, overlay);
    const emphasizedNumber = buildEmphasizedNumber(trifix, dirtyOverlay);
    if (emphasizedNumber) {
      // console.log('Emphasized...', emphasizedNumber, name);
    }
    const links = record.fields.Links;
    let daaLink = record.fields.Links;
    result.set(name, {
      name: name,
      altName: record.fields["Alt-Name"],
      coreEType: coreEType,
      coreETypeLong: getCoreETypeLong(coreEType),
      wing: wing,
      eType: eType,
      instinct: instinct,
      trifix: trifix,
      fullTrifix: fullTrifix,
      overlay: overlay,
      emphasizedNumber: emphasizedNumber,
      fullEType: fullEType,
      fullETypeOverlay: fullETypeOverlay,
      sex: record.fields.Sex,
      tags: tags,
      enneaNotes: record.fields.Notes,
      enneaLinks: links,
      daaLink: daaLink,
      pictureUrl: getRecordPicture(record.fields.Picture),
      collageUrl: getRecordPicture(record.fields.Collage),
      lastModified: getLastModified(record)
    });
  });
  return result;
}

/**
 * When a number is in both trifix and overlay it should be emphasized in the
 * overlay format (bold or underline).  Checks to see if any number appears more
 * than once when these are combined by checking if it has more than one index.
 */
function buildEmphasizedNumber(trifix, overlay) {
  let emphasizedNumber = null;
  if (trifix && overlay) {
    const numbers = (trifix+overlay).split(''); // all numbers in the array
    numbers.forEach(s => {
      const indexArr = getAllIndexes(numbers, s);
      if (indexArr.length > 1) {
        emphasizedNumber = s;
      }
    });
  }
  return emphasizedNumber;
}

function getAllIndexes(arr, val) {
  var indexes = [], i = -1;
  while ((i = arr.indexOf(val, i+1)) != -1){
      indexes.push(i);
  }
  return indexes;
}

function buildDirtyOverlay(fullTrifix) {
  let overlay = null;
  if (fullTrifix && fullTrifix.length === 11) {
    const parts = fullTrifix.split(" ");
    let overlay1 = parts[0].substring(2,3);
    let overlay2 = parts[1].substring(2,3);
    let overlay3 = parts[2].substring(2,3);
    overlay = overlay1 + overlay2 + overlay3;
  }
  return overlay;
}

function cleanOverlay(dirtyOverlay, trifix) {
  let overlay = null;
  if (dirtyOverlay) {
    overlay = [ ...new Set(dirtyOverlay.split(''))];//remove duplicates
    trifix.split('').forEach(s => {
      const index = overlay.indexOf(s);
      if (index > -1) {
        overlay.splice(index, 1);
      }
    });
    overlay.sort();
    overlay = '(' + overlay.join('') + ')';
  }
  return overlay;
}

function buildOverlay(trifix, fullTrifix) {
  let overlay = null;
  if (fullTrifix && fullTrifix.length === 11) {
    const parts = fullTrifix.split(" ");
    let overlay1 = parts[0].substring(2,3);
    let overlay2 = parts[1].substring(2,3);
    let overlay3 = parts[2].substring(2,3);
    overlay = [ ...new Set([overlay1, overlay2, overlay3])];//remove duplicates
    trifix.split('').forEach(s => {
      const index = overlay.indexOf(s);
      if (index > -1) {
        overlay.splice(index, 1);
      }
    });
    overlay.sort();
    overlay = '(' + overlay.join('') + ')';
  }
  return overlay;
}

function buildFullEType(instinct, eType, fullTrifix) {
  let fullEType;
  let coreType;
  let trifix;
  if (fullTrifix && fullTrifix.startsWith(eType)) {
    // full fix (9w1 3w4 6w7) in place of core type (9w1) for reduced redundancy
    coreType = fullTrifix;
  } else {
    coreType = eType;
    trifix = fullTrifix;
  }
  if (instinct && trifix) {
    fullEType = instinct + " " + coreType + " " + trifix;
  } else if (instinct) {
    fullEType = instinct + " " + coreType;
  } else if (instinct && trifix) {
    fullEType = eType + " " + trifix;
  } else {
    fullEType = eType;
  }
  return fullEType;
}

function buildFullETypeOverlay(instincts, coreType, trifix, overlay) {
  let eTypeOverlay = '';
  if (instincts) {
    eTypeOverlay += instincts;
  }
  if (trifix && overlay) {
    eTypeOverlay += (' ' + trifix + ' ' + overlay);
  } else if (trifix) {
    eTypeOverlay += (' ' + coreType);
    eTypeOverlay += (' ' + trifix);
  } else {
    eTypeOverlay += (' ' + coreType);
  }
  return eTypeOverlay;
}

function buildTritype(s) {
  if (s && s.length === 11) {
    const parts = s.split(" ");
    if (parts.length === 3) {
      let tritype =
        parts[0].substring(0, 1) +
        parts[1].substring(0, 1) +
        parts[2].substring(0, 1);
      // console.log('tritype', tritype);
      return tritype;
    } else {
      console.log("tritype part length issue", s);
      return s;
    }
  } else {
    return s;
  }
}

function getCoreETypeLong(coreEType) {
  switch (coreEType) {
    case "1":
      return "One";
    case "2":
      return "Two";
    case "3":
      return "Three";
    case "4":
      return "Four";
    case "5":
      return "Five";
    case "6":
      return "Six";
    case "7":
      return "Seven";
    case "8":
      return "Eight";
    case "9":
      return "Nine";
  }
}

function mergeMaps(nameMap, eTypeMap) {
  const matches = [];
  let i = 0;
  eTypeMap.forEach((eVal, eKey) => {
    let nameVal = nameMap.get(eKey);
    if (!nameVal) {
      nameVal = nameMap.get(eVal.altName);
    }
    if (nameVal) {
      // Merge
      nameVal.coreEType = eVal.coreEType; // 9
      nameVal.coreETypeLong = eVal.coreETypeLong; // nine
      nameVal.wing = eVal.wing; // 1
      nameVal.eType = eVal.eType; // 9w1
      nameVal.instinct = eVal.instinct; // so/sp
      nameVal.fullEType = eVal.fullEType;
      nameVal.fullETypeOverlay = eVal.fullETypeOverlay;
      nameVal.fullTrifix = eVal.fullTrifix; // 9w1 6w5 3w4 (may contain wings)
      nameVal.trifix = eVal.trifix; // 963 (no wings)
      nameVal.overlay = eVal.overlay;
      nameVal.emphasizedNumber = eVal.emphasizedNumber;
      nameVal.tags = nameVal.tags ? nameVal.tags : [];
      eVal.tags.forEach(tag => {
        if (!nameVal.tags.includes(tag)) {
          nameVal.tags.push(tag);
        }
      });
      nameVal.enneaTags = nameVal.enneaTags ? nameVal.enneaTags : [];
      if (eVal.tags.includes("Speculation")) {
        nameVal.enneaTags.push("Speculation");
      }
      let personTags = nameVal.personTags ? nameVal.personTags : [];
      if (nameVal.tags.includes("Community Member") && !personTags.includes("Community Member")) {
        personTags.push("Community Member");
      }
      nameVal.personTags = personTags;
      if (eVal.pictureUrl) {
        nameVal.pictureUrl = eVal.pictureUrl;
      }
      nameVal.enneaNotes = eVal.notes;
      nameVal.enneaLinks = eVal.enneaLinks;
      nameVal.daaLink = eVal.daaLink;
      if (compareModifiedDates(nameVal.lastModified, eVal.lastModified) > 0) {
        nameVal.lastModified = eVal.lastModified;
      }
      matches.push(eKey);
    } else {
      // Add to nameMap
      i++;
      let ytLink = '';
      let personTags = [];
      if (!eVal.tags.includes('Community Member')) {
        ytLink = 'https://www.youtube.com/results?search_query='+ eKey + ' interview';
      } else {
        personTags.push("Community Member");
      }
      let enneaTags = [];
      if (eVal.tags.includes("Speculation")) {
        enneaTags.push("Speculation");
      }
      nameMap.set(eKey, {
        name: eKey,
        coreEType: eVal.coreEType,
        coreETypeLong: eVal.coreETypeLong,
        wing: eVal.wing,
        eType: eVal.eType, // 9w1
        instinct: eVal.instinct,
        fullTrifix: eVal.fullTrifix,
        trifix: eVal.trifix,
        overlay: eVal.overlay,
        emphasizedNumber: eVal.emphasizedNumber,
        pictureUrl: eVal.pictureUrl,
        collageUrl: eVal.collageUrl,
        fullEType: eVal.fullEType,
        fullETypeOverlay: eVal.fullETypeOverlay,
        tags: eVal.tags,
        personTags: personTags,
        enneaTags: enneaTags,
        enneaNotes: eVal.enneaNotes,
        enneaLinks: eVal.enneaLinks,
        daaLink: eVal.daaLink,
        ytLink: ytLink,
        sex: eVal.sex,
        trans: false,
        lastModified: eVal.lastModified
      });
    }
  });
  console.log("Enneagrammer Matches", matches.length, "New Persons", i);
}

exports.url = url;
exports.convertRecords = convertRecords;
exports.mergeMaps = mergeMaps;
exports.enneaConvertName = convertName;
