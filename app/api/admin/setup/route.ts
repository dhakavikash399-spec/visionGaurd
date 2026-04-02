import { NextResponse } from 'next/server';
import { initDatabase, sql } from '@/lib/db';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    // Initialize Tables
    await initDatabase();

    // Check if user already exists
    const existing = await sql`SELECT * FROM users WHERE email = ${'dhakavikash399@gmail.com'}`;
    
    if (existing.length === 0) {
      // Use the password from user context: ilets789pbm12345
      const hashedPassword = bcrypt.hashSync('ilets789pbm12345', 10);
      
      await sql`
        INSERT INTO users (email, password, name) 
        VALUES (${'dhakavikash399@gmail.com'}, ${hashedPassword}, ${'Vikash Dhaka Admin'})
      `;
      
      return NextResponse.json({ 
        message: 'Database initialized and Admin account created successfully!',
        email: 'dhakavikash399@gmail.com'
      });
    }

    return NextResponse.json({ message: 'Database was already initialized.' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
