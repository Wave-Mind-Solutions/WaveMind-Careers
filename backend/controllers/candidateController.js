const mongoose = require('mongoose');
const Candidate = require('../models/Candidate');
const sendEmail = require('../utils/email');
const Setting = require('../models/Setting');

exports.apply = async (req, res) => {
  try {
    const { name, email, phone, roleApplied, skills, experience, portfolioUrl, source } = req.body;
    let resumeUrl = '';

    if (req.file) {
      resumeUrl = req.file.path; // This is the full URL with extension from Cloudinary
    }

    const candidate = new Candidate({
      name, email, phone, roleApplied: roleApplied && mongoose.Types.ObjectId.isValid(roleApplied) ? roleApplied : null,
      roleType: req.body.roleType,
      skills: typeof skills === 'string' ? skills.split(',').map(s => s.trim()) : skills,
      experience, portfolioUrl, source: source || 'website',
      resumeUrl,
      resumeMetadata: req.file ? {
        public_id: req.file.filename,
        format: req.file.format,
        original_name: req.file.originalname
      } : {}
    });

    console.log('Attempting to save candidate:', candidate);
    await candidate.save();
    console.log('Candidate saved successfully');

    // Send confirmation email
    try {
      const settings = await Setting.findOne();
      if (settings && settings.emailTemplates.applicationConfirmation) {
        const template = settings.emailTemplates.applicationConfirmation;
        const body = template.body.replace('{{name}}', name).replace('{{job_title}}', roleApplied || 'the position');
        await sendEmail(email, template.subject, body, body);
      }
    } catch (emailErr) {
      console.error('Email notification failed but candidate was saved:', emailErr);
    }

    res.status(201).json(candidate);
  } catch (error) {
    console.error('CRITICAL ERROR in apply controller:', error);
    res.status(500).json({ 
      message: 'Internal Server Error', 
      error: error.message,
      details: error.errors // This captures Mongoose validation errors
    });
  }
};

exports.getCandidates = async (req, res) => {
  try {
    const { status, source, roleType, page = 1, limit = 10 } = req.query;
    const query = {};
    if (status) query.status = status;
    if (source) query.source = source;
    if (roleType) query.roleType = roleType;

    const candidates = await Candidate.find(query)
      .populate('roleApplied')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const count = await Candidate.countDocuments(query);

    res.json({
      candidates,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalCandidates: count
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status, comment } = req.body;
    const candidate = await Candidate.findById(req.params.id);
    if (!candidate) return res.status(404).json({ message: 'Candidate not found' });

    candidate.status = status;
    candidate.activityTimeline.push({
      status,
      updatedBy: req.user.id,
      comment
    });

    await candidate.save();

    // Trigger emails based on status
    const settings = await Setting.findOne();
    if (settings && settings.emailTemplates) {
      let templateKey = '';
      if (status === 'Shortlisted') templateKey = 'shortlisted';
      else if (status === 'Selected') templateKey = 'selected';
      else if (status === 'Offer Sent') templateKey = 'offerLetter';

      if (templateKey && settings.emailTemplates[templateKey]) {
        const template = settings.emailTemplates[templateKey];
        const body = template.body.replace('{{name}}', candidate.name);
        await sendEmail(candidate.email, template.subject, body, body);
      }
    }

    res.json(candidate);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const total = await Candidate.countDocuments();
    const internship = await Candidate.countDocuments({ roleType: 'Internship' });
    const fullTime = await Candidate.countDocuments({ roleType: 'Full-Time' });
    const selected = await Candidate.countDocuments({ status: 'Selected' });
    const rejected = await Candidate.countDocuments({ status: 'Rejected' });

    const sourceStats = await Candidate.aggregate([
      { $group: { _id: '$source', count: { $sum: 1 } } }
    ]);

    const statusStats = await Candidate.aggregate([
      { $group: { _id: '$status', count: { $sum: 1 } } }
    ]);

    res.json({ total, internship, fullTime, selected, rejected, sourceStats, statusStats });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
