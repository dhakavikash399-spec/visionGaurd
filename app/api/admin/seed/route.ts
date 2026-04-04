import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');

    // Only allow this in dev or with the secret
    if (secret !== process.env.NEXTAUTH_SECRET && process.env.NODE_ENV !== 'development') {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // 1. Insert Author
        const authorRes = await sql`
            INSERT INTO authors (name, email, bio, slug, role) 
            VALUES (
                'System Admin', 
                'admin@visionguard.com', 
                'Security expert and enthusiast.', 
                'system-admin', 
                'admin'
            )
            ON CONFLICT (email) DO UPDATE SET name = EXCLUDED.name
            RETURNING id;
        `;
        const authorId = authorRes[0].id;

        // 2. Insert Blogs
        await sql`
            INSERT INTO blogs (slug, title_en, title_hi, excerpt_en, excerpt_hi, content_en, content_hi, destination, category, cover_image, author, author_id, status, published_at, meta_title)
            VALUES 
            (
                'top-10-security-cameras-for-home-defense',
                'Top 10 Security Cameras for Home Defense',
                'Top 10 Security Cameras for Home Defense',
                'Discover the best security cameras for your home. We review the top 10 options available in the market today.',
                'Discover the best security cameras for your home.',
                '<h2>Introduction</h2><p>Home defense is critical. Here are the top 10 security cameras...</p><h2>1. VisionGuard Pro</h2><p>The VisionGuard Pro offers 4K resolution and night vision...</p>',
                '<p>Home defense is critical.</p>',
                'security',
                'Security Reviews',
                '/images/security-camera-main.webp',
                '{"name": "System Admin", "email": "admin@visionguard.com"}',
                ${authorId},
                'published',
                NOW(),
                'Top 10 Security Cameras for Home Defense'
            ),
            (
                'how-to-secure-your-smart-home',
                'How to Secure Your Smart Home in 5 Steps',
                'How to Secure Your Smart Home in 5 Steps',
                'Smart homes are convenient but can be vulnerable. Learn 5 easy steps to secure your smart home network and devices.',
                'Smart homes are convenient but can be vulnerable.',
                '<h2>1. Change Default Passwords</h2><p>Always change default passwords...</p><h2>2. Use Two-Factor Authentication</h2><p>Enable 2FA wherever possible...</p>',
                '<p>Always change default passwords...</p>',
                'smart-home',
                'Guides',
                '/images/smart-home-security.webp',
                '{"name": "System Admin", "email": "admin@visionguard.com"}',
                ${authorId},
                'published',
                NOW(),
                'How to Secure Your Smart Home in 5 Steps'
            )
            ON CONFLICT (slug) DO NOTHING;
        `;

        // 3. Insert Products
        await sql`
            INSERT INTO products (name, category, description, price, affiliate_link, image_url, badge, is_active)
            VALUES 
            (
                'VisionGuard 4K Outdoor Camera', 
                'Cameras', 
                'A reliable 4K outdoor bullet camera with night vision and AI detection.', 
                '$149.99', 
                'https://amazon.com', 
                '/images/vision-guard-4k.webp', 
                'Best Seller', 
                true
            ),
            (
                'SecureHome Smart Lock', 
                'Smart Locks', 
                'Keyless entry deadbolt with Wi-Fi and Bluetooth connectivity.', 
                '$199.99', 
                'https://amazon.com', 
                '/images/secure-home-lock.webp', 
                'Top Rated', 
                true
            )
        `;

        return NextResponse.json({ success: true, message: 'Dummy data inserted successfully.' });
    } catch (error: any) {
        console.error('[seed] error:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
