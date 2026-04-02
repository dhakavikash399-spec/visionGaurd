'use client';

import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="relative bg-[#020617] border-t border-[rgba(0,212,255,0.08)] pt-16 pb-8 px-4 overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-[radial-gradient(ellipse,rgba(0,212,255,0.06),transparent_70%)] pointer-events-none" />

            <div className="max-w-7xl mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-3 mb-4">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#00d4ff] to-[#10b981] flex items-center justify-center">
                                <svg className="w-6 h-6 text-[#0a0e17]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold text-white">
                                Vision<span className="gradient-text">Guard</span>
                            </span>
                        </div>
                        <p className="text-[#64748b] mb-6 leading-relaxed">
                            Your trusted source for security camera reviews, doorbell comparisons, smart home guides, and expert recommendations.
                        </p>
                        <div className="flex gap-3">
                            {[
                                { label: 'Twitter', path: 'M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z' },
                                { label: 'YouTube', path: 'M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z' },
                                { label: 'Instagram', path: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z' },
                            ].map((social) => (
                                <a
                                    key={social.label}
                                    href="#"
                                    aria-label={social.label}
                                    className="w-10 h-10 rounded-lg bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.08)] flex items-center justify-center text-[#64748b] hover:text-[#00d4ff] hover:border-[rgba(0,212,255,0.3)] hover:-translate-y-1 transition-all duration-300"
                                >
                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d={social.path} /></svg>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-lg mb-6 text-white">Quick Links</h4>
                        <div className="flex flex-col gap-3">
                            {[
                                { href: '/', label: 'Home' },
                                { href: '/blogs', label: 'Blog Articles' },
                                { href: '/products', label: 'Products' },
                                { href: '/categories', label: 'Categories' },
                                { href: '/about', label: 'About Us' },
                                { href: '/submit', label: 'Submit Blog' },
                            ].map((link) => (
                                <Link key={link.href} href={link.href} className="text-[#64748b] hover:text-[#00d4ff] transition-colors text-sm">
                                    {link.label}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Product Categories */}
                    <div>
                        <h4 className="font-semibold text-lg mb-6 text-white">Categories</h4>
                        <div className="flex flex-col gap-3">
                            {[
                                'Security Cameras',
                                'Video Doorbells',
                                'NVR Systems',
                                'Smart Locks',
                                'Sensors & Alarms',
                            ].map((cat) => (
                                <Link key={cat} href="/categories" className="text-[#64748b] hover:text-[#00d4ff] transition-colors text-sm">
                                    {cat}
                                </Link>
                            ))}
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-semibold text-lg mb-6 text-white">Stay Updated</h4>
                        <p className="text-[#64748b] mb-4 text-sm">
                            Get the latest reviews, deals, and security tips delivered to your inbox.
                        </p>
                        <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                            <input
                                type="email"
                                placeholder="your@email.com"
                                className="flex-1 px-4 py-2.5 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-lg focus:outline-none focus:border-[#00d4ff] text-white text-sm placeholder:text-[#475569] transition-colors"
                            />
                            <button
                                type="submit"
                                className="px-4 py-2.5 bg-gradient-to-r from-[#00d4ff] to-[#10b981] rounded-lg text-[#0a0e17] font-bold hover:shadow-[0_0_20px_rgba(0,212,255,0.3)] transition-all"
                            >
                                →
                            </button>
                        </form>
                    </div>
                </div>

                {/* Bottom */}
                <div className="pt-8 border-t border-[rgba(255,255,255,0.06)] flex flex-col md:flex-row justify-between items-center gap-4 text-[#475569] text-sm">
                    <p>© 2026 VisionGuard. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy" className="hover:text-[#00d4ff] transition-colors">Privacy Policy</Link>
                        <Link href="/terms" className="hover:text-[#00d4ff] transition-colors">Terms of Service</Link>
                        <span className="text-xs text-[#334155]">Built with ❤️ for home security</span>
                    </div>
                </div>

                {/* Admin Access — subtle, below the fold */}
                <div className="mt-6 flex justify-center">
                    <Link
                        href="/admin/login"
                        className="inline-flex items-center gap-1.5 text-[10px] text-[#1e293b] hover:text-[#475569] transition-colors duration-300 select-none"
                        aria-label="Admin Login"
                    >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                        Admin
                    </Link>
                </div>
            </div>
        </footer>
    );
}
