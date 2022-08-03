const jwt = require('jsonwebtoken');
const { Types } = require('mongoose');
const Expense = require('../models/Expense');

/**
 * create an expense
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
exports.createExpense = (req, res) => {
    delete req.body._id;

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodedToken.userId;

    const expense = new Expense({
        ...req.body,
        userId: userId,
    });
    expense
        .save(expense)
        .then(() =>
            res.status(201).json({ message: 'Dépense  enregistré !', expense })
        )
        .catch((error) => res.status(400).json({ error }));
};

/**
 * update an expense
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
exports.updateExpense = (req, res) => {
    Expense.findById({ _id: req.params.id })
        .then((expense) => {
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
            const user = decodedToken.userId;
            const isAuthorized = expense.user == user;

            if (!isAuthorized) {
                res.status(401).json({ message: 'non autorisé' });
            } else {
                Expense.updateOne(
                    { _id: req.params.id },
                    { ...req.body, _id: req.params.id }
                )
                    .then(() => {
                        res.status(200).json({
                            message: 'Dépense modifié',
                        });
                    })
                    .catch((error) => res.status(400).json({ error }));
            }
        })
        .catch((error) => res.status(401).json({ error }));
};

/**
 * get one expense by ID
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
exports.getOneExpenseById = (req, res) => {
    Expense.findOne({ _id: req.params.id })
        .then((expense) => res.status(200).json(expense))
        .catch((error) => res.status(404).json({ error }));
};

/**
 * get many expenses by userId
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
exports.getAllExpensesByUserId = (req, res) => {
    Expense.find({ user: new Types.ObjectId(req.params.id) })
        .exec()
        .then((expense) => res.status(200).json(expense))
        .catch((error) => res.status(401).json({ error }));
};

/**
 * get many expenses by budgetId
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
exports.getAllExpensesByBudgetId = (req, res) => {
    Expense.find({ budget: new Types.ObjectId(req.params.id) })
        .exec()
        .then((expense) => res.status(200).json(expense))
        .catch((error) => res.status(401).json({ error }));
};

/**
 * delete one expense
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
exports.deleteExpense = (req, res) => {
    Expense.findById({ _id: req.params.id })
        .then((expense) => {
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
            const user = decodedToken.userId;
            const isAuthorized = expense.user == user;

            if (!isAuthorized) {
                res.status(401).json({ message: 'non autorisé' });
            } else {
                Expense.deleteOne({ _id: req.params.id })
                    .then(() =>
                        res.status(200).json({ message: 'Dépense supprimé' })
                    )
                    .catch((error) => res.status(400).json({ error }));
            }
        })
        .catch((error) => res.status(401).json({ error }));
};
