import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const products = await sql`SELECT * FROM products ORDER BY created_at DESC`;
    return NextResponse.json(products);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await req.json();
    const {
      name,
      category,
      description,
      price,
      original_price,
      rating,
      review_count,
      affiliate_link,
      image_url,
      badge,
      features,
      destinations,
      is_active,
    } = data;

    const cleanedFeatures = Array.isArray(features)
      ? features.map((f: any) => String(f).trim()).filter((f: string) => f.length > 0)
      : [];

    // Keep recommendations accurate: if admin didn't send destinations, default to category.
    const computedDestinations = Array.isArray(destinations) && destinations.length > 0
      ? destinations.map((d: any) => String(d))
      : category ? [category] : [];

    const computedIsActive = typeof is_active === 'boolean' ? is_active : true;

    const computedCategory = category ? String(category) : null;

    const result = await sql`
      INSERT INTO products (
        name, category, description, price, original_price, rating, review_count,
        affiliate_link, image_url, badge, features, destinations, is_active
      )
      VALUES (
        ${name}, ${computedCategory}, ${description}, ${price}, ${original_price}, ${rating}, ${review_count},
        ${affiliate_link}, ${image_url}, ${badge},
        ${JSON.stringify(cleanedFeatures)}::jsonb,
        ${JSON.stringify(computedDestinations)}::jsonb,
        ${computedIsActive}
      )
      RETURNING *
    `;

    return NextResponse.json(result[0]);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
