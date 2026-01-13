import { beforeEach, describe, expect, it, vi } from "vitest";
import { WorkspaceRepository } from "../workspace.repository.port";
import { WorkspaceService } from "../workspace.service";

const workspacerepo = {
  findWorkspaceById: vi.fn(),
  createWorkspace: vi.fn(),
} as unknown as WorkspaceRepository;

const workspaceService = new WorkspaceService(workspacerepo);

describe("WorkspaceService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should create new workspace", async () => {
    const userId = 101;
    const requestBody = {
      name: "Workspace Test",
      description: "Workspace Test description",
    };
    const expectedRepoResult = {
      id: 1,
      ownerId: userId,
      ...requestBody,
    };

    vi.mocked(workspacerepo.createWorkspace).mockResolvedValue(expectedRepoResult);
    const result = await workspaceService.createWorkSpace(userId, requestBody);

    expect(workspacerepo.createWorkspace).toHaveBeenCalledWith(userId, requestBody);
    expect(result).toEqual({
      data: expectedRepoResult,
    });
  });

  // it("should throw error if user id is invalid", async() => {
  //   const userId = "Not a number";
    
  // })
});