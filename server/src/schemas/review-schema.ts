import { z } from "zod";

export const reviewSchema = z.object({
  review: z.string(),
  star: z.string().min(1, { message: "Star is required" }),
  movieId: z.number(),
});
