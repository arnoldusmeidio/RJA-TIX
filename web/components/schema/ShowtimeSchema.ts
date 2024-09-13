import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const CreateShowtimeSchema = z.object({
  movieId: z.number(),
  studioId: z.number(),
  showtimes: z.array(z.object({ time: z.string() })),
});

export type FormTypeCreateShowtime = z.infer<typeof CreateShowtimeSchema>;

export const useFormCreateShowtime = () =>
  useForm<FormTypeCreateShowtime>({
    resolver: zodResolver(CreateShowtimeSchema),
  });
