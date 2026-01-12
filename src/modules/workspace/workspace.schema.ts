import { z } from "zod";

export const createWorkspaceSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().max(250),
});

export type CreateWorkspaceDTO = z.infer<typeof createWorkspaceSchema>;
