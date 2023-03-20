import mongoose from 'mongoose';
import { config } from './config';

mongoose
    .connect(config.mongo.url)
    .then(() => {
        console.log('moongo connection open');
    })
    .catch((err: any) => {
        console.log('mongo connection error');
        console.log(err);
    });
