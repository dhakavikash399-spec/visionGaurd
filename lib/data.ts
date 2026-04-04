import { ReactNode } from 'react';

// Static data and type definitions
export interface Author {
    id: string;
    name: string;
    email?: string;
    avatar?: string;
    bio?: string;
    slug?: string;
    website?: string;
    twitter?: string;
    instagram?: string;
    linkedin?: string;
    youtube?: string;
}

export interface BlogPost {
    id: string;
    title_en: string;
    title_hi: string;
    excerpt_en: string;
    excerpt_hi: string;
    content_en: string;
    content_hi: string;
    destination: string;
    category: string;
    coverImage: string;
    images?: string[];
    author: Author;
    readTime: string;
    publishedAt: string;
    status: 'pending' | 'approved' | 'rejected' | 'published';
    views: number;
    meta_title?: string;
    meta_description?: string;
    canonical_url?: string;
    slug?: string;
    created_at?: string;
    updated_at?: string;
}

export interface ProductCategory {
    id: string;
    name: string;
    description: string;
    icon: string | ReactNode;
    productCount: number;
}

export interface Destination {
    id: string;
    name_en: string;
    name_hi: string;
    tagline_en: string;
    tagline_hi: string;
    description_en: string;
    description_hi: string;
    coverImage: string;
    attractions: string[];
    bestTime: string;
    blogCount: number;
    imageCredits?: {
        name: string;
        url: string;
    };
}

export const destinations: Destination[] = [
    {
        id: 'security-cameras',
        name_en: 'Security Cameras',
        name_hi: 'सुरक्षा कैमरे',
        tagline_en: 'Keep your eyes everywhere',
        tagline_hi: 'चारों ओर नजर रखें',
        description_en: 'Discover the best indoor and outdoor security cameras to protect your home and business, featuring 4K resolution and night vision.',
        description_hi: 'अपने घर और व्यापार की सुरक्षा के लिए बेहतरीन कैमरे।',
        coverImage: '/hero-house.png',
        attractions: ['4K Resolution', 'Night Vision', 'Motion Detection', 'Cloud Storage'],
        bestTime: 'Year-round',
        blogCount: 24,
    },
    {
        id: 'smart-locks',
        name_en: 'Smart Locks',
        name_hi: 'स्मार्ट ताले',
        tagline_en: 'Keyless entry for modern homes',
        tagline_hi: 'आधुनिक घरों के लिए स्मार्ट सुरक्षा',
        description_en: 'Upgrade your doors with smart locks offering fingerprint, keypad, and remote access to enhance the security of your entries.',
        description_hi: 'फिंगरप्रिंट और कीपैड वाले आधुनिक ताले।',
        coverImage: '/logo-round.png',
        attractions: ['Fingerprint Access', 'App Control', 'Auto-Lock', 'Activity Logs'],
        bestTime: 'Year-round',
        blogCount: 18,
    },
    {
        id: 'alarm-systems',
        name_en: 'Alarm Systems',
        name_hi: 'अलार्म सिस्टम',
        tagline_en: 'Comprehensive property protection',
        tagline_hi: 'संपत्ति की पूर्ण सुरक्षा',
        description_en: 'Complete alarm and sensor systems that monitor doors, windows, and motion, keeping intruders away effectively.',
        description_hi: 'घर की सुरक्षा के लिए पूर्ण अलार्म सिस्टम।',
        coverImage: '/VisionGuard_logo.webp',
        attractions: ['Door Sensors', 'Sirens', '24/7 Monitoring', 'Glass Break Detection'],
        bestTime: 'Year-round',
        blogCount: 15,
    }
];

// Helper functions
export function getDestinationById(id: string): Destination | undefined {
    return destinations.find(dest => dest.id === id);
}
