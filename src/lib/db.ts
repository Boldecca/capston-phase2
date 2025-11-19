import { Pool } from "pg";

const connectionString =
  process.env.SUPABASE_DB_URL ||
  process.env.POSTGRES_URL ||
  process.env.DATABASE_URL ||
  "postgresql://postgres:[PASSWORD]@db.dqlraarzzwrrvhhtogzt.supabase.co:5432/postgres";

declare global {
  // eslint-disable-next-line no-var
  var _pgPool: Pool | undefined;
}

const ssl =
  connectionString.includes("supabase.co") || process.env.PGSSLMODE === "require"
    ? { rejectUnauthorized: false }
    : undefined;

const pool =
  global._pgPool ||
  new Pool({
    connectionString,
    ssl,
  });
if (!global._pgPool) {
  global._pgPool = pool;
}

export function getPgPool() {
  return pool;
}

