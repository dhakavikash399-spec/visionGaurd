'use client';

import Link from 'next/link';
import type { ProductCategory } from '@/lib/data';

interface CategoryCardProps {
    category: ProductCategory;
}

export default function CategoryCard({ category }: CategoryCardProps) {
    return (
        <Link
            href={`/categories#${category.id}`}
            className="group glass-card p-6 flex flex-col items-center text-center"
        >
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[rgba(0,212,255,0.1)] to-[rgba(16,185,129,0.05)] border border-[rgba(0,212,255,0.15)] flex items-center justify-center text-3xl mb-4 group-hover:scale-110 group-hover:shadow-[0_0_30px_rgba(0,212,255,0.2)] transition-all duration-500">
                {category.icon}
            </div>
            <h3 className="text-base font-bold text-white mb-2 group-hover:text-[#00d4ff] transition-colors">
                {category.name}
            </h3>
            <p className="text-[#64748b] text-xs leading-relaxed mb-3 line-clamp-2">
                {category.description}
            </p>
            <span className="text-[10px] font-bold text-[#00d4ff] bg-[rgba(0,212,255,0.08)] px-3 py-1 rounded-full">
                {category.productCount} Products
            </span>
        </Link>
    );
}
