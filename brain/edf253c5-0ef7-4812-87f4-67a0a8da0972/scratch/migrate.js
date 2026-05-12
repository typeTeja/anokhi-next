
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
dotenv.config({ path: path.join(__dirname, '../../.env') });

const dbUrl = process.env.DATABASE_URL;

async function migrate() {
  if (!dbUrl) {
    console.error('DATABASE_URL is not defined');
    process.exit(1);
  }

  const connection = await mysql.createConnection(dbUrl);
  try {
    console.log('Adding is_featured column to properties table...');
    await connection.execute('ALTER TABLE properties ADD COLUMN is_featured INT DEFAULT 0 AFTER image');
    console.log('Column added successfully!');
  } catch (error) {
    console.error('Migration failed:', error);
  } finally {
    await connection.end();
  }
}

migrate();
