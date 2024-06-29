import { z } from 'zod';

export const createUserSchema = z.object({
  name: z.string().min(1, {message : "Name must not be empty"}),
  email: z.string().min(1, {message: "Email must not be empty"}).email({message : "Email format not valid"})
});
