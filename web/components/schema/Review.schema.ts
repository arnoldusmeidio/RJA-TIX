import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const reviewSchema = z.object({
  review: z.string(),
  star: z.number().min(1).max(5),
  movieId: z.number(),
});

export type FormTypeCreateReview = z.infer<typeof reviewSchema>;

export const useFormCreateReview = () =>
  useForm<FormTypeCreateReview>({
    resolver: zodResolver(reviewSchema),
  });
