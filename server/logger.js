/*jshint esversion: 6 */

const DEBUG_ENABLED = true;
const TRACE_ENABLED = true;

function buildLogMessage(args) {
  var logMessage = '';
  for (var i=0; i < args.length; i++) {
    logMessage += args[i] + ' ';
  }
  return logMessage;
}

exports.debug = function() {
  if (DEBUG_ENABLED) {
    console.log("DEBUG", buildLogMessage(arguments));
  }
};


exports.trace = function() {
  if (TRACE_ENABLED) {
    console.log("TRACE", buildLogMessage(arguments));
  }
};
