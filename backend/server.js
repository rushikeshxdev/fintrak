// server.js

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// --- MIDDLEWARE ---
app.use(cors());
app.use(express.json());

// --- IMPORT ROUTES ---
// Make sure you have created the files: routes/auth.js, routes/transactions.js, and routes/analytics.js
const authRoutes = require('./routes/auth');
const transactionRoutes = require('./routes/transactions'); 
const analyticsRoutes = require('./routes/analytics'); // CRITICAL: Import Analytics Route

// --- DATABASE CONNECTION LOGIC ---
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected successfully!');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        process.exit(1);
    }
};

// --- CONNECT ROUTES (CRITICAL STEP) ---
// 1. Connect Auth routes
app.use('/api/auth', authRoutes); 
// 2. Connect Transaction routes
app.use('/api/transactions', transactionRoutes);
// 3. Connect Analytics routes
app.use('/api/analytics', analyticsRoutes); // CRITICAL: Connect Analytics Route

app.get('/', (req, res) => {
    res.send('FinTrack Pro API is running...');
});


// --- SERVER STARTUP ---
connectDB().then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});
