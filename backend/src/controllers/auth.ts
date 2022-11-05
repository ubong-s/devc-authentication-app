import express from 'express';
import { StatusCodes } from 'http-status-codes';
import User from '../models/User';
import jwt from '../utils/jwt';
import crypto from 'crypto';
import mailer from '../utils/mailer';

const authRouter = express.Router();

authRouter.post('/register', async (request, response) => {
   const { email, password, password2 } = request.body;

   const emailAlreadyExists = await User.findOne({ email });

   if (emailAlreadyExists) {
      return response
         .status(StatusCodes.BAD_REQUEST)
         .json({ msg: 'Email already exists' });
   }

   if (password !== password2) {
      return response
         .status(StatusCodes.BAD_REQUEST)
         .json({ msg: `Passwords don't match` });
   }

   // first user as admin
   const isFirstAccount = (await User.countDocuments({})) === 0;
   const role = isFirstAccount ? 'admin' : 'user';

   const verificationToken = crypto.randomBytes(40).toString('hex');

   const user = await User.create({ email, password, role, verificationToken });

   const origin = `http://localhost:3000`;

   // await mailer.sendVerificationEmail({
   //    name: '',
   //    email: user.email,
   //    verificationToken: user.verificationToken,
   //    origin,
   // });
   // Send Verification Token back while testing in postman
   response.status(StatusCodes.OK).json({
      msg: 'Success! Please check your email to verify account',
      verificationToken,
   });
});

authRouter.post('/verify-email', async (request, response) => {
   const { verificationToken, email } = request.body;

   const user = await User.findOne({ email });

   if (!user) {
      return response
         .status(StatusCodes.UNAUTHORIZED)
         .json({ msg: 'Verification failed' });
   }

   if (user.verificationToken !== verificationToken) {
      return response
         .status(StatusCodes.UNAUTHORIZED)
         .json({ msg: 'Verification failed' });
   }

   user.isVerified = true;
   user.verified = new Date();
   user.verificationToken = '';

   await user.save();

   response.status(StatusCodes.OK).json({ msg: 'Email verified' });
});

authRouter.post('/login', async (request, response) => {
   const { email, password } = request.body;

   if (!email || !password) {
      return response
         .status(StatusCodes.BAD_REQUEST)
         .json({ msg: `Please provide email and password` });
   }

   const user = await User.findOne({ email });

   if (!user) {
      return response
         .status(StatusCodes.UNAUTHORIZED)
         .json({ msg: `Invalid credentials` });
   }

   // @ts-ignore
   const passwordsMatch = await user.comparePassword(password);

   if (!passwordsMatch) {
      return response
         .status(StatusCodes.UNAUTHORIZED)
         .json({ msg: `Invalid credentials` });
   }

   if (!user.isVerified) {
      return response
         .status(StatusCodes.UNAUTHORIZED)
         .json({ msg: `Please verify your email` });
   }

   const tokenUser = jwt.createTokenUser(user);
   jwt.attachCookiesToResponse(response, tokenUser);

   response.status(StatusCodes.OK).json({ user: tokenUser });
});

authRouter.get('/logout', async (request, response) => {
   response.send('Logout');
});

export default authRouter;
