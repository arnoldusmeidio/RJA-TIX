import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export enum StudioType {
  sphere = "SPHERE",
  starium = "STARIUM",
  four_dx = "FOUR_DX",
  gold_class = "GOLD_CLASS",
  private_box = "PRIVATE_BOX",
}

export const studioTypeKeys = Object.keys;

export const createStudioSchema = z.object({
  price: z.number({ message: "Price is required" }),
  studioType: z.nativeEnum(StudioType, { message: "Studio type is required" }),
  rows: z.number({ message: "Rows are required" }),
  columns: z.number({ message: "Columns are required" }),
});

export const createCinemaSchema = z.object({
  cinemaName: z.string().min(1, { message: "Cinema name is required" }),
  managerId: z.string().min(1, { message: "Manager ID is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  studios: z.array(createStudioSchema),
});

export type FormTypeCreateCinema = z.infer<typeof createCinemaSchema>;

export const useFormCreateCinema = () =>
  useForm<FormTypeCreateCinema>({
    resolver: zodResolver(createCinemaSchema),
    mode: "onBlur",
  });
