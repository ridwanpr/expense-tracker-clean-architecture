import type { Permission } from "../../generated/prisma/client.js";

export interface PermissionRepository {
  getAllPermissions(): Promise<Permission[]>;
  checkPermissionExistBySlug(slug: string): Promise<boolean>;
}
