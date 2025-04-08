/*jshint esversion: 6 */
const { MAX_RECORD } = require("./airtable");

const TERMS_HOST = "https://api.airtable.com/v0/appU0Gx0zVVLeMYUe/";

const termsUrl = new URL(TERMS_HOST + "Terms");
termsUrl.searchParams.append("maxRecords", MAX_RECORD);
termsUrl.searchParams.append("view", "Standard Grid");
termsUrl.searchParams.append("fields", "Alt Names");
termsUrl.searchParams.append("fields", "Definitions");
termsUrl.searchParams.append("fields", "Definition Source Names");
termsUrl.searchParams.append("fields", "Children Names");

const sourcesUrl = new URL(TERMS_HOST + "Definition Source");
sourcesUrl.searchParams.append("maxRecords", MAX_RECORD);
sourcesUrl.searchParams.append("view", "Standard View");

const definitionsUrl = new URL(TERMS_HOST + "Definition");
definitionsUrl.searchParams.append("maxRecords", MAX_RECORD);
definitionsUrl.searchParams.append("view", "Grid by Type");
definitionsUrl.searchParams.append("fields", "Term Name");
definitionsUrl.searchParams.append("fields", "Definition");
definitionsUrl.searchParams.append("fields", "Definition Source Name");
definitionsUrl.searchParams.append("fields", "Alt Names");
definitionsUrl.searchParams.append("fields", "Definition Source Url");

const childrenUrl = new URL(TERMS_HOST + "Term Relationships");
childrenUrl.searchParams.append("maxRecords", MAX_RECORD);
childrenUrl.searchParams.append("view", "Grid view");
childrenUrl.searchParams.append("fields", "Term Name");
childrenUrl.searchParams.append("fields", "Children Names");

const urlMap = new Map();
urlMap.set("terms", termsUrl);
urlMap.set("definitions", definitionsUrl);
urlMap.set("sources", sourcesUrl);
urlMap.set("children", childrenUrl);

function convertDefinitions(records) {
  const sourceMap = new Map();
  const termMap = new Map();
  records.forEach((record) => {
    const termName = record.fields["Term Name"]
      ? record.fields["Term Name"][0]
      : "";
    if (termName) {
      // console.log(termName, ' - ', record.fields.Definition);
      const sourceName = record.fields["Definition Source Name"]
        ? record.fields["Definition Source Name"][0]
        : "";
      const sourceUrl = record.fields["Definition Source Url"]
        ? record.fields["Definition Source Url"][0]
        : "";

      // Add to source map
      if (sourceMap.get(sourceName)) {
        const source = sourceMap.get(sourceName);
        source.definitions.push({
          term: termName,
          definition: record.fields.Definition,
        });
        sourceMap.set(sourceName, source);
      } else {
        sourceMap.set(sourceName, {
          definitions: [
            {
              term: termName,
              definition: record.fields.Definition,
            },
          ],
          url: sourceUrl,
        });
      }

      // Add to terms map
      if (termMap.get(termName)) {
        // term in map
        const term = termMap.get(termName);
        term.definitions.push({
          definition: record.fields.Definition,
          sourceName: sourceName,
          sourceUrl: sourceUrl,
        });
        termMap.set(termName, term);
      } else {
        // term not yet in map
        termMap.set(termName, {
          name: termName,
          definitions: [
            {
              definition: record.fields.Definition,
              sourceName: sourceName,
              sourceUrl: sourceUrl,
            },
          ],
          tags: [],
          types: [],
          altNames: record.fields["Alt Names"]
            ? record.fields["Alt Names"][0]
            : [],
          parents: [],
          children: [],
        });
      }
    } else {
      // No Term Name
    }
  });
  return {
    terms: termMap,
    sources: sourceMap,
  };
}

function convertChildren(records, termMap) {
  const childrenMap = new Map();
  records.forEach((record) => {
    // Add children to term
    const parentName = record.fields["Term Name"][0];
    if (termMap.get(parentName)) {
      record.fields["Children Names"].forEach((child) => {
        termMap.get(parentName).children.push(child);
      });
    } else {
      // Term not found - may have no definitions - add term
      termMap.set(parentName, {
        definitions: [],
        tags: [],
        types: [],
        altNames: [],
        parents: [],
        children: record.fields["Children Names"],
      });
    }
    if (childrenMap.get(parentName)) {
      console.log("already in map???", record.fields);
    } else {
      childrenMap.set(parentName, {
        name: parentName,
        children: record.fields["Children Names"],
      });
    }
  });
  // For each possible child...
  termMap.forEach((childVal, childKey) => {
    // Add parents to term
    childrenMap.forEach((parentVal, parentKey) => {
      if (parentVal.children.includes(childKey)) {
        // Found a parent
        childVal.parents.push(parentKey);
      }
    });
  });
  return {
    children: childrenMap,
  };
}

exports.urlMap = urlMap;

exports.termsUrl = termsUrl;
exports.definitionsUrl = definitionsUrl;
exports.childrenUrl = childrenUrl;
exports.sourcesUrl = sourcesUrl;

exports.convertDefinitions = convertDefinitions;
exports.convertChildren = convertChildren;
