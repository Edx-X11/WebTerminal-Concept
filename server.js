const express = require('express');
const logger = require('./middleware/logger');
const parseJsonBody = require('./middleware/parseJsonBody');
const parseFormDataBody = require('./middleware/parseFormDataBody');
const errorHandler = require('./middleware/errorHandler');
const path = require('path'); // Import the path module

// Create an Express application
const app = express();

// Middleware chain
app.use(logger);
app.use(express.json()); // Middleware to parse JSON bodies
app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies
app.use(parseFormDataBody);

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Route handlers
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html')); // Serve the 'index.html' file
});

// Example route to handle data
app.get('/data', (req, res) => {
  // Process data and send response
  res.json({ message: 'Data from the server' });
});

// Error handling middleware
app.use(errorHandler);

// Export the app object
module.exports = app;
