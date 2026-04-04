'use client';

import Link from 'next/link';
import type { BlogPost } from '@/lib/data';
import { useState, useEffect } from 'react';

import LikeButton from './LikeButton';
import CommentButton from './CommentButton';
import ShareButton from './ShareButton';

interface BlogCardProps {
    blog: BlogPost;
    priority?: boolean;
}

export default function BlogCard({ blog, priority = false }: BlogCardProps) {
    const title = blog.title_en;
    const excerpt = blog.excerpt_en;

    const date = new Date(blog.publishedAt || blog.created_at || new Date()).toLocaleDateString(
        'en-US',
        { month: 'short', day: 'numeric', year: 'numeric' }
    );

    return (
        <div className="group bg-[#0a0e17] rounded-2xl overflow-hidden shadow-[0_0_15px_rgba(0,0,0,0.5)] hover:shadow-[0_0_25px_rgba(0,212,255,0.15)] transition-all duration-500 relative flex flex-col h-full border border-[#1f2937] hover:border-[#00d4ff]/30">
            {/* Main Navigation Link (Absolute overlay excluding bottom bar) */}
            <Link
                href={`/blogs/${blog.slug || blog.id}/`}
                className="absolute inset-0 z-0"
                aria-label={`Read ${title}`}
            />

            {/* Content Container */}
            <div className="flex-1 flex flex-col z-10 pointer-events-none">
                <div className="h-56 relative overflow-hidden">
                    {/* Direct img tag for SEO — Google indexes Cloudinary URLs directly */}
                    <img
                        src={blog.coverImage}
                        alt={title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading={priority ? 'eager' : 'lazy'}
                        {...(priority ? { fetchPriority: 'high' as any } : {})}
                        decoding="async"
                    />
                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-[#00d4ff]/20 backdrop-blur-md border border-[#00d4ff]/30 text-[#00d4ff] text-[10px] font-bold uppercase rounded-full shadow-[0_0_10px_rgba(0,212,255,0.2)]">
                            {blog.category}
                        </span>
                    </div>
                </div>

                <div className="p-5 flex-1 flex flex-col">
                    <div className="flex items-center gap-2 text-[#8fa0ba] text-xs mb-3">
                        <span>{date}</span>
                        <span>•</span>
                        <span>{blog.readTime || '5 min'}</span>
                    </div>

                    <h3 className="text-xl font-bold mb-3 text-white line-clamp-2 leading-tight group-hover:text-[#00d4ff] transition-colors drop-shadow-sm">
                        {title}
                    </h3>

                    <p className="text-[#8fa0ba] text-sm line-clamp-3 mb-4 leading-relaxed font-light">
                        {excerpt}
                    </p>
                </div>
            </div>

            {/* Interaction Bar (Bottom - Clickable) */}
            <div
                className="relative z-20 px-5 pt-0 pb-5 flex items-center justify-between mt-auto border-t border-[#1f2937]/50 pt-4 pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-[#111827] border border-[#1f2937]">
                        {blog.author.avatar ? (
                            <img
                                src={blog.author.avatar}
                                alt={blog.author.name}
                                width={32}
                                height={32}
                                className="object-cover"
                                loading="lazy"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center text-xs font-bold text-[#8fa0ba]">
                                {blog.author.name.charAt(0)}
                            </div>
                        )}
                    </div>
                    <span className="font-bold text-gray-300 text-xs">{blog.author.name}</span>
                </div>

                <div className="flex items-center gap-4">
                    <LikeButton blogId={blog.id} variant="compact" />
                    <CommentButton blogId={blog.id} slug={blog.slug} variant="compact" />
                    <ShareButton
                        title={title}
                        text={excerpt || title}
                        url={`https://VisionGuard.com/blogs/${blog.slug || blog.id}`}
                        compact={true}
                    />

                </div>
            </div>
        </div>
    );
}
