import { Genre, Rated } from "@prisma/client";
import { z } from "zod";

export const createMovieSchema = z.object({
  title: z.string(),
  director: z.string(),
  genre: z.nativeEnum(Genre),
  rated: z.nativeEnum(Rated),
  duration: z.number(),
  releaseDate: z.string(),
  posterUrl: z.any(),
});
