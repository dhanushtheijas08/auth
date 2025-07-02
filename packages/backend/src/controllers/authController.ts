import { Request, Response } from "express";
import ApiError from "../lib/ApiError";
import { User } from "../models/User";

export const login = () => {};

export const register = async (req: Request, res: Response) => {
  try {
    const { email, password, username } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      throw new ApiError(409, "User already exists");
    }
    const user = await User.create({ name: username, email, password });
    res.status(201).json({ success: true, data: user });
  } catch (error) {}
};
