import type { DiaryEntry, NonSensitiveEntry, NewDiaryEntry } from '../types';
import diaryEntries from '../data/diaryentries.json';

const diaries = diaryEntries as DiaryEntry[];

const getAll = (): DiaryEntry[] => {
  return diaries;
};

const getNonSensitiveEntries = (): NonSensitiveEntry[] => {
  return diaries.map(({ id, date, weather, visibility }) => {
    return {
      id,
      date,
      weather,
      visibility,
    };
  });
};

const findEntryById = (id: number): DiaryEntry | undefined => {
  return diaries.find((diary) => diary.id === id);
};

const addDiary = (entry: NewDiaryEntry): DiaryEntry => {
  const newEntry: DiaryEntry = {
    id: Math.max(...diaries.map((d) => d.id)) + 1,
    ...entry,
  };
  diaries.push(newEntry);
  return newEntry;
};

export default {
  getAll,
  addDiary,
  getNonSensitiveEntries,
  findEntryById,
};
