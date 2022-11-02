import dotenv from 'dotenv';

dotenv.config();

const PORT = process.env.PORT;
const MONGO_URI =
   process.env.NODE_ENV === 'test'
      ? process.env.MONGODB_TEST_URI
      : process.env.MONGODB_URI;

export default { PORT, MONGO_URI };
