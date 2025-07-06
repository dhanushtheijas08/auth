import { loginSchema, registerSchema } from "@auth/shared";
import { NextFunction, Request, Response } from "express";
import { z } from "zod";
import ApiError from "../lib/ApiError";
import { thirtyDaysFromNow } from "../lib/dates";
import { Session } from "../models/Session";
import { User } from "../models/User";
import {
  clearAuthCookies,
  setAccessTokenCookie,
  setAuthCookies,
  setRefreshTokenCookie,
} from "../services/authCookies";
import {
  createAccessToken,
  createAuthToken,
  createRefreshToken,
  verifyToken,
} from "../services/jwtToken";
import { RefreshTokenPayload } from "../types/authTypes";
type RegisterInput = z.infer<typeof registerSchema>;
type LoginInput = z.infer<typeof loginSchema>;

export const login = async (
  req: Request<{}, {}, LoginInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email }).select("+password");
    if (!user) {
      throw new ApiError(401, "Invalid email or password");
    }

    console.log({ user });

    const isMatch = await user.comparePassword(password);
    console.log({ isMatch });

    if (!isMatch) {
      throw new ApiError(401, "Invalid email or password");
    }

    const session = await Session.create({
      userId: user.id,
      expiresAt: thirtyDaysFromNow(),
      deviceInfo: req.headers["user-agent"],
    });

    const { refreshToken, accessToken } = await createAuthToken(
      user.id,
      session.id
    );

    setAuthCookies(res, refreshToken, accessToken)
      .status(200)
      .json({ success: true, message: "Login successful" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const register = async (
  req: Request<{}, {}, RegisterInput>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email, password, username } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      throw new ApiError(409, "User already exists");
    }
    const user = await User.create({ name: username, email, password });

    const session = await Session.create({
      userId: user.id,
      expiresAt: thirtyDaysFromNow(),
      deviceInfo: req.headers["user-agent"],
    });

    const { refreshToken, accessToken } = await createAuthToken(
      user.id,
      session.id
    );

    setAuthCookies(res, refreshToken, accessToken)
      .status(201)
      .json({ success: true, message: "Registration successful" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const logout = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const accessToken = req.cookies["accessToken"];
    if (!accessToken) {
      throw new ApiError(401, "No access token provided");
    }
    const payload = await verifyToken<RefreshTokenPayload>(accessToken);

    if (!payload) {
      throw new ApiError(401, "Invalid access token");
    }
    await Session.findByIdAndDelete(payload.sessionId);

    clearAuthCookies(res)
      .status(200)
      .json({ success: true, message: "Logout successful" });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const generateNewAccessToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const refreshToken = req.cookies["refreshToken"];
    if (!refreshToken) {
      throw new ApiError(401, "No refresh token provided");
    }

    const payload = await verifyToken<RefreshTokenPayload>(refreshToken);
    if (!payload || !payload.exp || !payload.sessionId) {
      throw new ApiError(401, "Invalid refresh token");
    }

    const session = await Session.findById(payload.sessionId);
    if (!session) {
      throw new ApiError(401, "Session not found");
    }

    const now = new Date();
    if (session.expiresAt < now || payload.exp * 1000 < now.getTime()) {
      throw new ApiError(401, "Session expired");
    }

    const shouldRefresh =
      payload.exp * 1000 < now.getTime() + 24 * 60 * 60 * 1000; // less than 1 day remaining

    let newRefreshToken: string | null = null;
    if (shouldRefresh) {
      newRefreshToken = await createRefreshToken(session.userId);
      await Session.findByIdAndUpdate(session.id, {
        expiresAt: thirtyDaysFromNow(),
      });
    }

    const accessToken = await createAccessToken(session.userId, session.id);

    if (newRefreshToken) {
      setRefreshTokenCookie(res, newRefreshToken);
    }

    setAccessTokenCookie(res, accessToken).status(200).json({
      success: true,
      message: "New access token generated",
    });
  } catch (error) {
    console.error("generateNewAccessToken error:", error);
    clearAuthCookies(res);
    next(error);
  }
};
