import { ResponseError } from "../../shared/errors/response.error.js";
import type { PasswordPort } from "../../shared/services/password.port.js";
import type { TokenPort } from "../../shared/services/token.port.js";
import type { AuthRepository } from "./auth.repository.port.js";
import type { RegisterUserDTO } from "./auth.schema.js";

export class AuthService {
  constructor(
    private readonly repo: AuthRepository,
    private readonly passwordService: PasswordPort,
    private readonly tokenService: TokenPort
  ) {}

  async registerUser(data: RegisterUserDTO) {
    const exists = await this.repo.findByUsername(data.username);
    if (exists) {
      throw new ResponseError(400, "User already exists");
    }

    const hashedPassword = await this.passwordService.hash(data.password, 11);

    const newUser = await this.repo.create({
      ...data,
      password: hashedPassword,
    });

    const payload = { userId: newUser.id };
    const accessToken = await this.tokenService.generateAccessToken(payload);
    const refreshToken = await this.tokenService.generateRefreshToken(payload);

    return { data: newUser, accessToken, refreshToken };
  }
}
