import { readFileSync } from 'fs';
import { join } from 'path';
import { Pool } from 'pg';

async function initializeDatabase() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    console.log('🔄 Initializing database...');

    // Read and execute schema file
    const schemaPath = join(__dirname, '../lib/db/schema.sql');
    const schema = readFileSync(schemaPath, 'utf-8');

    await pool.query(schema);

    console.log('✅ Database initialized successfully!');
    console.log('📊 Created tables:');
    console.log('  - users');
    console.log('  - sessions');
    console.log('  - user_preferences');
    console.log('  - services');
    console.log('  - metrics');
    console.log('  - activity_logs');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

initializeDatabase();
