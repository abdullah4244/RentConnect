import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
import authRouter from './routers/authRouter';

const app: Express = express();
app.use(express.json());

app.get('/health', async (request: Request, response: Response) => {
    response.status(200).json({ message: 'OK' });
});

app.use('/auth', authRouter);

export default app;
