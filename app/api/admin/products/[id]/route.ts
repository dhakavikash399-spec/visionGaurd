import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    const result = await sql`SELECT * FROM products WHERE id = ${id} LIMIT 1`;
    if (!result[0]) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(result[0]);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    const data = await req.json();
    const {
      name, category, description, price, original_price,
      rating, review_count, affiliate_link, image_url, badge, features,
      destinations, is_active,
    } = data;

    const cleanedFeatures = Array.isArray(features)
      ? features.map((f: any) => String(f).trim()).filter((f: string) => f.length > 0)
      : [];

    const computedDestinations = Array.isArray(destinations) && destinations.length > 0
      ? destinations.map((d: any) => String(d))
      : category ? [category] : [];

    const computedIsActive = typeof is_active === 'boolean' ? is_active : true;
    const computedCategory = category ? String(category) : null;

    const result = await sql`
      UPDATE products
      SET
        name           = ${name},
        category       = ${computedCategory},
        description    = ${description},
        price          = ${price},
        original_price = ${original_price},
        rating         = ${rating},
        review_count   = ${review_count},
        affiliate_link = ${affiliate_link},
        image_url      = ${image_url},
        badge          = ${badge},
        features       = ${JSON.stringify(cleanedFeatures)}::jsonb,
        destinations   = ${JSON.stringify(computedDestinations)}::jsonb,
        is_active      = ${computedIsActive}
      WHERE id = ${id}
      RETURNING *
    `;

    if (!result[0]) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(result[0]);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    await sql`DELETE FROM products WHERE id = ${id}`;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
