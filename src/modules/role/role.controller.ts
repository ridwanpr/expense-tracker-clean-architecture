import type { Response } from "express";
import type { AuthenticatedRequest } from "../../shared/types/request.type.js";
import type { RoleService } from "./role.service.js";
import { stringToNumber } from "../../shared/utils/stringToNumber.js";

export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  createRolePermission = async (req: AuthenticatedRequest, res: Response) => {
    const workspaceId = stringToNumber(req.params.workspaceId, 400, "Invalid workspace id");

    const roles = await this.roleService.createRolePermission(workspaceId, req.body);

    res.status(201).json({
      message: "Role & permission created successfully",
      data: roles,
    });
  };

  showRolePermission = async (req: AuthenticatedRequest, res: Response) => {
    const workspaceId = stringToNumber(req.params.workspaceId, 400, "Invalid workspace id");
    const roleName = req.params.roleName as string;

    const role = await this.roleService.findRoleNameByWorkspaceId(workspaceId, roleName);

    res.status(200).json({
      message: "Fetch role detail success",
      data: role,
    });
  };
}
