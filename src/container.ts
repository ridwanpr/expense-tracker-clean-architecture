import { prismaClient } from "./infra/prisma.js";
import { PasswordService } from "./shared/services/password.service.js";
import { TokenService } from "./shared/services/token.service.js";
import { PrismaAuthRepository } from "./modules/auth/auth.repository.prisma.js";
import { AuthService } from "./modules/auth/auth.service.js";
import { AuthController } from "./modules/auth/auth.controller.js";
import { PrismaWorkspaceRepository } from "./modules/workspace/workspace.repository.prisma.js";
import { WorkspaceService } from "./modules/workspace/workspace.service.js";
import { WorkspaceController } from "./modules/workspace/workspace.controller.js";

export function createContainer() {
  // Shared Dependencies
  const tokenService = new TokenService();
  const passwordService = new PasswordService();

  //   Repository
  const authRepo = new PrismaAuthRepository(prismaClient);
  const workspaceRepo = new PrismaWorkspaceRepository(prismaClient);

  //   Services
  const authService = new AuthService(authRepo, passwordService, tokenService);
  const workspaceService = new WorkspaceService(workspaceRepo);

  //   Controller
  const authController = new AuthController(authService);
  const workspaceController = new WorkspaceController(workspaceService);

  return {
    authController,
    workspaceController,
    tokenService,
  };
}
