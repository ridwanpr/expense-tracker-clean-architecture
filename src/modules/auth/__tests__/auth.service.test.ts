import { describe, it, expect, vi, beforeEach } from "vitest";
import { AuthService } from "../auth.service.js";
import { ResponseError } from "../../../shared/errors/response.error.js";
import type { AuthRepository } from "../auth.repository.port.js";
import type { PasswordPort } from "../../../shared/services/password.port.js";
import type { TokenService } from "../../../shared/services/token.service.js";

const repo = {
  findByUsername: vi.fn(),
  create: vi.fn(),
} as unknown as AuthRepository;

const passwordService = {
  hash: vi.fn(),
  compare: vi.fn(),
} as unknown as PasswordPort;

const tokenService = {
  generateAccessToken: vi.fn(),
  generateRefreshToken: vi.fn(),
} as unknown as TokenService;

const service = new AuthService(repo, passwordService, tokenService);

describe("AuthService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("registerUser", () => {
    const registerPayload = {
      username: "chihaya",
      name: "Rindo Chihaya",
      password: "123456",
    };

    it("registers a new user successfully", async () => {
      vi.mocked(repo.findByUsername).mockResolvedValue(null);
      vi.mocked(passwordService.hash).mockResolvedValue("hashed-password");
      vi.mocked(repo.create).mockResolvedValue({
        id: 1,
        username: "chihaya",
        name: "Rindo Chihaya",
      });

      vi.mocked(tokenService.generateAccessToken).mockResolvedValue(
        "access-token"
      );
      vi.mocked(tokenService.generateRefreshToken).mockResolvedValue(
        "refresh-token"
      );

      const result = await service.registerUser(registerPayload);

      expect(repo.findByUsername).toHaveBeenCalledWith("chihaya");
      expect(passwordService.hash).toHaveBeenCalledWith("123456", 11);
      expect(repo.create).toHaveBeenCalledWith({
        ...registerPayload,
        password: "hashed-password",
      });

      expect(result).toEqual({
        data: expect.objectContaining({
          id: 1,
          username: "chihaya",
          name: "Rindo Chihaya",
        }),
        accessToken: "access-token",
        refreshToken: "refresh-token",
      });
    });

    it("throws error if user already exists", async () => {
      vi.mocked(repo.findByUsername).mockResolvedValue({
        id: 1,
        username: "chihaya",
        name: "Rindo Chihaya",
        password: "existing-hash",
      } as any);

      await expect(service.registerUser(registerPayload)).rejects.toThrow(
        new ResponseError(400, "User already exists")
      );

      expect(repo.create).not.toHaveBeenCalled();
    });
  });

  describe("loginUser", () => {
    const loginPayload = {
      username: "chihaya",
      password: "123456",
    };

    const mockUser = {
      id: 1,
      username: "chihaya",
      name: "Rindo Chihaya",
      password: "hashed-password",
    };

    it("logs in a user successfully", async () => {
      vi.mocked(repo.findByUsername).mockResolvedValue(mockUser);
      vi.mocked(passwordService.compare).mockResolvedValue(true);
      vi.mocked(tokenService.generateAccessToken).mockResolvedValue(
        "access-token"
      );
      vi.mocked(tokenService.generateRefreshToken).mockResolvedValue(
        "refresh-token"
      );

      const result = await service.loginUser(loginPayload);

      expect(repo.findByUsername).toHaveBeenCalledWith(loginPayload.username);
      expect(passwordService.compare).toHaveBeenCalledWith(
        loginPayload.password,
        mockUser.password
      );
      expect(result).toEqual({
        data: {
          id: 1,
          name: "Rindo Chihaya",
          username: "chihaya",
        },
        accessToken: "access-token",
        refreshToken: "refresh-token",
      });
    }); 

    it("throws error if user is not found", async () => {
      vi.mocked(repo.findByUsername).mockResolvedValue(null);
      await expect(service.loginUser(loginPayload)).rejects.toThrow(
        new ResponseError(400, "Invalid Credentials")
      );

      expect(passwordService.compare).not.toHaveBeenCalled();
    });

    it("throws error if password does not match", async () => {
      vi.mocked(repo.findByUsername).mockResolvedValue(mockUser);
      vi.mocked(passwordService.compare).mockResolvedValue(false);

      await expect(service.loginUser(loginPayload)).rejects.toThrow(
        new ResponseError(400, "Invalid Credentials")
      );

      expect(tokenService.generateAccessToken).not.toHaveBeenCalled();
    });
  });
});
