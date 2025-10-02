// routes/transactions.js

const express = require('express');
const router = express.Router();
// CRITICAL: Ensure this path is correct AND that authMiddleware.js exists
const { protect } = require('../middleware/authMiddleware'); 
// CRITICAL: Ensure this path is correct AND that transactionController.js exports the functions
const { getTransactions, addTransaction, deleteTransaction } = require('../controllers/transactionController'); 

// All routes here are protected and require a valid JWT token

// @route   GET /api/transactions
// @desc    Get all transactions
// @access  Private
router.route('/').get(protect, getTransactions);

// @route   POST /api/transactions
// @desc    Add new transaction
// @access  Private
router.route('/').post(protect, addTransaction);

// @route   DELETE /api/transactions/:id
// @desc    Delete transaction
// @access  Private
router.route('/:id').delete(protect, deleteTransaction);


module.exports = router; 
