declare namespace Express {
   export interface Request {
      user?: {
         name?: string;
         email: string;
         id: string;
         role: string;
         photo?: string;
      };
   }
}
