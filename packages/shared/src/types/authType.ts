import { z } from "zod";
import {
  loginSchema,
  registerSchema,
  resetPasswordSchema,
} from "../schema/authSchema";

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
