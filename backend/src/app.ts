import 'dotenv/config';
import express, { NextFunction, Request, Response } from 'express';
import morgan from 'morgan';
import noteRoutes from './routes/notes';
import createHttpError, { isHttpError } from 'http-errors';

const app = express();

app.use(morgan('dev'));

app.use(express.json());

app.use('/api/notes', noteRoutes);

app.use((req, res, next) => {
  next(createHttpError(404, 'Endpoint not found!'));
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((error: unknown, req: Request, res: Response, next: NextFunction) => {
  let errorMessage = 'An unknown error occurred';
  let statusCode = 500;
  if (isHttpError(error)) {
    statusCode = error.status;
    errorMessage = error.message;
  }
  res.status(statusCode).json({ error: errorMessage });
});

export default app;
