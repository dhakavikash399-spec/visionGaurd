import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Contact Us | VisionGuard',
    description: "Have questions about Rajasthan? Want to share your travel story? Get in touch with the VisionGuard team. We'd love to hear from you.",
    alternates: {
        canonical: '/contact/',
    },
    openGraph: {
        title: 'Contact VisionGuard - Get in Touch',
        description: 'Connect with us for collaborations, travel tips, or to share your Rajasthan experiences.',
        url: '/contact/',
        siteName: 'VisionGuard',
        type: 'website',
        images: [
            {
                url: '/images/rajasthan-desert-hero.webp',
                width: 1200,
                height: 630,
                alt: 'Contact VisionGuard',
            },
        ],
    },
    twitter: {
        card: 'summary',
        title: 'Contact VisionGuard',
        description: "Reach out to us for anything related to Rajasthan travel.",
    },
};

export default function ContactLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
