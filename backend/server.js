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
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s instead of 30s
            socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
        });
        console.log('MongoDB Connected successfully!');
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
        console.log('Starting server without database connection...');
        console.log('Some features may not work properly.');
        // Don't exit, continue without database
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
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
        console.log(`Frontend should connect to: http://localhost:${PORT}/api`);
    });
}).catch(() => {
    // Start server even if DB connection fails
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT} (WITHOUT DATABASE)`);
        console.log(`Frontend should connect to: http://localhost:${PORT}/api`);
        console.log('⚠️  Database connection failed - some features may not work');
    });
});
