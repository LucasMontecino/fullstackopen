import { useEffect, useState } from 'react';
import type { NewDiaryEntry, NonSensitiveEntry } from '../types';
import diaryService from '../services/diaryService';
import { AxiosError } from 'axios';

export const useDiaries = () => {
  const [diaries, setDiaries] = useState<NonSensitiveEntry[]>([]);
  const [errors, setErrors] = useState<string>('');

  useEffect(() => {
    const fetchDiaries = async (): Promise<void> => {
      const res = await diaryService.getAll();
      setDiaries(res);
    };
    fetchDiaries();
  }, []);

  const addDiary = async (entry: NewDiaryEntry): Promise<void> => {
    try {
      const addedEntry = await diaryService.addEntry(entry);

      const newEntry: NonSensitiveEntry = {
        id: addedEntry.id,
        date: addedEntry.date,
        weather: addedEntry.weather,
        visibility: addedEntry.visibility,
      };

      setDiaries(diaries.concat(newEntry));
    } catch (error: unknown) {
      if (error instanceof AxiosError) {
        console.error({ error: error.response });
        setErrors(`Error: ${error.response?.data?.error[0]?.message}`);
      } else if (error instanceof Error) {
        console.error({ error: error.message });
        setErrors(error.message);
      }
    }
  };

  return {
    diaries,
    addDiary,
    errors,
    setErrors,
  };
};
