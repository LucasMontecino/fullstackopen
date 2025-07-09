import express, { Request, Response } from 'express';
import type {
  MyError,
  NewPatient,
  NonSensitivePatient,
  Patient,
} from '../types';
import patientService from '../services/patientService';
import { toNewPatient } from '../utils';

const patientRouter = express.Router();

patientRouter.get('/', (_req, res: Response<NonSensitivePatient[]>) => {
  const patients = patientService.getNonSensitiveAll();
  res.status(200).json(patients);
  return;
});

patientRouter.post('/', (req: Request, res: Response<Patient | MyError>) => {
  try {
    const newPatient: NewPatient = toNewPatient(req.body);
    const addedPatient: Patient = patientService.addPatient(newPatient);

    res.status(201).json(addedPatient);
    return;
  } catch (error: unknown) {
    let errMsg = '';
    if (error instanceof Error) {
      errMsg += error.message;
    }
    res.status(400).json({ error: errMsg });
    return;
  }
});

export default patientRouter;
