import type { RegisterUserDTO } from "./auth.schema.js";

export interface AuthRepository {
  findByUsername(username: string): Promise<{ id: number } | null>;
  create(data: RegisterUserDTO): Promise<{
    id: number;
    name: string;
    username: string;
  }>;
}
