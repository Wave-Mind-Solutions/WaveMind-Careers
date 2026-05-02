const nodemailer = require('nodemailer');
const Setting = require('../models/Setting');

const sendEmail = async (to, subject, text, html) => {
  try {
    const settings = await Setting.findOne();
    const smtpUser = settings?.smtpUser || process.env.SMTP_USER;
    const smtpPass = settings?.smtpPass || process.env.SMTP_PASS;

    if (!smtpUser || !smtpPass) {
      console.log('SMTP settings not configured in DB or .env. Email not sent.');
      return;
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    const mailOptions = {
      from: `"Wave Mind Talent Hub" <${smtpUser}>`,
      to,
      subject,
      text,
      html,
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${to}`);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

module.exports = sendEmail;
