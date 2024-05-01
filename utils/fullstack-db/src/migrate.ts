import { Pool } from "pg";
import { migrate } from "drizzle-orm/node-postgres/migrator";
import { NodePgDatabase, drizzle } from "drizzle-orm/node-postgres";

// Code might have to be wrapped in a async function, like this:
(async () => {
  const pool = new Pool({ connectionString: process.env.DB_URL });
  const db: NodePgDatabase = drizzle(pool);

  console.log("[migrate] Running migrations...");
  await migrate(db, { migrationsFolder: "src/drizzle" });
  console.log("[migrate] All migrations ran, exiting...");
  await pool.end();
})();
