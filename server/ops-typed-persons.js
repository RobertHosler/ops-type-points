/*jshint esversion: 6 */

const opsKey = process.env.OP_DATABASE_KEY || require("./local-api").key;
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

const urlMap = new Map();
urlMap.set("list", listUrl);

const opsTypedPersons = {
  dbKey: OP_DB_KEY,
  table: OFFICIALLY_TYPED,
  view: BY_MBTI_TYPE,
  fields: [
    'Name',
    'Type',
    'Tags',
    'Picture',
    'Sensory Sexual',
    'De Sexual',
    'Savior Observer',
    'Savior Decider',
    'Single Observer vs Decider',
    'Decider Human Need',
    'Observer Human Need',
    'Energy vs Info Dom',
    'Blast vs Consume',
    'Play vs Sleep',
    'Biological Sex',
    'Transgender'
  ],
  converter: converter,
  callback: () => {
    typedPersonComplete = true;
  }
};

// Exclude select names
const exclusionsList = [
  "Jesus",
  "Sarah",
  // --Christopher Columbus
  "Batman",
  "The Joker",
  "Superman",
  "Gargamel (Smurfs)",
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

exports.urlMap = urlMap;
exports.exclusions = exclusionsList;
exports.inclusions = inclusionsList;
