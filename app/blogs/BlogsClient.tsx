'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';

import Link from 'next/link';

import BlogCard from '@/components/BlogCard';
import AffiliateProducts from '@/components/AffiliateProducts';
import BackToTop from '@/components/BackToTop';
import { BlogPost } from '@/lib/data';
import { BlogInteractionsProvider } from '@/components/BlogInteractionsProvider';

interface BlogsClientProps {
    initialBlogs: BlogPost[];
    destinations: string[];
}

const BLOG_CATEGORIES = [
    { value: 'guides', label: 'Buying Guides', icon: '🧩' },
    { value: 'reviews', label: 'Product Reviews', icon: '⭐' },
    { value: 'security-tips', label: 'Security Tips', icon: '🛡️' },
    { value: 'smart-home', label: 'Smart Home', icon: '🏠' },
    { value: 'installation', label: 'Installation Tips', icon: '🔧' },
];

export default function BlogsClient({ initialBlogs, destinations: initialDestinations }: BlogsClientProps) {
    const searchParams = useSearchParams();

    // Ensure 'all' is the first option
    const destinations = ['all', ...initialDestinations];

    const [filter, setFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');
    const [search, setSearch] = useState('');
    const [blogs, setBlogs] = useState<BlogPost[]>(initialBlogs);
    const [loading, setLoading] = useState(false);

    // Read ?category= from URL on mount
    useEffect(() => {
        const urlCategory = searchParams.get('category');
        if (urlCategory) {
            setCategoryFilter(urlCategory);
        }
    }, [searchParams]);

    // Sync with server data if it changes
    useEffect(() => {
        setBlogs(initialBlogs);
    }, [initialBlogs]);

    // Memoize filtered blogs to prevent unnecessary re-renders
    const filteredBlogs = useMemo(() => {
        return blogs.filter((blog) => {
            const matchesFilter = filter === 'all' || (blog.destination && blog.destination.toLowerCase().includes(filter));
            const matchesCategory = categoryFilter === 'all' || blog.category === categoryFilter;
            const matchesSearch =
                !search ||
                blog.title_en.toLowerCase().includes(search.toLowerCase()) ||
                blog.excerpt_en.toLowerCase().includes(search.toLowerCase());
            return matchesFilter && matchesCategory && matchesSearch;
        });
    }, [blogs, filter, categoryFilter, search]);


    return (
        <main className="min-h-screen bg-transparent">
            {/* Top Breadcrumbs */}
            <div className="pt-28 pb-4 px-4 border-b border-[#00d4ff]/10">
                <div className="max-w-7xl mx-auto">
                    <nav className="flex items-center gap-2 text-sm text-[#8fa0ba] font-medium overflow-x-auto whitespace-nowrap pb-2 md:pb-0 no-scrollbar">
                        <Link href="/" className="hover:text-[#00d4ff] transition-colors flex items-center gap-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                            </svg>
                            Home
                        </Link>
                        <span className="text-[#3a4760]">/</span>
                        <span className="text-white font-bold tracking-wide">Security Guides</span>
                    </nav>
                </div>
            </div>

            {/* Page Header */}
            <section className="py-20 px-4 bg-[#050810] text-white relative overflow-hidden">
                {/* Decorative background elements to match premium feel */}
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#00d4ff]/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/4"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-desert-gold/5 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2"></div>

                <div className="max-w-7xl mx-auto text-center relative z-10">
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-[#8fa0ba]">Guides, Reviews & Security Tips</h1>
                    <p className="text-lg md:text-xl text-[#8fa0ba] max-w-2xl mx-auto font-light">
                        Buying guides and real-world security advice for CCTV, cameras, and smart home surveillance.
                    </p>
                </div>
            </section>

            {/* Filters */}
            <section className="py-6 px-4 bg-[#0a0e17]/80 backdrop-blur-md border-y border-[#00d4ff]/10 sticky top-16 z-40 shadow-xl shadow-[#000000]/50">
                <div className="max-w-7xl mx-auto flex flex-wrap gap-4 items-center justify-between">
                    <div className="flex flex-wrap gap-3">
                        {destinations.map((dest) => (
                            <button
                                key={dest}
                                onClick={() => setFilter(dest)}
                                className={`px-5 py-2 rounded-lg text-sm font-semibold transition-all border ${filter === dest
                                    ? 'bg-[#00d4ff]/10 text-[#00d4ff] border-[#00d4ff]/40 shadow-[0_0_15px_rgba(0,212,255,0.1)]'
                                    : 'bg-[#111827] text-gray-400 border-transparent hover:border-[#00d4ff]/20 hover:text-gray-200'
                                    }`}
                            >
                                {dest === 'all' ? 'All' : dest.charAt(0).toUpperCase() + dest.slice(1)}
                            </button>
                        ))}
                    </div>
                    <div className="relative">
                        <input
                            type="text"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            placeholder="Search guides and reviews..."
                            className="px-4 py-2.5 pl-10 bg-[#111827] text-white border border-[#1f2937] rounded-xl focus:outline-none focus:border-[#00d4ff]/50 focus:ring-1 focus:ring-[#00d4ff]/30 w-full sm:w-72 transition-all placeholder-gray-500"
                        />
                        <svg
                            className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                            />
                        </svg>
                    </div>
                </div>
            </section>

            {/* Category Filters */}
            <section className="py-4 px-4 bg-[#0a0e17] border-b border-[#00d4ff]/10">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-3 overflow-x-auto no-scrollbar pb-1">
                        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wider whitespace-nowrap flex-shrink-0">Content Type:</span>
                        <button
                            onClick={() => setCategoryFilter('all')}
                            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap flex-shrink-0 border ${categoryFilter === 'all'
                                ? 'bg-[#00d4ff]/10 text-[#00d4ff] border-[#00d4ff]/40 shadow-[0_0_10px_rgba(0,212,255,0.1)]'
                                : 'bg-[#111827] text-gray-400 border-transparent hover:border-[#00d4ff]/20'
                                }`}
                        >
                            All Categories
                        </button>
                        {BLOG_CATEGORIES.map((cat) => (
                            <button
                                key={cat.value}
                                onClick={() => setCategoryFilter(cat.value)}
                                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all whitespace-nowrap flex-shrink-0 flex items-center gap-1.5 border ${categoryFilter === cat.value
                                    ? 'bg-[#00d4ff]/10 text-[#00d4ff] border-[#00d4ff]/40 shadow-[0_0_10px_rgba(0,212,255,0.1)]'
                                    : 'bg-[#111827] text-gray-400 border-transparent hover:border-[#00d4ff]/20'
                                    }`}
                            >
                                <span>{cat.icon}</span>
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Blogs Grid */}
            <section className="py-12 px-4">
                <div className="max-w-7xl mx-auto">
                    {loading ? (
                        <div className="text-center py-12 text-[#8fa0ba]">Loading...</div>
                    ) : filteredBlogs.length === 0 ? (
                        <div className="text-center py-20 bg-[#0a0e17] rounded-2xl border border-[#1f2937] shadow-xl">
                            <div className="text-6xl mb-6 opacity-80">📝</div>
                            <p className="text-[#8fa0ba] text-xl font-medium mb-2">No blogs found</p>
                            <p className="text-gray-500">Try adjusting your filters or search</p>
                        </div>
                    ) : (
                        <BlogInteractionsProvider blogIds={filteredBlogs.map(b => b.id)}>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {filteredBlogs.map((blog) => (
                                    <BlogCard key={blog.id} blog={blog} />
                                ))}
                            </div>
                        </BlogInteractionsProvider>
                    )}

                    {/* Affiliate Products Section */}
                    <div className="mt-16 pt-12 border-t border-[#1f2937]">
                        <AffiliateProducts destination={filter !== 'all' ? filter : undefined} limit={4} />
                    </div>
                </div>
            </section>

            {/* Bottom Navigation Breadcrumbs */}
            <div className="max-w-7xl mx-auto px-4 pb-20 mt-8">
                <div className="flex items-center justify-between pt-8 border-t border-[#1f2937]">
                    <Link href="/" className="text-sm font-bold text-[#00d4ff] hover:text-[#00b0d6] transition-colors flex items-center gap-2">
                        ← Back to Home
                    </Link>
                    <nav className="flex items-center gap-2 text-xs text-gray-500 font-medium">
                        <Link href="/" className="hover:text-[#00d4ff]">Home</Link>
                        <span className="text-[#1f2937]">/</span>
                        <span>Guides & Reviews</span>
                    </nav>
                </div>
            </div>

            <BackToTop />
        </main>
    );
}
