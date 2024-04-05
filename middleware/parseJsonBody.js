const fs = require('fs');
const path = require('path');

function parseJsonBody(req, res, next) {
  let data = '';

  // Listen for incoming data chunks
  req.on('data', chunk => {
    data += chunk;
  });

  // When all data has been received
  req.on('end', () => {
    try {
      // Parse the JSON data
      if (data) {
        req.body = JSON.parse(data);
      }

      // Log the parsed JSON data
      const logData = {
        timestamp: new Date().toISOString(),
        data: req.body
      };

      const logFilePath = path.join(__dirname, '..', 'logs', 'json_data_logs.txt');
      fs.appendFile(logFilePath, JSON.stringify(logData) + '\n', err => {
        if (err) {
          console.error('Error writing JSON data to log file:', err);
          // Pass the error to the error handling middleware
          next(err);
          return;
        }
        console.log('JSON data logged successfully.');
      });

      // Move to the next middleware
      next();
    } catch (error) {
      // If parsing fails, pass the error to the error handling middleware
      console.error('Error parsing JSON data:', error);
      next(error);
    }
  });

  // Error handling for the request stream
  req.on('error', error => {
    console.error('Error receiving request data:', error);
    next(error);
  });
}

module.exports = parseJsonBody;
