import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const voucherSchema = z.object({
  voucherId: z.string().min(1, { message: "Voucher ID is required" }),
  discount: z.string({ message: "Discount amount is required" }),
  availability: z.string({ message: "Discount amount is required" }),
  expiredAt: z.string().min(1, { message: "Availability amount is required" }),
});

export type FormTypeCreateVoucher = z.infer<typeof voucherSchema>;

export const useFormCreateVoucher = () =>
  useForm<FormTypeCreateVoucher>({
    resolver: zodResolver(voucherSchema),
    mode: "onBlur",
  });
