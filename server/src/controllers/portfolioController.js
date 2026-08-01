const { HTTP, MESSAGES } = require('../constants');
const { validateContactPayload } = require('../utils/validation');
const {
  getPortfolio,
  saveContactMessage,
  listContactMessages,
  resumeExists,
  getResumePath,
} = require('../services/portfolioService');
const { sendContactEmail, isEmailConfigured } = require('../services/emailService');

async function health(_req, res) {
  res.status(HTTP.OK).json({
    success: true,
    status: MESSAGES.HEALTH_OK,
  });
}

async function getPortfolioContent(_req, res, next) {
  try {
    const portfolio = await getPortfolio();
    res.status(HTTP.OK).json({
      success: true,
      data: portfolio,
    });
  } catch (error) {
    error.publicMessage = MESSAGES.PORTFOLIO_ERROR;
    next(error);
  }
}

async function postContact(req, res, next) {
  try {
    const { isValid, data } = validateContactPayload(req.body);

    if (!isValid) {
      res.status(HTTP.BAD_REQUEST).json({
        success: false,
        message: MESSAGES.CONTACT_INVALID,
      });
      return;
    }

    const entry = {
      ...data,
      receivedAt: new Date().toISOString(),
      userAgent: typeof req.get === 'function' ? req.get('user-agent') || '' : '',
    };

    await saveContactMessage(entry);

    let emailResult = {
      sent: false,
      reason: 'Email is not configured. Message was stored locally only.',
    };

    try {
      emailResult = await sendContactEmail(entry);
    } catch {
      emailResult = {
        sent: false,
        reason: 'Message saved locally, but email delivery failed.',
      };
    }

    res.status(HTTP.CREATED).json({
      success: true,
      message: MESSAGES.CONTACT_SUCCESS,
      emailSent: emailResult.sent,
      deliveryNote: emailResult.reason,
      emailConfigured: isEmailConfigured(),
    });
  } catch (error) {
    next(error);
  }
}

async function getContactMessages(req, res, next) {
  try {
    const configuredKey = process.env.MESSAGES_VIEW_KEY;
    const providedKey = req.query.key || req.get('x-inbox-key');

    if (!configuredKey || providedKey !== configuredKey) {
      res.status(HTTP.UNAUTHORIZED).json({
        success: false,
        message: MESSAGES.CONTACT_UNAUTHORIZED,
      });
      return;
    }

    const messages = await listContactMessages();
    res.status(HTTP.OK).json({
      success: true,
      data: messages,
      emailConfigured: isEmailConfigured(),
    });
  } catch (error) {
    next(error);
  }
}

async function downloadResume(_req, res, next) {
  try {
    const exists = await resumeExists();

    if (!exists) {
      res.status(HTTP.NOT_FOUND).json({
        success: false,
        message: MESSAGES.RESUME_NOT_FOUND,
      });
      return;
    }

    const filename = process.env.RESUME_FILENAME || 'Portfolio-Resume.pdf';
    res.download(getResumePath(), filename);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  health,
  getPortfolioContent,
  postContact,
  getContactMessages,
  downloadResume,
};
