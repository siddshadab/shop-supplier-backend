var logger = require("./logger.js");
var config = require("../config");


const errorHandler = (err, req, res, next) => {
  logger.error('I caught the error', err);
  if (!err.isOperational) {
    if (config.NODE_ENV !== 'dev') {
      logger.error(
        'An unexpected error occurred please restart the application!',
        `\nError: ${err.message} Stack: ${err.stack}`
      );
      process.exit(1);
    }
  }
  logger.error(
    `${err.statusCode || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip} - Stack: ${err.stack}`
  );
  err.stack = err.stack || '';
  const errorDetails = {
    message: err.message,
    statusCode: err.statusCode || 500,
    data: err.data,
    stack: err.stack
  };
  if (config.NODE_ENV === 'prod') {
    delete errorDetails.stack;
  }
  return res.status(err.statusCode || 500).jsend.error(errorDetails);
};

module.exports = errorHandler;
