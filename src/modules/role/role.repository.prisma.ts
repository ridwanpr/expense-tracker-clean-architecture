import type { PrismaClient } from "../../generated/prisma/client.js";
import type { RoleRepository } from "./role.repository.port.js";
import type { CreateRoleDTO } from "./role.schema.js";

export class PrismaRoleRepository implements RoleRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async createRole(
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
  }> {
    const role = await this.prismaClient.role.create({
      data: {
        name: data.name,
        description: data.description,
        workspaceId: workspaceId,
        rolePermissions: {
          createMany: {
            data: data.permissionIds.map((permissionId) => ({
              permissionId,
            })),
          },
        },
      },
      select: {
        id: true,
        name: true,
        description: true,
        workspaceId: true,
        rolePermissions: {
          select: {
            permissionId: true,
            permission: {
              select: {
                slug: true,
              },
            },
          },
        },
      },
    });

    return {
      id: role.id,
      name: role.name,
      description: role.description,
      workspaceId: role.workspaceId,
      rolePermissions: role.rolePermissions.map((rp) => ({
        permissionId: rp.permissionId,
        slug: rp.permission.slug,
      })),
    };
  }

  async findRoleNameByWorkspaceId(
    name: string,
    workspaceId: number
  ): Promise<{
    id: number;
    name: string;
    description: string | null;
    workspaceId: number;
    rolePermissions: Array<{
      permissionId: number;
      slug: string;
    }>;
  } | null> {
    const role = await this.prismaClient.role.findFirst({
      where: {
        workspaceId: workspaceId,
        name: name,
      },
      select: {
        id: true,
        name: true,
        description: true,
        workspaceId: true,
        rolePermissions: {
          select: {
            permissionId: true,
            permission: {
              select: {
                slug: true,
              },
            },
          },
        },
      },
    });

    if (!role) {
      return null;
    }

    return {
      id: role.id,
      name: role.name,
      description: role.description,
      workspaceId: role.workspaceId,
      rolePermissions: role.rolePermissions.map((rp) => ({
        permissionId: rp.permissionId,
        slug: rp.permission.slug,
      })),
    };
  }
}
