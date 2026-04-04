export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from 'next/server';
import { fetchProducts } from '@/lib/db/queries';

/**
 * API route for fetching affiliate products.
 * 
 * GET /api/products?destination=jaisalmer&category=Indoor%20Cameras&limit=4
 */
export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const destination = searchParams.get('destination') || undefined;
        const category = searchParams.get('category') || undefined;
        const limit = parseInt(searchParams.get('limit') || '4', 10);

        let products = await fetchProducts();

        const destinationLower = destination?.toLowerCase();
        const categoryLower = category?.toLowerCase();

        // Filter by destination if specified (keeps backward compatibility)
        if (destinationLower) {
            products = products.filter((p: any) => {
                const dests: string[] = Array.isArray(p.destinations) ? p.destinations : [];
                const matchesDest = dests.some((d: string) => String(d).toLowerCase() === destinationLower);
                const matchesCategory = p.category && String(p.category).toLowerCase() === destinationLower;
                // If product has no destinations, allow it as a "general" match
                const isGeneral = dests.length === 0;
                return matchesDest || matchesCategory || isGeneral;
            });
        }

        // Optional category filter (useful for camera-type pages/tables)
        if (categoryLower) {
            products = products.filter((p: any) => {
                const matchesCategory = p.category && String(p.category).toLowerCase() === categoryLower;
                const dests: string[] = Array.isArray(p.destinations) ? p.destinations : [];
                const matchesDestTag = dests.some((d: string) => String(d).toLowerCase() === categoryLower);
                return matchesCategory || matchesDestTag || dests.length === 0;
            });
        }

        products = products.slice(0, limit);
        return NextResponse.json({ products });
    } catch (error: any) {
        console.error('[api/products] Error:', error.message);
        return NextResponse.json({ products: [] });
    }
}
