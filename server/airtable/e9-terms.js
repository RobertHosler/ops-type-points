/*jshint esversion: 6 */

const ENNEAGRAM_HOST = "https://api.airtable.com/v0/appTmhBYKYMGTX2y5/";
const MAX_RECORD = 10000;

const nineTypesUrl = new URL(ENNEAGRAM_HOST + "Description");
nineTypesUrl.searchParams.append("maxRecords", MAX_RECORD);
nineTypesUrl.searchParams.append("view", "Grid view");
nineTypesUrl.searchParams.append("fields", "Type Name");
nineTypesUrl.searchParams.append("fields", "Description Set Name");
nineTypesUrl.searchParams.append("fields", "Text");

function convertNineTypes(records) {
  const nineTypesSetMap = new Map();
  records.forEach((record) => {
    const typeName = record.fields["Type Name"]
      ? record.fields["Type Name"][0]
      : "";
    const descriptionSetName = record.fields["Description Set Name"]
      ? record.fields["Description Set Name"][0]
      : "";
    const text = record.fields.Text;
    if (nineTypesSetMap.get(descriptionSetName)) {
      nineTypesSetMap
        .get(descriptionSetName)
        [typeName.toLowerCase()].push(text);
    } else {
      const set = {
        one: [],
        two: [],
        three: [],
        four: [],
        five: [],
        six: [],
        seven: [],
        eight: [],
        nine: [],
      };
      set[typeName.toLowerCase()].push(text);
      nineTypesSetMap.set(descriptionSetName, set);
    }

    // if (nineTypesMap.get(typeName)) {
    //   nineTypesMap.get(typeName)
    // } else {
    //   nineTypesMap.set(typeName, {
    //     descriptions: [
    //       {
    //         set: descriptionSetName,
    //         text: text
    //       }
    //     ]
    //   });

    //   sourceMap.set(sourceName, {
    //     definitions: [{
    //       term: termName,
    //       definition: record.fields.Definition
    //     }],
    //     url: sourceUrl
    //   });
    // }
  });
  return {
      nineTypes: nineTypesSetMap
  };
}

exports.nineTypesUrl = nineTypesUrl;
exports.convert = convertNineTypes;