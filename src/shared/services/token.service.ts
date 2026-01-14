import { jwtVerify, type JWTPayload } from "jose";
import { generateToken } from "../utils/generateToken.js";
import type { TokenPort } from "./token.port.js";
import { JWT_SECRET } from "../utils/getJwtSecret.js";
import type { TokenPayload } from "../types/auth.type.js";

export class TokenService implements TokenPort {
  async generateAccessToken(payload: JWTPayload): Promise<string> {
    return generateToken(payload, "30m");
  }

  async generateRefreshToken(payload: JWTPayload): Promise<string> {
    return generateToken(payload, "30d");
  }

  async verifyJWT<T = TokenPayload>(token: string): Promise<{ payload: T }> {
    return await jwtVerify(token, JWT_SECRET);
  }

  getJWTSecret(): Uint8Array<ArrayBuffer> {
    return JWT_SECRET;
  }
}
