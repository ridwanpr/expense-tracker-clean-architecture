export interface TokenPort {
  generateAccessToken(payload: object): Promise<string>;
  generateRefreshToken(payload: object): Promise<string>;
}
