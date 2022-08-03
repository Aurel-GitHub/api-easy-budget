const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const expenseCtrl = require('../controllers/expense.controller');

router.post('/', auth, expenseCtrl.createExpense);
router.put('/:id', auth, expenseCtrl.updateExpense);
router.get('/:id', auth, expenseCtrl.getOneExpenseById);
router.get('/user/:id', auth, expenseCtrl.getAllExpensesByUserId);
router.get('/budget/:id', auth, expenseCtrl.getAllExpensesByBudgetId);
router.delete('/:id', auth, expenseCtrl.deleteExpense);

module.exports = router;
