const nodemailer = require('nodemailer');
const dns = require('dns');

// Force IPv4 over IPv6 to prevent ENETUNREACH errors on networks/hosts with broken IPv6
if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder('ipv4first');
}

const { db } = require('../config/firebase');

/**
 * Sends an email using configured SMTP credentials.
 * Falls back to .env if Firestore settings are missing.
 * Always resolves — never throws — so callers don't need try/catch.
 */
const sendEmail = async (to, subject, text, html, attachments = []) => {
  try {
    console.log(`[Email] Starting delivery to: ${to}`);

    // 1. Load SMTP settings: Firestore takes priority, .env as fallback
    let smtpUser = process.env.SMTP_USER;
    let smtpPass = process.env.SMTP_PASS;

    try {
      const settingsSnap = await db.collection('settings').limit(1).get();
      if (!settingsSnap.empty) {
        const settings = settingsSnap.docs[0].data();
        // Only override if values are actually saved and non-empty
        if (settings?.smtpUser) smtpUser = settings.smtpUser;
        if (settings?.smtpPass) smtpPass = settings.smtpPass;
      }
    } catch (dbErr) {
      console.warn('[Email] Could not fetch settings from Firestore, using .env:', dbErr.message);
    }

    if (!smtpUser || !smtpPass) {
      console.warn('[Email] ⚠️  SMTP credentials missing — skipping email send.');
      return { success: false, reason: 'missing_credentials' };
    }

    // 2. Build transporter — use Gmail service shorthand (handles host/port/SSL automatically)
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
      // Force IPv4 to prevent ENETUNREACH on networks with broken IPv6
      family: 4,
      // Generous timeouts for slow Render.com cold starts
      connectionTimeout: 30000,
      greetingTimeout: 30000,
      socketTimeout: 60000,
    });

    const mailOptions = {
      from: `"Wave Mind Talent Hub" <${smtpUser}>`,
      to,
      subject,
      text,
      html,
      ...(attachments.length > 0 && { attachments }),
    };

    console.log(`[Email] Sending via Gmail SMTP as ${smtpUser}...`);
    const info = await transporter.sendMail(mailOptions);
    console.log(`[Email] ✅ Sent successfully to ${to} — messageId: ${info.messageId}`);
    return { success: true, messageId: info.messageId };

  } catch (error) {
    console.error(`[Email] ❌ Failed to send to ${to}:`, error.message);

    if (error.code === 'ETIMEDOUT' || error.code === 'ECONNREFUSED') {
      console.error('[Email] Network error — SMTP port may be blocked by your ISP/firewall.');
    } else if (error.code === 'EAUTH') {
      console.error('[Email] Authentication failed — check Gmail App Password (not account password).');
    }

    // Never throw — email failures should not break the main API response
    return { success: false, reason: error.message };
  }
};

module.exports = sendEmail;
