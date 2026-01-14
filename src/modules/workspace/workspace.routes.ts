import { Router } from "express";
import { validate } from "../../shared/middleware/validate.middleware.js";
import { createWorkspaceSchema } from "./workspace.schema.js";
import { authMiddleware } from "../../shared/middleware/auth.middleware.js";
import type { WorkspaceController } from "./workspace.controller.js";
import type { TokenService } from "../../shared/services/token.service.js";

export function createWorkspaceRoutes(controller: WorkspaceController, tokenService: TokenService) {
  const router = Router();

  const protectedAuth = authMiddleware(tokenService);

  router.post(
    "/workspace",
    protectedAuth,
    validate(createWorkspaceSchema),
    controller.createWorkspace
  );

  router.get("/workspace/:workspaceId", protectedAuth, controller.findWorkspace);

  return router;
}
