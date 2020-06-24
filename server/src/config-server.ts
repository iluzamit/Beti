import * as express from 'express';
import * as http from 'http';
import { Server } from './server';
import serverDetails from "./config/server"
const debug = require('debug')('express:server');
const cookieParser = require('cookie-parser');

let server: Server;
let httpsServer;
let app;
let io;

export async function init() {
    app = express();
    app.use(cookieParser());
    httpsServer = http.createServer(app);
    server = Server.bootstrap(httpsServer, app, io);
    httpsServer.on('error', onError);
    httpsServer.on('listening', onListening);
     return httpsServer.listen(serverDetails.port);
}

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }
    const bind = typeof serverDetails.port === 'string'
        ? 'Pipe ' + serverDetails.port
        : 'Port ' + serverDetails.port;
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}

function onListening() {
    const addr = httpsServer.address();
    const bind = typeof addr === 'string'
        ? 'pipe ' + addr
        : 'port ' + addr.port;
    debug('Listening on ' + bind);
    console.log('Listening on ' + bind);
}
