import type { CreateRoleDTO } from "./role.schema.js";

export interface RoleRepository {
  createRole(
    workspaceId: number,
    data: CreateRoleDTO
  ): Promise<{
    id: number;
    name: string;
    description: string | null;
    workspaceId: number;
    rolePermissions: Array<{
      permissionId: number;
      slug: string;
    }>;
  }>;
}
