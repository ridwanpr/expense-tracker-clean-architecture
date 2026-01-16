import app from "../../../app.js";
import { prismaClient } from "../../../infra/prisma.js";
import request from "supertest";

describe("Role Integration Test", () => {
  beforeAll(async () => {
    await prismaClient.rolePermission.deleteMany();
    await prismaClient.role.deleteMany();
    await prismaClient.permission.deleteMany();
    await prismaClient.workspace.deleteMany();
  });

  beforeEach(async () => {
    await prismaClient.rolePermission.deleteMany();
    await prismaClient.role.deleteMany();
    await prismaClient.permission.deleteMany();
    await prismaClient.workspace.deleteMany();
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

  const initPermission = async () => {
    const permission = await prismaClient.permission.createMany({
      data: [
        { slug: "expense:create", description: "Can create a new expense" },
        { slug: "expense:read", description: "Can view expenses" },
      ],
    });

    return permission;
  };

  const initWorkspace = async () => {
    const user = await prismaClient.user.findFirst({
      where: { username: "usertest" },
    });

    const workspace = await prismaClient.workspace.create({
      data: {
        name: "Test Workspace",
        description: "Description",
        ownerId: user!.id,
      },
      select: { id: true },
    });

    return workspace;
  };

  it("should create new role in workspace", async () => {
    const token = await getAuthToken();
    const workspace = await initWorkspace();
    await initPermission();

    const findPermission = await prismaClient.permission.findFirst({
      where: {
        slug: "expense:read",
      },
    });

    const response = await request(app)
      .post(`/api/role/${workspace.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Member",
        description: "Member role",
        permissionIds: [findPermission!.id],
      });

    expect(response.status).toBe(201);
    expect(response.body.data.name).toBe("Member");
    expect(response.body.data.description).toBe("Member role");
    expect(response.body.data.rolePermissions[0].permissionId).toBe(findPermission!.id);
  });

  it("should reject create role if not logged in", async () => {
    const workspace = await initWorkspace();
    await initPermission();

    const findPermission = await prismaClient.permission.findFirst({
      where: {
        slug: "expense:read",
      },
    });

    const response = await request(app)
      .post(`/api/role/${workspace.id}`)
      .send({
        name: "Member",
        description: "Member role",
        permissionIds: [findPermission!.id],
      });

    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined;
  });

  it("should reject create role if permission not exist", async () => {
    const token = await getAuthToken();
    const workspace = await initWorkspace();
    await initPermission();

    const response = await request(app)
      .post(`/api/role/${workspace.id}`)
      .set("Authorization", `Bearer ${token}`)
      .send({
        name: "Member",
        description: "Member role",
        permissionIds: [999],
      });

    expect(response.status).toBe(404);
    expect(response.body.errors).toBeDefined;
  });
});
