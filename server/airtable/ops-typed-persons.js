/*jshint esversion: 6 */

const { getRecordPicture, getLastModified } = require("./airtable");

const opsKey = process.env.OP_DATABASE_KEY || require("../local-api").key;
const OP_DB_HOST = "https://api.airtable.com/v0/appudq0aG1uwqIFX5/";
const OP_DB_KEY = "appudq0aG1uwqIFX5";
const OFFICIALLY_TYPED = "Officially Typed People";
const BY_MBTI_TYPE = "Gallery by MBTI Type";
const MAX_RECORD = 10000;

const listUrl = new URL(OP_DB_HOST + "Officially Typed People");
listUrl.searchParams.append("api_key", opsKey);
listUrl.searchParams.append("maxRecords", MAX_RECORD);
listUrl.searchParams.append("view", "Gallery by MBTI Type");
listUrl.searchParams.append("fields", "Name");
listUrl.searchParams.append("fields", "Type");
listUrl.searchParams.append("fields", "Tags");
listUrl.searchParams.append("fields", "Picture");
//Coins
listUrl.searchParams.append("fields", "Sensory Sexual");
listUrl.searchParams.append("fields", "De Sexual");
listUrl.searchParams.append("fields", "Savior Observer");
listUrl.searchParams.append("fields", "Savior Decider");
listUrl.searchParams.append("fields", "Single Observer vs Decider");
listUrl.searchParams.append("fields", "Decider Human Need");
listUrl.searchParams.append("fields", "Observer Human Need");
listUrl.searchParams.append("fields", "Energy vs Info Dom");
listUrl.searchParams.append("fields", "Blast vs Consume");
listUrl.searchParams.append("fields", "Play vs Sleep");
listUrl.searchParams.append("fields", "Biological Sex");
listUrl.searchParams.append("fields", "Transgender");
listUrl.searchParams.append("fields", "Links");
listUrl.searchParams.append("fields", "Unique ID");
listUrl.searchParams.append("fields", "Type Number");
listUrl.searchParams.append("fields", "Last Modified");
listUrl.searchParams.append("fields", "Created Date");

const opsTypedPersons = {
  dbKey: OP_DB_KEY,
  table: OFFICIALLY_TYPED,
  view: BY_MBTI_TYPE,
  fields: [
    "Name",
    "Type",
    "Tags",
    "Picture",
    "Sensory Sexual",
    "De Sexual",
    "Savior Observer",
    "Savior Decider",
    "Single Observer vs Decider",
    "Decider Human Need",
    "Observer Human Need",
    "Energy vs Info Dom",
    "Blast vs Consume",
    "Play vs Sleep",
    "Biological Sex",
    "Transgender",
    "Links",
    "Unique ID",
  ],
  converter: () => {},
  callback: () => {
    typedPersonComplete = true;
  },
};

// Exclude select names
const exclusionsList = [
  "Jesus",
  "Christopher Columbus",
  "Batman",
  "The Joker",
  "Superman",
  "Gargamel",
  "Velma",
  "Granny Knitting ESFJ",
  "Daria",
  "Unknown ISFJ",
  "The Rainman Twins",
];
// Include select community members
const inclusionsList = [
  "Roqb Hosler",
  "Evelien S. Vandenberghe",
  "Laura Miller",
  "Jana Leigh",
  "Sam Kelley",
  "Aiste Jonusaite",
];
const converterList = [
  { org: "", result: "Missingno" },
  { org: "Robert (Bob) Iger", result: "Bob Iger" },
  { org: "Wolf of Wall Street (aka Jordan Belfort)", result: "Jordan Belfort" },
  { org: "Simon (Goonzsquad)", result: "Goonzsquad - Simon" },
  { org: "Billy (Goonzsquad)", result: "Goonzsquad - Billy" },
  { org: "MrBeast (aka Jimmy Donaldson)", result: "Jimmy 'Mr Beast' Donaldson" },
  { org: "Mykie (Glam&Gore)", result: "Мykie - Glam & Gore" },
  { org: "Barepantrytalk (Barbara)", result: "Barbara - BarePantryTalk" },
  { org: "Bold Guy a/k/a Matt Hoss Zone", result: "Matt Hoss" },
  { org: "Mini Ladd a/k/a Craig Thompson", result: "Craig 'Mini Ladd' Thompson" },
  {
    org: "Ultimate Warrior a/k/a James Brian Hellwig",
    result: "James Brian Hellwig",
  },
  { org: "Unbox Therapy a/k/a Lewis Hilsenteger", result: "Lewis Hilsenteger" },
  { org: "Classroom Diva a/k/a Jessica Nichols", result: "Jessica Nichols" },
  { org: "Happy Classroom a/k/a Vanessa/Fernanda", result: "Vanessa/Fernanda" },
  { org: "SadPanda a/k/a Adria Killen", result: "Adria Killen" },
  { org: "Mytoecold a/k/a Drew Monson", result: "Drew Monson" },
  { org: "KetoDiet a/k/a Martina Slajerova", result: "Martina Slajerova" },
  {
    org: "Depersonalization Manual a/k/a Shaun O'Connor",
    result: "Shaun O'Connor",
  },
  {
    org: "Olivia a/k/a Thinker of Everything",
    result: "Olivia - Thinker of Everything",
  },
  {
    org: "Cody Talks",
    result: "Cody Harman",
  },
  { org: "ATHLEAN-X™ a/k/a Jeff Cavaliere", result: "Jeff Cavaliere" },
  { org: "Engineering Explained a/k/a Jason Fenske", result: "Jason Fenske" },
  {
    org: "Alexandria Ocasio-Cortez a/k/a AOC",
    result: "Alexandria Ocasio-Cortez",
  },
  { org: "Expression a/k/a Scott Ste Marie", result: "Scott Ste Marie" },
  { org: "One Minute Workbench a/k/a Tommy Rich", result: "Tommy Rich" },
  {
    org: "FemmeLife/FemmeHead a/k/a Victoria Zimmerman",
    result: "Victoria Zimmerman",
  },
  { org: "Dynamo a/k/a Steven Frayne", result: "Steven Frayne" },
  {
    org: "Yeshua's Servant a/k/a Queen Devoryah Michaela",
    result: "Queen Devoryah Michaela",
  },
  { org: "Kevin a/k/a Chug", result: 'Kevin "Chug"' },
  { org: "Bignoknow a/k/a Noah Thomas", result: "Noah Thomas" },
  { org: "Karen a/k/a Noah Finnce's Mom", result: "Karen Finnce" },
  { org: "Ten Hundred a/k/a Peter Robinson", result: "Peter 'Ten Hundred' Robinson" },
  { org: "Redfoo (aka Stephen Kendal Gordy)", result: "Stephen Kendal Gordy" },
  { org: "Physics Girl a/k/a Dianna Cowern", result: "Dianna Cowern" },
  { org: "My Green Closet a/k/a Verina Erin", result: "Verina Erin" },
  { org: "Hustle Standard a/k/a Charley", result: "Charley - Hustle Standard" },
  { org: "Sarah", result: "Sarah, the ISTJ" },
  { org: "Whoopie Goldberg", result: "Whoopi Goldberg" },
  { org: "Linus Tech Tips", result: "Linus Sebastian" },
  { org: "Eminem", result: "Marshall 'Eminem' Mathers" },
  { org: "Kim Kardashian", result: "Kim Kardashian West" },
  { org: "50 Cent", result: "Curtis '50 Cent' Jackson" },
  { org: "Dwayne Johnson a/k/a The Rock", result: "Dwayne 'The Rock' Johnson" },
  { org: "New Gingrich", result: "Newt Gingrich" },
  { org: "Warren Buffet", result: "Warren Buffett" },
  { org: "Alex McQueen", result: "Alexander McQueen" },
  { org: "Michelle Rodriquez", result: "Michelle Rodriguez" },
  { org: "NF", result: "Nathan 'NF' Feuerstein" },
  { org: "Pastor Personality", result: "Charlie Wallace - Pastor Personality" },
  { org: "AutoAlchemy", result: "Jeffrey - AutoAlchemy" },
  { org: "Kris Kardashian", result: "Kris Kardashian Jenner" },
  //shift+alt+downArrow to copy line in vsCode
];
const idList = [
  { id: "recA8tuvHa5frRAEV", name: "Fred Rogers" },
  { id: "recMQNDvkApzA29FI", name: "Jeff Thorman" },
  { id: "recht5aMSa5H43WGp", name: "Nate Feuerstein" },
  { id: "rec92uMVk4DTtzr4o", name: "Matthew Wetzel" },
  { id: "recgJ4sctRr49Yni8", name: "Alex Mazhukhin" },
  { id: "recrxR1jzqTwGh8U2", name: "Stephen Sackur" },
  { id: "recwld83q2UCsLFoC", name: "Aaron Bidochka" },
  { id: "recXWx0PlXsisdF73", name: "Cristal Fuentes" },
  { id: "rec5bmaPYhgOONJid", name: "Vanessa Hill" },
  { id: "recPkm5nfmCjIIPDb", name: "Jimmy 'MrBeast' Donaldson" },
  { id: "recL8HdE4E7Vuz13Q", name: "Stephen Kendal Gordy" },
  { id: "recnaTCHdXJNYHHrM", name: "Mike Montgomery (Modern Builds)" },
  { id: "recZlq2bfmg3nakzV", name: "Christopher Walken" },
];

function convertName(id, name) {
  name = name.trim();
  const beforeName = name;
  converterList.forEach((converter) => {
    if (converter.org === name) {
      // console.log("Converting Name - ", converter.org, "- to - |" + converter.result + "|");
      name = converter.result;
    }
  });
  const slashIndex = name.indexOf("(");
  if (slashIndex > -1) {
    name = name.substring(0, slashIndex).trim();
    console.log("Trimmed Name () - ", beforeName, "- to |" + name + "|");
  }
  // Remove aka and wrap secondary name in parathesis
  const akaIndex = name.indexOf("a/k/a");
  if (akaIndex > -1) {
    let name1 = name.substring(0, akaIndex).trim();
    let name2 = name.substring(akaIndex+5).trim();
    name = name1 + " (" + name2 + ")";
    console.log("Trimmed Name aka - ", beforeName, "- to |" + name + "|");
  }
  converterList.forEach((converter) => {
    if (converter.org === name) {
      console.log("Converting Name - ", converter.org, "- to - |" + converter.result + "|");
      name = converter.result;
    }
  });
  idList.forEach((idReplace) => {
    if (id === idReplace.id) {
      name = idReplace.name;
      console.log("Replaced by id - ", beforeName, "- to |" + name + "|");
    }
  });
  return name;
}

function parseLink(linkString) {
  let link = null;
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

function buildLinks(opsLinks) {
  let linkObj = {
    youtubeLinks: [],
    classLinks: [],
    otherLinks: [],
    classLink: ''
  };
  let linkStrings = opsLinks.split('[');
  linkStrings.forEach((linkString) => {
    let link = parseLink(linkString);
    if (link) {
      if (
        link.href.includes('youtube.com') ||
        link.href.includes('youtu.be')
      ) {
        linkObj.youtubeLinks.push(link);
      } else if (link.href.includes('objectivepersonalitysystem.com')) {
        linkObj.classLinks.push(link);
        if (link.text.startsWith('Class ')) {
          linkObj.classLink = link;
        }
      } else {
        linkObj.otherLinks.push(link);
      }
    }
  });
  return linkObj;
}

function convertPersons(records) {
  const typeMap = new Map();
  const nameMap = new Map();
  records.forEach((record) => {
    if (!record.fields.Name) {
      return;
    }
    let uniqueId = record.fields["Unique ID"];
    // console.log(record.fields.Name, uniqueId);
    let name = convertName(uniqueId, record.fields.Name);
    let tags = ["OPS"];
    (record.fields.Tags ? record.fields.Tags : []).forEach(tag => {
      if (tag === 'Class Typing') {
        tags.push('OPS Class Typing');
      } else {
        tags.push(tag);
      }
    });
    let opsTags = [];
    if (tags.includes("Speculation") && !tags.includes("Incomplete")) {
      opsTags.push("Speculation");
    }
    let ytLink = '';
    let personTags = [];
    if (!tags.includes('Community Member')) {
      ytLink = 'https://www.youtube.com/results?search_query='+ name + ' interview';
    } else {
      personTags.push("Community Member");
    }
    const links = record.fields.Links;
    const linkObj = links ? buildLinks(links) : {};
    const typedPerson = {
      opsId: uniqueId,
      name: name,
      type: record.fields.Type,
      typeNumber: record.fields["Type Number"],
      pictureUrl: getRecordPicture(record.fields.Picture),
      opsTags: opsTags,
      tags: tags,
      personTags: personTags,
      mod: "??",
      s1: "??",
      s2: "??",
      animals: "??/?(?)",
      coreNeed: record.fields["Single Observer vs Decider"]
        ? record.fields["Single Observer vs Decider"] ===
          "Single Decider / Double Observer"
          ? "Decider"
          : record.fields["Single Observer vs Decider"] ===
            "Single Observer / Double Decider"
          ? "Observer"
          : ""
        : "",
      deciderNeed: record.fields["Decider Human Need"],
      observerNeed: record.fields["Observer Human Need"],
      observerLetter: record.fields["Savior Observer"]
        ? record.fields["Savior Observer"] === "Sensory"
          ? "S"
          : record.fields["Savior Observer"] === "Intuition"
          ? "N"
          : ""
        : "",
      deciderLetter: record.fields["Savior Decider"]
        ? record.fields["Savior Decider"] === "Feeling"
          ? "F"
          : record.fields["Savior Decider"] === "Thinking"
          ? "T"
          : ""
        : "",
      infoAnimal: record.fields["Blast vs Consume"]
        ? record.fields["Blast vs Consume"] === "Blast"
          ? "B"
          : record.fields["Blast vs Consume"] === "Consume"
          ? "C"
          : ""
        : "",
      energyAnimal: record.fields["Play vs Sleep"]
        ? record.fields["Play vs Sleep"] === "Play"
          ? "P"
          : record.fields["Play vs Sleep"] === "Sleep"
          ? "S"
          : ""
        : "",
      animalBalance: record.fields["Energy vs Info Dom"],
      sensoryMod: record.fields["Sensory Sexual"]
        ? record.fields["Sensory Sexual"] === "Masculine"
          ? "M"
          : record.fields["Sensory Sexual"] === "Feminine"
          ? "F"
          : ""
        : "",
      deMod: record.fields["De Sexual"]
        ? record.fields["De Sexual"] === "Masculine"
          ? "M"
          : record.fields["De Sexual"] === "Feminine"
          ? "F"
          : ""
        : "",
      sex: record.fields["Biological Sex"],
      trans: record.fields.Transgender,
      opsLinks: links,
      classLink: linkObj.classLink,
      classLinks: linkObj.classLinks,
      ytLink: ytLink,
      opsYtLinks: linkObj.youtubeLinks,
      moreLinks: linkObj.otherLinks,
      lastModified: getLastModified(record),
    };
    if (typedPerson.type && typedPerson.type.length === 16) {
      typedPerson.s1 = typedPerson.type.substring(3, 5);
      typedPerson.s2 = typedPerson.type.substring(6, 8);
      typedPerson.mod = typedPerson.type.substring(0, 2);
      typedPerson.animals = typedPerson.type.substring(9, 13);
    }
    if (exclusionsList.includes(name)) {
      return;
    }
    let tagExclusionFound = false;
    if (record.fields.Tags) {
      record.fields.Tags.forEach((tag) => {
        if (tag === "Community Member") {
          tagExclusionFound = false;
        }
      });
    }
    if (tagExclusionFound && !inclusionsList.includes(name)) {
      return;
    }
    if (record.fields.Type) {
      if (typeMap.get(record.fields.Type)) {
        typeMap.get(record.fields.Type).push(typedPerson);
      } else {
        typeMap.set(record.fields.Type, [typedPerson]);
      }
    }
    if (name) {
      nameMap.set(name, typedPerson);
    }
  });
  console.log("Convert Persons", nameMap.size, typeMap.size);
  return {
    types: typeMap,
    names: nameMap,
  };
}

exports.listUrl = listUrl;
exports.convertPersons = convertPersons;
