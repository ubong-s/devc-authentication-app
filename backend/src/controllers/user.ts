import express from 'express';
import { StatusCodes } from 'http-status-codes';
import User from '../models/User';

const userRouter = express.Router();

userRouter.get('/showMe', async (request, response) => {
   response.status(StatusCodes.OK).json({ user: request.user });
});

export default userRouter;
