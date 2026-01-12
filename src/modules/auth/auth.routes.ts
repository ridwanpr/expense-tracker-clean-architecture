import { Router } from "express";
import { validate } from "../../shared/middleware/validate.middleware.js";
import { loginUserSchema, registerUserSchema } from "./auth.schema.js";
import { createAuthModule } from "./auth.module.js";

export const authRoutes = Router();

const { controller } = createAuthModule();

authRoutes.post(
  "/auth/register",
  validate(registerUserSchema),
  controller.create
);
authRoutes.post("/auth/login", validate(loginUserSchema), controller.login);
authRoutes.post("/auth/logout", controller.logout);
authRoutes.post("/auth/refresh", controller.refresh);
