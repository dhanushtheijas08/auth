import { NextFunction, Request, Response } from "express";
import ApiError from "../lib/ApiError";
import { thirtyDaysFromNow } from "../lib/dates";
import { Session } from "../models/Session";
import { User } from "../models/User";
import { clearAuthCookies, setAuthCookies } from "../services/authCookies";
import { createAuthToken, verifyToken } from "../services/jwtToken";
import { loginSchema, registerSchema } from "@auth/shared";
import { z } from "zod";
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
    const payload = await verifyToken(accessToken);

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
