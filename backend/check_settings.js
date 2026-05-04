const { db } = require('./config/firebase');

async function checkSettings() {
  try {
    const snap = await db.collection('settings').get();
    if (snap.empty) {
      console.log('No settings document found.');
    } else {
      snap.forEach(doc => {
        const data = doc.data();
        console.log('Settings Document Found:', doc.id);
        console.log('SMTP User:', data.smtpUser || 'MISSING');
        console.log('SMTP Pass:', data.smtpPass ? '******' : 'MISSING');
        console.log('Templates:', Object.keys(data.emailTemplates || {}));
      });
    }
    process.exit(0);
  } catch (err) {
    console.error('Check failed:', err);
    process.exit(1);
  }
}

checkSettings();
