import express, { Request } from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import mongoSanitize from 'express-mongo-sanitize';
import helmet from 'helmet';
import rateLimiter from 'express-rate-limit';
const xss = require('xss-clean');
import session from 'express-session';
import passport from 'passport';
import './utils/passport';

import middleware from './utils/middleware';
import config from './utils/config';
import authRouter from './routes/authRoutes';
import userRouter from './routes/userRoutes';

// app initialize
const app = express();

// middlewares
// app.set('trust proxy', 1);
app.use(
   rateLimiter({
      windowMs: 15 * 60 * 1000,
      max: 60,
   })
);
app.use(helmet());
app.use(
   cors({
      origin: 'http://localhost:3000',
      credentials: true,
   })
);
app.use(xss());
app.use(mongoSanitize());
app.use(express.json());
app.use(middleware.requestLogger);
app.use(cookieParser(config.JWT_SECRET));

// passportStrategy(passport);
app.use(
   session({
      secret: config.JWT_SECRET,
      resave: false,
      saveUninitialized: false,
      // cookie: {
      //    maxAge: 1000 * 60 * 60 * 24,
      // },
   })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.get('/', async (request, response) => {
   response.send('Authentication App');
});
app.use('/api/auth', authRouter);
app.use('/api/user', middleware.authenticateUser, userRouter);

// Error Handler and Unknown Endpoint middlewares
app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

export default app;
