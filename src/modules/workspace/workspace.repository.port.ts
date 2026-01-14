import type { CreateWorkspaceDTO } from "./workspace.schema.js";

export interface WorkspaceRepository {
  findWorkspaceById(
    workspaceId: number,
    ownerId: number
  ): Promise<{
    id: number;
    name: string;
    description: string;
    ownerId: number;
  } | null>;

  createWorkspace(
    ownerId: number,
    data: CreateWorkspaceDTO
  ): Promise<{ id: number; name: string; description: string; ownerId: number }>;
}
