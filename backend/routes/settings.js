const express = require('express');
const router = express.Router();
const { getSettings, updateSettings } = require('../controllers/settingController');
const { protect, authorize } = require('../middleware/auth');

router.get('/', protect, authorize('Admin'), getSettings);
router.put('/', protect, authorize('Admin'), updateSettings);

module.exports = router;
