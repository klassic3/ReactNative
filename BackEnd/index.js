const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const Database = require("./config/db");  // Assuming this is your database connection module

const userRoutes = require("./routes/userRoutes");

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors());
app.use(express.json());  // To parse JSON bodies

// Define routes
const routeSetup = () => {
    app.use("/api/v1/user", userRoutes);
};

// Database connection (Ensure this is an async function in db.js)
const startDatabase = async () => {
    try {
        await Database();  // Assuming Database is a function that connects to MongoDB
        console.log("Database connected successfully");
    } catch (error) {
        console.error("Database connection failed", error);
        process.exit(1);  // Exit process with failure code if DB connection fails
    }
};

// Server start function
const startServer = () => {
    const PORT = process.env.PORT || 5000;

    // Start server after DB connection
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
};

// Start everything
const startApp = async () => {
    await startDatabase();  // Connect to DB first
    await routeSetup();    // Setup routes
    startServer();          // Start the server once DB is connected
};

startApp();
