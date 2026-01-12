import type { Request, Response, NextFunction } from "express";
import type { TokenPort } from "../services/token.port.js";
import { ResponseError } from "../errors/response.error.js";

export const authMiddleware = (tokenService: TokenPort) => {
  return async (req: Request, _res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith("Bearer ")) {
        throw new ResponseError(401, "Not authorized, no token");
      }

      const token = authHeader.split(" ")[1];
      if (!token) {
        throw new ResponseError(401, "Not authorized, no token");
      }

      const { payload } = await tokenService.verifyJWT(token);

      (req as any).user = payload;

      next();
    } catch (error) {
      next(error);
    }
  };
};
