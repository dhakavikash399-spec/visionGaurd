import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | VisionGuard',
    description: 'Learn how VisionGuard collects, uses, and protects your data.',
    alternates: {
        canonical: '/privacy-policy/',
    },
    openGraph: {
        url: '/privacy-policy/',
        title: 'Privacy Policy | VisionGuard',
        description: 'Learn how VisionGuard collects, uses, and protects your data.',
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

export default function PrivacyPolicyLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}
