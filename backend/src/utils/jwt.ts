import JWT from 'jsonwebtoken';
import config from './config';
import { Response } from 'express';

interface UserToken {
   _id: {};
   email: string;
   role: string;
}

interface User {
   id: string;
   email: string;
   role: string;
}
interface PayloadProps {
   payload: User;
}

interface CookiesProps {
   response: Response;
   user: User;
}

const createTokenUser = (user: UserToken) => {
   return { email: user.email, id: String(user._id), role: user.role };
};

const createJWT = ({ payload }: PayloadProps) => {
   const token = JWT.sign(payload, config.JWT_SECRET, {
      expiresIn: config.JWT_LIFETIME,
   });

   return token;
};

const isTokenValid = (token: string) =>
   JWT.verify(token, config.JWT_SECRET) as User;

const attachCookiesToResponse = ({ response, user }: CookiesProps) => {
   const token = createJWT({ payload: user });

   console.log('token :>> ', token);
   console.log('response.cookie :>> ', response.cookie);

   const oneDay = 1000 * 60 * 60 * 24;

   response.cookie('token', token, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE_ENV === 'production',
      signed: true,
   });
};

export default {
   createTokenUser,
   createJWT,
   isTokenValid,
   attachCookiesToResponse,
};
