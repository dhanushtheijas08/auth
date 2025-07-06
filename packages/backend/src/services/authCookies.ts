import { CookieOptions, Response } from "express";
import { fifteenMinFromNow, thirtyDaysFromNow } from "../lib/dates";

const defaultOptions: CookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "strict",
};

export const REFRESH_TOKEN_PATH = "/auth/refresh";

export const setAccessTokenCookie = (res: Response, accessToken: string) => {
  res.cookie("accessToken", accessToken, {
    ...defaultOptions,
    expires: fifteenMinFromNow(),
  });

  return res;
};

export const setRefreshTokenCookie = (res: Response, refreshToken: string) => {
  res.cookie("refreshToken", refreshToken, {
    ...defaultOptions,
    expires: thirtyDaysFromNow(),
    path: REFRESH_TOKEN_PATH,
  });

  return res;
};

export const setAuthCookies = (
  res: Response,
  refreshToken: string,
  accessToken: string
) => {
  setRefreshTokenCookie(res, refreshToken);
  setAccessTokenCookie(res, accessToken);

  return res;
};

export const clearAuthCookies = (res: Response) => {
  res.clearCookie("refreshToken", { path: REFRESH_TOKEN_PATH });
  res.clearCookie("accessToken");
  return res;
};
