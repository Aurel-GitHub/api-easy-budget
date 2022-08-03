const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const budgetCtrl = require('../controllers/budget.controller');

router.post('/', auth, budgetCtrl.createBudget);
router.put('/:id', auth, budgetCtrl.updateBudget);
router.get('/:id', auth, budgetCtrl.getOneBudgetById);
router.get('/user/:id', auth, budgetCtrl.getAllBudgetsByUserId);
router.delete('/:id', auth, budgetCtrl.deleteBudget);

module.exports = router;
