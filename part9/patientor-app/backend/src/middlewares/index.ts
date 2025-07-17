import { NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import { DiscriminatedEntries, NewPatientSchema } from '../schemas';

export const newDiaryParser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    NewPatientSchema.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export const newEntryParser = (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    DiscriminatedEntries.parse(req.body);
    next();
  } catch (error: unknown) {
    next(error);
  }
};

export const unknownEndpoint = (_req: Request, res: Response) => {
  res.status(404).json({ error: 'unknown endpoint' });
  return;
};

export const errorHandler = (
  error: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof ZodError) {
    res.status(400).json({ error: error.issues });
    return;
  } else if (error instanceof Error) {
    res.status(400).json({ error: error.message });
    return;
  } else {
    res.status(400).json({ error: 'unknown error' });
  }
};
