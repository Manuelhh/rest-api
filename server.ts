// func
import express from 'express';
// database connection
import mongoose from 'mongoose';
// server
import http from 'http';
// logs
import Logging from './src/library/logging';
// access config vars
import { config } from './src/config/config';
// routes
import authorRouter from './src/routes/Author';

const router = express();

// connection to DB
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

// starting server upon successful connection to db
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
    router.use('/authors', authorRouter);

    // healthcheck
    router.get('/', (req, res, next) => {
        return res.status(200).json({ message: 'welcome to REST-API' });
    });

    // error handling
    router.use((req, res, next) => {
        const error = new Error('not found');
        Logging.error(error);
        return res.status(404).json({ message: error.message });
    });

    http.createServer(router).listen(config.server.port, () => Logging.info(`Server is running on port ${config.server.port}`));
};
