import { CookieOptions, Response } from "express";
import { fifteenMinFromNow, thirtyDaysFromNow } from "../lib/dates";

const defaultOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
};

const REFRESH_TOKEN_PATH = "/auth/refresh";

export const setAuthCookies = (
  res: Response,
  refreshToken: string,
  accessToken: string
) => {
  res.cookie("refreshToken", refreshToken, {
    ...defaultOptions,
    expires: thirtyDaysFromNow(),
    path: REFRESH_TOKEN_PATH,
  });

  res.cookie("accessToken", accessToken, {
    ...defaultOptions,
    expires: fifteenMinFromNow(),
  });

  return res;
};

export const clearAuthCookies = (res: Response) => {
  res.clearCookie("refreshToken", { path: REFRESH_TOKEN_PATH });
  res.clearCookie("accessToken");

  return res;
};
