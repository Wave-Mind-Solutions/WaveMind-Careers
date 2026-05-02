const express = require('express');
const router = express.Router();
const { getJobs, getAdminJobs, createJob, updateJob, deleteJob } = require('../controllers/jobController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', getJobs);
router.get('/admin', protect, getAdminJobs);
router.post('/', protect, authorize('Admin', 'HR'), createJob);
router.put('/:id', protect, authorize('Admin', 'HR'), updateJob);
router.delete('/:id', protect, authorize('Admin'), deleteJob);

module.exports = router;
