const express = require('express');
const router = express.Router();
const { apply, getCandidates, updateStatus, getStats } = require('../controllers/candidateController');
const { protect, authorize } = require('../middleware/auth');
const { upload } = require('../middleware/upload');

router.post('/apply', upload.single('resume'), apply);
router.get('/', protect, authorize('Admin', 'HR', 'Interviewer'), getCandidates);
router.get('/stats', protect, authorize('Admin', 'HR'), getStats);
router.put('/:id/status', protect, authorize('Admin', 'HR'), updateStatus);

module.exports = router;
