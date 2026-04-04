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
import { ThemeProvider } from '@/components/ThemeProvider';


export const metadata: Metadata = {
    title: {
        default: 'VisionGuard - CCTV Cameras & Home Security',
        template: '%s | VisionGuard',
    },
    metadataBase: new URL('https://www.VisionGuard.com'),
    alternates: {
        canonical: './',
    },
    description:
        'VisionGuard is your gateway to CCTV cameras, smart home security, and home surveillance systems. Compare products and read expert buying guides.',

    authors: [{ name: 'VisionGuard' }],
    openGraph: {
        type: 'website',
        locale: 'en_IN',
        url: '/',
        siteName: 'VisionGuard',
        title: 'VisionGuard - CCTV Cameras & Home Security',
        description:
            'CCTV cameras, doorbell systems, and smart home security guides. Compare features, read reviews, and check affiliate pricing.',
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
        title: 'VisionGuard - CCTV Cameras & Home Security',
        description:
            'CCTV cameras and home security buying guides. Compare features and check prices via affiliate links.',
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
        'ai.content.type': 'home security blog',
        'ai.content.region': 'India',
        'ai.content.topics': 'cctv, home security, surveillance, smart home, doorbell cameras, ai detection, night vision',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={`${outfit.variable} dark`}>

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
                    title="VisionGuard - CCTV & Home Security Guides"
                    href="https://www.VisionGuard.com/feed.xml"
                />
            </head>
            <body className="bg-gray-50 dark:bg-[#0a0e17] text-gray-900 dark:text-gray-100 font-sans">
                <ThemeProvider>
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
                </ThemeProvider>

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
                            description: 'Your gateway to CCTV cameras, smart home security, and home surveillance buying guides.',
                            foundingDate: '2024',
                            knowsAbout: [
                                'CCTV cameras', 'home security systems', 'surveillance', 'smart home alerts', 'AI detection',
                                'night vision security', 'doorbell cameras', 'remote monitoring', 'smart home security'
                            ],
                            areaServed: {
                                '@type': 'State',
                                name: 'India',
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
                            description: 'CCTV camera buying guides, smart home security tips, and product reviews for surveillance systems.',
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
