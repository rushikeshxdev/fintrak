// routes/analytics.js

const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getSummary } = require('../controllers/analyticsController');

// All analytics are protected and require a valid JWT token
// @route   GET /api/analytics/summary
// @desc    Get monthly summary, category breakdown, and cash flow forecast
// @access  Private
router.route('/summary').get(protect, getSummary);

module.exports = router;
