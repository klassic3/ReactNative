const express = require('express');
const { createTransaction, getTransactions, deleteAllTransactions, getMonthlyData, getMonthlyCategories, getMonthlyTrends, getFilteredTransactions, deleteTransaction } = require('../controllers/transactionController');
const { protect } = require('../middlewares/authMiddleware');
const transactionRouter = express.Router();

transactionRouter.post('/create', protect, createTransaction);

transactionRouter.delete('/delete/:id', protect, deleteTransaction);

transactionRouter.get('/get', protect, getTransactions);

transactionRouter.get('/filter',protect, getFilteredTransactions);

transactionRouter.delete('/deleteAll', protect, deleteAllTransactions);

transactionRouter.get('/monthlyData', protect, getMonthlyData);

transactionRouter.get('/monthlyCategories', protect, getMonthlyCategories);

transactionRouter.get('/monthlyTrend', protect, getMonthlyTrends);


module.exports = transactionRouter;