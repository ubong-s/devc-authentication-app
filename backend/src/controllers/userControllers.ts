import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

const showMe = async (request: Request, response: Response) => {
   let tokenUser;

   if (request.user) {
      tokenUser = {
         // @ts-ignore
         id: request.user._id || request.user.id,
         name: request.user.name || '',
         email: request.user.email,
         role: request.user.role,
         photo: request.user.photo,
      };
   }

   response.status(StatusCodes.OK).json({ user: tokenUser });
};

export default { showMe };
