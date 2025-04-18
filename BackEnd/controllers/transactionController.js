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
        const transactions = await Transaction.find({ userId }).populate("userId", "name email").sort({ date: -1 });

        res.status(200).json(transactions);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

const getMonthlyData = async (req, res) => {

    const incomeCategories = ['paycheck', 'otherIncome'];

    const expenseCategories = ["food", "transportation", "entertainment", "utilities", "health", "education", "otherExpense"];

    const userId = req.user._id; // Assuming user ID is available in req.user

    const { month, year } = req.query;

    //default is current month
    const now = new Date();

    // Convert to numbers
    const monthInt = parseInt(month) || now.getMonth() + 1;
    const yearInt = parseInt(year) || now.getFullYear();

    // Start of the month
    const startDate = new Date(yearInt, monthInt - 1, 1);
    // End of the month
    const endDate = new Date(yearInt, monthInt, 1);

    try {
        const incomeTransactions = await Transaction.find({
            userId,
            date: { $gte: startDate, $lt: endDate },
            category: { $in: incomeCategories },
        });
        const outcomeTransactions = await Transaction.find({
            userId,
            date: { $gte: startDate, $lt: endDate },
            category: { $in: expenseCategories },
        });

        // Sum it up
        const monthlyIncome = incomeTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);
        const monthlyExpense = outcomeTransactions.reduce((acc, transaction) => acc + transaction.amount, 0);

        res.status(200).json({ monthlyIncome, monthlyExpense });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

const getMonthlyCategories = async (req, res) => {
    const userId = req.user._id;

    const { month, year } = req.query;

    const now = new Date();
    const monthInt = parseInt(month) || now.getMonth() + 1;
    const yearInt = parseInt(year) || now.getFullYear();

    const startDate = new Date(yearInt, monthInt - 1, 1);
    const endDate = new Date(yearInt, monthInt, 1);

    try {
        const transactions = await Transaction.find({
            userId,
            date: { $gte: startDate, $lt: endDate },
        });

        // 2. Group and sum by category
        const categoryTotals = {};

        transactions.forEach((tx) => {
            if (!categoryTotals[tx.category]) {
                categoryTotals[tx.category] = 0;
            }
            categoryTotals[tx.category] += tx.amount;
        });

        // 3. Format it as an array
        const result = Object.entries(categoryTotals).map(([category, totalSpent]) => ({
            category,
            totalSpent,
        }));

        res.status(200).json(result);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
};



const deleteAllTransactions = async (req, res) => {
    const userId = req.user._id; // Assuming user ID is available in req.user

    try {
        // Delete all transactions for the user
        await Transaction.deleteMany({ userId });

        res.status(200).json({ message: "All transactions deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
}

module.exports = {
    createTransaction,
    getTransactions,
    deleteAllTransactions,
    getMonthlyData,
    getMonthlyCategories,
};