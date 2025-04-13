const jwt = require("jsonwebtoken");

if (!process.env.JWT_SECRET ) {
    throw new Error("JWT_SECRET is not defined in environment variables.");
}

/**
 * Generate a JWT token
 * @param {string} userId - User ID
 * @param {string} name - Username
 * @returns {string} - JWT token
 */
const generateToken = (userId, name, role) => {
    return jwt.sign({ _id: userId, name }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "1h",
    });
};

/**
 * Validate a JWT token
 * @param {string} token - JWT token
 * @returns {object} - Decoded token payload
 * @throws Will throw an error if the token is invalid
 */
const validateToken = (token) => {
    return jwt.verify(token, process.env.JWT_SECRET);
};

module.exports = {
    generateToken,
    validateToken,
};