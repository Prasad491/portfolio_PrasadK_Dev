import { CONTACT_LIMITS, EMAIL_PATTERN } from '../constants/uiStrings';

export function validateContactForm({ name, email, message }) {
  const errors = {};

  const trimmedName = (name || '').trim();
  const trimmedEmail = (email || '').trim();
  const trimmedMessage = (message || '').trim();

  if (trimmedName.length < CONTACT_LIMITS.NAME_MIN || trimmedName.length > CONTACT_LIMITS.NAME_MAX) {
    errors.name = true;
  }

  if (!EMAIL_PATTERN.test(trimmedEmail)) {
    errors.email = true;
  }

  if (
    trimmedMessage.length < CONTACT_LIMITS.MESSAGE_MIN ||
    trimmedMessage.length > CONTACT_LIMITS.MESSAGE_MAX
  ) {
    errors.message = true;
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
    values: {
      name: trimmedName,
      email: trimmedEmail,
      message: trimmedMessage,
    },
  };
}
