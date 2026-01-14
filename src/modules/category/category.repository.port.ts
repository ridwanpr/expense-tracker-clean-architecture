import type { CreateCategoryDTO } from "./category.schema.js";

export interface CategoryRepository {
  getCategories(workspaceId: number): Promise<
    Array<{
      name: string;
      description: string | null;
    } | null>
  >;
  findCategoryById(id: number): Promise<{
    name: string;
    description: string | null;
  }>;
  createCategory(
    userId: number,
    workspaceId: number,
    data: CreateCategoryDTO
  ): Promise<{
    name: string;
    description: string | null;
  }>;
  updateCategory(id: number, data: any): Promise<any>;
  deleteCategory(id: number): Promise<any>;
}
