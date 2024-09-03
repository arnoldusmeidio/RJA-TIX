import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const schemaLogin = z.object({
  email: z.string().email().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
});

export type FormTypeLogin = z.infer<typeof schemaLogin>;

export const useFormLogin = () =>
  useForm<FormTypeLogin>({ resolver: zodResolver(schemaLogin) });
