import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email().min(1, { message: "Email is required" }),
  password: z.string().min(1, { message: "Password is required" }),
  rememberMe: z.boolean(),
});

export type FormTypeLogin = z.infer<typeof loginSchema>;

export const useFormLogin = () =>
  useForm<FormTypeLogin>({
    resolver: zodResolver(loginSchema),
    mode: "onBlur",
  });

export const registerSchema = z
  .object({
    name: z.string().min(1, { message: "Name is required" }),
    referralCode: z.string(),
    email: z.string().email().min(1, { message: "Email is required" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters long" }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirmation password is required" }),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: "Password do not match",
      path: ["confirmPassword"],
    }
  );

export type FormTypeRegister = z.infer<typeof registerSchema>;

export const useFormRegister = () =>
  useForm<FormTypeRegister>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });
