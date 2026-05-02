const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  smtpHost: String,
  smtpPort: String,
  smtpUser: String,
  smtpPass: String,
  emailTemplates: {
    applicationConfirmation: {
      subject: String,
      body: String
    },
    shortlisted: {
      subject: String,
      body: String
    },
    interviewScheduled: {
      subject: String,
      body: String
    },
    selected: {
      subject: String,
      body: String
    },
    offerLetter: {
      subject: String,
      body: String
    }
  },
  offerLetterTemplate: {
    content: String,
    placeholders: [String]
  },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Setting', settingSchema);
