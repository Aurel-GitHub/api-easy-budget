/* eslint-disable no-console */
require('dotenv').config();

const http = require('http');
const app = require('./app');

/**
 * sends a valid port, whether provided as a number, a false value or a string.
 *
 * @param {string} val
 * @returns {string, false, number}
 */
function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        return val;
    }
    if (port >= 0) {
        return port;
    }
    return false;
}

const port = normalizePort(process.env.PORT_DEFAULT || process.env.PORT);
if (process.env.NODE_ENV === 'production') {
    app.use(express.static());
}
app.set('port', process.env.PORT_DEFAULT || process.env.PORT);

/**
 * searches for the various errors and handles them appropriately.
 * It is then recorded in the server.
 *
 * @param {unknown} error
 * @return {void}
 */
function errorHandler(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const address = server.address();
    const bind =
        typeof address === 'string' ? `pipe ${address}` : `port: ${port}`;
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges.`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use.`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
    const address = server.address();
    const bind =
        typeof address === 'string' ? `pipe ${address}` : `port ${port}`;
    console.log(`Listening on ${bind}`);
});
server.listen(port);
