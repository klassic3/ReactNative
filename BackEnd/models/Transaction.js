const mongoose = require("mongoose");
const User = require("./User");

// Transaction Schema Definition
const TransactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
        enum: [
            "food",
            "transportation",
            "entertainment",
            "utilities",
            "health",
            "education",
            "paycheck",
            "otherIncome",
            "otherExpense",
        ],
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

const Transaction = mongoose.model("Transaction", TransactionSchema);
module.exports = Transaction;