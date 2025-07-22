import { NextFunction, Request, Response } from "express";
import ApiError from "../lib/ApiError";
import { Session } from "../models/Session";
import { User } from "../models/User";
import { verifyToken } from "../services/jwtToken";
export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { accessToken } = req.cookies;
  if (!accessToken) {
    return next(new ApiError(401, "Unauthorized"));
  }
  const decoded = await verifyToken(accessToken);
  const session = await Session.findById(decoded.sessionId);
  if (!session) {
    return next(new ApiError(401, "Unauthorized"));
  }
  const user = await User.findById(session.userId);
  if (!user) {
    return next(new ApiError(401, "User not found"));
  }

  const { email, isVerified, name } = user;

  res.json({
    success: true,
    message: "User fetched successfully",
    user: { email, isVerified, name },
  });
};
