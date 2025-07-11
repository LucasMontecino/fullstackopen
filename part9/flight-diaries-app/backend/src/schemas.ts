import { z } from 'zod';
import { Visibility, Weather } from './types';

export const newEntrySchema = z.object({
  date: z.iso.date(),
  weather: z.enum(Weather),
  visibility: z.enum(Visibility),
  comment: z.string(),
});
