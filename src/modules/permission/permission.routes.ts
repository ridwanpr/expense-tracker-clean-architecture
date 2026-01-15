import { Router } from "express";
import type { TokenService } from "../../shared/services/token.service.js";
import type { PermissionController } from "./permission.controller.js";
import { authMiddleware } from "../../shared/middleware/auth.middleware.js";

export const createPermissionRoute = (
  permissionController: PermissionController,
  tokenService: TokenService
) => {
  const router = Router();

  const protectedAuth = authMiddleware(tokenService);

  router.get("/permission/:slug", protectedAuth, permissionController.checkPermission);
  router.get("/permission", protectedAuth, permissionController.getAllPermission);

  return router;
};
