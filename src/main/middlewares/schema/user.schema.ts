import { z } from 'zod';

export const CreateUserSchema = z.object({
  body: z.object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().email('Invalid email address'),
    password: z.string().min(4, 'Password must be at least 6 characters long'),
  }),
});
