import express from 'express';
import mongoose from 'mongoose';
import http from 'http';
import Logging from './src/library/logging';
import { config } from './src/config/config';

const router = express();

mongoose
    .connect(config.mongo.url)
    .then(() => {
        Logging.info("connected to MongoDB's Atlas");
        startServer();
    })
    .catch((error) => {
        Logging.error("Unable to connect to MongoDB's Atlas");
        Logging.error(error);
    });

const startServer = () => {
    // logging incoming request
    router.use((req, res, next) => {
        Logging.info(`Incoming request -> method: [${req.method}] - url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);

        res.on('finish', () => {
            // loggins response
            Logging.info(`Incoming request response -> method: [${req.method}] - url: [${req.url}] - IP: [${req.socket.remoteAddress}] - status: [${req.statusCode}]`);
        });
        next();
    });
    // req settings
    router.use(express.urlencoded({ extended: true }));
    router.use(express.json());

    // rules for API
    router.use((req, res, next) => {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allowe-Headers', 'origin, X-Requested-With, Content-Type, Accept, Authorization');

        if (req.method == 'OPTIONS') {
            res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET');
            return res.status(200).json();
        }
        next();
    });

    // routes

    // healthckeck
    router.get('/ping', (req, res, next) => {
        return res.status(200).json({ message: 'pong' });
    });

    // error handling
    router.use((req, res, next) => {
        const error = new Error('not found');
        Logging.error(error);
        return res.status(404).json({ message: error.message });
    });

    http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}`));
};
