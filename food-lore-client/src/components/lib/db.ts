
import { Pool } from "pg";

const globalForDb = globalThis as typeof globalThis & {
  foodLorePool?: Pool;
};

export function getDb(): Pool {
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL is not configured.");
  }

  if (!globalForDb.foodLorePool) {
    globalForDb.foodLorePool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 10,
    });
  }

  return globalForDb.foodLorePool;
}
