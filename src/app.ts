import express from "express";
import { trimMiddleware } from "./shared/middleware/trim.middleware.js";
import { errorMiddleware } from "./shared/middleware/error.middleware.js";
import { authRoutes } from "./modules/auth/auth.routes.js";

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(trimMiddleware);

app.use("/api", authRoutes);

app.use((_req, res, _next) => {
  res.status(404).json({
    errors: "URI Not Found",
  });
});

app.use(errorMiddleware);

export default app;
