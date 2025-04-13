const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const Database = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {});

        console.log("Database connection successful", conn.connection.host);
    } catch (error) {
        console.log(error, "Database connection failed");
    }
};

module.exports = Database;