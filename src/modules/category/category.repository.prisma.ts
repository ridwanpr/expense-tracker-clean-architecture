import { PrismaClient } from "../../generated/prisma/client.js";
import type { CategoryRepository } from "./category.repository.port.js";
import type { CreateCategoryDTO, UpdateCategoryDTO } from "./category.schema.js";

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

  async findCategoryById(categoryId: number) {
    return await this.prismaClient.category.findFirst({
      where: {
        id: categoryId,
      },
      omit: {
        id: true,
        workspaceId: true,
      },
      include: {
        createdBy: true,
      },
    });
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

  async updateCategory(categoryId: number, data: UpdateCategoryDTO) {
    const category = await this.prismaClient.category.update({
      where: {
        id: categoryId,
      },
      data: {
        name: data.name,
        description: data.description,
      },
      select: { name: true, description: true },
    });

    return category;
  }

  async deleteCategory(id: number) {
    throw new Error("Method not implemented.");
  }
}
