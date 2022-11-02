import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import middleware from './utils/middleware';

const app = express();

app.use(express.json());
app.use(cors());
app.use(middleware.requestLogger);

// Routes
app.get('/', (request, response) => {
   response.send('Authentication App');
});

app.use(middleware.errorHandler);
app.use(middleware.unknownEndpoint);

export default app;
