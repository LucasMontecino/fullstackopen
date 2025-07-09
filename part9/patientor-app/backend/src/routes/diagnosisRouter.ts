import express, { Response } from 'express';
import type { Diagnosis } from '../types';
import diagnosisService from '../services/diagnosisService';

const diagnosisRouter = express.Router();

diagnosisRouter.get('/', (_req, res: Response<Diagnosis[]>) => {
  const diagnoses: Diagnosis[] = diagnosisService.getAll();
  res.status(200).json(diagnoses);
  return;
});

export default diagnosisRouter;
