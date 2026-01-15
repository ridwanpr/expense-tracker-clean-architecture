import request from "supertest";
import app from "../../../app.js";
import { prismaClient } from "../../../infra/prisma.js";

describe("POST /api/category/:workspaceId", () => {
  beforeAll(async () => {
    await prismaClient.category.deleteMany();
    await prismaClient.workspace.deleteMany();
    await prismaClient.user.deleteMany();
  });

  afterEach(async () => {
    await prismaClient.category.deleteMany();
    await prismaClient.workspace.deleteMany();
    await prismaClient.user.deleteMany();
  });

  afterAll(async () => {
    await prismaClient.$disconnect();
  });

  const getAuthToken = async () => {
    await request(app).post("/api/auth/register").send({
      username: "usertest",
      name: "User Tester",
      password: "password123",
    });

    const response = await request(app).post("/api/auth/login").send({
      username: "usertest",
      password: "password123",
    });

    return response.body.accessToken;
  };

  it("should create new category", async () => {
    const token = await getAuthToken();

    const user = await prismaClient.user.findFirst({
      where: { username: "usertest" },
    });

    if (!user) throw new Error("User setup failed");

    const workspace = await prismaClient.workspace.create({
      data: {
        name: "Test Workspace",
        description: "Description",
        ownerId: user.id,
      },
      select: { id: true },
    });

    const response = await request(app)
      .post(`/api/category/${workspace.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Category Test",
        description: "Category test description",
      });

    expect(response.status).toBe(201);
    expect(response.body.data.name).toBe("Category Test");
    expect(response.body.message).toBe("Category created successfully");
  });

  it("reject create category if no request body", async () => {
    const token = await getAuthToken();

    const user = await prismaClient.user.findFirst({
      where: { username: "usertest" },
    });

    if (!user) throw new Error("User setup failed");

    const workspace = await prismaClient.workspace.create({
      data: {
        name: "Test Workspace",
        description: "Description",
        ownerId: user.id,
      },
      select: { id: true },
    });

    const response = await request(app)
      .post(`/api/category/${workspace.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });

  it("reject create category if not logged in", async () => {
    const workspaceId = 111;

    const response = await request(app).post(`/api/category/${workspaceId}`).send();

    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });

  it("reject create category if workspace id not valid", async () => {
    const token = await getAuthToken();

    const user = await prismaClient.user.findFirst({
      where: { username: "usertest" },
    });

    if (!user) throw new Error("User setup failed");

    const workspaceId = 111;

    const response = await request(app)
      .post(`/api/category/${workspaceId}`)
      .set("Authorization", `Bearer ${token}`)
      .send();

    expect(response.status).toBe(400);
    expect(response.body.errors).toBeDefined();
  });
});
