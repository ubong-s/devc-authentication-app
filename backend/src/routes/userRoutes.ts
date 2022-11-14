import express from 'express';
import userControllers from '../controllers/userControllers';

const userRouter = express.Router();

userRouter.get('/showMe', userControllers.showMe);

export default userRouter;
