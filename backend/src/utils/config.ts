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
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID as string;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET as string;
const GITHUB_CLIENT_ID = process.env.GITHUB_CLIENT_ID as string;
const GITHUB_CLIENT_SECRET = process.env.GITHUB_CLIENT_SECRET as string;
const CLIENT_URL = process.env.CLIENT_URL as string;

export default {
   PORT,
   MONGO_URI,
   JWT_SECRET,
   JWT_LIFETIME,
   EMAIL_HOST,
   EMAIL_PASSWORD,
   EMAIL_USER,
   GOOGLE_CLIENT_ID,
   GOOGLE_CLIENT_SECRET,
   GITHUB_CLIENT_ID,
   GITHUB_CLIENT_SECRET,
   CLIENT_URL,
};
