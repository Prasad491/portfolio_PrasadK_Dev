const { CONTACT_LIMITS, EMAIL_PATTERN } = require('../constants');

function sanitizeText(value) {
  if (typeof value !== 'string') {
    return '';
  }

  return value.trim().replace(/[<>]/g, '');
}

function validateContactPayload(body = {}) {
  const name = sanitizeText(body.name);
  const email = sanitizeText(body.email).toLowerCase();
  const message = sanitizeText(body.message);

  const errors = [];

  if (name.length < CONTACT_LIMITS.NAME_MIN || name.length > CONTACT_LIMITS.NAME_MAX) {
    errors.push('name');
  }

  if (
    !email ||
    email.length > CONTACT_LIMITS.EMAIL_MAX ||
    !EMAIL_PATTERN.test(email)
  ) {
    errors.push('email');
  }

  if (
    message.length < CONTACT_LIMITS.MESSAGE_MIN ||
    message.length > CONTACT_LIMITS.MESSAGE_MAX
  ) {
    errors.push('message');
  }

  return {
    isValid: errors.length === 0,
    errors,
    data: { name, email, message },
  };
}

module.exports = {
  sanitizeText,
  validateContactPayload,
};
