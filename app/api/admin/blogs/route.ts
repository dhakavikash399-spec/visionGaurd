import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const blogs = await sql`SELECT * FROM blog_posts ORDER BY published_at DESC`;
    return NextResponse.json(blogs);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await req.json();
    const { title, slug, category, excerpt, content, author_name, read_time, tags } = data;

    const result = await sql`
      INSERT INTO blog_posts (title, slug, category, excerpt, content, author_name, read_time, tags)
      VALUES (${title}, ${slug}, ${category}, ${excerpt}, ${content}, ${author_name}, ${read_time}, ${tags})
      RETURNING *
    `;

    return NextResponse.json(result[0]);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
