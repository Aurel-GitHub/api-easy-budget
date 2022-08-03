const jwt = require('jsonwebtoken');
const { Types } = require('mongoose');
const Revenue = require('../models/Revenue');

/**
 * create a revenue
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
exports.createRevenue = (req, res) => {
    delete req.body._id;

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decodedToken.userId;

    const revenue = new Revenue({
        ...req.body,
        userId: userId,
    });
    revenue
        .save(revenue)
        .then(() =>
            res.status(201).json({ message: 'Revenue enregistré !', revenue })
        )
        .catch((error) => res.status(400).json({ error }));
};

/**
 * update a revenue
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
exports.updateRevenue = (req, res) => {
    Revenue.findById({ _id: req.params.id })
        .then((revenue) => {
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
            const user = decodedToken.userId;
            const isAuthorized = revenue.user == user;

            if (!isAuthorized) {
                res.status(401).json({ message: 'non autorisé' });
            } else {
                Revenue.updateOne(
                    { _id: req.params.id },
                    { ...req.body, _id: req.params.id }
                )
                    .then(() => {
                        res.status(200).json({ message: 'Revenue modifié' });
                    })
                    .catch((error) => res.status(400).json({ error }));
            }
        })
        .catch((error) => res.status(401).json({ error }));
};

/**
 * get one revenue by userId
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
exports.getOneRevenueById = (req, res) => {
    Revenue.findOne({ _id: req.params.id })
        .then((revenue) => res.status(200).json(revenue))
        .catch((error) => res.status(404).json({ error }));
};

/**
 * get many revenues by userId
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
exports.getAllRevenuesByUserId = (req, res) => {
    Revenue.find({ user: new Types.ObjectId(req.params.id) })
        .exec()
        .then((revenue) => res.status(200).json(revenue))
        .catch((error) => res.status(401).json({ error }));
};

/**
 * get many revenues by budgetId
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
exports.getAllRevenuesByBudgetId = (req, res) => {
    Revenue.find({ budget: new Types.ObjectId(req.params.id) })
        .exec()
        .then((revenue) => res.status(200).json(revenue))
        .catch((error) => res.status(401).json({ error }));
};

/**
 * delete one revenue
 * @param {Express.Request} req
 * @param {Express.Response} res
 */
exports.deleteRevenue = (req, res) => {
    Revenue.findById({ _id: req.params.id })
        .then((revenue) => {
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
            const user = decodedToken.userId;
            const isAuthorized = revenue.user == user;

            if (!isAuthorized) {
                res.status(401).json({ message: 'non autorisé' });
            } else {
                Revenue.deleteOne({ _id: req.params.id })
                    .then(() =>
                        res.status(200).json({ message: 'Revenue supprimé' })
                    )
                    .catch((error) => res.status(400).json({ error }));
            }
        })
        .catch((error) => res.status(401).json({ error }));
};
