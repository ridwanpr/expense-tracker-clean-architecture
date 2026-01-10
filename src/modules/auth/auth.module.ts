import { prismaClient } from "../../infra/prisma.js";
import { PrismaAuthRepository } from "./auth.repository.prisma.js";
import { AuthService } from "./auth.service.js";
import { AuthController } from "./auth.controller.js";
import { PasswordService } from "../../shared/services/password.service.js";
import { TokenService } from "../../shared/services/token.service.js";

export function createAuthModule() {
  const repository = new PrismaAuthRepository(prismaClient);
  const passwordService = new PasswordService();
  const tokenService = new TokenService();

  const service = new AuthService(repository, passwordService, tokenService);
  const controller = new AuthController(service);

  return { controller };
}
