import express from 'express';
import middleware from '../utils/middleware';
import authControllers from '../controllers/authControllers';

const authRouter = express.Router();

authRouter.post('/register', authControllers.register);
authRouter.post('/verify-email', authControllers.verifyEmail);
authRouter.post('/login', authControllers.login);
authRouter.delete(
   '/logout',
   middleware.authenticateUser,
   authControllers.logout
);
authRouter.post('/forgot-password', authControllers.forgotPassword);
authRouter.post('/reset-password', authControllers.resetPassword);

export default authRouter;
