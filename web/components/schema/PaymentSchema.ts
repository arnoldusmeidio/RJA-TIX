import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const paymentSchema = z.object({
  voucher: z.number().or(z.nan()).default(Number.NaN),
  points: z.number().or(z.nan()).default(Number.NaN),
  adminVoucherId: z.string().nullish(),
  adminVoucherDiscount: z.number().nullish(),
});

export type FormTypeCreatePayment = z.infer<typeof paymentSchema>;

export const useFormCreatePayment = () =>
  useForm<FormTypeCreatePayment>({
    resolver: zodResolver(paymentSchema),
  });
