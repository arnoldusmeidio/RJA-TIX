import { z } from "zod";

export const createShowtimeSchema = z.object({
  movieId: z.number(),
  studioId: z.number(),
  showtimes: z
    .array(
      z.object({
        date: z.string().min(1, { message: "Valid input is required" }),
        time: z.string().min(1, { message: "Valid input is required" }),
      })
    )
    .min(1, { message: "There should be at least 1 showtime" }),
});
