import { Metadata } from 'next';
import { fetchProducts, fetchPublishedBlogs } from '@/lib/db/queries';
import SecurityHomePageClient from './SecurityHomePageClient';

export const metadata: Metadata = {
    title: 'Home Security & CCTV Cameras | VisionGuard',
    description:
        'Discover CCTV cameras, smart home security, and surveillance systems. Read buying guides, security tips, and product reviews—then check prices via affiliate links.',
    alternates: {
        canonical: '/',
    },
    other: {
        keywords: 'CCTV, home security, surveillance, security cameras, smart home security, AI detection, night vision',
    },
};

// Revalidate homepage every 60 seconds (ISR) — fast for repeat visitors, fresh content
export const revalidate = 60;

export default async function HomePage() {
    // Fetch data on the server — this HTML is what Google sees
    let [products, blogs] = await Promise.all([
        fetchProducts().catch(() => []),
        fetchPublishedBlogs(9).catch(() => []),
    ]);

    // ** DUMMY DATA FALLBACK **
    if (!products || products.length === 0) {
        products = [
            {
                id: 'dummy-1', name: 'VisionGuard 4K Ultra Pro', category: 'outdoor cameras', brand: 'VisionGuard',
                price: '$199.99', originalPrice: '$249.99', affiliateLink: 'https://example.com',
                imageUrl: '/hero-surveillance-home.png', description: 'Experience pure ultra-HD with the VisionGuard 4K Ultra Pro.',
                features: ['4K resolution', 'Night Vision', 'Solar Powered']
            },
            {
                id: 'dummy-2', name: 'Smart Doorbell Plus', category: 'doorbell cameras', brand: 'SecureHome',
                price: '$99.99', originalPrice: '$129.99', affiliateLink: 'https://example.com',
                imageUrl: '/hero-surveillance-home.png', description: 'See who is at exactly your door, anytime and anywhere.',
                features: ['1080p Video', 'Two-Way Talk', 'Motion Zones']
            },
            {
                id: 'dummy-3', name: 'Invisible Indoor Mini', category: 'indoor cameras', brand: 'VisionGuard',
                price: '$49.99', originalPrice: '$69.99', affiliateLink: 'https://example.com',
                imageUrl: '/hero-surveillance-home.png', description: 'Discreet indoor monitoring to protect what matters internally.',
                features: ['Miniature Size', 'Cloud Storage']
            }
        ] as any[];
    }

    if (!blogs || blogs.length === 0) {
        blogs = [
            {
                id: 'b1', title_en: 'How to Choose the Best Outdoor Camera', category: 'guides', excerpt_en: 'A complete guide to outdoor cameras for 2026. What you should know before buying an outdoor camera system.',
                slug: 'best-outdoor-camera', coverImage: '/hero-surveillance-home.png', author: { name: 'VisionGuard Editor' }, publishedAt: new Date().toISOString()
            },
            {
                id: 'b2', title_en: 'VisionGuard 4K Ultra Review', category: 'reviews', excerpt_en: 'Is the 4K Ultra worth the price tag? We put it through rigorous testing to uncover its true capabilities.',
                slug: 'visionguard-4k-review', coverImage: '/hero-surveillance-home.png', author: { name: 'VisionGuard Experts' }, publishedAt: new Date().toISOString()
            },
            {
                id: 'b3', title_en: '5 Tips to Secure Your Wi-Fi Network', category: 'security-tips', excerpt_en: 'Stop hackers from accessing your cameras with these simple steps. Basic cyber-hygiene goes a long way.',
                slug: 'wifi-security-tips', coverImage: '/hero-surveillance-home.png', author: { name: 'Security Analyst' }, publishedAt: new Date().toISOString()
            }
        ] as any[];
    }

    // BreadcrumbList schema — root breadcrumb
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
        ],
    };

    const homepageJsonLd = {
        '@context': 'https://schema.org',
        '@type': 'WebPage',
        name: 'Home Security & CCTV Cameras | VisionGuard',
        description:
            'A home security and surveillance platform for CCTV cameras, smart home security systems, and surveillance solutions.',
        url: 'https://www.VisionGuard.com/',
        inLanguage: 'en-IN',
        isPartOf: {
            '@type': 'WebSite',
            name: 'VisionGuard',
            url: 'https://www.VisionGuard.com'
        },
        about: {
            '@type': 'ComputerAndInternetTechnology',
            name: 'Home security & surveillance',
        },
        mainEntity: {
            '@type': 'Service',
            name: 'Home Security Guides & Camera Comparisons',
            description: 'Buying guides, product reviews, and feature comparisons for CCTV and smart security devices.',
        },
        // AEO: Speakable — voice assistants read the hero headline
        speakable: {
            '@type': 'SpeakableSpecification',
            cssSelector: ['h1.hero-headline', 'meta[name="description"]']
        },
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(homepageJsonLd) }}
            />
            <SecurityHomePageClient products={products} blogs={blogs} />
        </>
    );
}
