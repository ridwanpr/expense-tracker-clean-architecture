import type { Response } from "express";
import type { WorkspaceService } from "./workspace.service.js";
import { ResponseError } from "../../shared/errors/response.error.js";
import type { AuthenticatedRequest } from "../../shared/types/request.type.js";

export class WorkspaceController {
  constructor(private readonly service: WorkspaceService) {}

  createWorkspace = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.userId;

    if (!userId) {
      throw new ResponseError(401, "User token unauthorized, please re-login");
    }

    const newWorkspace = await this.service.createWorkSpace(userId, req.body);

    res.status(201).json({
      message: "Workspace created successsfully",
      data: newWorkspace,
    });
  };
}
