import mongoose, { Document, Schema } from "mongoose";

export type ISession = {
  userId: mongoose.Types.ObjectId;
  token: string;
  deviceInfo?: string;
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
    deviceInfo: {
      type: String,
      required: false,
      maxlength: [255, "Device info cannot be longer than 255 characters"],
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
