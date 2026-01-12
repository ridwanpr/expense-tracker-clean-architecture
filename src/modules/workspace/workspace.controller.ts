import type { Response, Request } from "express";
import type { WorkspaceService } from "./workspace.service.js";

export class WorkspaceController {
  constructor(private readonly service: WorkspaceService) {}

  async createWorkspace(res: Response, req: Request) {
    res.status(201).json({
      message: "Workspace created successsfully",
    });
  }
}
