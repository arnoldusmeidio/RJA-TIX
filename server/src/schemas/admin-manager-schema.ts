import { z } from "zod";

export const createAdminManagerSchema = z.object({
  id: z.string(),
});
