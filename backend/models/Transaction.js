// models/Transaction.js

const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
    // Security & Relationship: Links this transaction to a specific User
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference the User model
        required: true
    },
    // Financial data
    type: {
        type: String, // 'income' or 'expense'
        required: true,
        enum: ['income', 'expense'] // Restricts allowed values
    },
    amount: {
        type: Number,
        required: true,
        min: 0.01 // Ensures a positive amount
    },
    category: {
        type: String,
        required: true,
        // Updated categories to match frontend constants
        enum: [
            'Salary', 'Freelance', 'Investment', 'Business',
            'Food', 'Transport', 'Shopping', 'Bills', 'Entertainment', 
            'Healthcare', 'Education', 'Other'
        ]
    },
    date: {
        type: Date,
        required: true
    },
    description: {
        type: String,
        trim: true,
        default: ''
    }
}, {
    timestamps: true // Adds createdAt and updatedAt fields automatically
});

module.exports = mongoose.model('Transaction', TransactionSchema);