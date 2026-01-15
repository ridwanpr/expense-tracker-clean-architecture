import { ResponseError } from "../../shared/errors/response.error.js";
import type { RoleRepository } from "./role.repository.port.js";
import type { CreateRoleDTO } from "./role.schema.js";

export class RoleService {
  constructor(private readonly roleRepo: RoleRepository) {}

  async createRolePermission(workspaceId: number, data: CreateRoleDTO) {
    const isRoleExist = await this.roleRepo.findRoleNameByWorkspaceId(data.name, workspaceId);

    if (isRoleExist) {
      throw new ResponseError(400, "Role name already exist");
    }

    const rolePermission = await this.roleRepo.createRole(workspaceId, data);

    return rolePermission;
  }
}
