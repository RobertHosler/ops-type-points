/*jshint esversion: 6 */

const DEBUG_ENABLED = false;
const TRACE_ENABLED = false;

function buildLogMessage(args) {
  var logMessage = '';
  for (var i = 0; i < args.length; i++) {
    logMessage += args[i] + ' ';
  }
  return logMessage;
}

exports.debug = function () {
  if (DEBUG_ENABLED) {
    console.log("DEBUG", buildLogMessage(arguments));
  }
};


exports.trace = function () {
  if (TRACE_ENABLED) {
    console.log("TRACE", buildLogMessage(arguments));
  }
};


exports.error = function () {
  console.log("ERROR", buildLogMessage(arguments));
};


exports.info = function () {
  console.log("INFO", buildLogMessage(arguments));
};
