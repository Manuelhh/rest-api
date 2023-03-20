import mongoose from 'mongoose';
import { config } from './config';
import Logging from '../library/logging';

mongoose
    .connect(config.mongo.url)
    .then(() => {
        Logging.info("connected to MongoDB's Atlas");
    })
    .catch((error: any) => {
        Logging.error("Unable to connect to MongoDB's Atlas");
        Logging.error(error);
    });
