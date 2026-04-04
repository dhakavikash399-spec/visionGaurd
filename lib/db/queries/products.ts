'use server';

/**
 * Product Queries — Database Abstraction Layer
 * 
 * Replaces lib/supabaseProducts.ts
 */

import { db } from '@/lib/db/router';

export interface AffiliateProduct {
    id: string;
    name: string;
    description?: string;
    price: string;
    imageUrl: string;
    affiliateLink: string;
    category?: string;
    rating?: number;
    reviewCount?: number;
    badge?: string;
    originalPrice?: string;
    features?: string[];
    destinations: string[];
    isActive: boolean;
}

function mapRowToProduct(row: any): AffiliateProduct {
    const destinations: string[] = Array.isArray(row?.destinations)
        ? row.destinations.filter((d: any) => typeof d === 'string')
        : [];

    const features: string[] = Array.isArray(row?.features)
        ? row.features.filter((f: any) => typeof f === 'string')
        : [];

    const rating =
        typeof row?.rating === 'number'
            ? row.rating
            : row?.rating !== undefined && row?.rating !== null
                ? Number(row.rating)
                : undefined;

    const reviewCount =
        typeof row?.review_count === 'number'
            ? row.review_count
            : row?.review_count !== undefined && row?.review_count !== null
                ? Number(row.review_count)
                : undefined;

    return {
        id: String(row.id),
        name: row.name ?? '',
        description: row.description,
        price: row.price ?? '',
        imageUrl: row.image_url ?? '',
        affiliateLink: row.affiliate_link ?? '',
        category: row.category ?? undefined,
        rating: Number.isFinite(rating as any) ? (rating as number) : undefined,
        reviewCount: Number.isFinite(reviewCount as any) ? (reviewCount as number) : undefined,
        badge: row.badge ?? undefined,
        originalPrice: row.original_price ?? undefined,
        features: features.length > 0 ? features : undefined,
        destinations,
        isActive: row.is_active,
    };
}

export async function fetchProducts(): Promise<AffiliateProduct[]> {
    try {
        const result = await db.query(
            `SELECT * FROM products WHERE is_active = true ORDER BY created_at DESC`
        );
        return result.rows.map(mapRowToProduct);
    } catch (error: any) {
        console.error('[dbProducts] fetchProducts error:', error.message);
        return [];
    }
}

export async function fetchAllProductsForAdmin(): Promise<AffiliateProduct[]> {
    try {
        const result = await db.query(
            `SELECT * FROM products ORDER BY created_at DESC`
        );
        return result.rows.map(mapRowToProduct);
    } catch (error: any) {
        console.error('[dbProducts] fetchAllProductsForAdmin error:', error.message);
        return [];
    }
}

export async function createProduct(payload: Omit<AffiliateProduct, 'id'>) {
    try {
        const result = await db.executeOne<{ id: string }>(
            `INSERT INTO products (
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
                is_active
            )
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11::jsonb, $12::jsonb, $13)
             RETURNING id`,
            [
                payload.name,
                payload.category ?? null,
                payload.description ?? null,
                payload.price ?? '',
                payload.originalPrice ?? null,
                payload.rating ?? null,
                payload.reviewCount ?? null,
                payload.affiliateLink ?? '',
                payload.imageUrl ?? '',
                payload.badge ?? null,
                JSON.stringify(payload.features ?? []),
                JSON.stringify(payload.destinations),
                payload.isActive,
            ]
        );
        return { data: result, error: null };
    } catch (error: any) {
        return { data: null, error };
    }
}

export async function updateProduct(id: string, payload: Partial<AffiliateProduct>) {
    try {
        const setClauses: string[] = [];
        const params: any[] = [];
        let paramIndex = 1;

        const fieldMap: Record<string, string> = {
            name: 'name',
            description: 'description',
            price: 'price',
            category: 'category',
            originalPrice: 'original_price',
            rating: 'rating',
            reviewCount: 'review_count',
            imageUrl: 'image_url',
            affiliateLink: 'affiliate_link',
            badge: 'badge',
            isActive: 'is_active',
        };

        for (const [jsKey, dbCol] of Object.entries(fieldMap)) {
            if ((payload as any)[jsKey] !== undefined) {
                setClauses.push(`${dbCol} = $${paramIndex}`);
                params.push((payload as any)[jsKey]);
                paramIndex++;
            }
        }

        if (payload.destinations !== undefined) {
            setClauses.push(`destinations = $${paramIndex}::jsonb`);
            params.push(JSON.stringify(payload.destinations));
            paramIndex++;
        }

        if (payload.features !== undefined) {
            setClauses.push(`features = $${paramIndex}::jsonb`);
            params.push(JSON.stringify(payload.features));
            paramIndex++;
        }

        if (setClauses.length === 0) {
            return { data: null, error: 'No fields to update' };
        }

        params.push(id);
        const result = await db.executeOne<{ id: string }>(
            `UPDATE products SET ${setClauses.join(', ')} WHERE id = $${paramIndex}::uuid RETURNING id`,
            params
        );
        return { data: result, error: null };
    } catch (error: any) {
        return { data: null, error };
    }
}

export async function deleteProduct(id: string) {
    try {
        await db.execute('DELETE FROM products WHERE id = $1::uuid', [id]);
        return { error: null };
    } catch (error: any) {
        return { error };
    }
}
