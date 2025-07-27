import { z } from 'zod';

export const NewBlogSchema = z.object({
  author: z.string().optional(),
  url: z.string(),
  title: z.string(),
  likes: z.number().optional(),
});

export const NewUserSchema = z.object({
  name: z.string().min(3),
  username: z.string().min(4).max(30),
  password: z.string().min(6),
});
