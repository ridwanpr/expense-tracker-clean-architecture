import type { User } from "../../generated/prisma/client.js";

export interface WorkspaceRepository {
  findWorkspaceById(
    workspaceId: number
  ): Promise<{
    id: number;
    name: string;
    description: string;
    owner: User;
  } | null>;
}
