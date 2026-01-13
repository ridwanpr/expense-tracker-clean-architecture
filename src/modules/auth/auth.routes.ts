import { Router } from "express";
import { validate } from "../../shared/middleware/validate.middleware.js";
import { loginUserSchema, registerUserSchema } from "./auth.schema.js";

export function createAuthRoutes(controller: any) {
  const router = Router();

  router.post("/auth/register", validate(registerUserSchema), controller.create);

  router.post("/auth/login", validate(loginUserSchema), controller.login);

  router.post("/auth/logout", controller.logout);
  router.post("/auth/refresh", controller.refresh);

  return router;
}
