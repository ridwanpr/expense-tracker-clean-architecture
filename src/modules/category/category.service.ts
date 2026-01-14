import { ResponseError } from "../../shared/errors/response.error.js";
import type { WorkspaceService } from "../workspace/workspace.service.js";
import type { PrismaCategoryRepository } from "./category.repository.prisma.js";
import type { CreateCategoryDTO } from "./category.schema.js";

export class CategoryService {
  constructor(
    private readonly categoryrepo: PrismaCategoryRepository,
    private readonly workspaceService: WorkspaceService
  ) {}

  async getCategories(workspaceId: number, userId: number) {
    const isWorkspaceValid = await this.workspaceService.findWorkspaceById(workspaceId, userId);

    if (!isWorkspaceValid) {
      throw new ResponseError(400, "Workspace not found");
    }

    return this.categoryrepo.getCategories(workspaceId);
  }

  async createCategory(workspaceId: number, userId: number, data: CreateCategoryDTO) {
    const isWorkspaceValid = await this.workspaceService.findWorkspaceById(workspaceId, userId);

    if (!isWorkspaceValid) {
      throw new ResponseError(400, "Workspace not found");
    }

    return this.categoryrepo.createCategory(userId, workspaceId, data);
  }
}
