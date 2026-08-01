const { validateContactPayload } = require('../src/utils/validation');

describe('validateContactPayload', () => {
  test('accepts a valid payload', () => {
    const result = validateContactPayload({
      name: 'Sam Lee',
      email: 'sam@example.com',
      message: 'Hello, I enjoyed your portfolio and would love to connect.',
    });

    expect(result.isValid).toBe(true);
    expect(result.data.email).toBe('sam@example.com');
  });

  test('rejects missing fields', () => {
    const result = validateContactPayload({});
    expect(result.isValid).toBe(false);
    expect(result.errors).toEqual(expect.arrayContaining(['name', 'email', 'message']));
  });

  test('strips angle brackets from input', () => {
    const result = validateContactPayload({
      name: '<script>Sam</script>',
      email: 'sam@example.com',
      message: 'This is a sufficiently long and safe message.',
    });

    expect(result.data.name.includes('<')).toBe(false);
    expect(result.data.name.includes('>')).toBe(false);
  });
});
