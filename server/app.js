import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import rootRouter from './router/root.js';
import tweetsRouter from './router/tweets.js';
import morgan from 'morgan';
import helmet from 'helmet';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

const corsOption = {
  origin: [`${process.env.CLIENT_BASE_URL}`],
  credentials: true,
};

// 미들웨어
app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('public'));
app.use(morgan('combined'));
app.use(helmet());

// 라우터
app.use('/', rootRouter).use('/tweets', tweetsRouter);

// 오류 처리
app.use((req, res, next) => {
  res.status(404).send('Not Available');
});

app.use((error, req, res, next) => {
  console.error(error);
  res.status(500).send('Server Error');
});

// 서버 실행
app.listen(PORT);
