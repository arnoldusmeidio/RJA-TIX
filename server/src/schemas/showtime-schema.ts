import { z } from "zod";

export const createShowtimeSchema = z.object({
  movieId: z.number(),
  studioId: z.number(),
});
