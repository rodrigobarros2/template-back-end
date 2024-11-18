import { z } from 'zod';

export const CreatePostSchema = z.object({
  body: z.object({
    id: z.string().optional(),
    title: z.string().min(1, 'Title is required'),
    content: z.string().min(1, 'Content is required'),
    published: z.boolean().optional(),
    authorId: z.string().min(1, 'Author ID is required'),
  }),
});
