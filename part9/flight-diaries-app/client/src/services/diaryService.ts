import axios from 'axios';
import { API_BASE_URL } from '../constants';
import type { DiaryEntry, NewDiaryEntry, NonSensitiveEntry } from '../types';

const getAll = async (): Promise<NonSensitiveEntry[]> => {
  const res = await axios.get<NonSensitiveEntry[]>(API_BASE_URL);
  return res.data;
};

const addEntry = async (obj: NewDiaryEntry): Promise<DiaryEntry> => {
  const res = await axios.post<DiaryEntry>(API_BASE_URL, obj);
  return res.data;
};

export default {
  getAll,
  addEntry,
};
