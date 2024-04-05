const fs = require('fs').promises;
const path = require('path');

function formatLogEntry(req) {
  const timestamp = new Date().toISOString();
  return `[${timestamp}] ${req.method} ${req.url}`;
}

async function writeLogToFile(logEntry) {
  const logFilePath = path.join(__dirname, '..', 'logs', 'access.log');
  try {
    await fs.appendFile(logFilePath, logEntry + '\n');
  } catch (error) {
    console.error('Error writing to log file:', error);
    throw error;
  }
}

async function logger(req, res, next) {
  const logEntry = formatLogEntry(req);
  console.log(logEntry);

  const logDir = path.join(__dirname, '..', 'logs');
  try {
    await fs.mkdir(logDir, { recursive: true });
    await writeLogToFile(logEntry);
  } catch (error) {
    console.error('Error creating logs directory or writing to log file:', error);
  }

  next();
}

async function handleServerCrash(error) {
  const timestamp = new Date().toISOString();
  const errorMessage = `[${timestamp}] Server crashed: ${error.stack || error}`;
  console.error(errorMessage);

  const errorFilePath = path.join(__dirname, '..', 'logs', 'crash.log');
  try {
    await fs.appendFile(errorFilePath, errorMessage + '\n');
  } catch (err) {
    console.error('Error writing to crash log file:', err);
  }

  cleanupAndShutdown();
}

async function cleanupAndShutdown() {
  console.log('Performing cleanup and graceful shutdown...');

  process.exit(1);
}

process.on('uncaughtException', handleServerCrash);

module.exports = logger;
