import type { Response } from "express";
import type { AuthenticatedRequest } from "../../shared/types/request.type.js";
import type { PermissionService } from "./permission.service.js";
import { ResponseError } from "../../shared/errors/response.error.js";

export class PermissionController {
  constructor(private readonly permissionService: PermissionService) {}

  checkPermission = async (req: AuthenticatedRequest, res: Response) => {
    const permissionSlug = req.params.slug;
    if (!permissionSlug) {
      throw new ResponseError(400, "Invalid slug");
    }

    const isPermissionExist = await this.permissionService.checkIfPermissionExist(permissionSlug);
    res.status(200).json({
      message: "Permission checked",
      isExist: isPermissionExist,
    });
  };

  getAllPermission = async (_req: AuthenticatedRequest, res: Response) => {
    const permissions = await this.permissionService.getAllPermissions();

    res.status(200).json({
      message: "Successfully GET all permissions",
      data: permissions,
    });
  };
}
