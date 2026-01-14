import { ResponseError } from "../../shared/errors/response.error.js";
import type { WorkspaceAccess } from "../workspace/workspace.access.port.js";
import type { CategoryRepository } from "./category.repository.port.js";
import type { CreateCategoryDTO } from "./category.schema.js";

export class CategoryService {
  constructor(
    private readonly categoryRepo: CategoryRepository,
    private readonly workspaceAccess: WorkspaceAccess
  ) {}

  async getCategories(workspaceId: number, userId: number) {
    const isWorkspaceValid = await this.workspaceAccess.findWorkspaceById(workspaceId, userId);

    if (!isWorkspaceValid) {
      throw new ResponseError(404, "Workspace not found");
    }

    return this.categoryRepo.getCategories(workspaceId);
  }

  async createCategory(workspaceId: number, userId: number, data: CreateCategoryDTO) {
    const workspace = await this.workspaceAccess.findWorkspaceById(workspaceId, userId);

    if (!workspace) {
      throw new ResponseError(404, "Workspace not found");
    }

    return this.categoryRepo.createCategory(userId, workspaceId, data);
  }

  async findCategoryFirstById(workspaceId: number, categoryId: number, userId: number) {
    const workspace = await this.workspaceAccess.findWorkspaceById(workspaceId, userId);

    if (!workspace) {
      throw new ResponseError(404, "Workspace not found");
    }

    const category = await this.categoryRepo.findCategoryById(categoryId);

    if (!category) {
      throw new ResponseError(404, "Category not found");
    }

    return category;
  }
}
