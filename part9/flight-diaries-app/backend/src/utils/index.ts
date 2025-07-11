import { NewDiaryEntry } from '../types';
import { newEntrySchema } from '../schemas';

export const toNewDiaryEntry = (object: unknown): NewDiaryEntry => {
  return newEntrySchema.parse(object);
};
