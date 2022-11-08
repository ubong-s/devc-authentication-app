import express from 'express';
import { StatusCodes } from 'http-status-codes';
import User from '../models/User';
import middleware from '../utils/middleware';

const userRouter = express.Router();

userRouter.get(
   '/showMe',
   middleware.authenticateUser,
   async (request, response) => {
      response.status(StatusCodes.OK).json({ user: request.user });
   }
);

export default userRouter;
