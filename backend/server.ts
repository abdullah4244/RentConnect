import app from './src/app';
import mongoose, { ConnectOptions } from 'mongoose';

mongoose
    .connect(process.env.DB_URL as string, {} as ConnectOptions)
    .then(() => {
        app.listen(process.env.PORT, () => {
            console.log('Listening on Port', process.env.PORT); // eslint-disable-line
        });
    });
