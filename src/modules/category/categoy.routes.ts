import { Router } from "express";
import { authMiddleware } from "../../shared/middleware/auth.middleware.js";
import type { CategoryController } from "./category.controller.js";
import type { TokenService } from "../../shared/services/token.service.js";
import { validate } from "../../shared/middleware/validate.middleware.js";
import { createCategorySchema } from "./category.schema.js";

export function createCategoryRoutes(controller: CategoryController, tokenService: TokenService) {
  const router = Router();

  const protectedAuth = authMiddleware(tokenService);

  router.get("/category/:workspaceId", protectedAuth, controller.getCategories);
  router.post(
    "/category/:workspaceId",
    protectedAuth,
    validate(createCategorySchema),
    controller.createCategory
  );
  router.get("/category/:workspaceId/:categoryId", protectedAuth, controller.showCategory);

  return router;
}
