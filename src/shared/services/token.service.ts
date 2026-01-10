import type { JWTPayload } from "jose";
import { generateToken } from "../utils/generateToken.js";
import type { TokenPort } from "./token.port.js";

export class TokenService implements TokenPort {
  async generateAccessToken(payload: JWTPayload): Promise<string> {
    return generateToken(payload, "15m");
  }

  async generateRefreshToken(payload: JWTPayload): Promise<string> {
    return generateToken(payload, "30d");
  }
}
