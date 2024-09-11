import { Genre, Rated } from "@prisma/client";
import { z } from "zod";

export const createMovieSchema = z.object({
  title: z.string().min(1, { message: "Movie title is required" }),
  director: z.string().min(1, { message: "Movie director is required" }),
  genre: z.nativeEnum(Genre, { message: "Genre is required" }),
  rated: z.nativeEnum(Rated, { message: "Rated is required" }),
  duration: z.string().min(1, { message: "Movie duration is required" }),
  releaseYear: z.string().min(1, { message: "Release year is required" }),
  synopsis: z.string().nullish(),
});
