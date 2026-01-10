import { Router } from "express";
import { validate } from "../../shared/middleware/validate.middleware.js";
import { registerUserSchema } from "./auth.schema.js";
import { createAuthModule } from "./auth.module.js";

export const authRoutes = Router();

const { controller } = createAuthModule();

authRoutes.post("/", validate(registerUserSchema), controller.create);
