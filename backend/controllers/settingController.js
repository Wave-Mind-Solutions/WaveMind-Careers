const { db } = require('../config/firebase');

exports.getSettings = async (req, res) => {
  try {
    const snap = await db.collection('settings').limit(1).get();

    if (snap.empty) {
      // Create default settings document
      const defaults = {
        smtpHost: '',
        smtpPort: '',
        smtpUser: '',
        smtpPass: '',
        emailTemplates: {
          applicationConfirmation: { subject: '', body: '' },
          shortlisted: { subject: '', body: '' },
          interviewScheduled: { subject: '', body: '' },
          selected: { subject: '', body: '' },
          offerLetter: { subject: '', body: '' },
        },
        offerLetterTemplate: { content: '', placeholders: [] },
        updatedAt: new Date().toISOString(),
      };
      const docRef = await db.collection('settings').add(defaults);
      return res.json({ _id: docRef.id, id: docRef.id, ...defaults });
    }

    const doc = snap.docs[0];
    res.json({ _id: doc.id, id: doc.id, ...doc.data() });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateSettings = async (req, res) => {
  try {
    const snap = await db.collection('settings').limit(1).get();

    const updateData = { ...req.body, updatedAt: new Date().toISOString() };

    if (snap.empty) {
      const docRef = await db.collection('settings').add(updateData);
      return res.json({ _id: docRef.id, id: docRef.id, ...updateData });
    }

    const docRef = snap.docs[0].ref;
    await docRef.update(updateData);
    const updated = await docRef.get();
    res.json({ _id: updated.id, id: updated.id, ...updated.data() });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
