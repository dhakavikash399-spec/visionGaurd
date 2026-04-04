/**
 * Submit Performance Logger
 * 
 * Client-safe logger that sends performance data to /api/submit-log.
 * This avoids importing the db module (and `pg`) from client components,
 * which would break the Turbopack build.
 * 
 * Usage:
 *   const logger = new SubmitLogger('submit', userId, userEmail);
 *   logger.startStage('base64_cleanup');
 *   // ... do work ...
 *   logger.endStage('base64_cleanup');
 *   await logger.save({ blogId, blogSlug, ... });
 */

interface StageEntry {
    name: string;
    duration_ms: number;
}

interface SaveOptions {
    blogId?: string;
    blogSlug?: string;
    payloadSizeKB?: number;
    contentWordCount?: number;
    imagesCount?: number;
    orphanedImagesCount?: number;
    status?: 'success' | 'error' | 'timeout';
    errorMessage?: string;
}

export class SubmitLogger {
    private action: string;
    private userId: string;
    private userEmail: string;
    private stages: StageEntry[] = [];
    private stageStartTimes: Map<string, number> = new Map();
    private globalStart: number;

    constructor(action: 'submit' | 'edit', userId: string, userEmail: string) {
        this.action = action;
        this.userId = userId;
        this.userEmail = userEmail;
        this.globalStart = performance.now();
    }

    /** Mark the start of a named stage */
    startStage(name: string): void {
        this.stageStartTimes.set(name, performance.now());
    }

    /** Mark the end of a named stage and record its duration */
    endStage(name: string): number {
        const start = this.stageStartTimes.get(name);
        if (start === undefined) {
            console.warn(`[SubmitLogger] Stage "${name}" was never started`);
            return 0;
        }
        const duration = Math.round(performance.now() - start);
        this.stages.push({ name, duration_ms: duration });
        this.stageStartTimes.delete(name);
        return duration;
    }

    /** Get total elapsed time since logger was created */
    getElapsed(): number {
        return Math.round(performance.now() - this.globalStart);
    }

    /** Save the log entry via API (non-blocking, client-safe) */
    async save(options: SaveOptions = {}): Promise<void> {
        const totalDuration = this.getElapsed();

        try {
            await fetch('/api/submit-log', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId: this.userId,
                    userEmail: this.userEmail,
                    blogId: options.blogId || null,
                    blogSlug: options.blogSlug || null,
                    action: this.action,
                    totalDurationMs: totalDuration,
                    stages: this.stages,
                    payloadSizeKB: options.payloadSizeKB || null,
                    contentWordCount: options.contentWordCount || null,
                    imagesCount: options.imagesCount || null,
                    orphanedImagesCount: options.orphanedImagesCount || null,
                    status: options.status || 'success',
                    errorMessage: options.errorMessage || null,
                }),
            });
        } catch (err) {
            // Non-critical: don't break the submit flow for logging failures
            console.warn('[SubmitLogger] Failed to save log:', err);
        }
    }
}
