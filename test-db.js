const { Pool } = require('pg');

const url = 'postgresql://neondb_owner:npg_5vJa3PTAkVZs@ep-dry-paper-a1791ptl-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require';

const pool = new Pool({
  connectionString: url,
  ssl: {
    rejectUnauthorized: false
  }
});

async function test() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT version();');
    console.log('SUCCESS:', result.rows[0].version);
    client.release();
    process.exit(0);
  } catch (err) {
    console.error('FAILED:', err.message);
    process.exit(1);
  }
}

test();
