import { NewPatient } from '../types';
import { NewPatientSchema } from '../schemas';

export const toNewPatient = (obj: unknown): NewPatient => {
  return NewPatientSchema.parse(obj);
};
