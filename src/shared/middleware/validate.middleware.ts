import { ZodType } from "zod";
import type { Request, Response, NextFunction } from "express";

export const validate =
  <T>(schema: ZodType<T>) =>
  (req: Request, _res: Response, next: NextFunction) => {
    req.body = schema.parse(req.body);
    next();
  };
