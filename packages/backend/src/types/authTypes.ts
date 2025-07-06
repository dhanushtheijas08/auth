import { JWTPayload } from "jose";
export type RefreshTokenPayload = {
  sessionId: string;
} & JWTPayload;
export type AccessTokenPayload = {
  userId: string;
} & RefreshTokenPayload;
