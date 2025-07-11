import patientEntries from '../data/patients';
import type { Patient, NonSensitivePatient, NewPatient } from '../types';
import { v4 as uuidv4 } from 'uuid';

const patients: Patient[] = patientEntries as Patient[];

const getAll = (): Patient[] => {
  return patients;
};

const getNonSensitiveAll = (): NonSensitivePatient[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => {
    return {
      id,
      name,
      dateOfBirth,
      gender,
      occupation,
    };
  });
};

const findById = (id: string): Patient | undefined => {
  const findEntry: Patient | undefined = patients.find((p) => p.id === id);
  return findEntry;
};

const addPatient = (entry: NewPatient): Patient => {
  const newPatient: Patient = {
    id: uuidv4(),
    ...entry,
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getAll,
  getNonSensitiveAll,
  addPatient,
  findById,
};
