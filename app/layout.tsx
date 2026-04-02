import type { Metadata } from 'next';
import './globals.css';
import { inter } from '@/lib/fonts';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Providers from '@/components/Providers';

export const metadata: Metadata = {
    metadataBase: new URL('https://www.visionguard.in'),
    title: {
        default: 'VisionGuard - Smart Security Camera & Doorbell Reviews',
        template: '%s | VisionGuard',
    },
    description:
        'VisionGuard — Your trusted source for security camera reviews, video doorbell comparisons, smart home guides, and expert product recommendations.',
    keywords: ['security cameras', 'video doorbells', 'smart home security', 'camera reviews', 'home security', 'doorbell camera'],
    authors: [{ name: 'VisionGuard' }],
    openGraph: {
        type: 'website',
        locale: 'en_IN',
        url: '/',
        siteName: 'VisionGuard',
        title: 'VisionGuard - Smart Security Camera & Doorbell Reviews',
        description:
            'Your trusted source for security camera reviews, video doorbell comparisons, and expert smart home recommendations.',
        images: [
            {
                url: '/og-image.png',
                width: 1200,
                height: 630,
                alt: 'VisionGuard - Smart Home Security',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: 'VisionGuard - Smart Security Camera & Doorbell Reviews',
        description: 'Expert reviews, comparisons, and guides for security cameras and video doorbells.',
    },
    robots: { index: true, follow: true },
    icons: {
        icon: '/favicon.ico',
    },
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en" className={inter.variable}>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            <body className="bg-[#0a0e17] font-sans antialiased">
                <Providers>
                    <Navbar />
                    <main className="min-h-screen">{children}</main>
                    <Footer />
                </Providers>

                {/* Organization Schema */}
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{
                        __html: JSON.stringify({
                            '@context': 'https://schema.org',
                            '@type': 'Organization',
                            name: 'VisionGuard',
                            url: 'https://www.visionguard.in',
                            description: 'Expert reviews, comparisons, and guides for security cameras and video doorbells.',
                            knowsAbout: [
                                'security cameras', 'video doorbells', 'smart home security',
                                'home security systems', 'CCTV cameras', 'smart locks',
                            ],
                        }),
                    }}
                />
            </body>
        </html>
    );
}
