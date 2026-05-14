const mysql = require('mysql2/promise');
require('dotenv').config();

async function migrate() {
  const dbUrl = process.env.DATABASE_URL;
  if (!dbUrl) {
    console.error('DATABASE_URL not found');
    process.exit(1);
  }

  const pool = mysql.createPool(dbUrl);

  try {
    console.log('Starting manual migration for contact_leads table...');
    
    const createTableSql = `
      CREATE TABLE IF NOT EXISTS contact_leads (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL,
        inquiry_type VARCHAR(100),
        message TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;
    
    await pool.execute(createTableSql);
    console.log('SUCCESS: contact_leads table created or already exists.');
    
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('Migration failed:', error);
    process.exit(1);
  }
}

migrate();
