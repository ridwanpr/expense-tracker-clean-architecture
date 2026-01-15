import { ResponseError } from "../../shared/errors/response.error.js";
import type { Response } from "express";
import type { AuthenticatedRequest } from "../../shared/types/request.type.js";
import type { CategoryService } from "./category.service.js";
import { stringToNumber } from "../../shared/utils/stringToNumber.js";

export class CategoryController {
  constructor(private readonly service: CategoryService) {}

  getCategories = async (req: AuthenticatedRequest, res: Response) => {
    const workspaceId = req.params.workspaceId;
    const userId = req.user?.userId;

    if (!userId) {
      throw new ResponseError(401, "User token unauthorized, please re-login");
    }

    const userIdNum = stringToNumber(userId, 400, "User id not valid");
    const workspaceIdNum = stringToNumber(workspaceId, 400, "Workspace id not valid");

    const categories = await this.service.getCategories(workspaceIdNum, userIdNum);

    res.status(200).json({
      message: "Categories fetched successfully",
      data: categories,
    });
  };

  createCategory = async (req: AuthenticatedRequest, res: Response) => {
    const workspaceId = req.params.workspaceId;
    const userId = req.user?.userId;

    if (!userId) {
      throw new ResponseError(401, "User token unauthorized, please re-login");
    }

    const userIdNum = stringToNumber(userId, 400, "User id not valid");
    const workspaceIdNum = stringToNumber(workspaceId, 400, "Workspace id not valid");

    const category = await this.service.createCategory(workspaceIdNum, userIdNum, req.body);

    res.status(201).json({
      message: "Category created successfully",
      data: category,
    });
  };

  showCategory = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.userId;

    if (!userId) {
      throw new ResponseError(401, "User token unauthorized, please re-login");
    }

    const userIdNum = stringToNumber(userId, 400, "User id not valid");
    const workspaceId = stringToNumber(req.params.workspaceId, 400, "Workspace id invalid");
    const categoryId = stringToNumber(req.params.categoryId, 400, "Category id invalid");

    const category = await this.service.findCategoryFirstById(workspaceId, categoryId, userIdNum);

    res.status(200).json({
      message: "Fetch category detail success",
      data: category,
    });
  };

  updateCategory = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.userId;

    if (!userId) {
      throw new ResponseError(401, "User token unauthorized, please re-login");
    }

    const userIdNum = stringToNumber(userId, 400, "User id not valid");
    const workspaceId = stringToNumber(req.params.workspaceId, 400, "Workspace id invalid");
    const categoryId = stringToNumber(req.params.categoryId, 400, "Category id invalid");

    const category = await this.service.updateCategory(
      workspaceId,
      categoryId,
      userIdNum,
      req.body
    );

    res.status(200).json({
      message: "Update category success",
      data: category,
    });
  };
}
