const { db } = require('../config/firebase');

// Normalise Firestore doc — expose BOTH id and _id so the frontend (_id) works unchanged
const toDoc = (doc) => {
  const data = doc.data();
  if (!data) return null;
  return { _id: doc.id, id: doc.id, ...data };
};

// Sort helper
const byCreatedAtDesc = (a, b) => {
  const dateA = a.createdAt ? new Date(a.createdAt) : 0;
  const dateB = b.createdAt ? new Date(b.createdAt) : 0;
  return dateB - dateA;
};

exports.getJobs = async (req, res) => {
  try {
    const snap = await db.collection('jobs').get();
    const jobs = snap.docs
      .map(toDoc)
      .filter(j => j !== null)
      .filter((j) => j.active === true)
      .sort(byCreatedAtDesc);
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getAdminJobs = async (req, res) => {
  try {
    const snap = await db.collection('jobs').get();
    const jobs = snap.docs
      .map(toDoc)
      .filter(j => j !== null)
      .sort(byCreatedAtDesc);
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createJob = async (req, res) => {
  try {
    const jobData = {
      ...req.body,
      active: req.body.active ?? true,
      createdAt: new Date().toISOString(),
    };
    const docRef = await db.collection('jobs').add(jobData);
    res.status(201).json({ _id: docRef.id, id: docRef.id, ...jobData });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.updateJob = async (req, res) => {
  try {
    const docRef = db.collection('jobs').doc(req.params.id);
    await docRef.update(req.body);
    const updated = await docRef.get();
    res.json(toDoc(updated));
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteJob = async (req, res) => {
  try {
    await db.collection('jobs').doc(req.params.id).delete();
    res.json({ message: 'Job deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
