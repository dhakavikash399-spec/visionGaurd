import { Pool } from 'pg';

if (!process.env.NEON_DATABASE_URL) {
  throw new Error('NEON_DATABASE_URL is not defined in environment variables');
}

const pool = new Pool({
  connectionString: process.env.NEON_DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

/**
 * Standard SQL tagged template literal for 'pg'
 * Usage: await sql`SELECT * FROM users WHERE id = ${id}`
 */
export async function sql(strings: TemplateStringsArray, ...values: any[]) {
  const text = strings.reduce((acc, str, i) => acc + str + (i < values.length ? `$${i + 1}` : ''), '');
  const client = await pool.connect();
  try {
    const res = await client.query(text, values);
    return res.rows;
  } finally {
    client.release();
  }
}

export async function initDatabase() {
  try {
    // Users table for Admin access
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        name TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Blog Posts table
    await sql`
      CREATE TABLE IF NOT EXISTS blog_posts (
        id SERIAL PRIMARY KEY,
        title TEXT NOT NULL,
        slug TEXT UNIQUE NOT NULL,
        category TEXT NOT NULL,
        excerpt TEXT,
        content TEXT,
        author_name TEXT,
        read_time TEXT,
        tags TEXT[],
        published_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Products table
    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name TEXT NOT NULL,
        category TEXT NOT NULL,
        description TEXT,
        price TEXT,
        original_price TEXT,
        rating FLOAT,
        review_count INTEGER,
        affiliate_link TEXT,
        image_url TEXT,
        badge TEXT,
        features TEXT[],
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log('Database initialized successfully using standard pg driver');
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}
