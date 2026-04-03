import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Terms of Service | VisionGuard',
    description: 'Read the terms and conditions for using VisionGuard services.',
    alternates: {
        canonical: '/terms-of-service/',
    },
    openGraph: {
        url: '/terms-of-service/',
        title: 'Terms of Service | VisionGuard',
        description: 'Read the terms and conditions for using VisionGuard services.',
        siteName: 'VisionGuard',
        type: 'website',
        images: [
            {
                url: '/VisionGuard_logo.webp',
                width: 512,
                height: 512,
                alt: 'VisionGuard Logo',
            },
        ],
    },
};

export default function TermsOfServiceLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
