import type { Permission } from "../../generated/prisma/client.js";

export interface PermissionAccess {
  getAllPermissions(): Promise<Permission[]>;
  checkPermissionExistBySlug(slug: string): Promise<boolean>;
}
