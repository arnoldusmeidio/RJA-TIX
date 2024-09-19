import { z } from "zod";

export const voucherSchema = z.object({
  voucherId: z.string().min(1, { message: "Voucher ID is required" }),
  discount: z.number().min(1, { message: "Discount amount is required" }),
  availability: z
    .number()
    .min(1, { message: "Availability amount is required" }),
  expiredAt: z.string().min(1, { message: "Availability amount is required" }),
});
