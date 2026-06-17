import { drizzle, type NeonHttpDatabase } from "drizzle-orm/neon-http";
import { neon } from "@neondatabase/serverless";
import * as schema from "./schema";

export type DbSchema = typeof schema;
export type Db = NeonHttpDatabase<DbSchema>;

export function hasDatabase(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

let _db: Db | null = null;

export function getDb(): Db | null {
  if (!process.env.DATABASE_URL) return null;
  if (_db) return _db;
  const sql = neon(process.env.DATABASE_URL);
  _db = drizzle(sql, { schema }) as Db;
  return _db;
}

export { schema };
