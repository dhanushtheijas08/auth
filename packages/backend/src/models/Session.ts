import mongoose, { Document, Schema } from "mongoose";

export type ISession = {
  userId: mongoose.Types.ObjectId;
  token: string;
  deviceInfo?: string;
  isValid: boolean;
  expiresAt: Date;
  createdAt: Date;
  updatedAt: Date;
};

export type ISessionDocument = ISession & Document;

const sessionSchema = new Schema<ISessionDocument>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User ID is required"],
    },
    token: {
      type: String,
      required: [true, "Token is required"],
      unique: true,
      minlength: [32, "Token must be at least 32 characters long"],
    },
    deviceInfo: {
      type: String,
      required: false,
      maxlength: [255, "Device info cannot be longer than 255 characters"],
    },
    isValid: {
      type: Boolean,
      default: true,
    },
    expiresAt: {
      type: Date,
      required: [true, "Expiration date is required"],
    },
  },
  {
    timestamps: true,
  }
);

sessionSchema.index({ token: 1 });
sessionSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

export const Session = mongoose.model<ISessionDocument>(
  "Session",
  sessionSchema
);
