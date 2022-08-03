/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const helmet = require('helmet');
const limiter = require('./middleware/rateLimiter');
const userRoutes = require('./routes/user.route');
const budgetRoutes = require('./routes/budget.route');
const expenseRoutes = require('./routes/expense.route');
const revenueRoutes = require('./routes/revenue.route');

app.use(express.json());

mongoose
    .connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('Successful connection to MongoDB!'))
    .catch(() => console.log('Connection to MongoDB failed!'));

app.use(helmet());
app.use(limiter);
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization'
    );
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, PUT, DELETE, PATCH, OPTIONS'
    );
    next();
});
app.get('/', (req, res, next) => {
    res.json({ message: 'Hello from API' });
    next();
});

app.use('/api/auth', userRoutes);
app.use('/api/budget', budgetRoutes);
app.use('/api/expense', expenseRoutes);
app.use('/api/revenue', revenueRoutes);

module.exports = app;
