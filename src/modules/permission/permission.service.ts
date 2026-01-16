import { ResponseError } from "../../shared/errors/response.error.js";
import type { PermissionAccess } from "./permission.access.port.js";
import type { PermissionRepository } from "./permission.repository.port.js";

export class PermissionService implements PermissionAccess {
  constructor(private readonly permissionRepo: PermissionRepository) {}

  async checkIfPermissionExist(slug: string) {
    return await this.permissionRepo.checkPermissionExistBySlug(slug);
  }

  async getAllPermissions() {
    return await this.permissionRepo.getAllPermissions();
  }

  async getPermissionsOrFail(ids: number[]) {
    const permissions = await this.permissionRepo.getPermissionByIds(ids);

    const foundIds = new Set(permissions.map((p) => p.id));
    const missingIds = ids.filter((id) => !foundIds.has(id));

    if (missingIds.length > 0) {
      throw new ResponseError(404, `Permissions with ID: ${missingIds.join(", ")} do not exist`);
    }

    return permissions;
  }
}
