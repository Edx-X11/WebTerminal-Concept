const multiparty = require("multiparty");
const fs = require("fs");
const path = require("path");

function parseFormDataBody(req, res, next) {
  // Check if the request has a content-type header
  if (
    !req.headers["content-type"] ||
    !req.headers["content-type"].includes("multipart/form-data")
  ) {
    // If content-type header is missing or not 'multipart/form-data', skip parsing form data
    next();
    return;
  }

  const form = new multiparty.Form();

  form.parse(req, (err, fields, files) => {
    if (err) {
      console.error("Error parsing form data:", err);
      next(err);
      return;
    }

    const logData = {
      timestamp: new Date().toISOString(),
      fields: fields,
      files: files,
    };

    const logFilePath = path.join(__dirname, "..", "logs", "form_data_logs.txt");
    fs.appendFile(logFilePath, JSON.stringify(logData) + "\n", (err) => {
      if (err) {
        console.error("Error writing form data to log file:", err);
        next(err);
        return;
      }
      console.log("Form data logged successfully.");
    });

    req.formFields = fields;
    req.formFiles = files;

    next();
  });
}

module.exports = parseFormDataBody;
