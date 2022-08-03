const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    max: 50,
    windowMs: 60000,
    message: 'Too many request from this IP',
});

module.exports = limiter;
