import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const CreateShowtimeSchema = z.object({
  movieId: z.number({ message: "Movie ID is required" }),
  studioId: z.number({ message: "Studio ID is required" }),
  showtimes: z.array(
    z.object({
      date: z.string().min(1, { message: "Valid input is required" }),
      time: z.string().min(1, { message: "Valid input is required" }),
    })
  ),
});

export type FormTypeCreateShowtime = z.infer<typeof CreateShowtimeSchema>;

export const useFormCreateShowtime = () =>
  useForm<FormTypeCreateShowtime>({
    resolver: zodResolver(CreateShowtimeSchema),
    mode: "onBlur",
  });
