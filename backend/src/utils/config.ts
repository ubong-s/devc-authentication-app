import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;
const MONGO_URI =
   process.env.NODE_ENV === 'test'
      ? (process.env.MONGODB_TEST_URI as string)
      : (process.env.MONGODB_URI as string);
const JWT_SECRET = process.env.JWT_SECRET as string;
const JWT_LIFETIME = process.env.JWT_LIFETIME;
const EMAIL_HOST = process.env.EMAIL_HOST;
const EMAIL_USER = process.env.EMAIL_USER;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;

export default {
   PORT,
   MONGO_URI,
   JWT_SECRET,
   JWT_LIFETIME,
   EMAIL_HOST,
   EMAIL_PASSWORD,
   EMAIL_USER,
};
