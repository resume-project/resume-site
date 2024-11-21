import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rootRouter from './router/root.js';
import tweetsRouter from './router/tweets.js';

dotenv.config();
const app = express();

// 전역 설정
app.use(
  cors({
    origin: [`${process.env.CLIENT_BASE_URL}`],
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));

// 라우터
app.use('/', rootRouter);
app.use('/tweets', tweetsRouter);

// 오류 처리
app.use((req, res, next) => {
  res.status(404).send('Not Available');
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send('Server Error');
});

app.listen(3000);
