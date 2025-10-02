// models/User.js

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    // User identification fields
    email: {
        type: String,
        required: true,
        unique: true, // Crucial: Ensures only one account per email
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
    },
    // Optional additional fields
    firstName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        trim: true
    },
    // Timestamp for when the user was created
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('User', UserSchema);