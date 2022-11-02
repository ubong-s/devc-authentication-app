import mongoose from 'mongoose';
import app from './app';
import config from './utils/config';
import logger from './utils/logger';

mongoose
   .connect(config.MONGO_URI as string)
   .then(() => {
      logger.info('Connected to MongoDB');
      app.listen(config.PORT, () => {
         logger.info(`Server is running on port ${config.PORT}`);
      });
   })
   .catch((error) => {
      logger.error(`Error connecting to MongoDB, ${error.message} `);
   });
