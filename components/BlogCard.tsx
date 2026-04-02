'use client';

import Link from 'next/link';
import type { BlogPost } from '@/lib/data';

interface BlogCardProps {
    blog: BlogPost;
    priority?: boolean;
}

export default function BlogCard({ blog, priority = false }: BlogCardProps) {
    const date = new Date(blog.publishedAt).toLocaleDateString('en-US', {
        month: 'short', day: 'numeric', year: 'numeric',
    });

    const categoryColors: Record<string, string> = {
        reviews: 'from-[#f59e0b] to-[#ef4444]',
        guides: 'from-[#00d4ff] to-[#3b82f6]',
        installation: 'from-[#10b981] to-[#06b6d4]',
        'smart-home': 'from-[#8b5cf6] to-[#ec4899]',
        'security-tips': 'from-[#ef4444] to-[#f97316]',
        comparisons: 'from-[#3b82f6] to-[#8b5cf6]',
        news: 'from-[#06b6d4] to-[#10b981]',
        diy: 'from-[#f97316] to-[#f59e0b]',
    };

    return (
        <div className="group glass-card overflow-hidden flex flex-col h-full">
            <Link href={`/blogs/${blog.slug}`} className="block">
                {/* Image */}
                <div className="h-52 relative overflow-hidden rounded-t-[1rem]">
                    <div className="absolute inset-0 bg-gradient-to-br from-[#0f172a] to-[#1e293b]">
                        <div className="absolute inset-0 bg-gradient-to-br from-[rgba(0,212,255,0.15)] to-[rgba(16,185,129,0.1)] flex items-center justify-center">
                            <svg className="w-16 h-16 text-[rgba(0,212,255,0.3)] group-hover:text-[rgba(0,212,255,0.5)] transition-colors duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                            </svg>
                        </div>
                    </div>

                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 bg-gradient-to-r ${categoryColors[blog.category] || 'from-[#00d4ff] to-[#10b981]'} text-white text-[10px] font-bold uppercase rounded-full shadow-lg`}>
                            {blog.category.replace(/-/g, ' ')}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-[#64748b] text-xs mb-3">
                        <span>{date}</span>
                        <span className="w-1 h-1 rounded-full bg-[#334155]" />
                        <span>{blog.readTime}</span>
                    </div>

                    <h3 className="text-lg font-bold mb-3 text-white line-clamp-2 leading-tight group-hover:text-[#00d4ff] transition-colors duration-300">
                        {blog.title}
                    </h3>

                    <p className="text-[#94a3b8] text-sm line-clamp-3 mb-4 leading-relaxed">
                        {blog.excerpt}
                    </p>
                </div>
            </Link>

            {/* Author Bar */}
            <div className="px-5 pb-5 pt-0 flex items-center justify-between mt-auto">
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#10b981] flex items-center justify-center text-xs font-bold text-[#0a0e17]">
                        {blog.author.name.charAt(0)}
                    </div>
                    <span className="font-medium text-[#94a3b8] text-xs">{blog.author.name}</span>
                </div>
                <Link href={`/blogs/${blog.slug}`} className="text-[#00d4ff] text-xs font-semibold hover:text-[#10b981] transition-colors flex items-center gap-1">
                    Read More
                    <svg className="w-3 h-3 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </Link>
            </div>
        </div>
    );
}
