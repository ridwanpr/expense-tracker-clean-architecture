import "dotenv/config";
import { PrismaClient, Prisma } from "../src/generated/prisma/client.js";
import { PrismaMariaDb } from "@prisma/adapter-mariadb";

interface Permission {
  slug: string;
  description: string;
}

const adapter = new PrismaMariaDb({
  host: process.env.DATABASE_HOST!,
  user: process.env.DATABASE_USER!,
  password: process.env.DATABASE_PASSWORD!,
  database: process.env.DATABASE_NAME!,
  connectionLimit: 10,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  const permission: Permission[] = [
    { slug: "expense:create", description: "Can create a new expense" },
    { slug: "expense:read", description: "Can view expenses" },
    { slug: "expense:update", description: "Can update own expenses" },
    { slug: "expense:delete", description: "Can delete own expenses" },

    { slug: "expense:update:any", description: "Can update expenses of other members" },
    { slug: "expense:delete:any", description: "Can delete expenses of other members" },

    { slug: "budget:read", description: "Can view budget status" },
    { slug: "budget:create", description: "Can create new budgets" },
    { slug: "budget:update", description: "Can edit existing budgets" },
    { slug: "budget:delete", description: "Can remove budgets" },

    { slug: "category:read", description: "Can view categories" },
    { slug: "category:create", description: "Can create new categories" },
    { slug: "category:update", description: "Can rename/edit categories" },
    { slug: "category:delete", description: "Can remove categories" },

    { slug: "member:read", description: "Can view list of members" },
    { slug: "member:invite", description: "Can invite new users" },
    { slug: "member:update_role", description: "Can change a members role" },
    { slug: "member:remove", description: "Can remove users from workspace" },

    { slug: "workspace:update", description: "Can update workspace name/settings" },

    { slug: "report:read", description: "Can view analytics" },
    { slug: "report:export", description: "Can download CSV/PDF reports" },
  ];

  const createPermissions = await prisma.permission.createMany({
    data: permission,
  });

  console.log(`Seeding finished. Added ${createPermissions.count} new permissions.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
