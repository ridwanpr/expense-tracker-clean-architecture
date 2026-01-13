import { Router } from "express";
import { validate } from "../../shared/middleware/validate.middleware.js";
import { createWorkspaceSchema } from "./workspace.schema.js";
import { authMiddleware } from "../../shared/middleware/auth.middleware.js";

export function createWorkspaceRoutes(controller: any, tokenService: any) {
  const router = Router();

  const protectedAuth = authMiddleware(tokenService);

  router.post(
    "/workspace",
    protectedAuth,
    validate(createWorkspaceSchema),
    controller.createWorkspace
  );

  return router;
}
