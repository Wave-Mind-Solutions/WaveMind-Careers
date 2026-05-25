const { Resend } = require('resend');
const { db } = require('../config/firebase');

/**
 * Sends an email using the Resend API.
 * Falls back to .env if Firestore settings are missing.
 * Always resolves — never throws — so callers don't need try/catch.
 */
const sendEmail = async (to, subject, text, html, attachments = []) => {
  try {
    console.log(`[Email] Starting delivery via Resend to: ${to}`);

    // 1. Load Resend API key: Firestore takes priority, .env as fallback
    let apiKey = process.env.RESEND_API_KEY;

    try {
      const settingsSnap = await db.collection('settings').limit(1).get();
      if (!settingsSnap.empty) {
        const settings = settingsSnap.docs[0].data();
        // Only override if value is actually saved and non-empty
        if (settings?.resendApiKey) {
          apiKey = settings.resendApiKey;
        }
      }
    } catch (dbErr) {
      console.warn('[Email] Could not fetch Resend settings from Firestore, using .env:', dbErr.message);
    }

    if (!apiKey) {
      console.warn('[Email] ⚠️  Resend API Key missing — skipping email send.');
      return { success: false, reason: 'missing_api_key' };
    }

    // 2. Initialize Resend client
    const resend = new Resend(apiKey);

    // 3. Format attachments for Resend (expects objects with filename and content)
    const formattedAttachments = attachments.map(att => ({
      filename: att.filename,
      content: att.content,
    }));

    // 4. Send email
    let sender = 'onboarding@resend.dev';
    if (process.env.RESEND_FROM_EMAIL) {
      sender = process.env.RESEND_FROM_EMAIL;
    }

    console.log(`[Email] Sending via Resend as "${sender}"...`);

    const response = await resend.emails.send({
      from: `Wave Mind Talent Hub <${sender}>`,
      to,
      subject,
      text,
      html,
      ...(formattedAttachments.length > 0 && { attachments: formattedAttachments }),
    });

    if (response.error) {
      console.error(`[Email] ❌ Resend API Error:`, response.error.message);
      return { success: false, reason: response.error.message };
    }

    console.log(`[Email] ✅ Sent successfully via Resend — id: ${response.data.id}`);
    return { success: true, messageId: response.data.id };

  } catch (error) {
    console.error(`[Email] ❌ Failed to send to ${to}:`, error.message);
    return { success: false, reason: error.message };
  }
};

module.exports = sendEmail;
