const { HTTP, MESSAGES } = require('../constants');

function notFoundHandler(req, res) {
  res.status(HTTP.NOT_FOUND).json({
    success: false,
    message: MESSAGES.ROUTE_NOT_FOUND,
  });
}

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    next(err);
    return;
  }

  const status = err.status || HTTP.INTERNAL_ERROR;
  res.status(status).json({
    success: false,
    message: err.publicMessage || MESSAGES.INTERNAL_ERROR,
  });
}

module.exports = {
  notFoundHandler,
  errorHandler,
};
