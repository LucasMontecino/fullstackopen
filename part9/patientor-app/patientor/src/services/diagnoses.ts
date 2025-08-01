import axios from 'axios';
import { apiBaseUrl } from '../constants';
import { Diagnosis } from '../types';

const getAll = async (): Promise<Diagnosis[]> => {
  const res = await axios.get<Diagnosis[]>(`${apiBaseUrl}/diagnoses`);
  return res.data;
};

export default {
  getAll,
};
