import request from "supertest";
import app from "../../../app.js";
import { prismaClient } from "../../../infra/prisma.js";

describe("Permission Integration Test", () => {
  beforeAll(async () => {
    await prismaClient.permission.deleteMany();
    await prismaClient.user.deleteMany();
  });

  afterEach(async () => {
    await prismaClient.permission.deleteMany();
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

  const initCreatePermission = async () => {
    await prismaClient.permission.createMany({
      data: [
        { slug: "expense:create", description: "Can create a new expense" },
        { slug: "expense:read", description: "Can view expenses" },
      ],
    });
  };

  it("should GET all permissions", async () => {
    const token = await getAuthToken();
    await initCreatePermission();

    const response = await request(app)
      .get("/api/permission")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it("should return true if permission exist", async () => {
    const token = await getAuthToken();
    await initCreatePermission();

    const response = await request(app)
      .get("/api/permission/expense:read")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Permission checked");
    expect(response.body.isExist).toBe(true);
  });

  it("should return false if permission not found", async () => {
    const token = await getAuthToken();
    await initCreatePermission();

    const response = await request(app)
      .get("/api/permission/notfound")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Permission checked");
    expect(response.body.isExist).toBe(false);
  });

  it("should reject get permission if not logged in", async () => {
    await initCreatePermission();

    const response = await request(app).get("/api/permission");

    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });

  it("should reject get permission if not logged in", async () => {
    await initCreatePermission();

    const response = await request(app).get("/api/permission/expense:read");

    expect(response.status).toBe(401);
    expect(response.body.errors).toBeDefined();
  });
});
