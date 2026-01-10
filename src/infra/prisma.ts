import "dotenv/config";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";
import { PrismaClient, Prisma } from "../generated/prisma/client.js";
import { logger } from "./logger.js";

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST!,
  user: process.env.DATABASE_USER!,
  password: process.env.DATABASE_PASSWORD!,
  database: process.env.DATABASE_NAME!,
  connectionLimit: 10,
});

const prismaClient = new PrismaClient({
  adapter,
  log: [
    {
      emit: "event",
      level: "query",
    },
    {
      emit: "event",
      level: "error",
    },
    {
      emit: "event",
      level: "info",
    },
    {
      emit: "event",
      level: "warn",
    },
  ],
});

prismaClient.$on("error", (e: Prisma.LogEvent) => {
  logger.error(e);
});

prismaClient.$on("warn", (e: Prisma.LogEvent) => {
  logger.warn(e);
});

prismaClient.$on("info", (e: Prisma.LogEvent) => {
  logger.info(e);
});

// prisma.$on('query', (e) => {
//   logger.info(e);
// });

export { prismaClient };
