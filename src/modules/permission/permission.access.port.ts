import type { Permission } from "../../generated/prisma/client.js";

export interface PermissionAccess {
  getPermissionsOrFail(ids: number[]): Promise<Permission[]>;
}
