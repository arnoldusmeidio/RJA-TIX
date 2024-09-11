import { StudioType } from "@prisma/client";
import { z } from "zod";

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
  studios: z
    .array(createStudioSchema)
    .min(1, { message: "There should be at least 1 studio" }),
});

export const updateCinemaSchema = z.object({
  cinemaName: z.string().min(1, { message: "Cinema name is required" }),
  managerId: z.string().min(1, { message: "Manager ID is required" }),
  address: z.string().min(1, { message: "Address is required" }),
});
