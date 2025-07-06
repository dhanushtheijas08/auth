import { JWTPayload, jwtVerify, SignJWT } from "jose";
import { Types } from "mongoose";

const secret = new TextEncoder().encode(process.env.SECRET || "sample");

export const createRefreshToken = async (
  sessionId: string | Types.ObjectId
) => {
  const token = await new SignJWT({
    sessionId: sessionId.toString(),
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setAudience("user")
    .setExpirationTime("30d")
    .sign(secret);

  return token;
};

export const createAccessToken = async (
  userId: string | Types.ObjectId,
  sessionId: string | Types.ObjectId
) => {
  const token = await new SignJWT({
    userId: userId.toString(),
    sessionId: sessionId.toString(),
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setAudience("user")
    .setExpirationTime("15m")
    .sign(secret);

  return token;
};

export const createAuthToken = async (userId: string, sessionId: string) => {
  const refreshToken = await createRefreshToken(sessionId);
  const accessToken = await createAccessToken(userId, sessionId);

  return {
    refreshToken,
    accessToken,
  };
};

export const verifyToken = async <T extends JWTPayload = JWTPayload>(
  token: string
) => {
  const { payload } = await jwtVerify<T>(token, secret);
  return payload;
};
