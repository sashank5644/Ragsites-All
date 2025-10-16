import { Pool } from 'pg';

async function cleanupExpiredSessions() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  try {
    console.log('🧹 Cleaning up expired sessions...');

    const result = await pool.query(
      `DELETE FROM sessions WHERE expires_at < NOW()`
    );

    console.log(`✅ Removed ${result.rowCount} expired sessions`);
  } catch (error) {
    console.error('❌ Session cleanup failed:', error);
    process.exit(1);
  } finally {
    await pool.end();
  }
}

cleanupExpiredSessions();
