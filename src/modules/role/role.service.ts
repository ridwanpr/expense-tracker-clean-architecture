import type { RoleRepository } from "./role.repository.port.js";
import type { CreateRoleDTO } from "./role.schema.js";

export class RoleService {
  constructor(private readonly roleRepo: RoleRepository) {}

  async createRolePermission(workspaceId: number, data: CreateRoleDTO) {
    const rolePermission = await this.roleRepo.createRole(workspaceId, data);

    return rolePermission;
  }
}
