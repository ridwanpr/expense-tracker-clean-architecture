import type { User } from "../../generated/prisma/client.js";
import type { CreateWorkspaceDTO } from "./workspace.schema.js";

export interface WorkspaceRepository {
  findWorkspaceById(workspaceId: number): Promise<{
    id: number;
    name: string;
    description: string;
    owner: User;
  } | null>;

  createWorkspace(
    ownerId: number,
    data: CreateWorkspaceDTO
  ): Promise<{ id: number; name: string; description: string; ownerId: number }>;
}
