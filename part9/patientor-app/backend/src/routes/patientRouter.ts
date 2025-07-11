import express, { NextFunction, Request, Response } from 'express';
import type {
  MyError,
  NewPatient,
  NonSensitivePatient,
  Patient,
} from '../types';
import patientService from '../services/patientService';
import { newDiaryParser } from '../middlewares';

const patientRouter = express.Router();

patientRouter.get(
  '/',
  (_req: Request, res: Response<NonSensitivePatient[]>) => {
    const patients = patientService.getNonSensitiveAll();
    res.status(200).json(patients);
    return;
  }
);

patientRouter.get(
  '/:id',
  (req: Request, res: Response<Patient | MyError>, next: NextFunction) => {
    try {
      const { id } = req.params;
      const findEntry: Patient | undefined = patientService.findById(id);
      if (!findEntry) {
        res.status(404).json({ error: 'No patient found' });
        return;
      } else {
        res.status(200).json({ ...findEntry, entries: [] });
        return;
      }
    } catch (error: unknown) {
      next(error);
    }
  }
);

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
