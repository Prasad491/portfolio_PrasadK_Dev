const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const access = promisify(fs.access);

const DATA_DIR = path.join(__dirname, '../data');
const PORTFOLIO_PATH = path.join(DATA_DIR, 'portfolio.json');
// Vercel serverless FS is read-only except /tmp — keep messages writable there.
const MESSAGES_PATH = process.env.VERCEL
  ? path.join('/tmp', 'portfolio-messages.json')
  : path.join(DATA_DIR, 'messages.json');
const RESUME_PATH = path.join(__dirname, '../assets/resume/latest.pdf');

async function getPortfolio() {
  const raw = await readFile(PORTFOLIO_PATH, 'utf8');
  return JSON.parse(raw);
}

async function ensureMessagesFile() {
  try {
    await access(MESSAGES_PATH, fs.constants.F_OK);
  } catch {
    await writeFile(MESSAGES_PATH, '[]', 'utf8');
  }
}

async function saveContactMessage(entry) {
  await ensureMessagesFile();
  const raw = await readFile(MESSAGES_PATH, 'utf8');
  const messages = JSON.parse(raw || '[]');

  if (!Array.isArray(messages)) {
    throw new Error('Messages store is corrupted');
  }

  messages.push(entry);
  await writeFile(MESSAGES_PATH, JSON.stringify(messages, null, 2), 'utf8');
  return entry;
}

async function listContactMessages() {
  await ensureMessagesFile();
  const raw = await readFile(MESSAGES_PATH, 'utf8');
  const messages = JSON.parse(raw || '[]');

  if (!Array.isArray(messages)) {
    throw new Error('Messages store is corrupted');
  }

  return [...messages].reverse();
}

async function resumeExists() {
  try {
    await access(RESUME_PATH, fs.constants.F_OK);
    return true;
  } catch {
    return false;
  }
}

function getResumePath() {
  return RESUME_PATH;
}

module.exports = {
  getPortfolio,
  saveContactMessage,
  listContactMessages,
  resumeExists,
  getResumePath,
  PORTFOLIO_PATH,
  MESSAGES_PATH,
  RESUME_PATH,
};
