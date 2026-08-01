const rateLimit = require('express-rate-limit');
const { MESSAGES } = require('../constants');

function createContactRateLimiter() {
  const windowMs = Number(process.env.CONTACT_RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000;
  const max = Number(process.env.CONTACT_RATE_LIMIT_MAX) || 10;

  return rateLimit({
    windowMs,
    max,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
      success: false,
      message: MESSAGES.CONTACT_RATE_LIMIT,
    },
  });
}

module.exports = {
  createContactRateLimiter,
};
