import { StudioType } from "@prisma/client";
import { z } from "zod";

export const createStudioSchema = z.object({
  price: z.number(),
  studioType: z.nativeEnum(StudioType),
  rows: z.number(),
  columns: z.number(),
});

export const createCinemaSchema = z.object({
  cinemaName: z.string().min(1),
  managerId: z.string().min(1),
  address: z.string().min(1),
  studios: z.array(createStudioSchema),
});
