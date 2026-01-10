import type { RegisterUserDTO } from "./auth.schema.js";

export interface AuthRepository {
  findByUsername(
    username: string
  ): Promise<{
    id: number;
    username: string;
    name: string;
    password: string;
  } | null>;
  create(data: RegisterUserDTO): Promise<{
    id: number;
    name: string;
    username: string;
  }>;
}
