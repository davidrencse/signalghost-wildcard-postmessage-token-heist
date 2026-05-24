import { Request, Response, NextFunction } from 'express';
import { ApiError } from '../types';

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  const apiError: ApiError = {
    error: {
      code: 'INTERNAL_ERROR',
      message: err.message,
      details: null
    }
  };
  res.status(500).json(apiError);
};