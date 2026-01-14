import { z } from "zod";

export const createCategorySchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().max(250),
});

export type CreateCategoryDTO = z.infer<typeof createCategorySchema>;

export const updateCategorySchema = z.object({
  name: z.string().min(3).max(50),
  description: z.string().max(250).optional(),
});

export type UpdateCategoryDTO = z.infer<typeof updateCategorySchema>;
