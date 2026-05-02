const mongoose = require('mongoose');
const User = require('./models/User');
const Job = require('./models/Job');
const Setting = require('./models/Setting');
require('dotenv').config();

const seed = async () => {
  await mongoose.connect(process.env.MONGO_URI);

  // Clear existing
  await User.deleteMany({});
  await Job.deleteMany({});
  await Setting.deleteMany({});

  // Create Admin
  const admin = new User({
    name: 'Admin User',
    email: 'admin@wavemind.com',
    password: 'password123',
    role: 'Admin'
  });
  await admin.save();

  // Create Jobs
  const jobs = [
    {
      title: 'Full Stack Developer Intern',
      description: 'Looking for a passionate React/Node.js developer to join our team.',
      skills: ['React', 'Node.js', 'MongoDB'],
      salary: '₹15,000 - ₹25,000 / month',
      location: 'Remote',
      type: 'Internship'
    },
    {
      title: 'Senior UI/UX Designer',
      description: 'Join us to design beautiful SaaS interfaces.',
      skills: ['Figma', 'Adobe XD', 'Prototyping'],
      salary: '₹8,00,000 - ₹12,00,000 / year',
      location: 'Bangalore / Remote',
      type: 'Full-Time'
    }
  ];
  await Job.insertMany(jobs);

  // Default Settings
  const settings = new Setting({
    emailTemplates: {
      applicationConfirmation: {
        subject: 'Application Received - Wave Mind Talent Hub',
        body: 'Hello {{name}}, we have received your application. We will review it soon.'
      }
    }
  });
  await settings.save();

  console.log('Database Seeded!');
  process.exit();
};

seed();
