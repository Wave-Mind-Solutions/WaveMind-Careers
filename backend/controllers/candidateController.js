const { db } = require('../config/firebase');
const sendEmail = require('../utils/email');
const PDFDocument = require('pdfkit');

// Helper to generate PDF Buffer from text
const generatePDFBuffer = (text) => {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument({ margin: 50 });
    let buffers = [];
    doc.on('data', buffers.push.bind(buffers));
    doc.on('end', () => resolve(Buffer.concat(buffers)));
    doc.on('error', reject);

    // Style the PDF
    doc.fontSize(20).text('OFFER LETTER', { align: 'center', underline: true });
    doc.moveDown(2);
    doc.fontSize(12).text(text, {
      align: 'left',
      lineGap: 5
    });
    
    doc.moveDown(4);
    doc.text('Authorized Signature', { align: 'right' });
    doc.text('Wave Mind Solutions', { align: 'right' });
    
    doc.end();
  });
};

// Expose BOTH _id and id — frontend uses _id (Mongoose convention)
const toCandidate = (doc) => {
  const data = doc.data();
  return { _id: doc.id, id: doc.id, ...data };
};

const byCreatedAtDesc = (a, b) => (b.createdAt > a.createdAt ? 1 : -1);

exports.apply = async (req, res) => {
  try {
    const { name, email, phone, roleApplied, roleType, skills, experience, portfolioUrl, source } = req.body;

    // Cloudinary upload handled by multer-storage-cloudinary middleware
    let resumeUrl = '';
    let resumeMetadata = {};

    if (req.file) {
      resumeUrl = req.file.path || '';
      resumeMetadata = {
        public_id: req.file.filename || '',
        format: req.file.format || 'pdf', // Fallback to pdf
        original_name: req.file.originalname || '',
      };
    }

    const candidateData = {
      name,
      email,
      phone,
      roleApplied: roleApplied || null,
      roleType: roleType || null,
      skills: typeof skills === 'string' ? skills.split(',').map((s) => s.trim()) : (skills || []),
      experience: experience || '',
      portfolioUrl: portfolioUrl || '',
      source: source || 'website',
      resumeUrl,
      resumeMetadata,
      status: 'Applied',
      notes: '',
      activityTimeline: [],
      createdAt: new Date().toISOString(),
    };

    const docRef = await db.collection('candidates').add(candidateData);

    // Send confirmation email (non-blocking)
    try {
      const settingsSnap = await db.collection('settings').limit(1).get();
      if (!settingsSnap.empty) {
        const settings = settingsSnap.docs[0].data();
        const template = settings?.emailTemplates?.applicationConfirmation;
        if (template) {
          // Resolve job title for the email
          let jobTitle = roleApplied;
          if (roleApplied) {
            const jobDoc = await db.collection('jobs').doc(roleApplied).get();
            if (jobDoc.exists) {
              jobTitle = jobDoc.data().title;
            }
          }

          const body = template.body
            .replace('{{name}}', name)
            .replace('{{job_title}}', jobTitle || 'our open position');
          await sendEmail(email, template.subject, body, body);
        }
      }
    } catch (emailErr) {
      console.error('Email notification failed but candidate was saved:', emailErr);
    }

    res.status(201).json({ _id: docRef.id, id: docRef.id, ...candidateData });
  } catch (error) {
    console.error('CRITICAL ERROR in apply controller:', error);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
};

exports.getCandidates = async (req, res) => {
  try {
    const { status, source, roleType, page = 1, limit = 10 } = req.query;

    const snap = await db.collection('candidates').get();
    let all = snap.docs.map(toCandidate).sort(byCreatedAtDesc);

    // Populate job titles (in-memory join to avoid composite indexes)
    const jobsSnap = await db.collection('jobs').get();
    const jobsMap = {};
    jobsSnap.forEach(doc => { jobsMap[doc.id] = doc.data().title; });

    all = all.map(candidate => ({
      ...candidate,
      roleApplied: jobsMap[candidate.roleApplied] || candidate.roleApplied || 'General Application'
    }));

    if (status) all = all.filter((c) => c.status === status);
    if (source) all = all.filter((c) => c.source === source);
    if (roleType) all = all.filter((c) => c.roleType === roleType);

    const total = all.length;
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);
    const candidates = all.slice((pageNum - 1) * limitNum, pageNum * limitNum);

    res.json({
      candidates,
      totalPages: Math.ceil(total / limitNum),
      currentPage: pageNum,
      totalCandidates: total,
    });
  } catch (error) {
    console.error('getCandidates error:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.updateStatus = async (req, res) => {
  try {
    const { status, comment } = req.body;
    const docRef = db.collection('candidates').doc(req.params.id);
    const snap = await docRef.get();
    if (!snap.exists) return res.status(404).json({ message: 'Candidate not found' });

    const candidate = snap.data();
    const newEntry = {
      status,
      updatedBy: req.user.id,
      date: new Date().toISOString(),
      comment: comment || '',
    };

    const updatedTimeline = [...(candidate.activityTimeline || []), newEntry];
    await docRef.update({ status, activityTimeline: updatedTimeline });

    const updated = {
      _id: snap.id,
      id: snap.id,
      ...candidate,
      status,
      activityTimeline: updatedTimeline,
    };

    // Trigger email notifications
    try {
      const settingsSnap = await db.collection('settings').limit(1).get();
      if (!settingsSnap.empty) {
        const settings = settingsSnap.docs[0].data();
        const templateMap = { Shortlisted: 'shortlisted', Selected: 'selected', 'Offer Sent': 'offerLetter' };
        const templateKey = templateMap[status];

        if (templateKey && settings?.emailTemplates?.[templateKey]) {
          const template = settings.emailTemplates[templateKey];
          const body = template.body.replace('{{name}}', candidate.name);
          
          let attachments = [];
          if (status === 'Offer Sent' && req.body.offerContent) {
            const pdfBuffer = await generatePDFBuffer(req.body.offerContent);
            attachments.push({
              filename: `Offer_Letter_${candidate.name.replace(/\s+/g, '_')}.pdf`,
              content: pdfBuffer
            });
          }

          await sendEmail(candidate.email, template.subject, body, body, attachments);
        }
      }
    } catch (emailErr) {
      console.error('Email notification failed:', emailErr);
    }

    res.json(updated);
  } catch (error) {
    console.error('updateStatus error:', error);
    res.status(500).json({ message: error.message });
  }
};

exports.getStats = async (req, res) => {
  try {
    const snap = await db.collection('candidates').get();
    const all = snap.docs.map((d) => d.data());

    const total = all.length;
    const internship = all.filter((c) => c.roleType === 'Internship').length;
    const fullTime = all.filter((c) => c.roleType === 'Full-Time').length;
    const selected = all.filter((c) => c.status === 'Selected').length;
    const rejected = all.filter((c) => c.status === 'Rejected').length;

    const sourceMap = {};
    all.forEach((c) => { const s = c.source || 'unknown'; sourceMap[s] = (sourceMap[s] || 0) + 1; });
    const sourceStats = Object.entries(sourceMap).map(([_id, count]) => ({ _id, count }));

    const statusMap = {};
    all.forEach((c) => { const s = c.status || 'unknown'; statusMap[s] = (statusMap[s] || 0) + 1; });
    const statusStats = Object.entries(statusMap).map(([_id, count]) => ({ _id, count }));

    res.json({ total, internship, fullTime, selected, rejected, sourceStats, statusStats });
  } catch (error) {
    console.error('getStats error:', error);
    res.status(500).json({ message: error.message });
  }
};
