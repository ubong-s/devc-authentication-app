import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from './logger';
import JWT from './jwt';
import Token from '../models/Token';

const requestLogger = (
   request: Request,
   response: Response,
   next: NextFunction
) => {
   logger.info('Method >>', request.method);
   logger.info('Path >>', request.path);
   logger.info('Params >>', request.params);
   logger.info('Body >>', request.body);
   logger.info('---');

   next();
};

const authenticateUser = async (
   request: Request,
   response: Response,
   next: NextFunction
) => {
   const { refreshToken, accessToken } = request.signedCookies;
   const connectSID = request.signedCookies['connect.sid'];

   try {
      if (accessToken) {
         const payload = JWT.isTokenValid(accessToken);

         request.user = payload.user;
         return next();
      }

      if (connectSID) {
         return next();
      }

      const payload = JWT.isTokenValid(refreshToken);

      const existingToken = await Token.findOne({
         user: payload.user.id,
         refreshToken: payload.refreshToken,
      });

      if (!existingToken || !existingToken?.isValid) {
         return response
            .status(StatusCodes.UNAUTHORIZED)
            .json({ msg: 'Authentication Invalid' });
      }

      JWT.attachCookiesToResponse({
         response,
         user: payload.user,
         refreshToken: existingToken.refreshToken,
      });

      request.user = payload.user;

      return next();
   } catch (error) {
      return response
         .status(StatusCodes.UNAUTHORIZED)
         .json({ msg: 'Authentication Invalid' });
   }
};

const errorHandler: ErrorRequestHandler = (
   error,
   request: Request,
   response: Response,
   next: NextFunction
) => {
   if (process.env.NODE_ENV !== 'test') {
      logger.info(error.message);
   }

   if (error.name === 'ValidationError') {
      const errormsg = Object.values(error.errors)
         .map((item: any) => item.message)
         .join(',');

      response.status(StatusCodes.BAD_REQUEST).json({
         msg: errormsg,
      });
   }

   if (error.code && error.code === 11000) {
      response.status(StatusCodes.BAD_REQUEST).json({
         msg: `Duplicate value entered for ${Object.keys(
            error.keyValue
         )} field, please choose another value`,
      });
   }
   if (error.name === 'CastError') {
      response.status(StatusCodes.BAD_REQUEST).json({
         msg: `No item found with id : ${error.value}`,
      });
   }

   return response.status(StatusCodes.BAD_REQUEST).json({
      msg: error.message,
   });
};

const unknownEndpoint = (request: Request, response: Response) => {
   response.status(StatusCodes.NOT_FOUND).send('The route does not exist');
};

export default {
   requestLogger,
   authenticateUser,
   errorHandler,
   unknownEndpoint,
};
