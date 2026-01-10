import bcrypt from "bcrypt";
import type { PasswordPort } from "./password.port.js";

export class PasswordService implements PasswordPort {
  private readonly saltRounds = 11;

  async hash(
    password: string,
    saltOrRounds: string | number = this.saltRounds
  ): Promise<string> {
    return bcrypt.hash(password, saltOrRounds);
  }

  async compare(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}
