import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import logger from './logger';

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

const errorHandler: ErrorRequestHandler = (
   error,
   request: Request,
   response: Response,
   next: NextFunction
) => {
   if (process.env.NODE_ENV !== 'test') {
      logger.info(error.message);
   }

   next();
};

const unknownEndpoint = (request: Request, response: Response) => {
   response.status(StatusCodes.NOT_FOUND).send('The route does not exist');
};

export default { requestLogger, errorHandler, unknownEndpoint };
