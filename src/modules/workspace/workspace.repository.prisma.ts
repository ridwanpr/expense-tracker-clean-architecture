import type { PrismaClient, User } from "../../generated/prisma/client.js";
import type { WorkspaceRepository } from "./workspace.repository.port.js";
import type { CreateWorkspaceDTO } from "./workspace.schema.js";

export class PrismaWorkspaceRepository implements WorkspaceRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async findWorkspaceById(workspaceId: number): Promise<{
    id: number;
    name: string;
    description: string;
    owner: User;
  } | null> {
    return await this.prismaClient.workspace.findFirst({
      where: {
        id: workspaceId,
      },
      include: {
        owner: true,
      },
    });
  }

  async createWorkspace(
    ownerId: number,
    data: CreateWorkspaceDTO
  ): Promise<{ id: number; name: string; description: string; ownerId: number }> {
    return await this.prismaClient.workspace.create({
      data: {
        ...data,
        owner: {
          connect: { id: ownerId },
        },
      },
    });
  }
}
