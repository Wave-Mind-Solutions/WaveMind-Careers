const express = require('express');
const router = express.Router();
const { scheduleInterview, getInterviews } = require('../controllers/interviewController');
const { protect, authorize } = require('../middleware/auth');

router.post('/', protect, authorize('Admin', 'HR'), scheduleInterview);
router.get('/', protect, authorize('Admin', 'HR', 'Interviewer'), getInterviews);

module.exports = router;
