/**
 * POST /api/submit-log
 * 
 * Receives submit performance logs from the client-side SubmitLogger
 * and persists them to the database. This keeps the `pg` driver
 * server-only by decoupling the client logger from the DB layer.
 */

import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db/router';

export async function POST(request: NextRequest) {
    try {
        const body = await request.json();

        const {
            userId,
            userEmail,
            blogId,
            blogSlug,
            action,
            totalDurationMs,
            stages,
            payloadSizeKB,
            contentWordCount,
            imagesCount,
            orphanedImagesCount,
            status,
            errorMessage,
        } = body;

        await db.execute(
            `INSERT INTO submit_logs (
                user_id, user_email, blog_id, blog_slug, action,
                total_duration_ms, stages, payload_size_kb,
                content_word_count, images_count, orphaned_images_count,
                status, error_message
            ) VALUES (
                $1::uuid, $2, $3, $4, $5,
                $6, $7::jsonb, $8,
                $9, $10, $11,
                $12, $13
            )`,
            [
                userId,
                userEmail,
                blogId || null,
                blogSlug || null,
                action,
                totalDurationMs,
                JSON.stringify(stages || []),
                payloadSizeKB || null,
                contentWordCount || null,
                imagesCount || null,
                orphanedImagesCount || null,
                status || 'success',
                errorMessage || null,
            ]
        );

        return NextResponse.json({ ok: true });
    } catch (err: any) {
        // Non-critical logging — don't break the client flow
        console.warn('[submit-log] Failed to save log:', err?.message);
        return NextResponse.json({ ok: false }, { status: 500 });
    }
}
