'use client';

import Link from 'next/link';
import Image from 'next/image';
import type { AffiliateProduct } from '@/lib/db/queries/products';
import type { BlogPost } from '@/lib/data';
import BlogCard from '@/components/BlogCard';
import { BlogInteractionsProvider } from '@/components/BlogInteractionsProvider';
import ProductCard from '@/components/ProductCard';
import FeatureHighlight from '@/components/FeatureHighlight';
import ComparisonTable from '@/components/ComparisonTable';
import Testimonials from '@/components/Testimonials';
import SecurityFAQSection from '@/components/SecurityFAQSection';

const CAMERA_CATEGORIES = [
    { key: 'Indoor Cameras', icon: '🏠', description: 'Reliable coverage for apartments and bedrooms.' },
    { key: 'Outdoor Cameras', icon: '🏡', description: 'Weather-ready surveillance for entrances and driveways.' },
    { key: 'Doorbell Cameras', icon: '🔔', description: 'See who’s at your door—day or night.' },
    { key: 'Wireless Systems', icon: '📡', description: 'Flexible kits for easy setup and expansion.' },
];

function normalizeTag(s: string) {
    return s.trim().toLowerCase();
}

function filterProductsByCategory(products: AffiliateProduct[], categoryKey: string) {
    const target = normalizeTag(categoryKey);

    return products.filter((p) => {
        const cat = p.category ? normalizeTag(p.category) : '';
        const hasCat = cat === target;

        const dests = Array.isArray(p.destinations) ? p.destinations : [];
        const hasDest = dests.some((d) => normalizeTag(String(d)) === target);

        // If admin hasn't tagged destinations for a product yet, keep it as a fallback.
        const isGeneral = dests.length === 0;

        return hasCat || hasDest || isGeneral;
    });
}

export default function SecurityHomePageClient({
    products,
    blogs,
}: {
    products: AffiliateProduct[];
    blogs: BlogPost[];
}) {
    const featuredByCategory = CAMERA_CATEGORIES.map((c) => ({
        ...c,
        products: filterProductsByCategory(products, c.key).slice(0, 2),
    }));

    const comparisonCategory = 'Outdoor Cameras';
    const comparisonProducts = filterProductsByCategory(products, comparisonCategory)
        .slice(0, 3);

    const blogByCategory = {
        guides: blogs.filter((b) => b.category === 'guides').slice(0, 3),
        reviews: blogs.filter((b) => b.category === 'reviews').slice(0, 3),
        tips: blogs.filter((b) => b.category === 'security-tips').slice(0, 3),
    };

    const allBlogIds = [
        ...blogByCategory.guides.map((b) => b.id),
        ...blogByCategory.reviews.map((b) => b.id),
        ...blogByCategory.tips.map((b) => b.id),
    ];

    return (
        <div className="bg-[#0a0e17] text-white">
            {/* Hero */}
            <section className="relative py-32 px-4 overflow-hidden min-h-[75vh] flex items-center">
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
                    <Image src="/hero-surveillance-home.png" alt="Smart surveillance home" fill priority className="object-cover opacity-[0.85]" />
                </div>
                
                {/* Gradients & Overlay */}
                <div className="absolute inset-0 z-10 pointer-events-none">
                    <div className="absolute top-[-200px] left-[-200px] w-[520px] h-[520px] bg-[#00d4ff]/25 rounded-full blur-[100px]" />
                    <div className="absolute bottom-[-240px] right-[-240px] w-[620px] h-[620px] bg-[#10b981]/20 rounded-full blur-[100px]" />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0a0e17]/40 to-[#0a0e17]" />
                </div>

                <div className="max-w-7xl mx-auto text-center relative z-20">
                    <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm mb-6 border border-white/20 shadow-lg backdrop-blur-md bg-white/5">
                        <span className="text-[#00d4ff] font-bold">CCTV</span>
                        <span className="text-gray-100 font-medium">Smart home security & surveillance</span>
                    </div>

                    <h1 className="hero-headline text-5xl md:text-7xl font-extrabold leading-tight animate-slide-up drop-shadow-[0_4px_24px_rgba(0,0,0,0.8)] text-white">
                        Protect What Matters Most
                    </h1>

                    <p className="text-lg md:text-2xl opacity-95 mt-6 max-w-3xl mx-auto drop-shadow-md text-gray-200">
                        Discover CCTV cameras, smart alerts, and surveillance systems—curated by product experts and designed to help you act fast.
                    </p>

                    <div className="flex gap-4 justify-center flex-wrap mt-10">
                        <Link
                            href="/products/"
                            className="px-8 py-4 bg-gradient-to-r from-[#00d4ff] to-[#10b981] text-[#0a0e17] font-semibold rounded-xl shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all"
                        >
                            Explore Cameras
                        </Link>
                        <Link
                            href="/essentials/"
                            className="px-8 py-4 border-2 border-[#00d4ff]/50 text-[#00d4ff] font-semibold rounded-xl hover:bg-[#00d4ff]/10 transition-all"
                        >
                            View Plans
                        </Link>
                    </div>
                </div>
            </section>

            {/* Featured Products */}
            <section className="py-10 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-8">
                        <h2 className="text-3xl font-bold">Featured Security Products</h2>
                        <p className="text-gray-400 mt-2">
                            Quick picks across indoor, outdoor, doorbell, and wireless solutions.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                        {featuredByCategory.map((c, idx) => (
                            <div
                                key={c.key}
                                className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-all"
                                style={{ animationDelay: `${idx * 0.08}s` }}
                            >
                                <div className="flex items-center gap-4 mb-5">
                                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00d4ff]/20 to-[#10b981]/10 border border-white/10 flex items-center justify-center text-2xl">
                                        {c.icon}
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold">{c.key}</h3>
                                        <p className="text-gray-400 text-sm">{c.description}</p>
                                    </div>
                                </div>

                                {c.products.length > 0 ? (
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        {c.products.map((p) => (
                                            <ProductCard key={p.id} product={p} />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-gray-500 text-sm">Add products in this category from the admin panel.</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Smart Features */}
            <FeatureHighlight />

            {/* Comparison Tables */}
            {comparisonProducts.length > 0 ? (
                <ComparisonTable
                    title={`Top Picks Comparison: ${comparisonCategory}`}
                    products={comparisonProducts}
                />
            ) : null}

            {/* Blog / Guides */}
            <section className="py-14 px-4">
                <div className="max-w-7xl mx-auto">
                    <div className="mb-10">
                        <h2 className="text-3xl font-bold">Buying Guides & Security Reviews</h2>
                        <p className="text-gray-400 mt-2">
                            Use real-world guidance to pick the right camera setup—then fine-tune your alerts.
                        </p>
                    </div>

                    <BlogInteractionsProvider blogIds={allBlogIds}>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                                <h3 className="text-xl font-bold mb-5">Buying Guides</h3>
                                <div className="space-y-4">
                                    {blogByCategory.guides.length > 0 ? (
                                        blogByCategory.guides.map((blog, i) => (
                                            <div key={blog.id} className={i === 0 ? '' : ''}>
                                                <BlogCard blog={blog} priority={i === 0} />
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-gray-500 text-sm">No guides published yet.</div>
                                    )}
                                </div>
                                <div className="mt-6">
                                    <Link href="/blogs/" className="text-[#00d4ff] font-bold hover:underline">
                                        Explore guides →
                                    </Link>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                                <h3 className="text-xl font-bold mb-5">Product Reviews</h3>
                                <div className="space-y-4">
                                    {blogByCategory.reviews.length > 0 ? (
                                        blogByCategory.reviews.map((blog, i) => (
                                            <BlogCard key={blog.id} blog={blog} priority={i === 0} />
                                        ))
                                    ) : (
                                        <div className="text-gray-500 text-sm">No reviews published yet.</div>
                                    )}
                                </div>
                                <div className="mt-6">
                                    <Link href="/blogs/" className="text-[#00d4ff] font-bold hover:underline">
                                        Explore reviews →
                                    </Link>
                                </div>
                            </div>

                            <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                                <h3 className="text-xl font-bold mb-5">Security Tips</h3>
                                <div className="space-y-4">
                                    {blogByCategory.tips.length > 0 ? (
                                        blogByCategory.tips.map((blog, i) => (
                                            <BlogCard key={blog.id} blog={blog} priority={i === 0} />
                                        ))
                                    ) : (
                                        <div className="text-gray-500 text-sm">No tips published yet.</div>
                                    )}
                                </div>
                                <div className="mt-6">
                                    <Link href="/blogs/" className="text-[#00d4ff] font-bold hover:underline">
                                        Explore tips →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </BlogInteractionsProvider>
                </div>
            </section>

            {/* Testimonials */}
            <Testimonials />

            {/* FAQ */}
            <SecurityFAQSection />
        </div>
    );
}

