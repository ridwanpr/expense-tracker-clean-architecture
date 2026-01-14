export interface WorkspaceAccess {
  findWorkspaceById(workspaceId: number, userId: number): Promise<any>;
}
