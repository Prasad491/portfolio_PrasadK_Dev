const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const apiRouter = require('./routes/api');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

function createApp() {
  const app = express();
  // Reflect request origin when CLIENT_ORIGIN is unset (same-deploy Vercel + local flex).
  const clientOrigin = process.env.CLIENT_ORIGIN || true;

  // Required on Vercel so express-rate-limit accepts X-Forwarded-For.
  app.set('trust proxy', 1);

  app.use(helmet());
  app.use(
    cors({
      origin: clientOrigin,
      methods: ['GET', 'POST', 'OPTIONS'],
    })
  );
  app.use(express.json({ limit: '16kb' }));

  app.use('/api', apiRouter);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}

module.exports = {
  createApp,
};
