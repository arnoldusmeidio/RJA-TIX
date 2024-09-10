import { StudioType } from "@prisma/client";
import { z } from "zod";

export const createSeatSchema = z.object({
  row: z.number(),
  column: z.number(),
});

export const createStudioSchema = z.object({
  number: z.number(),
  price: z.number(),
  studioType: z.nativeEnum(StudioType),
  seats: z.array(createSeatSchema),
});

export const addressSchema = z.object({
  address: z.string(),
  lat: z.number(),
  lng: z.number(),
});

export const createCinemaSchema = z.object({
  cinemaName: z.string().min(1),
  managerId: z.string().min(1),
  address: addressSchema,
  studios: z.array(createStudioSchema),
});
