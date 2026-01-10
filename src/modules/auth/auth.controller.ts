import type { Request, Response } from "express";
import { AuthService } from "./auth.service.js";

export class AuthController {
  constructor(private readonly service: AuthService) {}

  create = async (req: Request, res: Response) => {
    const { data, accessToken, refreshToken } = await this.service.registerUser(
      req.body
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: "Register success",
      data,
      accessToken,
    });
  };

  login = async (req: Request, res: Response) => {
    const { data, accessToken, refreshToken } = await this.service.loginUser(
      req.body
    );

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "none",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      message: "Login success",
      data,
      accessToken,
    });
  };
}
