import request from "supertest";
import app from "../../../app.js";
import { prismaClient } from "../../../infra/prisma.js";

describe("POST /api/auth/register", () => {
  beforeAll(async () => {
    await prismaClient.user.deleteMany();
  });

  afterEach(async () => {
    await prismaClient.user.deleteMany();
  });

  afterAll(async () => {
    await prismaClient.$disconnect();
  });

  it("should reject register user if request invalid", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({ username: "", password: "", name: "" });

    expect(response.status).toBe(400);
    expect(response.body).toBeDefined();
  });

  it("should reject register user if there's no request body", async () => {
    const response = await request(app).post("/api/auth/register").send();

    expect(response.status).toBe(400);
    expect(response.body).toBeDefined();
  });

  it("should register new user", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({ username: "test", password: "test123", name: "test" });

    expect(response.status).toBe(201);
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.name).toBe("test");
  });

  it("should reject register if username already exists", async () => {
    await request(app)
      .post("/api/auth/register")
      .send({ username: "test", password: "test123", name: "test" });

    const response = await request(app)
      .post("/api/auth/register")
      .send({ username: "test", password: "different", name: "test2" });

    expect(response.status).toBe(400);
    expect(response.body).toBeDefined();
  });

  it("should reject register with invalid password format", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({ username: "test", password: "123", name: "test" });

    expect(response.status).toBe(400);
  });

  it("should not return password in response", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({ username: "test", password: "test123", name: "test" });

    expect(response.status).toBe(201);
    expect(response.body.data.password).toBeUndefined();
  });

  it("should trim whitespace from inputs", async () => {
    const response = await request(app)
      .post("/api/auth/register")
      .send({ username: "  test  ", password: "test123", name: "  test  " });

    expect(response.status).toBe(201);
    expect(response.body.data.username).toBe("test");
    expect(response.body.data.name).toBe("test");
  });
});

describe("POST /api/auth/login", () => {
  const createTestUser = async () => {
    await request(app).post("/api/auth/register").send({
      username: "test",
      name: "test",
      password: "test",
    });
  };

  afterEach(async () => {
    await prismaClient.user.deleteMany();
  });

  afterAll(async () => {
    await prismaClient.$disconnect();
  });

  it("should reject login if no request body", async () => {
    await createTestUser();

    const response = await request(app).post("/api/auth/login").send();

    expect(response.status).toBe(400);
    expect(response.body).toBeDefined();
  });

  it("should reject login if user not found", async () => {
    await createTestUser();

    const response = await request(app)
      .post("/api/auth/login")
      .send({ username: "nouserfound", password: "test" });

    expect(response.status).toBe(400);
    expect(response.body).toBeDefined();
  });

  it("should reject login if user found but wrong password", async () => {
    await createTestUser();

    const response = await request(app)
      .post("/api/auth/login")
      .send({ username: "test", password: "wrongpassword" });

    expect(response.status).toBe(400);
    expect(response.body).toBeDefined();
  });

  it("should reject login if input missing password", async () => {
    await createTestUser();

    const response = await request(app)
      .post("/api/auth/login")
      .send({ username: "test" });

    expect(response.status).toBe(400);
    expect(response.body).toBeDefined();
  });

  it("should login if credentials is valid", async () => {
    await createTestUser();

    const response = await request(app)
      .post("/api/auth/login")
      .send({ username: "test", password: "test" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("accessToken");

    if (response.body.data) {
      expect(response.body.data.username).toBe("test");
    }
  });
});

describe("POST /api/auth/logout", () => {
  const createTestUser = async () => {
    await request(app).post("/api/auth/register").send({
      username: "test",
      name: "test",
      password: "test",
    });
  };

  afterEach(async () => {
    await prismaClient.user.deleteMany();
  });

  afterAll(async () => {
    await prismaClient.$disconnect();
  });

  it("should logout user", async () => {
    await createTestUser();

    const response = await request(app).post("/api/auth/logout").send();

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Logged out successfully");
  });
});

describe("POST /api/auth/refresh", () => {
  const createTestUser = async () => {
    await request(app).post("/api/auth/register").send({
      username: "test",
      name: "test",
      password: "test",
    });
  };

  afterEach(async () => {
    await prismaClient.user.deleteMany();
  });

  afterAll(async () => {
    await prismaClient.$disconnect();
  });

  const agent = request.agent(app);
  it("reject refresh token when accessToken invalid", async () => {
    const res = await agent.post("/api/auth/refresh");
    expect(res.status).toBe(401);
  });

  it("should login and then refresh token", async () => {
    await createTestUser();

    await agent
      .post("/api/auth/login")
      .send({ username: "test", password: "test" })
      .expect(200);

    const res = await agent.post("/api/auth/refresh");

    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty("accessToken");
  });
});
