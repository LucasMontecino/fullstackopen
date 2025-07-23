import { NextFunction, Request, Response } from 'express';
import { NewBlogSchema } from '../schemas';

export const newBlogParser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    NewBlogSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export const unknownEndpoint = (_req: Request, res: Response) => {
  res.status(404).json({ error: 'unknown error' });
  return;
};

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof Error) {
    res.status(400).json({ error: error.message });
    return;
  } else {
    res.status(500).json({ error: 'unknown error' });
    return;
  }
};
