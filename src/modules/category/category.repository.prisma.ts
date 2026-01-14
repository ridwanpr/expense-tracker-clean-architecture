import { PrismaClient } from "../../generated/prisma/client.js";
import type { CategoryRepository } from "./category.repository.port.js";
import type { CreateCategoryDTO } from "./category.schema.js";

export class PrismaCategoryRepository implements CategoryRepository {
  constructor(private readonly prismaClient: PrismaClient) {}

  async getCategories(workspaceId: number) {
    return await this.prismaClient.category.findMany({
      where: {
        workspaceId: workspaceId,
      },
      omit: {
        id: true,
        workspaceId: true,
      },
    });
  }

  async findCategoryById(id: number): Promise<any> {
    throw new Error("Method not implemented.");
  }

  async createCategory(userId: number, workspaceId: number, data: CreateCategoryDTO) {
    const category = await this.prismaClient.category.create({
      data: {
        name: data.name,
        description: data.description,
        workspaceId: workspaceId,
        createdById: userId,
      },
      select: { name: true, description: true },
    });

    return {
      name: category.name,
      description: category.description,
    };
  }

  async updateCategory(id: number, data: any) {
    throw new Error("Method not implemented.");
  }

  async deleteCategory(id: number) {
    throw new Error("Method not implemented.");
  }
}
