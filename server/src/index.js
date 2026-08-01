require('dotenv').config();

const { createApp } = require('./app');

const port = Number(process.env.PORT) || 5000;
const app = createApp();

app.listen(port, () => {
  // Server startup confirmation for operators
  process.stdout.write(`Portfolio API listening on port ${port}\n`);
});
