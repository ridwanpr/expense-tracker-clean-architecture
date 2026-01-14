import type { Request, Response, NextFunction } from "express";
import { ZodError } from "zod";
import { ResponseError } from "../errors/response.error.js";
import { logger } from "../../infra/logger.js";

export const errorMiddleware = async (
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (error instanceof ZodError) {
    res.status(400).json({
      errors: {
        type: "Validation Error",
        details: error.issues.map((issue) => {
          if (issue.path.length === 0 && issue.code === "invalid_type") {
            return {
              field: "body",
              message: "Request body is required",
            };
          }
          return {
            field: issue.path.join(".") || "unknown",
            message: issue.message,
          };
        }),
      },
    });
  } else if (error instanceof ResponseError) {
    res.status(error.status).json({
      errors: {
        type: "Application Error",
        message: error.message,
      },
    });
  } else if (error.name === "JWTExpired" || (error as any).code === "ERR_JWT_EXPIRED") {
    res.status(401).json({
      errors: {
        type: "Authentication Error",
        message: "Token has expired. Please log in again.",
      },
    });
  } else if (
    error.name === "JsonWebTokenError" ||
    error.name === "JWSInvalid" ||
    (error as any).code === "ERR_JWS_INVALID"
  ) {
    res.status(401).json({
      errors: {
        type: "Authentication Error",
        message: "Invalid token signature or format.",
      },
    });
  } else {
    logger.error(error.message, { stack: error.stack });
    res.status(500).json({
      errors: {
        type: "Internal Server Error",
        message: error.message,
        ...(process.env.NODE_ENV === "development" && { stack: error.stack }),
      },
    });
  }
};
