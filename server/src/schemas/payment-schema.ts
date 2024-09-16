import { z } from "zod";

export const paymentSchema = z.object({
  adminVoucherId: z.string({ message: "admin voucherId" }).optional(),
  points: z.string().nullish(),
  studioId: z.number({ message: "studio id" }),
  showtimeId: z.number({ message: "showitme id" }),
  totalPrice: z.number({ message: "total price" }),
  voucherId: z.number({ message: "voucher id" }).optional(),
  seats: z.array(z.object({ column: z.number(), row: z.number() })),
});
