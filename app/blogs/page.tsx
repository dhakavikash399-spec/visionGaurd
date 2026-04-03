import { Suspense } from 'react';
import { fetchPublishedBlogs, fetchAvailableDestinations } from '@/lib/db/queries';
import BlogsClient from './BlogsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Travel Blogs | VisionGuard',
    description: 'Read the latest travel stories, guides, and tips from Rajasthan. Explore diverse destinations and cultural insights.',
    alternates: {
        canonical: '/blogs/',
    },
    openGraph: {
        title: 'Travel Blogs - Rajasthan Travel Stories | VisionGuard',
        description: 'Discover Rajasthan through authentic travel stories and guides. From Jaipur to Jaisalmer, explore the land of kings.',
        url: '/blogs/',
        siteName: 'VisionGuard',
        locale: 'en_IN',
        type: 'website',
        images: [
            {
                url: '/images/rajasthan-desert-hero.webp',
                width: 1200,
                height: 630,
                alt: 'VisionGuard Travel Blogs',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Travel Blogs | VisionGuard',
        description: 'Read the latest travel stories and guides from across Rajasthan.',
        images: ['/images/rajasthan-desert-hero.webp'],
    },
};

// Revalidate interval (configurable via env)
export const revalidate = parseInt(process.env.REVALIDATE_SECONDS || '60', 10);

export default async function BlogsPage() {
    // 1. Fetch data on the server
    const blogs = await fetchPublishedBlogs();
    const destinations = await fetchAvailableDestinations();

    // ItemList structured data — helps Google understand this is a blog index
    const itemListJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Travel Blogs | VisionGuard',
        description: 'Read the latest travel stories, guides, and tips from Rajasthan.',
        url: 'https://www.VisionGuard.com/blogs/',
        mainEntity: {
            '@type': 'ItemList',
            numberOfItems: blogs.length,
            itemListElement: blogs.slice(0, 30).map((blog, index) => ({
                '@type': 'ListItem',
                position: index + 1,
                name: blog.title_en,
                url: `https://www.VisionGuard.com/blogs/${blog.slug || blog.id}/`,
            })),
        },
    };

    // BreadcrumbList schema — shows breadcrumb trail in Google search results
    const breadcrumbJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: 'https://www.VisionGuard.com/',
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Travel Blogs',
                item: 'https://www.VisionGuard.com/blogs/',
            },
        ],
    };

    // 2. Pass data to the Client Component
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <Suspense fallback={<div className="text-center py-12">Loading...</div>}>
                <BlogsClient initialBlogs={blogs} destinations={destinations} />
            </Suspense>
        </>
    );
}
