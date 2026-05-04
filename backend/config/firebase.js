const admin = require('firebase-admin');
require('dotenv').config();
const dns = require('dns');

// Force IPv4 for Firebase connections to avoid ENETUNREACH errors on restricted networks
if (dns.setDefaultResultOrder) {
  dns.setDefaultResultOrder('ipv4first');
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      project_id: process.env.FIREBASE_PROJECT_ID,
      client_email: process.env.FIREBASE_CLIENT_EMAIL,
      private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const db = admin.firestore();
// Enable ignoring undefined properties globally to prevent crashes
db.settings({ ignoreUndefinedProperties: true });

module.exports = { admin, db };
