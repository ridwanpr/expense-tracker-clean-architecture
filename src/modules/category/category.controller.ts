import { ResponseError } from "../../shared/errors/response.error.js";
import type { CategoryService } from "./category.service.js";

export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  getCategories = async (req: any, res: any) => {
    const workspaceId = req.params.workspaceId;

    const categories = await this.service.getCategories(workspaceId);

    res.status(200).json({
      message: "Categories fetched successfully",
      data: categories,
    });
  };

  createCategory = async (req: any, res: any) => {
    const workspaceId = req.params.workspaceId;
    const userId = req.user?.userId;

    if (!userId) {
      throw new ResponseError(401, "User token unauthorized, please re-login");
    }

    const category = await this.service.createCategory(workspaceId, userId, req.body);

    res.status(201).json({
      message: "Category created successfully",
      data: category,
    });
  };
}
