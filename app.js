/* eslint-disable no-console */
/* eslint-disable no-underscore-dangle */
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./routes/user.route');

app.use(express.json());

mongoose
    .connect(
        `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.btqfz.mongodb.net/?retryWrites=true&w=majority`,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }
    )
    .then(() => console.log('Successful connection to MongoDB!'))
    .catch(() => console.log('Connection to MongoDB failed!'));

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

app.use('/api/auth', userRoutes);

module.exports = app;
