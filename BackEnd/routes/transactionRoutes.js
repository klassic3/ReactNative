const express = require('express');
const { createTransaction, getTransactions, deleteAllTransactions } = require('../controllers/transactionController');
const { protect } = require('../middlewares/authMiddleware');
const transactionRouter = express.Router();

// Route to create a new transaction
transactionRouter.post('/create', protect, createTransaction);
// Route to get all transactions for the logged-in user
transactionRouter.get('/get', protect, getTransactions);

transactionRouter.delete('/deleteAll', protect, deleteAllTransactions);

module.exports = transactionRouter;