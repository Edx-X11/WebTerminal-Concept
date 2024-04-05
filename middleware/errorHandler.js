// errorHandler.js

// Function to handle errors and send an appropriate response
function errorHandler(err, req, res, next) {
  console.error(err); // Log the error to the console for debugging

  // Set the status code and error message based on the type of error
  let statusCode = 500; // Internal Server Error by default
  let errorMessage = "Internal Server Error"; // Default error message

  switch (err.statusCode) {
    case 404:
      statusCode = 404;
      errorMessage = "Not Found";
      break;
    case 500:
      statusCode = 500;
      errorMessage = "Internal Server Error";
      break;
    case 503:
      statusCode = 503;
      errorMessage = "Service Unavailable";
      break;
    case 400:
      statusCode = 400;
      errorMessage = "Bad Request";
      break;
    case 504:
      statusCode = 504;
      errorMessage = "Gateway Timeout";
      break;
    case 401:
      statusCode = 401;
      errorMessage = "Unauthorized";
      break;
    case 403:
      statusCode = 403;
      errorMessage = "Forbidden";
      break;
    case 502:
      statusCode = 502;
      errorMessage = "Bad Gateway";
      break;
    case 301:
      statusCode = 301;
      errorMessage = "Moved Permanently";
      break;
    case 408:
      statusCode = 408;
      errorMessage = "Request Time-out";
      break;
    case 429:
      statusCode = 429;
      errorMessage = "Too Many Requests";
      break;
    case 406:
      statusCode = 406;
      errorMessage = "Not Acceptable";
      break;
    case 412:
      statusCode = 412;
      errorMessage = "Precondition Failed";
      break;
    case 415:
      statusCode = 415;
      errorMessage = "Unsupported Media Type";
      break;
    case 411:
      statusCode = 411;
      errorMessage = "Length Required";
      break;
    case 413:
      statusCode = 413;
      errorMessage = "Payload Too Large";
      break;
    case 451:
      statusCode = 451;
      errorMessage = "Unavailable For Legal Reasons";
      break;
    default:
      statusCode = 500;
      errorMessage = "Internal Server Error";
  }

  // Prepare the error response object
  const errorResponse = {
    error: {
      message: err.message || errorMessage, // Use the error message if available, otherwise default to the error message corresponding to the status code
      status: statusCode, // Set the status code in the response
    },
  };

  // Send the error response as JSON
  res.writeHead(statusCode, { "Content-Type": "application/json" });
  res.end(JSON.stringify(errorResponse));
}

module.exports = errorHandler;
