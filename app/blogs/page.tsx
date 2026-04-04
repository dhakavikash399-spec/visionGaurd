import { Suspense } from 'react';
import { fetchPublishedBlogs, fetchAvailableDestinations } from '@/lib/db/queries';
import BlogsClient from './BlogsClient';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Guides & Reviews | VisionGuard',
    description:
        'Read the latest CCTV and home security buying guides, product reviews, and practical security tips.',
    alternates: {
        canonical: '/blogs/',
    },
    openGraph: {
        title: 'Guides & Reviews - CCTV & Home Security | VisionGuard',
        description:
            'Buying guides, product reviews, and security tips for CCTV cameras and smart home surveillance.',
        url: '/blogs/',
        siteName: 'VisionGuard',
        locale: 'en_IN',
        type: 'website',
        images: [
            {
                url: '/VisionGuard_logo.webp',
                width: 1200,
                height: 630,
                alt: 'VisionGuard Guides & Reviews',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'Guides & Reviews | VisionGuard',
        description: 'CCTV and home security buying guides, reviews, and tips.',
        images: ['/VisionGuard_logo.webp'],
    },
};

// Revalidate interval (configurable via env)
export const revalidate = 60;

export default async function BlogsPage() {
    // 1. Fetch data on the server
    const blogs = await fetchPublishedBlogs();
    const destinations = await fetchAvailableDestinations();

    // ItemList structured data — helps Google understand this is a blog index
    const itemListJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name: 'Guides & Reviews | VisionGuard',
        description: 'CCTV and home security buying guides, product reviews, and practical tips.',
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
                name: 'Guides & Reviews',
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
