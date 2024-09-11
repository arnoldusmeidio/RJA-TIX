import { zodResolver } from "@hookform/resolvers/zod";
import { ReactNode } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";

export enum StudioType {
  starium = "STARIUM",
  private_box = "PRIVATE_BOX",
  four_dx = "FOUR_DX",
  gold_class = "GOLD_CLASS",
  sphere = "SPHERE",
}

export const studioTypeKeys = Object.keys;

export const createStudioSchema = z.object({
  number: z.number(),
  price: z.number(),
  studioType: z.enum([
    "STARIUM",
    "PRIVATE_BOX",
    "FOUR_DX",
    "GOLD_CLASS",
    "SPHERE",
  ]),
  rows: z.number(),
  columns: z.number(),
});

export const createCinemaSchema = z.object({
  cinemaName: z.string().min(1),
  managerId: z.string().min(1),
  address: z.string(),
  studios: z.array(createStudioSchema),
});

export type FormTypeCreateCinema = z.infer<typeof createCinemaSchema>;

export const useFormCreateCinema = () =>
  useForm<FormTypeCreateCinema>({
    resolver: zodResolver(createCinemaSchema),
    defaultValues: {
      address: "",
      cinemaName: "",
      studios: [],
    },
  });

export const FormProvideCreateCinema = ({
  children,
}: {
  children: ReactNode;
}) => {
  const methods = useFormCreateCinema();

  return <FormProvider {...methods}>{children}</FormProvider>;
};
