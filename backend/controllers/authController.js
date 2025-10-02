// controllers/authController.js

const User = require('../models/User');
const bcrypt = require('bcryptjs'); // For password hashing
const jwt = require('jsonwebtoken'); // For token generation

// Helper function to generate JWT
const generateToken = (id) => {
    // Uses the secret key from .env
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d', // Token expires in 30 days
    });
};

// --- REGISTER USER LOGIC ---
const registerUser = async (req, res) => {
    // Ensure you are correctly destructuring the expected fields from the request body
    const { firstName, email, password } = req.body;

    // 0. ADDED VALIDATION: Check for required fields
    if (!email || !password) {
        return res.status(400).json({ message: 'Please include an email and password in the request body.' });
    }

    try {
        // 1. Check if user already exists
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // 2. Create new user instance
        user = new User({ firstName, email, password });

        // 3. Hashing the password (SECURITY STEP)
        // bcrypt.hash() takes two arguments: the string to hash, and the salt rounds
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // 4. Save user to database
        await user.save();

        // 5. Respond with Token (Immediate login)
        res.status(201).json({
            _id: user._id,
            firstName: user.firstName,
            email: user.email,
            token: generateToken(user._id),
        });

    } catch (error) {
        // Log the error for debugging purposes on the server
        console.error("Registration Error:", error);
        res.status(500).json({ message: 'Server error during registration' });
    }
};

// --- LOGIN USER LOGIC ---
const loginUser = async (req, res) => {
    const { email, password } = req.body;

    // 0. ADDED VALIDATION: Check for required fields
    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide both email and password.' });
    }

    try {
        // 1. Find user by email
        const user = await User.findOne({ email });

        // 2. Check if user exists AND if password matches
        if (user && (await bcrypt.compare(password, user.password))) {
            // 3. Respond with Token and user data
            res.json({
                _id: user._id,
                firstName: user.firstName,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            // Invalid credentials
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        console.error("Login Error:", error);
        res.status(500).json({ message: 'Server error during login' });
    }
};

module.exports = { registerUser, loginUser };
