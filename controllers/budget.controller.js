const Budget = require('../models/Budget');
const jwt = require('jsonwebtoken');
const { Types } = require('mongoose');

/**
 * create a budget
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
exports.createBudget = (req, res) => {
    delete req.body._id;

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodedToken.userId;

    const budget = new Budget({
        ...req.body,
        userId: userId,
    });
    budget
        .save(budget)
        .then(() =>
            res.status(201).json({ message: 'Budget enregistré !', budget })
        )
        .catch((error) => res.status(400).json({ error }));
};

/**
 * update a budget
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
exports.updateBudget = (req, res) => {
    Budget.findById({ _id: req.params.id })
        .then((budget) => {
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
            const user = decodedToken.userId;
            const isAuthorized = budget.user == user;

            if (!isAuthorized) {
                res.status(401).json({ message: 'non autorisé' });
            } else {
                Budget.updateOne(
                    { _id: req.params.id },
                    { ...req.body, _id: req.params.id }
                )
                    .then(() => {
                        res.status(200).json({ message: 'Budget modifié' });
                    })
                    .catch((error) => res.status(400).json({ error }));
            }
        })
        .catch((error) => res.status(401).json({ error }));
};

/**
 * get one budget by userId
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
exports.getOneBudgetById = (req, res) => {
    Budget.findOne({ _id: req.params.id })
        .then((budget) => res.status(200).json(budget))
        .catch((error) => res.status(404).json({ error }));
};

/**
 * get many budgets by userId
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
exports.getAllBudgetsByUserId = (req, res) => {
    Budget.find({ user: new Types.ObjectId(req.params.id) })
        .exec()
        .then((budget) => res.status(200).json(budget))
        .catch((error) => res.status(401).json({ error }));
};

/**
 * delete one budget
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
exports.deleteBudget = (req, res) => {
    Budget.findById({ _id: req.params.id })
        .then((budget) => {
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
            const user = decodedToken.userId;
            const isAuthorized = budget.user == user;

            if (!isAuthorized) {
                res.status(401).json({ message: 'non autorisé' });
            } else {
                Budget.deleteOne({ _id: req.params.id })
                    .then(() =>
                        res.status(200).json({ message: 'Budget supprimé' })
                    )
                    .catch((error) => res.status(400).json({ error }));
            }
        })
        .catch((error) => res.status(401).json({ error }));
};
