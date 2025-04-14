const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Protect middleware to verify JWT and check roles
const protect = (req, res, next) => {
    const token = req.header('Authorization') && req.header('Authorization').split(' ')[1]; // Extract token from Authorization header

    if (!token) {
        return res.status(401).json({ message: 'Not authorized, no token' });
    }
    console.log(token);

    try {

        // Verify the token using the secret stored in .env
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Attach decoded user information to the request object
        req.user = decoded;

        next(); // Move to the next middleware or route handler
    } catch (err) {
        console.error("here", err);
        return res.status(401).json({ message: 'Token is not valid' });
    }
};


module.exports = { protect };