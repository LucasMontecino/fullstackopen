import { z } from 'zod';

export const NewBlogSchema = z.object({
  author: z.string().optional(),
  url: z.string(),
  title: z.string(),
  likes: z.number().optional(),
  year: z.number().gte(1991).lte(new Date().getFullYear()).optional(),
});

export const NewUserSchema = z.object({
  name: z.string().min(3),
  username: z.string().min(4).max(30),
  password: z.string().min(6),
});

export const LoginSchema = z.object({
  username: z.string().min(4).max(30),
  password: z.string().min(6),
});

export const SetBlogSchema = z.object({
  userId: z.number(),
  blogId: z.number(),
});

export const UpdateReadingBlog = z.object({
  readed: z.boolean(),
});
