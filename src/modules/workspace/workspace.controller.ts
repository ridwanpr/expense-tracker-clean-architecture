import type { Response } from "express";
import type { WorkspaceService } from "./workspace.service.js";
import { ResponseError } from "../../shared/errors/response.error.js";
import type { AuthenticatedRequest } from "../../shared/types/request.type.js";
import { stringToNumber } from "../../shared/utils/stringToNumber.js";

export class WorkspaceController {
  constructor(private readonly service: WorkspaceService) {}

  createWorkspace = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.userId;

    if (!userId) {
      throw new ResponseError(401, "User token unauthorized, please re-login");
    }

    const userIdNum = stringToNumber(userId, 400, "User id not valid");

    const newWorkspace = await this.service.createWorkSpace(userIdNum, req.body);

    res.status(201).json({
      message: "Workspace created successsfully",
      data: newWorkspace,
    });
  };

  findWorkspace = async (req: AuthenticatedRequest, res: Response) => {
    const userId = req.user?.userId;
    const workspaceId = req.params.workspaceId;

    if (!userId) {
      throw new ResponseError(401, "User token unauthorized, please re-login");
    }

    const userIdNum = stringToNumber(userId, 400, "User id not valid");
    const workspaceIdNum = stringToNumber(workspaceId, 400, "Workspace id not valid");

    const workspace = await this.service.findWorkspaceById(workspaceIdNum, userIdNum);

    res.status(201).json({
      message: "Fetch workspace successfull",
      data: workspace,
    });
  };
}
