/*jshint esversion: 6 */

const opsKey = process.env.OP_DATABASE_KEY || require('./local-api').key;
const TERMS_HOST = 'https://api.airtable.com/v0/appU0Gx0zVVLeMYUe/';
const MAX_RECORD = 10000;

const termsUrl = new URL(TERMS_HOST + 'Terms');
termsUrl.searchParams.append('api_key', opsKey);
termsUrl.searchParams.append('maxRecords', MAX_RECORD);
termsUrl.searchParams.append('view', 'Standard Grid');
termsUrl.searchParams.append('fields', 'Alt Names');
termsUrl.searchParams.append('fields', 'Definitions');
termsUrl.searchParams.append('fields', 'Definition Source Names');
termsUrl.searchParams.append('fields', 'Children Names');

const sourcesUrl = new URL(TERMS_HOST + 'Definition Source');
sourcesUrl.searchParams.append('api_key', opsKey);
sourcesUrl.searchParams.append('maxRecords', MAX_RECORD);
sourcesUrl.searchParams.append('view', 'Standard View');

const definitionsUrl = new URL(TERMS_HOST + 'Definition');
definitionsUrl.searchParams.append('api_key', opsKey);
definitionsUrl.searchParams.append('maxRecords', MAX_RECORD);
definitionsUrl.searchParams.append('view', 'Grid by Type');
definitionsUrl.searchParams.append('fields', 'Term Name');
definitionsUrl.searchParams.append('fields', 'Definition');
definitionsUrl.searchParams.append('fields', 'Definition Source Name');
definitionsUrl.searchParams.append('fields', 'Alt Names');
definitionsUrl.searchParams.append('fields', 'Definition Source Url');

const urlMap = new Map();
urlMap.set('terms', termsUrl);
urlMap.set('definitions', definitionsUrl);
urlMap.set('sources', sourcesUrl);

exports.urlMap = urlMap;