import express, { json } from 'express';
import authRouter from './routes/auth';

const app = express();

app.use(json());

app.use('/auth', authRouter);


app.listen(3001, () => {
    console.log('Server is running');
});