import express from 'express';
import { StatusCodes } from 'http-status-codes';
import User from '../models/User';
import helpers from '../utils/helpers';

const authRouter = express.Router();

authRouter.post('/register', async (request, response) => {
   const { email, password } = request.body;

   const emailAlreadyExists = await User.findOne({ email });

   if (emailAlreadyExists) {
      return response
         .status(StatusCodes.BAD_REQUEST)
         .json({ error: 'Email already exists' });
   }

   // first user as admin
   const isFirstAccount = (await User.countDocuments({})) === 0;
   const role = isFirstAccount ? 'admin' : 'user';

   const user = await User.create({ email, password, role });

   const tokenUser = helpers.createTokenUser(user);
   helpers.attachCookiesToResponse(response, tokenUser);

   response.status(StatusCodes.OK).json({ user: tokenUser });
});

authRouter.post('/login', async (request, response) => {
   response.send('login');
});

authRouter.get('/logout', async (request, response) => {
   response.send('Logout');
});

export default authRouter;
