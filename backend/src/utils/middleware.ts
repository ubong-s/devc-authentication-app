import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from './logger';
import JWT from './jwt';

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
   const token = request.signedCookies.token;

   if (!token) {
      return response
         .status(StatusCodes.UNAUTHORIZED)
         .json({ msg: 'Authentication Invalid' });
   }

   try {
      const { email, id, role } = JWT.isTokenValid(token);

      request.user = { email, id, role };
      next();
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

   if (error.code === 'ESOCKET') {
      logger.info(error);
   }
   next();
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
