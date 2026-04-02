import { Metadata } from 'next';
import ProductCard from '@/components/ProductCard';
import { products, productCategories } from '@/lib/data';

export const metadata: Metadata = {
    title: 'Products - Top Security Cameras & Doorbells',
    description: 'Browse our hand-picked selection of security cameras, video doorbells, NVR systems, smart locks, and accessories — all independently reviewed.',
};

export default function ProductsPage() {
    return (
        <div className="min-h-screen pt-24 pb-20 px-4">
            {/* Hero */}
            <div className="max-w-7xl mx-auto mb-16">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-sm mb-6">
                        <span className="text-[#00d4ff]">🛒</span>
                        <span className="text-[#94a3b8]">{products.length} Products Reviewed</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                        Recommended <span className="gradient-text">Products</span>
                    </h1>
                    <p className="text-[#94a3b8] text-lg max-w-2xl mx-auto">
                        Every product is independently tested and reviewed. We earn a small commission from qualifying purchases — at no extra cost to you.
                    </p>
                </div>

                {/* Category Filters */}
                <div className="flex flex-wrap gap-3 justify-center mb-12">
                    <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#00d4ff] to-[#10b981] text-[#0a0e17] text-sm font-bold">
                        All Products
                    </button>
                    {productCategories.map((cat) => (
                        <button
                            key={cat.id}
                            className="px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] text-[#94a3b8] text-sm font-medium hover:text-[#00d4ff] hover:border-[rgba(0,212,255,0.3)] transition-all"
                        >
                            {cat.icon} {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Products Grid */}
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>

            {/* Affiliate Disclaimer */}
            <div className="max-w-4xl mx-auto mt-16">
                <div className="glass-card p-6 text-center" style={{ transform: 'none' }}>
                    <p className="text-[#64748b] text-sm leading-relaxed">
                        <strong className="text-[#94a3b8]">Affiliate Disclosure:</strong> VisionGuard is reader-supported. When you buy through links on our site, we may earn an affiliate commission at no additional cost to you. This helps us continue to provide free, high-quality reviews and guides. Our editorial opinions are always our own.
                    </p>
                </div>
            </div>
        </div>
    );
}
