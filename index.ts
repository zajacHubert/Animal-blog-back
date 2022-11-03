import cookieParser from 'cookie-parser';
import express, { json } from 'express';
import authRouter from './routes/auth';
import postRouter from './routes/post';
import fileRouter from './routes/file';
import cors from 'cors';

const app = express();

app.use(json());
app.use(cookieParser());
app.use(cors());

app.use('/auth', authRouter);
app.use('/post', postRouter);
app.use('/file', fileRouter);

app.listen(3001, () => {
    console.log('Server is running');
});