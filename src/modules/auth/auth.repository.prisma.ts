import { PrismaClient } from "../../generated/prisma/client.js";
import type { AuthRepository } from "./auth.repository.port.js";
import type { RegisterUserDTO } from "./auth.schema.js";

export class PrismaAuthRepository implements AuthRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByUsername(username: string): Promise<{ id: number } | null> {
    return await this.prisma.user.findFirst({
      where: {
        username: username,
      },
      select: { id: true },
    });
  }

  async create(data: RegisterUserDTO) {
    return await this.prisma.user.create({
      data,
      select: { id: true, username: true, name: true },
    });
  }
}
