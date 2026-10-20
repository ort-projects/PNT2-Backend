import { defineConfig, env } from "prisma/config";

// El CLI de Prisma no lee el .env solo: lo cargamos con Node (si existe).
try {
  process.loadEnvFile();
} catch {}

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
    seed: "tsx prisma/seed.ts",
  },
  datasource: {
    url: env("DATABASE_URL"),
  },
});
