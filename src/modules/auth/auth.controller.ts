import type { Request, Response } from "express";
import { AuthService } from "./auth.service.js";

export class AuthController {
  constructor(private readonly service: AuthService) {}

  create = async (req: Request, res: Response) => {
    const user = await this.service.registerUser(req.body);
    res.status(201).json(user);
  };
}
