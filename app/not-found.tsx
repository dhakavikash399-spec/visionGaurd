import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="text-center">
                <div className="text-8xl font-black gradient-text mb-4">404</div>
                <h1 className="text-2xl font-bold text-white mb-4">Page Not Found</h1>
                <p className="text-[#94a3b8] mb-8 max-w-md mx-auto">
                    The page you&apos;re looking for doesn&apos;t exist or has been moved. Let&apos;s get you back on track.
                </p>
                <div className="flex gap-4 justify-center">
                    <Link href="/" className="btn-primary">
                        Go Home
                    </Link>
                    <Link href="/blogs" className="btn-secondary">
                        Read Blog
                    </Link>
                </div>
            </div>
        </div>
    );
}
