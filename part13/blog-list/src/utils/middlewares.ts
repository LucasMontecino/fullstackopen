import { NextFunction, Request, Response } from 'express';
import { LoginSchema, NewBlogSchema, NewUserSchema } from '../schemas';
import { ZodError } from 'zod';
import jwt from 'jsonwebtoken';
import config from './config';
import { DecodedToken } from '../types/types';

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

export const loginUserParser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    LoginSchema.parse(req.body);
    next();
  } catch (error) {
    next(error);
  }
};

export const tokenExtractor = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authorization = req.get('authorization');
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    try {
      req.decodedToken = jwt.verify(
        authorization.substring(7),
        config.SECRET_KEY
      ) as DecodedToken;
    } catch (error) {
      return next(error);
    }
  } else {
    return res.status(401).json({ error: 'token missing' });
  }

  return next();
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
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'invalid token' });
    }
    return res.status(400).json({ error: error.message });
  }

  return res.status(500).json({ error: 'unknown error' });
};
