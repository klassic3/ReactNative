const express = require('express');
const { createTransaction, getTransactions } = require('../controllers/transactionController');
const { protect } = require('../middlewares/authMiddleware');
const transactionRouter = express.Router();

// Route to create a new transaction
transactionRouter.post('/create', protect, createTransaction);
// Route to get all transactions for the logged-in user
transactionRouter.get('/get', protect, getTransactions);

module.exports = transactionRouter;