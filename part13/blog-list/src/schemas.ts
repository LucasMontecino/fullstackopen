import { z } from 'zod';

export const NewBlogSchema = z.object({
  author: z.string().optional(),
  url: z.string(),
  title: z.string(),
  likes: z.number().optional(),
});
