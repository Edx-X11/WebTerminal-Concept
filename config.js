const fs = require('fs');
const path = require('path');

// Function to check if a file exists
function fileExists(filePath) {
  try {
    return fs.existsSync(filePath);
  } catch (err) {
    console.error(`Error checking file existence: ${err}`);
    return false;
  }
}

// Function to write log
function writeLog(logFilePath, message) {
  const logsDir = path.join(__dirname, '..', 'logs'); // Adjust the path to the logs folder
  const fullLogFilePath = path.join(logsDir, logFilePath);

  // Ensure the logs directory exists
  fs.mkdirSync(logsDir, { recursive: true });

  // Write log message to the specified log file
  fs.appendFile(fullLogFilePath, `${new Date().toISOString()} - ${message}\n`, (err) => {
    if (err) {
      console.error(`Error writing to log file: ${err}`);
    }
  });
}

// Function to calculate time difference in milliseconds
function calculateTimeDifference(startTime, endTime) {
  return Math.abs(endTime - startTime);
}

// Function to log server startup and shutdown events
function logServerEvent(eventType, eventTime) {
  writeLog('serverEvents.log', `${eventType} at ${eventTime}`);
}

// Function to check if the server has started successfully
function checkServerStartup(startTime) {
  const startupTime = calculateTimeDifference(startTime, Date.now());
  writeLog('startup.log', `Server started successfully. Startup time: ${startupTime}ms`);
}

// Function to log server shutdown
function logServerShutdown(startTime) {
  const shutdownTime = calculateTimeDifference(startTime, Date.now());
  writeLog('shutdown.log', `Server shutdown. Runtime: ${shutdownTime}ms`);
}

// Export functions for checking server startup and logging server events
module.exports = { checkServerStartup, logServerShutdown, logServerEvent };
