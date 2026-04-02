import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '../../../auth/[...nextauth]/route';

export async function GET(
  _req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const result = await sql`SELECT * FROM products WHERE id = ${params.id} LIMIT 1`;
    if (!result[0]) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(result[0]);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const data = await req.json();
    const {
      name, category, description, price, original_price,
      rating, review_count, affiliate_link, image_url, badge, features,
    } = data;

    const result = await sql`
      UPDATE products
      SET
        name           = ${name},
        category       = ${category},
        description    = ${description},
        price          = ${price},
        original_price = ${original_price},
        rating         = ${rating},
        review_count   = ${review_count},
        affiliate_link = ${affiliate_link},
        image_url      = ${image_url},
        badge          = ${badge},
        features       = ${features}
      WHERE id = ${params.id}
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
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    await sql`DELETE FROM products WHERE id = ${params.id}`;
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
