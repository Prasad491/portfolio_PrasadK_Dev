const { createApp } = require('../server/src/app');

// Env vars come from the Vercel dashboard in production.
// Locally, run the Express server via `npm run dev:server` (loads server/.env).
module.exports = createApp();
