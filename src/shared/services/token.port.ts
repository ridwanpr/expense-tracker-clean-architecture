import type { TokenPayload } from "../types/auth.type.js";

export interface TokenPort {
  generateAccessToken(payload: object): Promise<string>;
  generateRefreshToken(payload: object): Promise<string>;
  verifyJWT<T = TokenPayload>(token: string): Promise<{ payload: T }>;
}
