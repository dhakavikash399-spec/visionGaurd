import { Metadata } from 'next';
import Link from 'next/link';
import { fetchProducts } from '@/lib/db/queries/products';
import ProductCard from '@/components/ProductCard';

export const metadata: Metadata = {
    title: 'Categories - Browse Security Products by Type',
    description: 'Browse security cameras, video doorbells, NVR systems, smart locks, sensors, and accessories by category.',
};

const productCategories = [
    { id: 'security-cameras', name: 'Security Cameras', icon: '📹', description: 'Indoor and outdoor cameras for complete property monitoring.' },
    { id: 'smart-locks', name: 'Smart Locks', icon: '🔐', description: 'Advanced protection for your doors with keyless entry.' },
    { id: 'video-doorbells', name: 'Video Doorbells', icon: '🛎️', description: 'See who is at the door from anywhere in the world.' },
    { id: 'alarm-systems', name: 'Alarm Systems', icon: '🚨', description: 'Full property protection with motion and entry sensors.' },
    { id: 'accessories', name: 'Accessories', icon: '🔌', description: 'Mounts, cables, and storage for your security setup.' },
];

export default async function CategoriesPage() {
    const products = await fetchProducts();
    return (
        <div className="min-h-screen pt-24 pb-20 px-4">
            <div className="max-w-7xl mx-auto">
                {/* Hero */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                        Product <span className="gradient-text">Categories</span>
                    </h1>
                    <p className="text-[#94a3b8] text-lg max-w-2xl mx-auto">
                        Find the perfect security solution organized by category
                    </p>
                </div>

                {/* Category Sections */}
                {productCategories.map((cat) => {
                    const categoryProducts = products.filter((p) => p.category === cat.id);

                    return (
                        <section key={cat.id} id={cat.id} className="mb-20 scroll-mt-24">
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[rgba(0,212,255,0.1)] to-[rgba(16,185,129,0.05)] border border-[rgba(0,212,255,0.15)] flex items-center justify-center text-3xl">
                                    {cat.icon}
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">{cat.name}</h2>
                                    <p className="text-[#64748b] text-sm">{cat.description}</p>
                                </div>
                            </div>

                            {categoryProducts.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {categoryProducts.map((product) => (
                                        <ProductCard key={product.id} product={product} />
                                    ))}
                                </div>
                            ) : (
                                <div className="glass-card p-12 text-center" style={{ transform: 'none' }}>
                                    <div className="text-4xl mb-4">{cat.icon}</div>
                                    <h3 className="text-lg font-bold text-white mb-2">Coming Soon</h3>
                                    <p className="text-[#64748b]">We&apos;re currently testing products in this category. Stay tuned!</p>
                                </div>
                            )}
                        </section>
                    );
                })}
            </div>
        </div>
    );
}
