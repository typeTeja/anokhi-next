import { drizzle } from 'drizzle-orm/mysql2';
import mysql from 'mysql2/promise';
import * as schema from './schema';

const dbUrl = process.env.DATABASE_URL;

if (!dbUrl) {
  throw new Error('DATABASE_URL is not defined in .env');
}

export const pool = mysql.createPool(dbUrl);
export const db = drizzle(pool, { schema, mode: 'default' });

export async function query(sql: string, params?: unknown[]) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [rows] = await pool.execute(sql, params as any);
  return rows;
}
