const nodemailer = require('nodemailer');
const { db } = require('../config/firebase');
const dns = require('dns');

// Force IPv4 for SMTP connections to avoid ENETUNREACH errors
if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder('ipv4first');
}

const sendEmail = async (to, subject, text, html, attachments = []) => {
  try {
    console.log(`Starting email delivery to: ${to}`);
    
    // Try to load SMTP settings from Firestore first, fall back to .env
    let smtpUser = process.env.SMTP_USER;
    let smtpPass = process.env.SMTP_PASS;
    let smtpService = process.env.SMTP_SERVICE || 'gmail';

    const settingsSnap = await db.collection('settings').limit(1).get();
    if (!settingsSnap.empty) {
      const settings = settingsSnap.docs[0].data();
      smtpUser = settings?.smtpUser || smtpUser;
      smtpPass = settings?.smtpPass || smtpPass;
      smtpService = settings?.smtpService || smtpService;
    }

    if (!smtpUser || !smtpPass) {
      console.warn('⚠️ SMTP settings not configured (User/Pass missing). Skipping email.');
      return;
    }

    const transporter = nodemailer.createTransport({
      service: smtpService,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      family: 4 // Force IPv4
    });

    const mailOptions = {
      from: `"Wave Mind Talent Hub" <${smtpUser}>`,
      to,
      subject,
      text,
      html,
      attachments,
    };

    console.log(`Attempting to send email via ${smtpService}...`);
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent successfully to ${to}`);
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    // Log more details if it's an auth error
    if (error.code === 'EAUTH') {
      console.error('SMTP Authentication failed. Please check credentials and "App Password" settings.');
    }
  }
};

module.exports = sendEmail;
