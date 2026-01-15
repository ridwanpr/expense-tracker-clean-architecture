import { Router } from "express";
import { authMiddleware } from "../../shared/middleware/auth.middleware.js";
import type { TokenService } from "../../shared/services/token.service.js";
import type { RoleController } from "./role.controller.js";
import { validate } from "../../shared/middleware/validate.middleware.js";
import { createRoleSchema } from "./role.schema.js";

export const createRoleRoutes = (controller: RoleController, tokenService: TokenService) => {
  const router = Router();

  const protectedAuth = authMiddleware(tokenService);

  router.post(
    "/role/:workspaceId",
    protectedAuth,
    validate(createRoleSchema),
    controller.createRolePermission
  );

  router.get("/role/:workspaceId/:roleName", protectedAuth, controller.showRolePermission);

  return router;
};
