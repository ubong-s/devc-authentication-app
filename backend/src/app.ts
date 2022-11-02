import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import middleware from './utils/middleware';
import config from './utils/config';
import logger from './utils/logger';
import authRouter from './controllers/auth';

// app initialize
const app = express();

// middlewares
app.use(express.json());
app.use(cors());
app.use(middleware.requestLogger);
app.use(cookieParser(config.JWT_SECRET));

// Routes
app.get('/', (request, response) => {
   logger.info('Cookies', request.cookies);
   response.send('Authentication App');
});
app.use('/api/auth', authRouter);

// Error Handler and Unknown Endpoint middlewares
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
