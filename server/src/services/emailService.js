const nodemailer = require('nodemailer');

function isEmailConfigured() {
  return Boolean(
    process.env.SMTP_HOST &&
      process.env.SMTP_USER &&
      process.env.SMTP_PASS &&
      process.env.CONTACT_TO_EMAIL
  );
}

async function sendContactEmail(entry) {
  if (!isEmailConfigured()) {
    return {
      sent: false,
      reason: 'Email is not configured. Message was stored locally only.',
    };
  }

  const port = Number(process.env.SMTP_PORT) || 587;
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  await transporter.sendMail({
    from: process.env.SMTP_FROM || process.env.SMTP_USER,
    to: process.env.CONTACT_TO_EMAIL,
    replyTo: entry.email,
    subject: `Portfolio contact from ${entry.name}`,
    text: [
      `Name: ${entry.name}`,
      `Email: ${entry.email}`,
      `Received: ${entry.receivedAt}`,
      '',
      entry.message,
    ].join('\n'),
  });

  return {
    sent: true,
    reason: 'Email notification sent.',
  };
}

module.exports = {
  isEmailConfigured,
  sendContactEmail,
};
