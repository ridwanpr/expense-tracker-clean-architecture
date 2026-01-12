import { describe, it, expect, afterEach, afterAll, beforeAll } from "vitest";
import request from "supertest";
import app from "../../../app.js";
import { prismaClient } from "../../../infra/prisma.js";

describe("POST /api/workspace", () => {
  beforeAll(async () => {
    await prismaClient.user.deleteMany();
    await prismaClient.workspace.deleteMany();
  });

  afterEach(async () => {
    await prismaClient.workspace.deleteMany();
    await prismaClient.user.deleteMany();
  });

  afterAll(async () => {
    await prismaClient.$disconnect();
  });

  const getAuthToken = async () => {
    await request(app).post("/api/auth/register").send({
      username: "workspacetest",
      name: "Workspace Tester",
      password: "password123",
    });

    const response = await request(app).post("/api/auth/login").send({
      username: "workspacetest",
      password: "password123",
    });

    return response.body.accessToken;
  };

  it("should create new workspace if input is valid and user is logged in", async () => {
    const token = await getAuthToken();

    const response = await request(app)
      .post("/api/workspace")
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "My New Workspace",
        description: "This is a valid workspace",
      });

    expect(response.status).toBe(201);
  });

  it("should reject create new workspace if user not logged in", async () => {
    const response = await request(app).post("/api/workspace").send({
      name: "workspace_test",
      description: "Description workspace_test",
    });

    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });

  it("should reject create new workspace if input invalid", async () => {
    const token = await getAuthToken();

    const response = await request(app)
      .post("/api/workspace")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "", description: "" });

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});
