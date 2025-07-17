import patientEntries from '../data/patients';
import type {
  Patient,
  NonSensitivePatient,
  NewPatient,
  EntryWithoutId,
  Entry,
} from '../types';
import { v4 as uuidv4 } from 'uuid';

let patients: Patient[] = patientEntries;

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
    ...entry,
    id: uuidv4(),
    entries: [],
  };

  patients.push(newPatient);
  return newPatient;
};

const updatePatient = (
  id: string,
  newEntry: EntryWithoutId
): Patient | undefined => {
  const findEntry = patients.find((p) => p.id === id);

  if (!findEntry) return undefined;
  const entry: Entry = { ...newEntry, id: uuidv4() };
  patients = patients.map((p) =>
    p.id === id ? { ...p, entries: p.entries.concat(entry) } : p
  );

  return patients.find((p) => p.id === id);
};

export default {
  getAll,
  getNonSensitiveAll,
  addPatient,
  findById,
  updatePatient,
};
