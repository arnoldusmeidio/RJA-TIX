import { z } from "zod";

export const reviewSchema = z.object({
  review: z.string(),
  star: z.number().min(1).max(5),
  movieId: z.number(),
});
