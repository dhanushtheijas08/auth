import { jwtVerify, SignJWT } from "jose";

const secret = new TextEncoder().encode(process.env.SECRET || "sample");

export const createRefreshToken = async (sessionId: string) => {
  const token = await new SignJWT({
    sessionId,
  })
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setAudience("user")
    .setExpirationTime("30d")
    .sign(secret);

  return token;
};

export const createAccessToken = async (userId: string, sessionId: string) => {
  const token = await new SignJWT({
    userId,
    sessionId,
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

export const verifyToken = async (token: string) => {
  const { payload } = await jwtVerify<{ sessionId: string }>(token, secret);
  return payload;
};
