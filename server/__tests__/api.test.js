const request = require('supertest');
const fs = require('fs');
const { createApp } = require('../src/app');
const { MESSAGES_PATH, RESUME_PATH } = require('../src/services/portfolioService');

describe('Portfolio API', () => {
  const app = createApp();
  let originalMessages;

  beforeAll(() => {
    if (fs.existsSync(MESSAGES_PATH)) {
      originalMessages = fs.readFileSync(MESSAGES_PATH, 'utf8');
    }
  });

  afterAll(() => {
    if (originalMessages !== undefined) {
      fs.writeFileSync(MESSAGES_PATH, originalMessages, 'utf8');
    } else if (fs.existsSync(MESSAGES_PATH)) {
      fs.writeFileSync(MESSAGES_PATH, '[]', 'utf8');
    }
  });

  test('GET /api/health returns ok', async () => {
    const response = await request(app).get('/api/health');
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.status).toBe('ok');
  });

  test('GET /api/portfolio returns profile content', async () => {
    const response = await request(app).get('/api/portfolio');
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.profile.name).toBeTruthy();
    expect(Array.isArray(response.body.data.projects)).toBe(true);
  });

  test('POST /api/contact rejects invalid payload', async () => {
    const response = await request(app)
      .post('/api/contact')
      .send({ name: 'A', email: 'bad', message: 'short' });

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
  });

  test('POST /api/contact stores a valid message', async () => {
    const response = await request(app)
      .post('/api/contact')
      .send({
        name: 'Jordan Recruiter',
        email: 'jordan@example.com',
        message: 'I would like to discuss an opportunity with your team.',
      });

    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(typeof response.body.emailSent).toBe('boolean');

    const stored = JSON.parse(fs.readFileSync(MESSAGES_PATH, 'utf8'));
    expect(stored.some((item) => item.email === 'jordan@example.com')).toBe(true);
  });

  test('GET /api/contact/messages requires a valid key', async () => {
    const denied = await request(app).get('/api/contact/messages');
    expect(denied.status).toBe(401);

    process.env.MESSAGES_VIEW_KEY = 'test-inbox-key';
    const allowed = await request(app).get('/api/contact/messages?key=test-inbox-key');
    expect(allowed.status).toBe(200);
    expect(Array.isArray(allowed.body.data)).toBe(true);
  });

  test('GET /api/resume downloads PDF when present', async () => {
    expect(fs.existsSync(RESUME_PATH)).toBe(true);
    const response = await request(app).get('/api/resume');
    expect(response.status).toBe(200);
    expect(response.headers['content-type']).toMatch(/pdf/);
  });

  test('GET /api/resume returns 404 when missing', async () => {
    const backupPath = `${RESUME_PATH}.bak`;
    fs.renameSync(RESUME_PATH, backupPath);

    try {
      const response = await request(app).get('/api/resume');
      expect(response.status).toBe(404);
      expect(response.body.success).toBe(false);
    } finally {
      fs.renameSync(backupPath, RESUME_PATH);
    }
  });

  test('unknown route returns 404', async () => {
    const response = await request(app).get('/api/missing');
    expect(response.status).toBe(404);
  });
});
