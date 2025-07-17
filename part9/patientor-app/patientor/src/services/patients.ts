import axios from 'axios';
import { EntryWithoutId, Patient, PatientFormValues } from '../types';

import { apiBaseUrl } from '../constants';

const getAll = async () => {
  const { data } = await axios.get<Patient[]>(`${apiBaseUrl}/patients`);

  return data;
};

const create = async (object: PatientFormValues) => {
  const { data } = await axios.post<Patient>(`${apiBaseUrl}/patients`, object);

  return data;
};

const findById = async (id: string): Promise<Patient> => {
  const res = await axios.get<Patient>(`${apiBaseUrl}/patients/${id}`);
  return res.data;
};

const update = async (id: string, obj: EntryWithoutId): Promise<Patient> => {
  const res = await axios.post<Patient>(`${apiBaseUrl}/patients/${id}`, obj);
  return res.data;
};

export default {
  getAll,
  create,
  findById,
  update,
};
