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

    const transporterConfig = {
      family: 4, // Force IPv4
      lookup: (hostname, options, callback) => {
        dns.lookup(hostname, { family: 4 }, callback);
      },
      connectionTimeout: 30000, // 30 seconds
      greetingTimeout: 30000,
      socketTimeout: 30000,
    };

    if (smtpService === 'gmail' || smtpUser.endsWith('@gmail.com')) {
      transporterConfig.host = 'smtp.gmail.com';
      transporterConfig.port = 587;
      transporterConfig.secure = false; // STARTTLS
      transporterConfig.pool = true;
    } else {
      transporterConfig.service = smtpService;
    }

    transporterConfig.auth = {
      user: smtpUser,
      pass: smtpPass,
    };

    const transporter = nodemailer.createTransport(transporterConfig);

    const mailOptions = {
      from: `"Wave Mind Talent Hub" <${smtpUser}>`,
      to,
      subject,
      text,
      html,
      attachments,
    };

    console.log(`Attempting to send email via ${transporterConfig.host || transporterConfig.service} (Port: ${transporterConfig.port || 'default'}, Secure: ${transporterConfig.secure})...`);
    await transporter.sendMail(mailOptions);
    console.log(`✅ Email sent successfully to ${to}`);
  } catch (error) {
    console.error('❌ Error sending email:', error.message);
    if (error.code === 'ETIMEDOUT') {
      console.error('Connection timed out. This often happens if the SMTP port is blocked by a firewall or ISP.');
    }
    // Log more details if it's an auth error
    if (error.code === 'EAUTH') {
      console.error('SMTP Authentication failed. Please check credentials and "App Password" settings.');
    }
  }
};

module.exports = sendEmail;
