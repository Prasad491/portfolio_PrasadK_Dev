const HTTP = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  NOT_FOUND: 404,
  TOO_MANY_REQUESTS: 429,
  INTERNAL_ERROR: 500,
};

const CONTACT_LIMITS = {
  NAME_MIN: 2,
  NAME_MAX: 100,
  EMAIL_MAX: 254,
  MESSAGE_MIN: 10,
  MESSAGE_MAX: 2000,
};

const MESSAGES = {
  HEALTH_OK: 'ok',
  CONTACT_SUCCESS: 'Message received. Thank you for reaching out.',
  CONTACT_INVALID: 'Please provide a valid name, email, and message.',
  CONTACT_RATE_LIMIT: 'Too many messages. Please try again later.',
  CONTACT_UNAUTHORIZED: 'Unauthorized. Provide a valid inbox access key.',
  PORTFOLIO_ERROR: 'Unable to load portfolio content.',
  RESUME_NOT_FOUND: 'Resume file is not available yet.',
  ROUTE_NOT_FOUND: 'Route not found.',
  INTERNAL_ERROR: 'Something went wrong. Please try again later.',
};

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

module.exports = {
  HTTP,
  CONTACT_LIMITS,
  MESSAGES,
  EMAIL_PATTERN,
};
