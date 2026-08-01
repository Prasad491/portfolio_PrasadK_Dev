const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const apiRouter = require('./routes/api');
const { notFoundHandler, errorHandler } = require('./middleware/errorHandler');

function createApp() {
  const app = express();
  const clientOrigin = process.env.CLIENT_ORIGIN || 'http://localhost:5173';

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
