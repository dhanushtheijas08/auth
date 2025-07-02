import {
  registerSchema as sharedRegisterSchema,
  loginSchema as sharedLoginSchema,
} from "@auth/shared";

export const loginSchema = sharedLoginSchema;
export const registerSchema = sharedRegisterSchema;
