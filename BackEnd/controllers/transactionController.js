const Transaction = require("../models/Transaction");
const User = require("../models/User");

const createTransaction = async (req, res) => {
    const { title, description, category, amount } = req.body;
    userId = req.user._id; // Assuming user ID is available in req.user

    try {
        // Validate input fields
        if (!userId || !title || !description || !category || !amount) {
            return res.status(400).json({ message: "All fields are required." });
        }

        // Check if user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found." });
        }

        // Create new transaction
        const newTransaction = new Transaction({
            userId,
            title,
            description,
            category,
            amount,
        });

        await newTransaction.save();

        // Update user's balance
        user.balance += amount;
        await user.save();

        res.status(201).json({
            message: "Transaction created successfully",
            transaction: newTransaction,
        });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

const getTransactions = async (req, res) => {
    const userId = req.user._id; // Assuming user ID is available in req.user

    try {
        // Fetch transactions for the user
        const transactions = await Transaction.find({ userId }).populate("userId", "name email");

        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

module.exports = {
    createTransaction,
    getTransactions,
};