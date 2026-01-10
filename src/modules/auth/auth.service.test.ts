import { describe, it, expect, vi } from "vitest";
import { AuthService } from "./auth.service.js";
import type { AuthRepository } from "./auth.repository.port.js";
import type { PasswordPort } from "../../shared/services/password.port.js";
import type { TokenService } from "../../shared/services/token.service.js";

const repo: AuthRepository = {
  findByUsername: vi.fn().mockResolvedValue(null),
  create: vi.fn().mockResolvedValue({
    id: 1,
    username: "chihaya",
    name: "Rindo Chihaya",
  }),
};

const passwordService: PasswordPort = {
  hash: vi.fn().mockResolvedValue("hashed-password"),
  compare: vi.fn(),
};

const tokenService: TokenService = {
  generateAccessToken: vi.fn().mockResolvedValue("access-token"),
  generateRefreshToken: vi.fn().mockResolvedValue("refresh-token"),
};

const service = new AuthService(repo, passwordService, tokenService);

describe("AuthService", () => {
  it("registers a new user", async () => {
    const result = await service.registerUser({
      username: "chihaya",
      name: "Rindo Chihaya",
      password: "123456",
    });

    expect(repo.findByUsername).toHaveBeenCalledWith("chihaya");
    expect(passwordService.hash).toHaveBeenCalledWith("123456", 11);
    expect(repo.create).toHaveBeenCalled();

    expect(result).toEqual({
      data: {
        id: 1,
        username: "chihaya",
        name: "Rindo Chihaya",
      },
      accessToken: "access-token",
      refreshToken: "refresh-token",
    });
  });
});
