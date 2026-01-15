import type { PermissionRepository } from "./permission.repository.port.js";

export class PermissionService {
  constructor(private readonly permissionRepo: PermissionRepository) {}

  async checkIfPermissionExist(slug: string) {
    return await this.permissionRepo.checkPermissionExistBySlug(slug);
  }

  async getAllPermissions() {
    return await this.permissionRepo.getAllPermissions();
  }
}
