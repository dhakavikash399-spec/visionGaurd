import { Metadata } from 'next';
import Link from 'next/link';
import ProductCard from '@/components/ProductCard';
import { fetchProducts } from '@/lib/db/queries';

const CAMERA_CATEGORIES = [
    { key: 'Indoor Cameras', icon: '🏠' },
    { key: 'Outdoor Cameras', icon: '🏡' },
    { key: 'Doorbell Cameras', icon: '🔔' },
    { key: 'Wireless Systems', icon: '📡' },
];

function normalizeTag(s: string) {
    return s.trim().toLowerCase();
}

function productMatchesCategory(product: any, categoryKey: string) {
    const target = normalizeTag(categoryKey);

    const cat = product.category ? normalizeTag(String(product.category)) : '';
    const hasCat = cat === target;

    const dests: string[] = Array.isArray(product.destinations) ? product.destinations : [];
    const hasDest = dests.some((d) => normalizeTag(String(d)) === target);

    // If product has no destinations configured, treat it as general.
    const isGeneral = dests.length === 0;

    return hasCat || hasDest || isGeneral;
}

export const metadata: Metadata = {
    title: 'CCTV Cameras & Home Security Products | VisionGuard',
    description: 'Browse CCTV cameras, doorbells, and surveillance systems. Filter by camera type and check affiliate prices.',
};

export default async function ProductsPage({
    searchParams,
}: {
    searchParams?: { category?: string };
}) {
    const products = await fetchProducts();

    const activeCategory = searchParams?.category ? String(searchParams.category) : 'all';
    const filteredProducts =
        activeCategory === 'all'
            ? products
            : products.filter((p) => productMatchesCategory(p, activeCategory));

    return (
        <div className="min-h-screen pt-24 pb-20 px-4 bg-[#0a0e17]">
            <div className="max-w-7xl mx-auto">
                {/* Hero */}
                <div className="text-center mb-14">
                    <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-sm mb-6 border border-white/10">
                        <span className="text-[#00d4ff]">📹</span>
                        <span className="text-gray-300">{filteredProducts.length} Security Products</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                        Explore <span className="gradient-text">CCTV</span> Cameras
                    </h1>
                    <p className="text-gray-400 text-lg max-w-2xl mx-auto">
                        Browse our curated picks and check affiliate pricing for CCTV, doorbell cameras, and wireless surveillance kits.
                    </p>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-3 justify-center mb-12">
                    <Link
                        href="/products/"
                        className={`px-4 py-2 rounded-lg text-sm font-bold transition-all ${
                            activeCategory === 'all'
                                ? 'bg-gradient-to-r from-[#00d4ff] to-[#10b981] text-[#0a0e17]'
                                : 'bg-white/5 border border-white/10 text-gray-300 hover:bg-white/10'
                        }`}
                    >
                        All Products
                    </Link>
                    {CAMERA_CATEGORIES.map((cat) => {
                        const isActive = activeCategory === cat.key;
                        return (
                            <Link
                                key={cat.key}
                                href={`/products/?category=${encodeURIComponent(cat.key)}`}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                    isActive
                                        ? 'bg-gradient-to-r from-[#00d4ff] to-[#10b981] text-[#0a0e17]'
                                        : 'bg-white/5 border border-white/10 text-gray-300 hover:text-[#00d4ff] hover:bg-white/10'
                                }`}
                            >
                                {cat.icon} {cat.key}
                            </Link>
                        );
                    })}
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {filteredProducts.length > 0 ? (
                        filteredProducts.map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-400 py-16 border border-white/10 rounded-2xl bg-white/5">
                            No products found for this category yet.
                        </div>
                    )}
                </div>

                {/* Trust / Affiliate note */}
                <div className="max-w-4xl mx-auto mt-16">
                    <div className="glass-card p-6 text-center" style={{ transform: 'none' }}>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            <strong className="text-gray-200">Affiliate Disclosure:</strong> When you buy through links on our site, we may earn an affiliate commission at no extra cost to you. This helps keep our content free and helps us recommend better security setups.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
