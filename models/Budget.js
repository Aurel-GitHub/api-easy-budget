const mongoose = require('mongoose');

const budgetSchema = mongoose.Schema({
    title: { type: String, required: true },
    total: { type: Number, required: true, default: 0 },
    isMonthly: { type: Boolean, required: true, default: false },
    isAnnualy: { type: Boolean, required: true, default: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
});

module.exports = mongoose.model('Budget', budgetSchema);
