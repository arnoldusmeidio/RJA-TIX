import { z } from "zod";

export const updateUserSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  email: z.string().email().min(1, { message: "Name is required" }),
  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters long" })
    .nullish(),
});
