import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import rateLimiter from 'express-rate-limit';
const xss = require('xss-clean');

import middleware from './utils/middleware';
import config from './utils/config';
import authRouter from './controllers/auth';
import userRouter from './controllers/user';

// app initialize
const app = express();

// middlewares
app.set('trust proxy', 1);
app.use(
   rateLimiter({
      windowMs: 15 * 60 * 1000,
      max: 60,
   })
);
app.use(helmet());
app.use(
   cors({
      origin: true,
      credentials: true,
   })
);
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(cookieParser(config.JWT_SECRET));

// Routes
app.get('/', async (request, response) => {
   response.send('Authentication App');
});
app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);

// Error Handler and Unknown Endpoint middlewares
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
