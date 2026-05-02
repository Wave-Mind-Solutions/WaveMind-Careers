const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  phone: { type: String, required: true },
  roleApplied: { type: mongoose.Schema.Types.ObjectId, ref: 'Job' },
  roleType: { type: String, enum: ['Internship', 'Full-Time'] },
  skills: [String],
  experience: String,
  resumeUrl: String,
  resumeMetadata: {
    public_id: String,
    format: String,
    original_name: String
  },
  portfolioUrl: String,
  source: { type: String, default: 'direct' },
  status: { 
    type: String, 
    enum: ['Applied', 'Screening', 'Shortlisted', 'Interview', 'Selected', 'Offer Sent', 'Joined', 'Rejected'],
    default: 'Applied'
  },
  notes: String,
  activityTimeline: [{
    status: String,
    updatedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    date: { type: Date, default: Date.now },
    comment: String
  }],
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Candidate', candidateSchema);
