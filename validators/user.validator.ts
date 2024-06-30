import { z } from 'zod';

export const createUserSchema = z.object({
  userName: z.string().min(1, {message : "Name must not be empty"}),
  userEmail: z.string().min(1, {message: "Email must not be empty"}).email({message : "Email format not valid"})
});
