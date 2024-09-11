import { z } from "zod";

export const createAdminManagerSchema = z.object({
  id: z.string().min(1, { message: "User ID is required" }),
});
