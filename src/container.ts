import { prismaClient } from "./infra/prisma.js";
import { PasswordService } from "./shared/services/password.service.js";
import { TokenService } from "./shared/services/token.service.js";
import { PrismaAuthRepository } from "./modules/auth/auth.repository.prisma.js";
import { AuthService } from "./modules/auth/auth.service.js";
import { AuthController } from "./modules/auth/auth.controller.js";
import { PrismaWorkspaceRepository } from "./modules/workspace/workspace.repository.prisma.js";
import { WorkspaceService } from "./modules/workspace/workspace.service.js";
import { WorkspaceController } from "./modules/workspace/workspace.controller.js";
import { PrismaCategoryRepository } from "./modules/category/category.repository.prisma.js";
import { CategoryService } from "./modules/category/category.service.js";
import { CategoryController } from "./modules/category/category.controller.js";
import { PrismaPermissionRepository } from "./modules/permission/permission.repository.prisma.js";
import { PermissionService } from "./modules/permission/permission.service.js";
import { PermissionController } from "./modules/permission/permission.controller.js";
import { PrismaRoleRepository } from "./modules/role/role.repository.prisma.js";
import { RoleService } from "./modules/role/role.service.js";
import { RoleController } from "./modules/role/role.controller.js";

export function createContainer() {
  // Shared Dependencies
  const tokenService = new TokenService();
  const passwordService = new PasswordService();

  //   Repository
  const authRepo = new PrismaAuthRepository(prismaClient);
  const workspaceRepo = new PrismaWorkspaceRepository(prismaClient);
  const categoryRepo = new PrismaCategoryRepository(prismaClient);
  const permissionRepo = new PrismaPermissionRepository(prismaClient);
  const roleRepo = new PrismaRoleRepository(prismaClient);

  //   Services
  const authService = new AuthService(authRepo, passwordService, tokenService);
  const workspaceService = new WorkspaceService(workspaceRepo);
  const categoryService = new CategoryService(categoryRepo, workspaceService);
  const permissionService = new PermissionService(permissionRepo);
  const roleService = new RoleService(roleRepo);

  //   Controller
  const authController = new AuthController(authService);
  const workspaceController = new WorkspaceController(workspaceService);
  const categoryController = new CategoryController(categoryService);
  const permissionController = new PermissionController(permissionService);
  const roleController = new RoleController(roleService);

  return {
    tokenService,
    authController,
    workspaceController,
    categoryController,
    permissionController,
    roleController,
  };
}
