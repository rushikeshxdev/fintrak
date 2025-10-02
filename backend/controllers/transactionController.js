// controllers/transactionController.js

const Transaction = require('../models/Transaction'); 
// NOTE: express-async-handler is now INSTALLED, so we can use it for clean error handling
const asyncHandler = require('express-async-handler'); 

// --- @desc    Get all transactions
// --- @route   GET /api/transactions
// --- @access  Private (Requires JWT)
const getTransactions = asyncHandler(async (req, res) => {
    // SECURITY/DATA SEGREGATION: Find transactions only for the logged-in user (req.user.id)
    const transactions = await Transaction.find({ user: req.user.id }).sort({ date: -1 });

    res.status(200).json({ 
        success: true, 
        count: transactions.length, 
        data: transactions 
    });
});

// --- @desc    Add new transaction
// --- @route   POST /api/transactions
// --- @access  Private (Requires JWT)
const addTransaction = asyncHandler(async (req, res) => {
    const { type, amount, category, date, description } = req.body;

    // Basic server-side validation check (Mongoose schema provides more)
    if (!type || !amount || !category || !date) {
        res.status(400);
        throw new Error('Please include all required fields: type, amount, category, and date.');
    }

    // Add the logged-in user's ID to the transaction object
    const newTransaction = await Transaction.create({
        user: req.user.id, // CRITICAL: Link to the user
        type,
        amount,
        category,
        date,
        description
    });

    res.status(201).json({ 
        success: true, 
        data: newTransaction 
    });
});

// --- @desc    Delete transaction
// --- @route   DELETE /api/transactions/:id
// --- @access  Private (Requires JWT)
const deleteTransaction = asyncHandler(async (req, res) => {
    const transaction = await Transaction.findById(req.params.id);

    if (!transaction) {
        res.status(404);
        throw new Error('Transaction not found');
    }

    // SECURITY CHECK: Ensure the transaction belongs to the logged-in user
    if (transaction.user.toString() !== req.user.id) {
        res.status(401);
        throw new Error('Not authorized to delete this transaction');
    }

    await transaction.deleteOne();

    res.status(200).json({ success: true, data: {} });
});


// CRITICAL: Export all functions so the router file can access them
module.exports = {
    getTransactions,
    addTransaction,
    deleteTransaction
};
