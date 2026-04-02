import Link from 'next/link';
import Image from 'next/image';
import BlogCard from '@/components/BlogCard';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import FAQSection from '@/components/FAQSection';
import { blogPosts, products, productCategories, stats, faqs } from '@/lib/data';

export default function HomePage() {
    return (
        <>
            {/* ===== HERO SECTION ===== */}
            <section className="relative min-h-screen flex items-center overflow-hidden">
                {/* Animated background */}
                <div className="absolute inset-0 bg-[#0a0e17]">
                    <div className="absolute inset-0 bg-grid opacity-30" />
                    {/* Left glow */}
                    <div className="absolute top-1/3 -left-32 w-[700px] h-[700px] bg-[radial-gradient(circle,rgba(0,212,255,0.07),transparent_65%)]" />
                    {/* Right accent glow */}
                    <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(16,185,129,0.06),transparent_60%)]" />
                    {/* Scan line */}
                    <div className="absolute inset-0 overflow-hidden pointer-events-none">
                        <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-[rgba(0,212,255,0.12)] to-transparent animate-[scanline_8s_linear_infinite]" />
                    </div>
                </div>

                {/* Content: split layout */}
                <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-12 pt-24 pb-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-8">

                    {/* ── LEFT: Text ── */}
                    <div className="flex-1 max-w-xl">
                        {/* Live badge */}
                        <div className="inline-flex items-center gap-2 glass px-4 py-2 rounded-full text-sm mb-8 animate-fade-in">
                            <span className="relative flex h-2.5 w-2.5">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#10b981] opacity-75" />
                                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#10b981]" />
                            </span>
                            <span className="text-[#94a3b8]">Trusted by <span className="text-[#00d4ff] font-semibold">50,000+</span> home security enthusiasts</span>
                        </div>

                        <h1 className="text-5xl md:text-6xl xl:text-7xl font-black mb-6 leading-[1.08] animate-slide-up">
                            <span className="text-white">Your Eyes on</span>
                            <br />
                            <span className="gradient-text text-glow-cyan">Home Security</span>
                        </h1>

                        <p className="text-lg text-[#94a3b8] mb-10 animate-slide-up leading-relaxed" style={{ animationDelay: '0.15s' }}>
                            Expert reviews, in-depth comparisons, and honest buying guides for security cameras, video doorbells, and smart home security systems.
                        </p>

                        <div className="flex gap-4 flex-wrap animate-slide-up" style={{ animationDelay: '0.25s' }}>
                            <Link href="/blogs" className="btn-primary text-base px-8 py-3.5">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z" />
                                </svg>
                                Read Reviews
                            </Link>
                            <Link href="/products" className="btn-secondary text-base px-8 py-3.5">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                </svg>
                                Browse Products
                            </Link>
                        </div>
                    </div>

                    {/* ── RIGHT: Surveillance House Visual ── */}
                    <div className="flex-1 relative w-full max-w-2xl animate-fade-in" style={{ animationDelay: '0.1s' }}>
                        {/* Outer glow halo */}
                        <div className="absolute -inset-4 rounded-3xl bg-[radial-gradient(ellipse,rgba(0,212,255,0.18),transparent_70%)] blur-xl" />

                        {/* Image frame */}
                        <div className="relative rounded-2xl overflow-hidden border border-[rgba(0,212,255,0.25)] shadow-[0_0_60px_rgba(0,212,255,0.12)]">
                            {/* Corner brackets */}
                            <span className="absolute top-3 left-3 w-5 h-5 border-t-2 border-l-2 border-[#00d4ff] rounded-tl z-20 opacity-80" />
                            <span className="absolute top-3 right-3 w-5 h-5 border-t-2 border-r-2 border-[#00d4ff] rounded-tr z-20 opacity-80" />
                            <span className="absolute bottom-3 left-3 w-5 h-5 border-b-2 border-l-2 border-[#00d4ff] rounded-bl z-20 opacity-80" />
                            <span className="absolute bottom-3 right-3 w-5 h-5 border-b-2 border-r-2 border-[#00d4ff] rounded-br z-20 opacity-80" />

                            {/* Scan overlay */}
                            <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,212,255,0.04)] to-transparent z-10 pointer-events-none" />
                            <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
                                <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-[rgba(0,212,255,0.35)] to-transparent animate-[scanline_4s_linear_infinite]" />
                            </div>

                            <Image
                                src="/hero-house.png"
                                alt="Smart home under surveillance with security cameras and digital shield protection"
                                width={800}
                                height={560}
                                className="w-full h-auto object-cover"
                                priority
                            />

                            {/* Bottom gradient fade */}
                            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#0a0e17] to-transparent z-10" />
                        </div>
                    </div>
                </div>

                {/* Scroll Indicator */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce-slow">
                    <svg className="w-6 h-6 text-[#00d4ff] opacity-40" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                </div>
            </section>

            {/* ===== STATS STRIP ===== */}
            <section className="relative py-10 px-6 border-y border-[rgba(0,212,255,0.08)] bg-[rgba(10,14,23,0.95)]">
                <div className="max-w-5xl mx-auto">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {stats.map((stat, i) => (
                            <div key={stat.label} className="flex items-center gap-4 group">
                                {/* Divider line between items */}
                                {i > 0 && <div className="hidden md:block absolute" />}
                                <div className="w-12 h-12 rounded-xl bg-[rgba(0,212,255,0.08)] border border-[rgba(0,212,255,0.12)] flex items-center justify-center text-2xl flex-shrink-0 group-hover:border-[rgba(0,212,255,0.3)] transition-colors">
                                    {stat.icon}
                                </div>
                                <div>
                                    <div className="text-2xl font-black text-white">{stat.value}</div>
                                    <div className="text-xs text-[#64748b] uppercase tracking-wider">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== PRODUCT CATEGORIES ===== */}
            <section className="py-20 px-4 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#0f172a] to-[#0a0e17]" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
                        Browse by <span className="gradient-text">Category</span>
                    </h2>
                    <p className="text-center text-[#94a3b8] text-lg max-w-2xl mx-auto mb-12">
                        Find the perfect security solution for every corner of your home
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
                        {productCategories.map((cat) => (
                            <CategoryCard key={cat.id} category={cat} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== FEATURED PRODUCTS ===== */}
            <section className="py-20 px-4 relative">
                <div className="absolute inset-0 bg-grid opacity-20" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex items-center justify-between mb-12 flex-wrap gap-4">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white">
                                Top Rated <span className="gradient-text">Products</span>
                            </h2>
                            <p className="text-[#94a3b8] mt-2">Hand-picked and independently reviewed by our experts</p>
                        </div>
                        <Link href="/products" className="btn-secondary text-sm px-6 py-2.5">
                            View All Products →
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {products.slice(0, 4).map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== AFFILIATE BANNER ===== */}
            <section className="py-16 px-4">
                <div className="max-w-6xl mx-auto relative overflow-hidden rounded-2xl">
                    {/* Background */}
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a] to-[#1e293b] border border-[rgba(0,212,255,0.15)] rounded-2xl" />
                    <div className="absolute top-0 right-0 w-96 h-96 bg-[radial-gradient(circle,rgba(0,212,255,0.1),transparent_60%)]" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-[radial-gradient(circle,rgba(16,185,129,0.08),transparent_60%)]" />

                    <div className="relative z-10 p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8">
                        <div className="max-w-xl">
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[rgba(0,212,255,0.1)] border border-[rgba(0,212,255,0.2)] rounded-full text-xs text-[#00d4ff] font-semibold mb-4">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#00d4ff] animate-pulse" />
                                DEAL OF THE WEEK
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                Save Up to <span className="gradient-text">40% Off</span> on Top Security Systems
                            </h3>
                            <p className="text-[#94a3b8]">
                                Limited-time deals on Ring, Arlo, Nest, and more. All products independently tested and verified by our security experts.
                            </p>
                        </div>
                        <Link
                            href="/products"
                            className="btn-primary text-lg px-8 py-4 whitespace-nowrap"
                        >
                            Shop Deals →
                        </Link>
                    </div>
                </div>
            </section>

            {/* ===== LATEST BLOGS ===== */}
            <section className="py-20 px-4 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] via-[#020617] to-[#0a0e17]" />
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="flex items-center justify-between mb-12 flex-wrap gap-4">
                        <div>
                            <h2 className="text-3xl md:text-4xl font-bold text-white">
                                Latest from the <span className="gradient-text">Blog</span>
                            </h2>
                            <p className="text-[#94a3b8] mt-2">Expert guides, reviews, and security insights</p>
                        </div>
                        <Link href="/blogs" className="btn-secondary text-sm px-6 py-2.5">
                            View All Articles →
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogPosts.slice(0, 6).map((blog, index) => (
                            <BlogCard key={blog.id} blog={blog} priority={index === 0} />
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== WHY TRUST US ===== */}
            <section className="py-20 px-4 relative">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
                        Why Trust <span className="gradient-text">VisionGuard</span>?
                    </h2>
                    <p className="text-center text-[#94a3b8] text-lg max-w-2xl mx-auto mb-12">
                        We're committed to providing honest, independent reviews to help you make informed decisions
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            {
                                icon: '🔬',
                                title: 'Independent Testing',
                                description: 'Every product is tested in real-world conditions. We never accept paid placements or biased reviews.',
                            },
                            {
                                icon: '👨‍💻',
                                title: 'Expert Team',
                                description: 'Our reviewers are certified security professionals with years of hands-on smart home experience.',
                            },
                            {
                                icon: '🤝',
                                title: 'Community Driven',
                                description: 'Real user reviews and community contributions help us provide balanced, comprehensive insights.',
                            },
                        ].map((item) => (
                            <div key={item.title} className="glass-card p-8 text-center">
                                <div className="text-4xl mb-4">{item.icon}</div>
                                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                                <p className="text-[#94a3b8] leading-relaxed">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ===== FAQ ===== */}
            <FAQSection faqs={faqs} />

            {/* ===== CTA ===== */}
            <section className="py-20 px-4 relative">
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0e17] to-[#020617]" />
                <div className="max-w-4xl mx-auto text-center relative z-10">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                        Share Your <span className="gradient-text">Security Story</span>
                    </h2>
                    <p className="text-[#94a3b8] text-lg mb-8">
                        Have experience with a security camera or smart lock? Write a review and help others make informed decisions.
                    </p>
                    <Link href="/submit" className="btn-primary text-lg px-10 py-4">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Submit Your Blog →
                    </Link>
                </div>
            </section>
        </>
    );
}
