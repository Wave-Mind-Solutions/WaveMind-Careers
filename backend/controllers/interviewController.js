const Interview = require('../models/Interview');
const Candidate = require('../models/Candidate');
const sendEmail = require('../utils/email');
const Setting = require('../models/Setting');

exports.scheduleInterview = async (req, res) => {
  try {
    const { candidateId, jobId, interviewerId, date, time, meetingLink, notes } = req.body;
    
    const interview = new Interview({
      candidate: candidateId,
      job: jobId,
      interviewer: interviewerId,
      date,
      time,
      meetingLink,
      notes
    });

    await interview.save();

    // Update candidate status
    await Candidate.findByIdAndUpdate(candidateId, { status: 'Interview' });

    // Send email notification
    const candidate = await Candidate.findById(candidateId);
    const settings = await Setting.findOne();
    if (settings && settings.emailTemplates.interviewScheduled) {
      const template = settings.emailTemplates.interviewScheduled;
      let body = template.body.replace('{{name}}', candidate.name);
      body = body.replace('{{date}}', date).replace('{{time}}', time).replace('{{link}}', meetingLink);
      await sendEmail(candidate.email, template.subject, body, body);
    }

    res.status(201).json(interview);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getInterviews = async (req, res) => {
  try {
    const interviews = await Interview.find()
      .populate('candidate')
      .populate('job')
      .populate('interviewer', 'name email');
    res.json(interviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
