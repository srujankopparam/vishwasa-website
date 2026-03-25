import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    // This creates the Products table if it doesn't already exist in the Postgres Database.
    const result = await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price VARCHAR(100),
        image_url TEXT,
        highlights TEXT,
        status VARCHAR(50) DEFAULT 'active',
        created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
      );
    `;
    
    return NextResponse.json(
      { message: 'Database Setup Successful! Products table created.', result },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to set up database', details: error },
      { status: 500 }
    );
  }
}
