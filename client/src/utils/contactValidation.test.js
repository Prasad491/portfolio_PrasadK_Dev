import { describe, expect, test } from 'vitest';
import { validateContactForm } from '../utils/contactValidation';

describe('validateContactForm', () => {
  test('accepts valid input', () => {
    const result = validateContactForm({
      name: 'Taylor',
      email: 'taylor@example.com',
      message: 'Interested in chatting about an open role on your team.',
    });

    expect(result.isValid).toBe(true);
  });

  test('flags invalid fields', () => {
    const result = validateContactForm({
      name: 'T',
      email: 'not-an-email',
      message: 'Too short',
    });

    expect(result.isValid).toBe(false);
    expect(result.errors.name).toBe(true);
    expect(result.errors.email).toBe(true);
    expect(result.errors.message).toBe(true);
  });
});
