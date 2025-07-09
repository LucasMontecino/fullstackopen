import { ParseSSN } from 'ssn';
import { NewPatient, Gender } from '../types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: string): gender is Gender => {
  return Object.values(Gender)
    .map((v) => v.toString())
    .includes(gender);
};

const isSSN = (ssn: string): boolean => {
  const parseSSN = new ParseSSN(ssn);
  return Boolean(parseSSN);
};

const parseName = (name: unknown): string => {
  if (!isString(name)) throw new Error('incorrect or missing name');
  return name;
};

const parseDateOfBirth = (date: unknown): string => {
  if (!isString(date) || !isDate(date))
    throw new Error('incorrect or missing date');
  return date;
};

const parseSSN = (ssn: unknown): string => {
  if (!ssn) return '';
  if (!isString(ssn) || !isSSN(ssn))
    throw new Error('incorrect or missing ssn');
  return ssn;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender))
    throw new Error('incorrect or missing gender: ' + gender);
  return gender;
};

const parseOccupation = (occupation: unknown): string => {
  if (!isString(occupation)) throw new Error('incorrect or missing occupation');
  return occupation;
};

export const toNewPatient = (obj: unknown): NewPatient => {
  if (!obj || typeof obj !== 'object') throw new Error('incorrect data');
  if (
    'name' in obj &&
    'dateOfBirth' in obj &&
    'ssn' in obj &&
    'gender' in obj &&
    'occupation' in obj
  ) {
    const newPatient: NewPatient = {
      name: parseName(obj.name),
      dateOfBirth: parseDateOfBirth(obj.dateOfBirth),
      ssn: parseSSN(obj.ssn),
      gender: parseGender(obj.gender),
      occupation: parseOccupation(obj.occupation),
    };

    return newPatient;
  }

  throw new Error('incorrect or missing data');
};
