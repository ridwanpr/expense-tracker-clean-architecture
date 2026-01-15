import type { Permission, PrismaClient } from "../../generated/prisma/client.js";
import type { PermissionRepository } from "./permission.repository.port.js";

export class PrismaPermissionRepository implements PermissionRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async checkPermissionExistBySlug(slug: string): Promise<boolean> {
    const permission = await this.prismaClient.permission.findFirst({
      where: {
        slug: slug,
      },
    });

    if (permission === null) {
      return false;
    }

    return true;
  }

  async getAllPermissions(): Promise<Permission[]> {
    return await this.prismaClient.permission.findMany({
      select: { id: true, slug: true, description: true },
    });
  }
}
