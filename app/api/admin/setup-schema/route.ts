import { NextResponse } from 'next/server';
import { sql } from '@/lib/db';

/**
 * GET /api/admin/setup-schema
 * Creates all required tables if they don't exist.
 * Safe to call multiple times (uses IF NOT EXISTS).
 * Requires: ?secret=NEXTAUTH_SECRET value for basic protection.
 */
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');

    if (secret !== process.env.NEXTAUTH_SECRET) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        // ── Authors ──────────────────────────────────────────────────
        await sql`
            CREATE TABLE IF NOT EXISTS authors (
                id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                name        TEXT NOT NULL,
                email       TEXT UNIQUE NOT NULL,
                avatar_url  TEXT,
                bio         TEXT,
                slug        TEXT UNIQUE,
                website     TEXT,
                twitter     TEXT,
                instagram   TEXT,
                linkedin    TEXT,
                youtube     TEXT,
                role        TEXT DEFAULT 'author',
                created_at  TIMESTAMPTZ DEFAULT NOW(),
                updated_at  TIMESTAMPTZ DEFAULT NOW()
            )
        `;

        // ── Blogs ────────────────────────────────────────────────────
        await sql`
            CREATE TABLE IF NOT EXISTS blogs (
                id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                slug              TEXT UNIQUE NOT NULL,
                title_en          TEXT NOT NULL,
                title_hi          TEXT,
                excerpt_en        TEXT,
                excerpt_hi        TEXT,
                content_en        TEXT,
                content_hi        TEXT,
                destination       TEXT,
                category          TEXT,
                cover_image       TEXT,
                images            JSONB DEFAULT '[]',
                author            JSONB,
                author_id         UUID REFERENCES authors(id) ON DELETE SET NULL,
                status            TEXT DEFAULT 'pending',
                views             INTEGER DEFAULT 0,
                read_time         TEXT,
                meta_title        TEXT,
                meta_description  TEXT,
                canonical_url     TEXT,
                published_at      TIMESTAMPTZ,
                created_at        TIMESTAMPTZ DEFAULT NOW(),
                updated_at        TIMESTAMPTZ DEFAULT NOW(),
                deleted_at        TIMESTAMPTZ
            )
        `;

        // ── Products ─────────────────────────────────────────────────
        await sql`
            CREATE TABLE IF NOT EXISTS products (
                id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                name            TEXT NOT NULL,
                category        TEXT,
                description     TEXT,
                price           TEXT,
                original_price  TEXT,
                rating          FLOAT,
                review_count    INTEGER,
                affiliate_link  TEXT,
                image_url       TEXT,
                badge           TEXT,
                features        JSONB DEFAULT '[]',
                destinations    JSONB DEFAULT '[]',
                is_active       BOOLEAN DEFAULT true,
                created_at      TIMESTAMPTZ DEFAULT NOW(),
                updated_at      TIMESTAMPTZ DEFAULT NOW()
            )
        `;

        await sql`
            DO $$ 
            BEGIN 
                BEGIN
                    ALTER TABLE products ADD COLUMN is_active BOOLEAN DEFAULT true;
                EXCEPTION
                    WHEN duplicate_column THEN null;
                END;
                BEGIN
                    ALTER TABLE products ADD COLUMN destinations JSONB DEFAULT '[]';
                EXCEPTION
                    WHEN duplicate_column THEN null;
                END;
            END $$;
        `;

        // ── Blog Likes ───────────────────────────────────────────────
        await sql`
            CREATE TABLE IF NOT EXISTS blog_likes (
                id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                blog_id    UUID REFERENCES blogs(id) ON DELETE CASCADE,
                user_id    UUID,
                created_at TIMESTAMPTZ DEFAULT NOW(),
                UNIQUE(blog_id, user_id)
            )
        `;

        // ── Blog Comments ────────────────────────────────────────────
        await sql`
            CREATE TABLE IF NOT EXISTS blog_comments (
                id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                blog_id    UUID REFERENCES blogs(id) ON DELETE CASCADE,
                user_id    UUID,
                parent_id  UUID REFERENCES blog_comments(id) ON DELETE CASCADE,
                content    TEXT NOT NULL,
                is_edited  BOOLEAN DEFAULT false,
                created_at TIMESTAMPTZ DEFAULT NOW(),
                updated_at TIMESTAMPTZ DEFAULT NOW()
            )
        `;

        // ── Comment Likes ────────────────────────────────────────────
        await sql`
            CREATE TABLE IF NOT EXISTS comment_likes (
                id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                comment_id  UUID REFERENCES blog_comments(id) ON DELETE CASCADE,
                user_id     UUID,
                created_at  TIMESTAMPTZ DEFAULT NOW(),
                UNIQUE(comment_id, user_id)
            )
        `;

        // ── Contact Messages ─────────────────────────────────────────
        await sql`
            CREATE TABLE IF NOT EXISTS contact_messages (
                id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                name       TEXT NOT NULL,
                email      TEXT NOT NULL,
                subject    TEXT,
                message    TEXT NOT NULL,
                status     TEXT DEFAULT 'unread',
                created_at TIMESTAMPTZ DEFAULT NOW()
            )
        `;

        // ── Newsletter Subscribers ───────────────────────────────────
        await sql`
            CREATE TABLE IF NOT EXISTS newsletter_subscribers (
                id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                email      TEXT UNIQUE NOT NULL,
                created_at TIMESTAMPTZ DEFAULT NOW()
            )
        `;

        // ── Destinations ─────────────────────────────────────────────
        await sql`
            CREATE TABLE IF NOT EXISTS destinations (
                id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                slug        TEXT UNIQUE NOT NULL,
                name        TEXT NOT NULL,
                description TEXT,
                image_url   TEXT,
                is_active   BOOLEAN DEFAULT true,
                created_at  TIMESTAMPTZ DEFAULT NOW(),
                updated_at  TIMESTAMPTZ DEFAULT NOW()
            )
        `;

        // ── Users (admin) ────────────────────────────────────────────
        await sql`
            CREATE TABLE IF NOT EXISTS users (
                id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                email      TEXT UNIQUE NOT NULL,
                password   TEXT,
                name       TEXT,
                image      TEXT,
                role       TEXT DEFAULT 'user',
                created_at TIMESTAMPTZ DEFAULT NOW()
            )
        `;

        // ── Submit Log ───────────────────────────────────────────────
        await sql`
            CREATE TABLE IF NOT EXISTS submit_log (
                id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
                blog_id    UUID,
                blog_slug  TEXT,
                user_id    UUID,
                stages     JSONB DEFAULT '[]',
                created_at TIMESTAMPTZ DEFAULT NOW()
            )
        `;

        return NextResponse.json({
            success: true,
            message: 'All tables created successfully (IF NOT EXISTS — safe to re-run)',
            tables: [
                'authors', 'blogs', 'products', 'blog_likes',
                'blog_comments', 'comment_likes', 'contact_messages',
                'newsletter_subscribers', 'destinations', 'users', 'submit_log'
            ]
        });

    } catch (error: any) {
        console.error('[setup-schema] error:', error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
