const express = require('express');
const {
  health,
  getPortfolioContent,
  postContact,
  getContactMessages,
  downloadResume,
} = require('../controllers/portfolioController');
const { createContactRateLimiter } = require('../middleware/rateLimit');

const router = express.Router();
const contactRateLimiter = createContactRateLimiter();

router.get('/health', health);
router.get('/portfolio', getPortfolioContent);
router.post('/contact', contactRateLimiter, postContact);
router.get('/contact/messages', getContactMessages);
router.get('/resume', downloadResume);

module.exports = router;
