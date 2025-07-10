import express, { NextFunction, Request, Response } from 'express';
import type { NewPatient, NonSensitivePatient, Patient } from '../types';
import patientService from '../services/patientService';
import { newDiaryParser } from '../middlewares';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  const patients = patientService.getNonSensitiveAll();
  res.status(200).json(patients);
  return;
});

patientRouter.post(
  '/',
  newDiaryParser,
  (
    req: Request<unknown, unknown, NewPatient>,
    res: Response<Patient>,
    next: NextFunction
  ) => {
    try {
      const addedPatient: Patient = patientService.addPatient(req.body);

      res.status(201).json(addedPatient);
      return;
    } catch (error: unknown) {
      next(error);
    }
  }
);

export default patientRouter;
