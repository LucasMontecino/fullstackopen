import diagnosesEntries from '../data/diagnoses';
import type { Diagnosis } from '../types';

const diagnoses: Diagnosis[] = diagnosesEntries;

const getAll = (): Diagnosis[] => {
  return diagnoses;
};

export default {
  getAll,
};
