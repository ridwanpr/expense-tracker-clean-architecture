import { prismaClient } from "../../infra/prisma.js";
import { TokenService } from "../../shared/services/token.service.js";
import { WorkspaceController } from "./workspace.controller.js";
import { PrismaWorkspaceRepository } from "./workspace.repository.prisma.js";
import { WorkspaceService } from "./workspace.service.js";

export function createWorkspaceModule() {
  const repository = new PrismaWorkspaceRepository(prismaClient);
  const service = new WorkspaceService(repository);
  const controller = new WorkspaceController(service);
  const tokenService = new TokenService();

  return { controller, tokenService };
}
