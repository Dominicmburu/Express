import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  console.error(err.stack);
  res
    .status(err.status || 500)
    .json({ message: err.message || 'An unexpected error occurred' });
};
