import { Router } from "express";
import { validate } from "../../shared/middleware/validate.middleware.js";
import { loginUserSchema, registerUserSchema } from "./auth.schema.js";
import type { AuthController } from "./auth.controller.js";

export function createAuthRoutes(controller: AuthController) {
  const router = Router();

  router.post("/auth/register", validate(registerUserSchema), controller.create);

  router.post("/auth/login", validate(loginUserSchema), controller.login);

  router.post("/auth/logout", controller.logout);
  router.post("/auth/refresh", controller.refresh);

  return router;
}
