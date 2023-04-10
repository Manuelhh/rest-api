"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// func
const express_1 = __importDefault(require("express"));
// database connection
const mongoose_1 = __importDefault(require("mongoose"));
// server
const http_1 = __importDefault(require("http"));
// logs
const logging_1 = __importDefault(require("./src/library/logging"));
// access config vars
const config_1 = require("./src/config/config");
// routes
const Author_1 = __importDefault(require("./src/routes/Author"));
const Book_1 = __importDefault(require("./src/routes/Book"));
const router = (0, express_1.default)();
// connection to DB
mongoose_1.default
    .connect(config_1.config.mongo.url)
    .then(() => {
    logging_1.default.info("connected to MongoDB's Atlas");
    startServer();
})
    .catch((error) => {
    logging_1.default.error("Unable to connect to MongoDB's Atlas");
    logging_1.default.error(error);
});
// starting server upon successful connection to db
const startServer = () => {
    // logging incoming request
    router.use((req, res, next) => {
        logging_1.default.info(`Incoming request -> method: [${req.method}] - url: [${req.url}] - IP: [${req.socket.remoteAddress}]`);
        res.on('finish', () => {
            // loggins response
            logging_1.default.info(`Incoming request response -> method: [${req.method}] - url: [${req.url}] - IP: [${req.socket.remoteAddress}] - status: [${req.statusCode}]`);
        });
        next();
    });
    // req settings
    router.use(express_1.default.urlencoded({ extended: true }));
    router.use(express_1.default.json());
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
    router.use('/authors', Author_1.default);
    router.use('/books', Book_1.default);
    // healthcheck
    router.get('/', (req, res, next) => {
        return res.status(200).json({ message: 'welcome to REST-API' });
    });
    // error handling
    router.use((req, res, next) => {
        const error = new Error('not found');
        logging_1.default.error(error);
        return res.status(404).json({ message: error.message });
    });
    http_1.default.createServer(router).listen(config_1.config.server.port, () => logging_1.default.info(`Server is running on port ${config_1.config.server.port}`));
};
