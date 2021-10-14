/*jshint esversion: 6 */

const opsKey = process.env.OP_DATABASE_KEY || require('./local-api').key;
const TERMS_HOST = 'https://api.airtable.com/v0/appudq0aG1uwqIFX5/';
const MAX_RECORD = 10000;

const listUrl = new URL(TERMS_HOST + 'Officially Typed People');
listUrl.searchParams.append('api_key', opsKey);
listUrl.searchParams.append('maxRecords', MAX_RECORD);
listUrl.searchParams.append('view', 'Gallery by MBTI Type');
listUrl.searchParams.append('fields', 'Name');
listUrl.searchParams.append('fields', 'Type');
listUrl.searchParams.append('fields', 'Tags');
listUrl.searchParams.append('fields', 'Picture');

const urlMap = new Map();
urlMap.set('list', listUrl);

// Exclude select names
const exclusionsList = ['Jesus'];
// Include select community members
const inclusionsList = ['Roqb Hosler'];

exports.urlMap = urlMap;
exports.exclusions = exclusionsList;
exports.inclusions = inclusionsList;