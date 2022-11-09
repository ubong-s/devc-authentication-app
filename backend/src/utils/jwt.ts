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
   payload: { user: User; refreshToken?: string };
}

interface CookiesProps {
   response: Response;
   user: User;
   refreshToken: string;
}

const createTokenUser = (user: UserToken) => {
   return { email: user.email, id: String(user._id), role: user.role };
};

const createJWT = ({ payload }: PayloadProps) => {
   // const token = JWT.sign(payload, config.JWT_SECRET, {
   //    expiresIn: config.JWT_LIFETIME,
   // });
   const token = JWT.sign(payload, config.JWT_SECRET);

   return token;
};

const isTokenValid = (token: string) =>
   JWT.verify(token, config.JWT_SECRET) as {
      user: User;
      refreshToken?: string;
   };

// const attachSingleCookieToResponse = ({
//    response,
//    user,
//    refreshToken,
// }: CookiesProps) => {
//    const token = createJWT({ payload: user });

//    console.log('token :>> ', token);
//    console.log('response.cookie :>> ', response.cookie);

//    const oneDay = 1000 * 60 * 60 * 24;

//    response.cookie('token', token, {
//       httpOnly: true,
//       expires: new Date(Date.now() + oneDay),
//       secure: process.env.NODE_ENV === 'production',
//       signed: true,
//    });
// };

const attachCookiesToResponse = ({
   response,
   user,
   refreshToken,
}: CookiesProps) => {
   const accessTokenJWT = createJWT({ payload: { user } });
   const refreshTokenJWT = createJWT({ payload: { user, refreshToken } });

   const oneDay = 1000 * 60 * 60 * 24;
   const thirtyDays = 1000 * 60 * 60 * 24 * 30;

   response.cookie('accessToken', accessTokenJWT, {
      httpOnly: true,
      expires: new Date(Date.now() + oneDay),
      secure: process.env.NODE_ENV === 'production',
      signed: true,
   });

   response.cookie('refreshToken', refreshTokenJWT, {
      httpOnly: true,
      expires: new Date(Date.now() + thirtyDays),
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
