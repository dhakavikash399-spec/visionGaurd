'use client';

import type { AffiliateProduct } from '@/lib/db/queries/products';

interface ProductCardProps {
    product: AffiliateProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
    const features = product.features ?? [];
    const reviewCount = product.reviewCount ?? 0;
    const rating = product.rating ?? 4.5;

    const originalPrice = product.originalPrice ?? '';
    const currentPrice = product.price ?? '';

    const discountPct = (() => {
        if (!originalPrice || !currentPrice) return null;
        const o = parseInt(originalPrice.replace(/[^\d]/g, ''), 10);
        const c = parseInt(currentPrice.replace(/[^\d]/g, ''), 10);
        if (!Number.isFinite(o) || !Number.isFinite(c) || o <= 0 || c <= 0 || c >= o) return null;
        return Math.round(((o - c) / o) * 100);
    })();

    return (
        <div className="group glass-card overflow-hidden flex flex-col h-full">
            {/* Image Area */}
            <div className="h-52 relative overflow-hidden rounded-t-[1rem]">
                <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
                    <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,212,255,0.1)] to-[rgba(16,185,129,0.05)] flex items-center justify-center">
                        <svg className="w-20 h-20 text-[rgba(0,212,255,0.2)] group-hover:text-[rgba(0,212,255,0.4)] transition-colors duration-500 group-hover:scale-110 transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                    </div>
                </div>

                {product.imageUrl ? (
                    <img
                        src={product.imageUrl}
                        alt={product.name}
                        className="absolute inset-0 w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity duration-500"
                        loading="lazy"
                        decoding="async"
                    />
                ) : null}

                {/* Badge */}
                {product.badge && (
                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-gradient-to-r from-[#f59e0b] to-[#ef4444] text-white text-[10px] font-bold uppercase rounded-full shadow-lg">
                            {product.badge}
                        </span>
                    </div>
                )}

                {/* Discount */}
                {discountPct !== null && (
                    <div className="absolute top-4 right-4">
                        <span className="px-2 py-1 bg-[rgba(16,185,129,0.2)] border border-[rgba(16,185,129,0.3)] text-[#10b981] text-[10px] font-bold rounded-full">
                            SAVE {discountPct}%
                        </span>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-5 flex-1 flex flex-col">
                <h3 className="text-base font-bold mb-2 text-white line-clamp-2 leading-tight group-hover:text-[#00d4ff] transition-colors duration-300">
                    {product.name}
                </h3>

                <p className="text-[#64748b] text-xs line-clamp-2 mb-3 leading-relaxed">
                    {product.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {features.slice(0, 3).map((feature) => (
                        <span
                            key={feature}
                            className="px-2 py-0.5 text-[10px] font-medium bg-[rgba(0,212,255,0.06)] border border-[rgba(0,212,255,0.1)] text-[#94a3b8] rounded-md"
                        >
                            {feature}
                        </span>
                    ))}
                </div>

                {/* Rating */}
                <div className="flex items-center gap-2 mb-4">
                    <div className="flex items-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <svg
                                key={star}
                                className={`w-3.5 h-3.5 ${star <= Math.floor(rating) ? 'text-[#f59e0b]' : 'text-[#334155]'}`}
                                fill="currentColor"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                        ))}
                    </div>
                    <span className="text-[#64748b] text-xs">
                        {rating} ({reviewCount.toLocaleString()})
                    </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-2">
                        <span className="text-xl font-bold text-[#00d4ff]">{product.price}</span>
                        {product.originalPrice ? (
                            <span className="text-sm text-[#475569] line-through">{product.originalPrice}</span>
                        ) : null}
                    </div>
                    <a
                        href={product.affiliateLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-4 py-2 bg-gradient-to-r from-[#00d4ff] to-[#10b981] text-[#0a0e17] text-xs font-bold rounded-lg hover:shadow-[0_0_15px_rgba(0,212,255,0.3)] transition-all"
                    >
                        Buy Now
                    </a>
                </div>
            </div>
        </div>
    );
}
