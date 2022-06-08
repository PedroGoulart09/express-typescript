// ./index.ts


import express, { NextFunction, Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import 'express-async-errors';
import bookRouter from './src/routes/books.routes'
import userRoutes from './src/routes/user.routes'

const app = express();
app.use(express.json());
app.use(userRoutes)
app.use(bookRouter)

const PORT = 8000;

app.get('/', (req, res) => {
  res.status(StatusCodes.OK).send('Express + TypeScript')
});




app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
  });