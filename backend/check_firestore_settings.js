const { db } = require('./config/firebase');
require('dotenv').config();

const checkSettings = async () => {
    try {
        const settingsSnap = await db.collection('settings').limit(1).get();
        if (settingsSnap.empty) {
            console.log('No settings found in Firestore.');
        } else {
            const settings = settingsSnap.docs[0].data();
            console.log('Settings found in Firestore:', {
                smtpUser: settings.smtpUser,
                smtpService: settings.smtpService,
                // Don't log password for security, just check if it exists
                hasPass: !!settings.smtpPass
            });
        }
    } catch (error) {
        console.error('Error fetching settings from Firestore:', error);
    }
    process.exit(0);
};

checkSettings();
