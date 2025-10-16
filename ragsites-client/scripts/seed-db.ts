import { Pool } from 'pg';
import { hashPassword } from '../lib/auth/password';

async function seedDatabase() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    console.log('🌱 Seeding database...');

    // Create demo user
    const demoPassword = await hashPassword('Demo@123456');

    await pool.query(
      `INSERT INTO users (name, email, password_hash, company, bio)
       VALUES ($1, $2, $3, $4, $5)
       ON CONFLICT (email) DO NOTHING
       RETURNING id`,
      [
        'Demo User',
        'demo@ragsites.com',
        demoPassword,
        'RagSites Demo',
        'This is a demo account for testing the platform'
      ]
    );

    console.log('✅ Demo user created:');
    console.log('  Email: demo@ragsites.com');
    console.log('  Password: Demo@123456');
    console.log('');
    console.log('⚠️  Remember to change this password in production!');
  } catch (error) {
    console.error('❌ Database seeding failed:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

seedDatabase();
