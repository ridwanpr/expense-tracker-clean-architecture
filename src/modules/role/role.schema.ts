import { z } from "zod";

export const createRoleSchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().max(250),
  permissionIds: z.array(z.number().int().positive()).min(1),
});

export type CreateRoleDTO = z.infer<typeof createRoleSchema>;
