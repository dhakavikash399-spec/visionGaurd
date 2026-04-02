import { Metadata } from 'next';
import BlogCard from '@/components/BlogCard';
import { blogPosts, blogCategories } from '@/lib/data';

export const metadata: Metadata = {
    title: 'Blog - Security Camera Reviews & Guides',
    description: 'Expert articles on security cameras, video doorbells, smart home integration, and home security tips from verified professionals.',
};

export default function BlogsPage() {
    return (
        <div className="min-h-screen pt-24 pb-20 px-4">
            {/* Hero */}
            <div className="max-w-7xl mx-auto mb-16">
                <div className="text-center mb-12">
                    <div className="inline-flex items-center gap-2 glass px-4 py-1.5 rounded-full text-sm mb-6">
                        <span className="text-[#00d4ff]">📝</span>
                        <span className="text-[#94a3b8]">{blogPosts.length} Articles Published</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                        Security <span className="gradient-text">Blog</span>
                    </h1>
                    <p className="text-[#94a3b8] text-lg max-w-2xl mx-auto">
                        Expert reviews, buying guides, installation tutorials, and the latest in smart home security technology.
                    </p>
                </div>

                {/* Categories */}
                <div className="flex flex-wrap gap-3 justify-center mb-12">
                    <button className="px-4 py-2 rounded-lg bg-gradient-to-r from-[#00d4ff] to-[#10b981] text-[#0a0e17] text-sm font-bold">
                        All Posts
                    </button>
                    {blogCategories.map((cat) => (
                        <button
                            key={cat.id}
                            className="px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] text-[#94a3b8] text-sm font-medium hover:text-[#00d4ff] hover:border-[rgba(0,212,255,0.3)] transition-all"
                        >
                            {cat.icon} {cat.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Blog Grid */}
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {blogPosts.map((blog, index) => (
                        <BlogCard key={blog.id} blog={blog} priority={index === 0} />
                    ))}
                </div>

                {/* If no blogs */}
                {blogPosts.length === 0 && (
                    <div className="text-center py-20">
                        <div className="text-6xl mb-4">📝</div>
                        <h3 className="text-xl font-bold text-white mb-2">No articles yet</h3>
                        <p className="text-[#64748b]">Check back soon for expert security reviews and guides.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
