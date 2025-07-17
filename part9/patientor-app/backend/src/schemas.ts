import { z } from 'zod';
import { Gender, HealthCheckRating } from './types';

export const NewPatientSchema = z.object({
  name: z.string(),
  dateOfBirth: z.iso.date(),
  ssn: z.string(),
  gender: z.enum(Gender),
  occupation: z.string(),
});

export const NewEntrySchema = z.object({
  date: z.iso.date(),
  description: z.string(),
  specialist: z.string(),
  diagnosisCodes: z.optional(z.array(z.string())),
});

export const DiscriminatedEntries = z.discriminatedUnion('type', [
  NewEntrySchema.extend({
    discharge: z.object({ date: z.string(), criteria: z.string() }),
    type: z.literal('Hospital'),
  }),
  NewEntrySchema.extend({
    employerName: z.string(),
    sickLeave: z.optional(
      z.object({
        startDate: z.string(),
        endDate: z.string(),
      })
    ),
    type: z.literal('OccupationalHealthcare'),
  }),
  NewEntrySchema.extend({
    healthCheckRating: z.enum(HealthCheckRating),
    type: z.literal('HealthCheck'),
  }),
]);
