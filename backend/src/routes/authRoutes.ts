import express, { Request, Response } from 'express';
import middleware from '../utils/middleware';
import authControllers from '../controllers/authControllers';
import passport from 'passport';
import config from '../utils/config';
import { StatusCodes } from 'http-status-codes';

const authRouter = express.Router();

authRouter.post('/register', authControllers.register);
authRouter.post('/verify-email', authControllers.verifyEmail);
authRouter.post('/login', authControllers.login);
authRouter.delete('/logout', authControllers.logout);
authRouter.post('/forgot-password', authControllers.forgotPassword);
authRouter.post('/reset-password', authControllers.resetPassword);

authRouter.get(
   '/google',
   passport.authenticate('google', { scope: ['email', 'profile'] })
);

authRouter.get(
   '/google/callback',
   passport.authenticate('google', {
      failureRedirect: '/google/unauthorized',
      successRedirect: `${config.CLIENT_URL}/profile`,
   })
);

authRouter.get('/google/unauthorized', (request, response) => {
   response.status(StatusCodes.UNAUTHORIZED).json({ msg: 'Failure' });
});

authRouter.get('/google/authorized', (request, response) => {
   if (request.user) {
      response.status(200).json({
         success: true,
         message: 'successfull',
         user: request.user,
         //   cookies: req.cookies
      });
   }
});

export default authRouter;
