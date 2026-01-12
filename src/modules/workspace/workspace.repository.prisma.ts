import type { PrismaClient, User } from "../../generated/prisma/client.js";
import type { WorkspaceRepository } from "./workspace.repository.port.js";

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
}
