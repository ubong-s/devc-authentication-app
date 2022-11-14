import { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import User from '../models/User';
import Token from '../models/Token';
import jwt from '../utils/jwt';
import crypto from 'crypto';
import mailer from '../utils/mailer';
import hash from '../utils/hash';
import bcrypt from 'bcryptjs';
import passport from 'passport';
import config from '../utils/config';

const register = async (request: Request, response: Response) => {
   const { email, password, password2 } = request.body;

   const emailAlreadyExists = await User.findOne({ email });

   if (emailAlreadyExists) {
      return response
         .status(StatusCodes.BAD_REQUEST)
         .json({ msg: 'Email already exists' });
   }

   if (password.length < 6) {
      return response
         .status(StatusCodes.BAD_REQUEST)
         .json({ msg: 'Password must be 6 chars and above' });
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

   const origin = `http://localhost:3000`;
   const newOrigin = `https://devubong-auth-app.netlify.app`;

   // console.log('host: ', request.get('host'));
   // console.log('protocol: ', request.protocol);
   // console.log('origin: ', request.get('origin'));
   // console.log('x-forwarded-host: ', request.get('x-forwarded-host'));
   // console.log('x-forwarded-protocol: ', request.get('x-forwarded-proto'));

   const salt = await bcrypt.genSalt(10);
   let hashedPassword = await bcrypt.hash(password, salt);

   // await mailer.sendVerificationEmail({
   //    name: '',
   //    email: email,
   //    token: verificationToken,
   //    origin,
   // });

   const user = await User.create({
      email,
      password: hashedPassword,
      role,
      verificationToken,
   });
   // Send Verification Token back while testing in postman
   response.status(StatusCodes.OK).json({
      msg: 'Success! Please check your email to verify account',
   });
};

const verifyEmail = async (request: Request, response: Response) => {
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
};

const login = async (request: Request, response: Response) => {
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

   // create refresh token
   let refreshToken = '';

   // check for existing token
   const existingToken = await Token.findOne({ user: user._id });

   if (existingToken) {
      const { isValid } = existingToken;

      if (!isValid) {
         return response
            .status(StatusCodes.UNAUTHORIZED)
            .json({ msg: 'Invalid Credentials' });
      }

      refreshToken = existingToken.refreshToken;

      jwt.attachCookiesToResponse({ response, user: tokenUser, refreshToken });

      return response.status(StatusCodes.OK).json({ user: tokenUser });
   }

   refreshToken = crypto.randomBytes(40).toString('hex');
   const userAgent = request.headers['user-agent'];
   const ip = request.ip;

   const userToken = { refreshToken, ip, userAgent, user };

   await Token.create(userToken);

   jwt.attachCookiesToResponse({ response, user: tokenUser, refreshToken });

   response.status(StatusCodes.OK).json({ user: tokenUser });
};

const logout = async (
   request: Request,
   response: Response,
   next: NextFunction
) => {
   if (request.user) {
      await Token.findOneAndDelete({ user: request.user.id });

      response.cookie('accessToken', 'logout', {
         httpOnly: true,
         expires: new Date(Date.now()),
      });

      response.cookie('refreshToken', 'logout', {
         httpOnly: true,
         expires: new Date(Date.now()),
      });

      request.logout(function (err) {
         if (err) {
            return next(err);
         }
      });

      response.json({ msg: 'logged out' });
   }
};

const forgotPassword = async (request: Request, response: Response) => {
   const { email } = request.body;

   if (!email) {
      return response
         .status(StatusCodes.BAD_REQUEST)
         .json({ msg: `Please provide valid email` });
   }

   const user = await User.findOne({ email });

   if (user) {
      const passwordToken = crypto.randomBytes(70).toString('hex');
      // send email

      const origin = `http://localhost:3000`;
      const newOrigin = `https://devubong-auth-app.netlify.app`;

      await mailer.sendResetPasswordEmail({
         name: user.name || '',
         email: user.email,
         token: passwordToken,
         origin,
      });

      const tenMinutes = 1000 * 60 * 10;
      const passwordTokenExpirationDate = new Date(Date.now() + tenMinutes);

      user.passwordToken = hash.hashString(passwordToken);
      user.passwordTokenExpirationDate = passwordTokenExpirationDate;

      await user.save();
   }

   response
      .status(StatusCodes.OK)
      .json({ msg: `Please check your email for reset password link` });
};

const resetPassword = async (request: Request, response: Response) => {
   const { token, email, password } = request.body;

   if (!email || !token || !password) {
      return response
         .status(StatusCodes.BAD_REQUEST)
         .json({ msg: `Invalid credentials` });
   }

   const user = await User.findOne({ email });

   if (user) {
      const currentDate = new Date();

      if (
         user.passwordToken === hash.hashString(token) &&
         user.passwordTokenExpirationDate &&
         user.passwordTokenExpirationDate > currentDate
      ) {
         user.password = password;
         user.passwordToken = undefined;
         user.passwordTokenExpirationDate = undefined;

         await user.save();
      }
   }

   response
      .status(StatusCodes.OK)
      .json({ msg: `Success, Redirecting to Login page` });
};

const addGoogleUser = async ({ id, email, name, photo }: any) => {
   const user = await User.create({
      name,
      email,
      google: {
         id,
         name,
         email,
      },
      photo,
      isVerified: true,
      verified: new Date(Date.now()),
   });
   return user;
};

export default {
   register,
   verifyEmail,
   login,
   logout,
   forgotPassword,
   resetPassword,
   addGoogleUser,
};
