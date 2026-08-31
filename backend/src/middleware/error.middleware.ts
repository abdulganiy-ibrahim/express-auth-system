import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../errors/AppError.js';

export const errorMiddleware = (
  err: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if ( err instanceof AppError ) {
    return res.status(err.statusCode).json({
      message: err.message
    });
  }

  console.log(err);

  return res.status(500).json({
    message: 'Internal server error'
  });
}