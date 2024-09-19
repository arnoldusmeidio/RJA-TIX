import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const reviewSchema = z.object({
  review: z.string(),
  star: z.string(),
});

export type FormTypeCreateReview = z.infer<typeof reviewSchema>;

export const useFormCreateReview = () =>
  useForm<FormTypeCreateReview>({
    resolver: zodResolver(reviewSchema),
    mode: "onBlur",
  });
