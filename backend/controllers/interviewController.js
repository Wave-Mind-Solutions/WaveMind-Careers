const { db } = require('../config/firebase');
const sendEmail = require('../utils/email');

const toDoc = (doc) => ({ _id: doc.id, id: doc.id, ...doc.data() });

exports.scheduleInterview = async (req, res) => {
  try {
    const { candidateId, jobId, interviewerId, date, time, meetingLink, notes } = req.body;

    const interviewData = {
      candidate: candidateId,
      job: jobId,
      interviewer: interviewerId,
      date,
      time,
      meetingLink: meetingLink || '',
      notes: notes || '',
      status: 'Scheduled',
      createdAt: new Date().toISOString(),
    };

    const docRef = await db.collection('interviews').add(interviewData);

    // Update candidate status to 'Interview'
    await db.collection('candidates').doc(candidateId).update({ status: 'Interview' });

    // Send email notification
    try {
      const candidateSnap = await db.collection('candidates').doc(candidateId).get();
      const candidate = candidateSnap.data();

      const settingsSnap = await db.collection('settings').limit(1).get();
      if (!settingsSnap.empty) {
        const settings = settingsSnap.docs[0].data();
        const template = settings?.emailTemplates?.interviewScheduled;
        if (template && candidate) {
          let body = template.body.replace('{{name}}', candidate.name);
          body = body.replace('{{date}}', date).replace('{{time}}', time).replace('{{link}}', meetingLink || '');
          sendEmail(candidate.email, template.subject, body, body);
        }
      }
    } catch (emailErr) {
      console.error('Email notification failed:', emailErr);
    }

    res.status(201).json({ _id: docRef.id, id: docRef.id, ...interviewData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getInterviews = async (req, res) => {
  try {
    const snap = await db.collection('interviews').get();

    // Firestore doesn't support JOINs — fetch related docs in parallel
    const interviews = await Promise.all(
      snap.docs.map(async (doc) => {
        const data = doc.data();

        const [candidateSnap, jobSnap, interviewerSnap] = await Promise.all([
          data.candidate ? db.collection('candidates').doc(data.candidate).get() : null,
          data.job ? db.collection('jobs').doc(data.job).get() : null,
          data.interviewer ? db.collection('users').doc(data.interviewer).get() : null,
        ]);

        return {
          _id: doc.id,
          id: doc.id,
          ...data,
          candidate: candidateSnap?.exists ? { _id: candidateSnap.id, id: candidateSnap.id, ...candidateSnap.data() } : data.candidate,
          job: jobSnap?.exists ? { _id: jobSnap.id, id: jobSnap.id, ...jobSnap.data() } : data.job,
          interviewer: interviewerSnap?.exists
            ? { _id: interviewerSnap.id, id: interviewerSnap.id, name: interviewerSnap.data().name, email: interviewerSnap.data().email }
            : data.interviewer,
        };
      })
    );

    // Sort in memory — avoids needing a Firestore composite index
    interviews.sort((a, b) => (b.createdAt > a.createdAt ? 1 : -1));
    res.json(interviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
