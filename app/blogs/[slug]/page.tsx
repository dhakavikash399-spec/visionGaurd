import { Metadata } from 'next';
import Link from 'next/link';
import { blogPosts } from '@/lib/data';
import { notFound } from 'next/navigation';

interface BlogPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: BlogPageProps): Promise<Metadata> {
    const { slug } = await params;
    const blog = blogPosts.find((b) => b.slug === slug);
    if (!blog) return { title: 'Blog Not Found' };

    return {
        title: blog.title,
        description: blog.excerpt,
    };
}

export async function generateStaticParams() {
    return blogPosts.map((blog) => ({ slug: blog.slug }));
}

export default async function BlogDetailPage({ params }: BlogPageProps) {
    const { slug } = await params;
    const blog = blogPosts.find((b) => b.slug === slug);

    if (!blog) notFound();

    const date = new Date(blog.publishedAt).toLocaleDateString('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    const relatedBlogs = blogPosts.filter((b) => b.id !== blog.id && b.category === blog.category).slice(0, 3);

    return (
        <article className="min-h-screen pt-24 pb-20 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Breadcrumb */}
                <nav className="flex items-center gap-2 text-sm text-[#64748b] mb-8">
                    <Link href="/" className="hover:text-[#00d4ff] transition-colors">Home</Link>
                    <span>/</span>
                    <Link href="/blogs" className="hover:text-[#00d4ff] transition-colors">Blog</Link>
                    <span>/</span>
                    <span className="text-[#94a3b8] truncate">{blog.title}</span>
                </nav>

                {/* Header */}
                <header className="mb-10">
                    <span className="inline-block px-3 py-1 bg-gradient-to-r from-[#00d4ff] to-[#10b981] text-[#0a0e17] text-xs font-bold uppercase rounded-full mb-4">
                        {blog.category.replace(/-/g, ' ')}
                    </span>

                    <h1 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                        {blog.title}
                    </h1>

                    <div className="flex items-center gap-4 flex-wrap">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#10b981] flex items-center justify-center text-sm font-bold text-[#0a0e17]">
                                {blog.author.name.charAt(0)}
                            </div>
                            <div>
                                <p className="text-white font-semibold text-sm">{blog.author.name}</p>
                                <p className="text-[#64748b] text-xs">{blog.author.bio}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 text-[#64748b] text-sm">
                            <span>{date}</span>
                            <span className="w-1 h-1 rounded-full bg-[#334155]" />
                            <span>{blog.readTime} read</span>
                        </div>
                    </div>
                </header>

                {/* Cover Image Placeholder */}
                <div className="w-full h-64 md:h-96 rounded-2xl mb-10 bg-gradient-to-br from-[#0f172a] to-[#1e293b] border border-[rgba(0,212,255,0.1)] overflow-hidden relative">
                    <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,212,255,0.1)] to-[rgba(16,185,129,0.05)] flex items-center justify-center">
                        <svg className="w-24 h-24 text-[rgba(0,212,255,0.2)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    </div>
                </div>

                {/* Content */}
                <div className="prose max-w-none mb-16">
                    <p className="text-lg leading-relaxed text-[#cbd5e1]">{blog.excerpt}</p>
                    <div dangerouslySetInnerHTML={{ __html: blog.content }} />

                    {/* Placeholder content for demo */}
                    <h2>Why This Matters</h2>
                    <p>Home security is evolving rapidly, with new AI-powered features being introduced every quarter. Choosing the right equipment can mean the difference between a well-protected home and a false sense of security.</p>

                    <h2>Key Takeaways</h2>
                    <ul>
                        <li>Always prioritize video resolution of at least 1080p for clear identification</li>
                        <li>Look for cameras with local storage options to avoid monthly cloud fees</li>
                        <li>Night vision capability is essential — color night vision is even better</li>
                        <li>Consider weather resistance (IP65+) for outdoor installations</li>
                        <li>Two-way audio lets you communicate with visitors remotely</li>
                    </ul>

                    <blockquote>
                        &ldquo;The best security camera is the one that fits your specific needs and budget. There is no one-size-fits-all solution.&rdquo;
                        <br />— VisionGuard Team
                    </blockquote>

                    <h2>Final Verdict</h2>
                    <p>After extensive testing, we believe the products featured in this article represent the best options available in their respective price ranges. Whether you are a first-time buyer or upgrading your existing system, these picks will serve you well.</p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-12">
                    {blog.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 text-xs bg-[rgba(0,212,255,0.06)] border border-[rgba(0,212,255,0.1)] text-[#94a3b8] rounded-full"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                {/* Share */}
                <div className="glass-card p-6 mb-12" style={{ transform: 'none' }}>
                    <h3 className="text-lg font-bold text-white mb-3">Share this article</h3>
                    <div className="flex gap-3">
                        {['Twitter', 'Facebook', 'LinkedIn', 'WhatsApp'].map((platform) => (
                            <button
                                key={platform}
                                className="px-4 py-2 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] text-[#94a3b8] text-sm hover:text-[#00d4ff] hover:border-[rgba(0,212,255,0.3)] transition-all"
                            >
                                {platform}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Related Posts */}
                {relatedBlogs.length > 0 && (
                    <section>
                        <h3 className="text-2xl font-bold text-white mb-6">Related Articles</h3>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {relatedBlogs.map((related) => (
                                <Link
                                    key={related.id}
                                    href={`/blogs/${related.slug}`}
                                    className="glass-card p-5 group"
                                >
                                    <span className="text-xs text-[#00d4ff] font-semibold uppercase">{related.category.replace(/-/g, ' ')}</span>
                                    <h4 className="text-white font-bold mt-2 line-clamp-2 group-hover:text-[#00d4ff] transition-colors">
                                        {related.title}
                                    </h4>
                                    <p className="text-[#64748b] text-sm mt-2">{related.readTime}</p>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </article>
    );
}
