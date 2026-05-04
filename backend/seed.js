/**
 * seed.js — Populate Firebase Firestore with initial data
 * Run with:  node backend/seed.js
 */
require('dotenv').config();
const { db } = require('./config/firebase');
const bcrypt = require('bcryptjs');

const seed = async () => {
  console.log('Starting Firebase seed...');

  // ── Users ──────────────────────────────────────────────────────────────────
  const usersSnap = await db.collection('users').get();
  const batch = db.batch();
  usersSnap.docs.forEach((doc) => batch.delete(doc.ref));
  await batch.commit();

  const adminPassword = await bcrypt.hash('password123', 10);
  const adminRef = db.collection('users').doc();
  await adminRef.set({
    name: 'Admin User',
    email: 'admin@wavemind.com',
    password: adminPassword,
    role: 'Admin',
    createdAt: new Date().toISOString(),
  });
  console.log('Admin user created:', adminRef.id);

  // ── Jobs ───────────────────────────────────────────────────────────────────
  const jobsSnap = await db.collection('jobs').get();
  const jobsBatch = db.batch();
  jobsSnap.docs.forEach((doc) => jobsBatch.delete(doc.ref));
  await jobsBatch.commit();

  const jobs = [
    {
      title: 'Full Stack Developer Intern',
      description: 'Looking for a passionate React/Node.js developer to join our team.',
      skills: ['React', 'Node.js', 'Firebase'],
      salary: '₹15,000 - ₹25,000 / month',
      location: 'Remote',
      type: 'Internship',
      active: true,
      createdAt: new Date().toISOString(),
    },
    {
      title: 'Senior UI/UX Designer',
      description: 'Join us to design beautiful SaaS interfaces.',
      skills: ['Figma', 'Adobe XD', 'Prototyping'],
      salary: '₹8,00,000 - ₹12,00,000 / year',
      location: 'Bangalore / Remote',
      type: 'Full-Time',
      active: true,
      createdAt: new Date().toISOString(),
    },
  ];

  for (const job of jobs) {
    const ref = await db.collection('jobs').add(job);
    console.log('Job created:', ref.id, job.title);
  }

  // ── Settings ───────────────────────────────────────────────────────────────
  const settingsSnap = await db.collection('settings').get();
  const settingsBatch = db.batch();
  settingsSnap.docs.forEach((doc) => settingsBatch.delete(doc.ref));
  await settingsBatch.commit();

  const settingsRef = await db.collection('settings').add({
    smtpService: 'gmail',
    smtpUser: '',
    smtpPass: '',
    emailTemplates: {
      applicationConfirmation: {
        subject: 'Application Received - Wave Mind Talent Hub',
        body: 'Hello {{name}}, we have received your application for {{job_title}}. We will review it soon.',
      },
      shortlisted: { subject: 'You have been shortlisted!', body: 'Hello {{name}}, congratulations! You have been shortlisted.' },
      interviewScheduled: {
        subject: 'Interview Scheduled',
        body: 'Hello {{name}}, your interview is on {{date}} at {{time}}. Join here: {{link}}',
      },
      selected: { subject: 'Offer - Wave Mind', body: 'Hello {{name}}, you have been selected!' },
      offerLetter: { subject: 'Offer Letter', body: 'Hello {{name}}, please find your offer letter attached.' },
    },
    offerLetterTemplate: { content: '', placeholders: [] },
    updatedAt: new Date().toISOString(),
  });
  console.log('Settings created:', settingsRef.id);

  console.log('\n✅ Firestore seeded successfully!');
  process.exit(0);
};

seed().catch((err) => {
  console.error('Seed failed:', err);
  process.exit(1);
});
