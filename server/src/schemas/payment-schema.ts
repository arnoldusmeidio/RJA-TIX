import { z } from "zod";

export const paymentSchema = z.object({
  adminVoucherId: z.string().nullish(),
  points: z.string().nullish(),
  studioId: z.number(),
  showtimeId: z.number(),
  totalPrice: z.number(),
  voucherId: z.number().nullish(),
  seats: z.array(z.object({ column: z.number(), row: z.number() })),
});
