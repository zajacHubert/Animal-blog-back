import cookieParser from 'cookie-parser';
import express, { json } from 'express';
import authRouter from './routes/auth';
import postRouter from './routes/post';

const app = express();

app.use(json());
app.use(cookieParser());

app.use('/auth', authRouter);
app.use('/post', postRouter);


app.listen(3001, () => {
    console.log('Server is running');
});