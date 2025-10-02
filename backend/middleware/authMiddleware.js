// middleware/authMiddleware.js

const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

/**
 * @desc Protects routes by verifying the JSON Web Token (JWT).
 * This middleware runs before any protected controller function.
 */
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // 1. Check if the Authorization header exists and starts with 'Bearer'
    // Example: Authorization: Bearer <token>
    if (
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ) {
        try {
            // Get token from header (split "Bearer token" to get just the token part)
            token = req.headers.authorization.split(' ')[1];

            // 2. Verify token using the JWT_SECRET from the .env file
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // 3. Fetch the user from the database using the ID embedded in the token payload
            // .select('-password') excludes the password hash from the request object for safety.
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                res.status(401);
                throw new Error('Not authorized, user not found');
            }
            
            // 4. If everything succeeds, call the next middleware or controller function
            next();

        } catch (error) {
            console.error('Token verification error:', error.message);
            res.status(401);
            throw new Error('Not authorized, token failed');
        }
    }

    // If no token was found in the header
    if (!token) {
        res.status(401);
        throw new Error('Not authorized, no token provided');
    }
});

module.exports = { protect };
