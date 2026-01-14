import { ResponseError } from "../../shared/errors/response.error.js";
import type { WorkspaceAccess } from "./workspace.access.port.js";
import type { WorkspaceRepository } from "./workspace.repository.port.js";
import type { CreateWorkspaceDTO } from "./workspace.schema.js";

export class WorkspaceService implements WorkspaceAccess {
  constructor(private readonly repo: WorkspaceRepository) {}

  async createWorkSpace(userId: number, data: CreateWorkspaceDTO) {
    const id = Number(userId);
    if (isNaN(id)) {
      throw new ResponseError(400, "Payload user id token not valid");
    }

    const newWorkspace = await this.repo.createWorkspace(id, data);
    return {
      data: newWorkspace,
    };
  }

  async findWorkspaceById(workspaceId: number, userId: number) {
    const workspace = await this.repo.findWorkspaceById(workspaceId, userId);

    return workspace;
  }
}
