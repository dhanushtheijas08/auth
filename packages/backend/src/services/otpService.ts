import { customAlphabet } from "nanoid";

import { User } from "../models/User";
import { VerificationCode } from "../models/VerificationCode";
import { OtpType } from "../types/authTypes";
import ApiError from "../lib/ApiError";
const ALPHABET =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
const OTP_LENGTH = 12;
const otpGenerator = customAlphabet(ALPHABET, OTP_LENGTH);

export const generateOtp = async (otpType: OtpType, userId: string) => {
  const count = await VerificationCode.countDocuments({
    userId,
    verificationType: otpType,
    expiresAt: { $gt: new Date() },
  });

  if (count >= 5) {
    throw new ApiError(400, "Too many OTPs generated");
  }

  const verificationCode = await VerificationCode.create({
    userId,
    verificationType: otpType,
    verificationCode: otpGenerator(),
  });

  return { code: verificationCode.verificationCode };
};

export const verifyOtp = async (
  otpType: OtpType,
  userId: string,
  otp: string
) => {
  const verificationCode = await VerificationCode.findOne({
    userId,
    verificationType: otpType,
    expiresAt: { $gt: new Date() },
    verificationCode: otp,
  });

  if (!verificationCode) {
    return {
      status: false,
      message: "Verification code not found or expired",
    };
  }

  await User.findByIdAndUpdate(userId, { isVerified: true });
  await VerificationCode.deleteOne({ _id: verificationCode._id });
  return {
    status: true,
    message: "Verification code verified",
  };
};
