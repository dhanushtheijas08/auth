import mongoose, { Document, Schema } from "mongoose";
import { OtpType } from "../types/authTypes";
import { fifteenMinFromNow } from "../lib/dates";

export type IVerificationCode = {
  userId: mongoose.Types.ObjectId;
  verificationType: OtpType;
  verificationCode: string;
  expiresAt: Date;
  createdAt: Date;
};

export type IVerificationCodeDocument = IVerificationCode & Document;

const verificationCodeSchema = new Schema<IVerificationCodeDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
      index: true,
    },
    verificationType: {
      type: String,
      enum: ["EMAIL_VERIFICATION", "RESET_PASSWORD"],
      required: [true, "Verification type is required"],
    },
    expiresAt: {
      type: Date,
      required: [true, "Expiration date is required"],
      default: fifteenMinFromNow(),
    },
    verificationCode: {
      type: String,
      required: [true, "Verification code is required"],
      minlength: [12, "Verification code must be 12 characters long"],
      maxlength: [12, "Verification code must be 12 characters long"],
      index: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

verificationCodeSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const VerificationCode = mongoose.model<IVerificationCodeDocument>(
  "VerificationCode",
  verificationCodeSchema
);
