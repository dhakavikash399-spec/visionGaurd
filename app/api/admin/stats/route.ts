import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../auth/[...nextauth]/route';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const blogsCount = (await sql`SELECT COUNT(*) FROM blog_posts`)[0].count;
    const productsCount = (await sql`SELECT COUNT(*) FROM products`)[0].count;
    const recentBlogs = await sql`SELECT title, slug, published_at FROM blog_posts ORDER BY published_at DESC LIMIT 5`;

    return NextResponse.json({
      stats: { blogs: blogsCount, products: productsCount },
      recentBlogs
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
