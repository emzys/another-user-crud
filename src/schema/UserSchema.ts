import { z } from "zod";

export const createUserSchema = z.object({
  // TODO fix validations so it corresponds to user
  body: z.object({
    name: z.string().min(2, { message: "Name must be 2 or more characters." }),
    email: z.string().email({ message: "Invalid email address." }),
    password: z
      .string()
      .min(6, { message: "Password must be greater than 6 characters." }),
  }),
});

export const updateUserSchema = z.object({
  params: z.object({ id: z.string() }),
  body: z
    .object({
      name: z
        .string()
        .min(2, { message: "Name must be 2 or more characters." }),
      email: z.string().email({ message: "Invalid email address." }),
      password: z
        .string()
        .min(6, { message: "Password must be greater than 6 characters." }),
    })
    .partial(),
});
