'use client';

import dynamic from 'next/dynamic';
import Image from 'next/image';
import Link from 'next/link';
import { Suspense, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import LikeButton, { LikeCount } from '@/components/LikeButton';
import CommentButton from '@/components/CommentButton';
import ShareButton from '@/components/ShareButton';
import type { BlogPost } from '@/lib/data';
import BackToTop from '@/components/BackToTop';
import TableOfContents from '@/components/TableOfContents';
import { TocHeading } from '@/lib/blog-utils';
import CommentScroller from './CommentScroller';
import ComparisonTable from '@/components/ComparisonTable';
import type { AffiliateProduct } from '@/lib/db/queries/products';


// Lazy load heavy below-the-fold components
const AuthorBox = dynamic(() => import('./AuthorBox'), {
    loading: () => <div className="animate-pulse h-48 bg-gray-50 rounded-2xl mb-12"></div>
});

const CommentSection = dynamic(() => import('@/components/CommentSection'), {
    loading: () => <div className="mt-12 pt-8 border-t border-gray-100 animate-pulse"><div className="h-64 bg-gray-100 rounded-2xl"></div></div>,
    ssr: false, // Don't render on server since it requires client-side auth
});

const AffiliateProducts = dynamic(() => import('@/components/AffiliateProducts'), {
    loading: () => <div className="animate-pulse"><div className="h-32 bg-gray-100 rounded-xl"></div></div>,
    ssr: true,
});

const RelatedReads = dynamic(() => import('@/components/RelatedReads'), {
    loading: () => <div className="mt-12 pt-8 border-t border-gray-100 animate-pulse"><div className="h-48 bg-gray-100 rounded-2xl"></div></div>,
    ssr: true,
});

interface BlogContentProps {
    blog: BlogPost;
    relatedBlogs?: any[];
    initialContent: {
        en: { html: string; headings: TocHeading[] };
    };
    pros?: string[];
    cons?: string[];
    comparisonProducts?: AffiliateProduct[];
}


export default function BlogContent({
    blog,
    relatedBlogs = [],
    initialContent,
    pros = [],
    cons = [],
    comparisonProducts = [],
}: BlogContentProps) {
    const router = useRouter();

    // Intercept internal link clicks for fast SPA-like navigation
    useEffect(() => {
        const handleInternalLinks = (e: MouseEvent) => {
            const target = e.target as HTMLElement;
            const link = target.closest('a');

            if (link && link instanceof HTMLAnchorElement) {
                const href = link.getAttribute('href');
                const isInternal = href?.startsWith('/') || href?.includes(window.location.host);

                if (isInternal && !link.hasAttribute('target')) {
                    e.preventDefault();
                    const url = new URL(link.href);
                    router.push(url.pathname + url.search + url.hash);
                }
            }
        };

        document.addEventListener('click', handleInternalLinks);
        return () => document.removeEventListener('click', handleInternalLinks);
    }, [router]);

    // Track view — fire-and-forget, deduped per session
    useEffect(() => {
        const viewKey = `viewed_${blog.id}`;
        if (sessionStorage.getItem(viewKey)) return; // Already counted this session

        sessionStorage.setItem(viewKey, '1');
        fetch('/api/views', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ blogId: blog.id }),
        }).catch(() => { }); // Silent fail — views are not critical
    }, [blog.id]);

    // Ensure page opens from start (top) when navigating between blogs
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [blog.id]);

    const { html: content, headings } = initialContent.en;
    const title = blog.title_en;

    // Auto-play videos when they scroll into view, pause when out
    // Strategy: try unmuted → if blocked → muted → unmute after user interaction
    useEffect(() => {
        const videos = document.querySelectorAll<HTMLVideoElement>('.prose video, .blog-content video');
        if (videos.length === 0) return;

        let userHasInteracted = false;

        videos.forEach(video => {
            video.playsInline = true;
            video.setAttribute('playsinline', '');
        });

        // Try to play a video — unmuted first, muted fallback
        const tryPlay = (video: HTMLVideoElement) => {
            if (userHasInteracted) {
                // User has clicked on the page — browser allows unmuted autoplay
                video.muted = false;
                video.play().catch(() => { });
            } else {
                // First try unmuted
                video.muted = false;
                video.play().catch(() => {
                    // Browser blocked unmuted — fallback to muted
                    video.muted = true;
                    video.play().catch(() => { });
                });
            }
        };

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    const video = entry.target as HTMLVideoElement;
                    if (entry.isIntersecting) {
                        tryPlay(video);
                    } else {
                        video.pause();
                    }
                });
            },
            { threshold: 0.5 }
        );

        videos.forEach(video => observer.observe(video));

        // After ANY user click/tap, unmute all currently playing videos
        const handleUserInteraction = () => {
            userHasInteracted = true;
            videos.forEach(video => {
                if (!video.paused) {
                    video.muted = false;
                }
            });
            // Remove listener — only need it once
            document.removeEventListener('click', handleUserInteraction);
            document.removeEventListener('touchstart', handleUserInteraction);
        };

        document.addEventListener('click', handleUserInteraction, { once: true });
        document.addEventListener('touchstart', handleUserInteraction, { once: true });

        return () => {
            videos.forEach(video => observer.unobserve(video));
            observer.disconnect();
            document.removeEventListener('click', handleUserInteraction);
            document.removeEventListener('touchstart', handleUserInteraction);
        };
    }, [content]);

    const publishedDate = new Date(blog.publishedAt).toLocaleDateString('en-US', { dateStyle: 'long' });

    const isUpdated = blog.updated_at &&
        new Date(blog.updated_at).toLocaleDateString() !== new Date(blog.publishedAt).toLocaleDateString();

    const updatedDate = isUpdated
        ? new Date(blog.updated_at!).toLocaleDateString('en-US', { dateStyle: 'long' })
        : null;


    return (
        <article className="pt-28 pb-20 px-4 bg-transparent min-h-screen">
            {/* Suspense boundary for search params hook to prevent root bailout */}
            <Suspense fallback={null}>
                <CommentScroller />
            </Suspense>
            {/* Top Breadcrumbs */}
            <div className="max-w-4xl mx-auto mb-6">
                <nav className="flex items-center gap-2 text-sm text-[#8fa0ba] font-medium overflow-x-auto whitespace-nowrap pb-2 md:pb-0 no-scrollbar">
                    <Link href="/" className="hover:text-[#00d4ff] transition-colors flex items-center gap-1">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>
                        Home
                    </Link>
                    <span className="text-[#3a4760]">/</span>
                    <Link href="/blogs/" className="hover:text-[#00d4ff] transition-colors">Guides & Reviews</Link>

                    <span className="text-[#3a4760]">/</span>
                    <Link
                        href={`/products/?category=${encodeURIComponent(blog.destination)}`}
                        className="hover:text-[#00d4ff] transition-colors capitalize"
                    >
                        {blog.destination}
                    </Link>
                    <span className="text-[#3a4760]">/</span>
                    <span className="text-white truncate max-w-[200px]">{title}</span>
                </nav>
            </div>

            <div className="max-w-4xl mx-auto bg-[#0a0e17] rounded-3xl shadow-[0_0_40px_rgba(0,0,0,0.5)] overflow-hidden border border-[#1f2937]">
                {/* Cover Image */}
                <div className="h-[300px] md:h-[500px] relative">
                    <Image
                        src={blog.coverImage}
                        alt={title}
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, 1200px"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6 md:p-12 text-white w-full">
                        <span className="inline-block px-4 py-1 bg-gradient-to-r from-[#00d4ff] to-[#10b981] text-[#0a0e17] text-[10px] md:text-xs font-bold uppercase rounded-full mb-4 shadow-lg">
                            {blog.category}
                        </span>
                        <h1 className="text-2xl md:text-5xl font-bold mb-4 leading-tight font-outfit drop-shadow-md">{title}</h1>
                        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-xs md:text-sm opacity-90 font-medium">
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                {publishedDate}
                            </div>
                            {updatedDate && (
                                <div className="flex items-center gap-2 text-desert-gold font-bold">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                    </svg>
                                    Updated: {updatedDate}
                                </div>
                            )}

                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                {blog.readTime}
                            </div>
                            <div className="flex items-center gap-2">
                                <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                                    <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                </svg>
                                <span className="font-bold">
                                    <LikeCount blogId={blog.id} />
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-[#060a12] border-b border-[#1f2937] px-8 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <LikeButton blogId={blog.id} />
                        <CommentButton blogId={blog.id} slug={blog.slug} />
                        <ShareButton
                            title={title}
                            text={blog.excerpt_en || 'Check out this amazing blog from VisionGuard!'}
                        />
                    </div>

                    <div className="flex gap-2">
                        {/* Share buttons could go here */}
                    </div>
                </div>

                <div className="p-8 md:p-12">
                    {/* Author & Interactions */}
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 pb-8 border-b border-[#1f2937]">
                        {blog.author.slug ? (
                            <Link href={`/author/${blog.author.slug}/`} className="flex items-center gap-4 group">
                                <div className="w-12 h-12 bg-[#111827] rounded-full flex items-center justify-center text-xl overflow-hidden ring-2 ring-transparent group-hover:ring-[#00d4ff] transition-all">
                                    {blog.author.avatar ? (
                                        <Image
                                            src={blog.author.avatar}
                                            alt={blog.author.name}
                                            width={48}
                                            height={48}
                                            className="rounded-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-[#8fa0ba]">{blog.author.name.charAt(0)}</span>
                                    )}
                                </div>
                                <div>
                                    <p className="font-bold text-white group-hover:text-[#00d4ff] transition-colors">{blog.author.name}</p>
                                    <p className="text-sm text-[#8fa0ba]">Security Expert</p>
                                </div>
                            </Link>
                        ) : (
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-[#111827] rounded-full flex items-center justify-center text-xl overflow-hidden">
                                    {blog.author.avatar ? (
                                        <Image
                                            src={blog.author.avatar}
                                            alt={blog.author.name}
                                            width={48}
                                            height={48}
                                            className="rounded-full object-cover"
                                        />
                                    ) : (
                                        <span className="text-[#8fa0ba]">{blog.author.name.charAt(0)}</span>
                                    )}
                                </div>
                                <div>
                                    <p className="font-bold text-white">{blog.author.name}</p>
                                    <p className="text-sm text-[#8fa0ba]">Security Expert</p>
                                </div>
                            </div>
                        )}

                        {/* Likes Integration */}
                        <div className="flex items-center bg-[#111827] border border-[#1f2937] px-4 py-2 rounded-full self-start md:self-auto">
                            <LikeButton blogId={blog.id} />
                        </div>
                    </div>

                    {/* Table of Contents — helps Google show jump links in search results */}
                    <TableOfContents headings={headings} className="mb-8" />

                    {/* Body - Render HTML content */}
                    <div
                        className="prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={{ __html: content }}
                    />

                    {/* Pros / Cons */}
                    {(pros.length > 0 || cons.length > 0) && (
                        <div className="mt-12 bg-[#0a0e17] border border-white/10 rounded-2xl p-6">
                            <h2 className="text-2xl font-bold text-white mb-4">Pros & Cons</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {pros.length > 0 && (
                                    <div>
                                        <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                                            <span className="text-[#10b981]">✓</span> Pros
                                        </h3>
                                        <ul className="space-y-2">
                                            {pros.map((item) => (
                                                <li key={item} className="text-gray-200 text-sm leading-relaxed">
                                                    <span className="mr-2 text-[#10b981]">•</span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                {cons.length > 0 && (
                                    <div>
                                        <h3 className="text-white font-bold mb-3 flex items-center gap-2">
                                            <span className="text-[#f59e0b]">!</span> Cons
                                        </h3>
                                        <ul className="space-y-2">
                                            {cons.map((item) => (
                                                <li key={item} className="text-gray-200 text-sm leading-relaxed">
                                                    <span className="mr-2 text-[#f59e0b]">•</span>
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}

                    {/* Comparison Table */}
                    {comparisonProducts.length > 0 && (
                        <div className="mt-12">
                            <ComparisonTable
                                title="Product Comparison (Based on Features)"
                                products={comparisonProducts}
                            />
                        </div>
                    )}

                    {/* Author Box — Rich E-E-A-T signals */}
                    <AuthorBox author={blog.author} />


                    {/* Affiliate Products */}
                    <div className="mt-12 pt-8 border-t border-[#1f2937]">
                        <AffiliateProducts destination={blog.destination} limit={4} />
                    </div>

                    {/* Related Reads - You Can Also Read Section */}
                    {relatedBlogs.length > 0 && (
                        <RelatedReads blogs={relatedBlogs} />
                    )}

                    {/* Comments Section */}
                    <div id="comments-section" className="mt-10 border-t border-[#1f2937] pt-8">
                        <CommentSection blogId={blog.id} />
                    </div>
                </div>

                {/* Back to Blogs / Bottom Breadcrumbs */}
                <div className="px-8 pb-12 md:px-12 md:pb-16 bg-[#060a12] border-t border-[#1f2937]">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pt-12">
                        <Link
                            href={`/products/?category=${blog.destination}`}
                            className="inline-flex items-center gap-2 text-[#00d4ff] font-bold hover:text-white transition-colors capitalize"
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 15l-3-3m0 0l3-3m-3 3h8M3 12a9 9 0 1118 0 9 9 0 0118 0z" />
                            </svg>
                            Explore more {blog.destination}
                        </Link>

                        <nav className="flex items-center gap-2 text-xs text-[#8fa0ba] font-medium italic">
                            <Link href="/" className="hover:text-[#00d4ff]">Home</Link>
                            <span className="text-[#3a4760]">/</span>
                            <Link href="/blogs/" className="hover:text-[#00d4ff]">Blogs</Link>
                            <span className="text-[#3a4760]">/</span>
                            <span className="capitalize text-white">{blog.destination}</span>
                        </nav>
                    </div>
                </div>
            </div>

            {/* Premium Back to Top Button */}
            <BackToTop />
        </article >
    );
}

