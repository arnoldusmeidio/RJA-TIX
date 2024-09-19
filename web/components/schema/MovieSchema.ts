import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export enum Genre {
  action = "ACTION",
  adventure = "ADVENTURE",
  animation = "ANIMATION",
  comedy = "COMEDY",
  crime = "CRIME",
  documentary = "DOCUMENTARY",
  drama = "DRAMA",
  family = "FAMILY",
  fantasy = "FANTASY",
  history = "HISTORY",
  horror = "HORROR",
  music = "MUSIC",
  mystery = "MYSTERY",
  romance = "ROMANCE",
  sci_fi = "SCI_FI",
  sport = "SPORT",
  thriller = "THRILLER",
}

export enum Rated {
  g = "G",
  pg = "PG",
  pg_13 = "PG_13",
  r = "R",
  nc_17 = "NC_17",
}

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const createMovieSchema = z.object({
  title: z.string().min(1, { message: "Movie title is required" }),
  director: z.string().min(1, { message: "Movie director is required" }),
  genre: z.nativeEnum(Genre, { message: "Genre is required" }),
  rated: z.nativeEnum(Rated, { message: "Rated is required" }),
  duration: z.string().min(1, { message: "Movie duration is required" }),
  releaseYear: z.string().min(1, { message: "Release year is required" }),
  synopsis: z.string().min(1, { message: "Synopsis is required" }),
  posterUrl: z
    .any()
    .refine(
      (files) => (files.length > 0 ? true : false),
      "Movie poster is required"
    )
    .refine(
      (files) => ACCEPTED_IMAGE_TYPES.includes(files?.[0]?.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported"
    ),
});

export type FormTypeCreateMovie = z.infer<typeof createMovieSchema>;

export const useFormCreateMovie = () =>
  useForm<FormTypeCreateMovie>({
    resolver: zodResolver(createMovieSchema),
    mode: "onBlur",
  });
