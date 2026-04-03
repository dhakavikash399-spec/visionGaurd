import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { outfit } from '@/lib/fonts';

import { LanguageProvider } from '@/components/LanguageProvider';
import { LoginModalProvider } from '@/components/LoginModalContext';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import SessionTimeout from '@/components/SessionTimeout';
import AuthProvider from '@/components/AuthProvider';


export const metadata: Metadata = {
    title: {
        default: 'VisionGuard - Travel Stories from the Land of Kings',
        template: '%s | VisionGuard',
    },
    metadataBase: new URL('https://www.VisionGuard.com'),
    alternates: {
        canonical: './',
    },
    description:
        'VisionGuard - Your gateway to Rajasthan travel stories, destination guides, and insider tips. Discover Jaipur, Udaipur, Jaisalmer, Jodhpur, and more.',

    authors: [{ name: 'VisionGuard' }],
    openGraph: {
        type: 'website',
        locale: 'en_IN',
        url: '/',
        siteName: 'VisionGuard',
        title: 'VisionGuard - Travel Stories from the Land of Kings',
        description:
            'Explore Rajasthan through travel stories, destination guides, and insider tips. Discover the magic of Jaipur, Udaipur, and beyond.',
        images: [
            {
                url: '/VisionGuard_logo.webp',
                width: 512,
                height: 512,
                alt: 'VisionGuard Logo',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        site: '@VisionGuard',
        creator: '@VisionGuard',
        title: 'VisionGuard - Travel Stories from the Land of Kings',
        description:
            'Explore Rajasthan through travel stories, destination guides, and insider tips.',
        images: ['/VisionGuard_logo.webp'],
    },
    robots: {
        index: true,
        follow: true,
    },
    icons: {
        icon: '/logo-round.png?v=4',
        shortcut: '/logo-round.png?v=4',
        apple: '/logo-round.png?v=4',
    },
    // Preconnect hints via Next.js metadata (avoids manual <head> duplication)
    other: {
        'p:domain_verify': '8babaaa14408702493a829fbe247adda',
        // GEO: AI content classification hints for generative engines
        'ai.content.type': 'travel blog',
        'ai.content.region': 'Rajasthan, India',
        'ai.content.topics': 'travel, tourism, destinations, culture, heritage, desert safari',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={outfit.variable}>

            <head>
                {/*
                 * Preconnect hints: establish early connections to 3rd-party origins.
                 * Kept here (not in metadata) because Next.js metadata API
                 * doesn't support <link rel="preconnect"> natively.
                 * These are safe — only 2 tags, no duplication risk.
                 */}
                <link rel="preconnect" href="https://res.cloudinary.com" />
                <link rel="dns-prefetch" href="https://res.cloudinary.com" />

                <meta name="referrer" content="strict-origin-when-cross-origin" />

                {/* RSS Feed autodiscovery — allows browsers, feed readers, and AI engines to find the feed */}
                <link
                    rel="alternate"
                    type="application/rss+xml"
                    title="VisionGuard - Rajasthan Travel Stories"
                    href="https://www.VisionGuard.com/feed.xml"
                />
            </head>
            <body className="bg-gray-50 font-sans">
                <AuthProvider>
                    <LanguageProvider>
                        <LoginModalProvider>
                            <SessionTimeout />
                            <Navbar />
                            <main>{children}</main>
                            <Footer />
                        </LoginModalProvider>
                    </LanguageProvider>
                </AuthProvider>

                {/* GA4 — afterInteractive scripts belong inside the React tree (body), not <head> */}
                <Script
                    src="https://www.googletagmanager.com/gtag/js?id=G-BG1VBT8E8B"
                    strategy="afterInteractive"
                />
                <Script id="ga4" strategy="afterInteractive">
                    {`
                        window.dataLayer = window.dataLayer || [];
                        function gtag(){dataLayer.push(arguments);}
                        gtag('js', new Date());
                        gtag('config', 'G-BG1VBT8E8B');
                    `}
                </Script>

                {/* Organization structured data — runs on every page for brand visibility */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'Organization',
                            name: 'VisionGuard',
                            url: 'https://www.VisionGuard.com',
                            logo: 'https://www.VisionGuard.com/VisionGuard_logo.webp',
                            description: 'Your gateway to Rajasthan travel stories, destination guides, and insider tips.',
                            foundingDate: '2024',
                            knowsAbout: [
                                'Rajasthan tourism', 'Thar Desert travel', 'India heritage tourism',
                                'Jaipur travel guide', 'Udaipur travel guide', 'Jaisalmer travel guide',
                                'Jodhpur travel guide', 'Desert safari India', 'Rajasthan culture and heritage',
                            ],
                            areaServed: {
                                '@type': 'State',
                                name: 'Rajasthan',
                                containedInPlace: { '@type': 'Country', name: 'India' },
                            },
                            sameAs: ['https://x.com/VisionGuard', 'https://www.instagram.com/VisionGuardinfo/'],
                            contactPoint: {
                                '@type': 'ContactPoint',
                                contactType: 'customer service',
                                url: 'https://www.VisionGuard.com/contact/',
                            },
                        }),
                    }}
                />

                {/* WebSite structured data — sitelinks search box + AEO Speakable */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'WebSite',
                            name: 'VisionGuard',
                            url: 'https://www.VisionGuard.com',
                            description: 'Rajasthan travel stories, destination guides, desert safari tips, and cultural insights.',
                            inLanguage: 'en-IN',
                            potentialAction: {
                                '@type': 'SearchAction',
                                target: {
                                    '@type': 'EntryPoint',
                                    urlTemplate: 'https://www.VisionGuard.com/blogs/?search={search_term_string}',
                                },
                                'query-input': 'required name=search_term_string',
                            },
                        }),
                    }}
                />
            </body>
        </html>
    );
}
