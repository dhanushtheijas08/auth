import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(2, { message: "Email must be at least 2 characters long" })
    .max(255, { message: "Email must be at most 255 characters long" })
    .email({ message: "Invalid email address" }),
  password: z
    .string()
    .trim()
    .min(6, { message: "Password must be at least 6 characters long" })
    .max(128, { message: "Password must be at most 128 characters long" }),
});

export const registerSchema = z
  .object({
    username: z
      .string()
      .trim()
      .min(2, { message: "Username must be at least 2 characters long" })
      .max(50, { message: "Username must be at most 50 characters long" }),
  })
  .merge(loginSchema);

export const verificationCodeSchema = z.object({
  code: z
    .string()
    .trim()
    .min(6, { message: "Verification code must be 6 characters long" })
    .max(6, { message: "Verification code must be 6 characters long" }),
});
