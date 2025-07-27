import { NextFunction, Request, Response } from 'express';
import { NewBlogSchema, NewUserSchema } from '../schemas';
import { ZodError } from 'zod';

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

export const newUserParser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    NewUserSchema.parse(req.body);
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
  if (error instanceof ZodError) {
    return res.status(400).json({ error: error.issues });
  }

  if (error instanceof Error) {
    return res.status(400).json({ error: error.message });
  }
  return res.status(500).json({ error: 'unknown error' });
};
