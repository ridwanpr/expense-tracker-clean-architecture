import type { CreateCategoryDTO, UpdateCategoryDTO } from "./category.schema.js";

export interface CategoryRepository {
  getCategories(workspaceId: number): Promise<
    Array<{
      name: string;
      description: string | null;
    } | null>
  >;

  findCategoryById(categoryId: number): Promise<{
    name: string;
    description: string | null;
  } | null>;

  createCategory(
    userId: number,
    workspaceId: number,
    data: CreateCategoryDTO
  ): Promise<{
    name: string;
    description: string | null;
  }>;

  updateCategory(
    categoryId: number,
    data: UpdateCategoryDTO
  ): Promise<{ name: string; description: string | null }>;

  deleteCategory(id: number): Promise<any>;
}
