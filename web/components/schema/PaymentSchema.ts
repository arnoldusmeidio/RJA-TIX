import { z } from "zod";

const paymentSchema = z.object({
  userId: z.string(),
  studioId: z.number(),
  showtimeId: z.number(),
  price: z.number(),
  seats: z.array(z.object({ column: z.number(), row: z.number() })),
});
