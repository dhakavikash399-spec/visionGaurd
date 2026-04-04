'use client';

import { useState, useEffect } from 'react';
import { useLanguage } from './LanguageProvider';
import ProductCard from '@/components/ProductCard';
import type { AffiliateProduct } from '@/lib/db/queries/products';

interface AffiliateProductsProps {
    destination?: string;
    limit?: number;
}

export default function AffiliateProducts({ destination, limit = 4 }: AffiliateProductsProps) {
    const { t } = useLanguage();
    const [products, setProducts] = useState<AffiliateProduct[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function loadProducts() {
            setLoading(true);
            try {
                const params = new URLSearchParams();
                if (destination) params.set('destination', destination);
                params.set('limit', String(limit));

                const res = await fetch(`/api/products/?${params.toString()}`);
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                const data = await res.json();
                setProducts(data.products || []);
            } catch (err) {
                console.error('Error loading products:', err);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        }

        loadProducts();
    }, [destination, limit]);

    if (loading) {
        return (
            <div className="animate-pulse flex gap-4">
                {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-48 h-64 bg-[#111827] border border-[#1f2937] rounded-xl shadow-[0_0_10px_rgba(0,0,0,0.5)]"></div>
                ))}
            </div>
        );
    }

    if (products.length === 0) return null;

    return (
        <section className="py-8">
            <div className="mb-6">
                <h3 className="text-xl font-bold text-white tracking-wide">
                    {t('Recommended Security Products', 'अनुशंसित सुरक्षा उत्पाद')}
                </h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                ))}
            </div>
        </section>
    );
}
