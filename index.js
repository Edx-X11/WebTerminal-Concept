// index.js

// Import the server module
const app = require('./server');

// Start the server
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// Handle server startup errors
server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use`);
  } else {
    console.error('An error occurred while starting the server:', err);
  }
  process.exit(1); // Terminate the process
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('Received SIGINT signal. Shutting down gracefully...');
  server.close(() => {
    console.log('Server gracefully shut down');
    process.exit(0);
  });
});

// Handle uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error('Uncaught exception:', err);
  server.close(() => {
    process.exit(1);
  });
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled promise rejection:', reason);
  server.close(() => {
    process.exit(1);
  });
});
