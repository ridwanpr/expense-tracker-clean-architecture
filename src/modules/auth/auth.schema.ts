import { z } from "zod";

export const registerUserSchema = z.object({
  username: z
    .string({ message: "Username is required" })
    .min(3, { message: "Username must be at least 3 characters" })
    .max(100, { message: "Username must be less than 100 characters" }),
  password: z
    .string({ message: "Password is required" })
    .min(4, { message: "Password must be at least 4 characters" })
    .max(100, { message: "Password must be less than 100 characters" }),
  name: z
    .string({ message: "Name is required" })
    .min(3, { message: "Name must be at least 3 characters" })
    .max(100, { message: "Name must be less than 100 characters" }),
});

export const loginUserSchema = z.object({
  username: z.string().min(3).max(100),
  password: z.string().max(100),
});

export type RegisterUserDTO = z.infer<typeof registerUserSchema>;
export type LoginUserDTO = z.infer<typeof loginUserSchema>;
