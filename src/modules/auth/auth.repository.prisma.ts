import { PrismaClient } from "../../generated/prisma/client.js";
import type { AuthRepository } from "./auth.repository.port.js";
import type { RegisterUserDTO } from "./auth.schema.js";

export class PrismaAuthRepository implements AuthRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findByUsername(username: string): Promise<{
    id: number;
    name: string;
    username: string;
    password: string;
  } | null> {
    return await this.prisma.user.findFirst({
      where: {
        username: username,
      },
      select: { id: true, name: true, username: true, password: true },
    });
  }

  async create(data: RegisterUserDTO) {
    return await this.prisma.user.create({
      data,
      select: { id: true, username: true, name: true },
    });
  }

  async findUserById(
    id: number
  ): Promise<{ id: number; name: string; username: string } | null> {
    return await this.prisma.user.findFirst({
      where: {
        id: id,
      },
      select: { id: true, username: true, name: true },
    });
  }
}
