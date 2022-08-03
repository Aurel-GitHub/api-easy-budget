const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const revenueCtrl = require('../controllers/revenue.controller');

router.post('/', auth, revenueCtrl.createRevenue);
router.put('/:id', auth, revenueCtrl.updateRevenue);
router.get('/:id', auth, revenueCtrl.getOneRevenueById);
router.get('/user/:id', auth, revenueCtrl.getAllRevenuesByUserId);
router.get('/budget/:id', auth, revenueCtrl.getAllRevenuesByBudgetId);
router.delete('/:id', auth, revenueCtrl.deleteRevenue);

module.exports = router;
