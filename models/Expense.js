const mongoose = require('mongoose');

const expenseSchema = mongoose.Schema({
    title: { type: String, required: true },
    total: { type: Number, required: true },
    isFixed: { type: Boolean, required: true, default: false },
    isVariable: { type: Boolean, required: true, default: false },
    hasPassed: { type: Boolean, required: true, default: false },
    datePassed: { type: Date, required: false },
    enDateIsFixed: { type: Date, required: false },
    comment: { type: String, required: false },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    budget: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Budget',
        required: false,
    },
});

module.exports = mongoose.model('Expense', expenseSchema);
