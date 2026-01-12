import { Router } from "express";
import { createWorkspaceModule } from "./workspace.module.js";
import { validate } from "../../shared/middleware/validate.middleware.js";
import { createWorkspaceSchema } from "./workspace.schema.js";
import { authMiddleware } from "../../shared/middleware/auth.middleware.js";

export const workspaceRoutes = Router();

const { controller, tokenService } = createWorkspaceModule();

const protectedAuth = authMiddleware(tokenService);

workspaceRoutes.post(
  "/workspace",
  protectedAuth,
  validate(createWorkspaceSchema),
  controller.createWorkspace
);
