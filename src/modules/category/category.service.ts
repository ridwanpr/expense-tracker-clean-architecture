import type { PrismaCategoryRepository } from "./category.repository.prisma.js";
import type { CreateCategoryDTO } from "./category.schema.js";

export class CategoryService {
  constructor(private readonly repo: PrismaCategoryRepository) {}

  async getCategories(workspaceId: number) {
    const workspaceIdNumber = Number(workspaceId);

    if (isNaN(workspaceIdNumber)) {
      throw new Error("Workspace id not valid");
    }

    return this.repo.getCategories(workspaceIdNumber);
  }

  async createCategory(workspaceId: number, userId: number, data: CreateCategoryDTO) {
    const userIdNum = Number(userId);
    const workspaceIdNum = Number(workspaceId);

    if (isNaN(workspaceIdNum) || isNaN(userIdNum)) {
      throw new Error("Workspace or user id not valid");
    }

    return this.repo.createCategory(userIdNum, workspaceIdNum, data);
  }
}
