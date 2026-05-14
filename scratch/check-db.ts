import { pool } from './lib/db';

async function checkSchema() {
  try {
    const [rows] = await pool.execute('DESCRIBE properties');
    console.log('Properties Table Structure:');
    console.table(rows);
    
    const [leadsRows] = await pool.execute('DESCRIBE leads');
    console.log('Leads Table Structure:');
    console.table(leadsRows);
    
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

checkSchema();
