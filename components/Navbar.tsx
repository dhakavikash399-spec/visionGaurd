'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function Navbar() {
    const pathname = usePathname();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const navRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    useEffect(() => {
        if (!mobileMenuOpen) return;
        const handleClickOutside = (event: MouseEvent) => {
            if (!navRef.current) return;
            if (!navRef.current.contains(event.target as Node)) {
                setMobileMenuOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [mobileMenuOpen]);

    const isActive = (path: string) => pathname === path || pathname.startsWith(path + '/');

    const navLinks = [
        { href: '/', label: 'Home' },
        { href: '/blogs', label: 'Blog' },
        { href: '/products', label: 'Products' },
        { href: '/categories', label: 'Categories' },
        { href: '/about', label: 'About' },
    ];

    return (
        <nav
            ref={navRef}
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
                scrolled
                    ? 'bg-[#0a0e17]/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,212,255,0.08)] border-b border-[rgba(0,212,255,0.1)]'
                    : 'bg-transparent'
            }`}
        >
            <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
                {/* Logo */}
                <Link href="/" className="flex items-center gap-3 group">
                    <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-[#00d4ff] to-[#10b981] flex items-center justify-center transition-all group-hover:shadow-[0_0_20px_rgba(0,212,255,0.4)]">
                        <svg className="w-6 h-6 text-[#0a0e17]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                    </div>
                    <span className="text-xl font-bold text-white">
                        Vision<span className="gradient-text">Guard</span>
                    </span>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                                isActive(link.href)
                                    ? 'text-[#00d4ff] bg-[rgba(0,212,255,0.1)]'
                                    : 'text-[#94a3b8] hover:text-white hover:bg-[rgba(255,255,255,0.05)]'
                            }`}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-3">
                    <Link
                        href="/submit"
                        className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#00d4ff] to-[#10b981] text-[#0a0e17] font-bold rounded-lg text-sm shadow-lg hover:shadow-[0_0_30px_rgba(0,212,255,0.3)] hover:-translate-y-0.5 transition-all"
                    >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        Write Blog
                    </Link>

                    {/* Mobile Menu Toggle */}
                    <button
                        className="md:hidden flex flex-col gap-1.5 p-2 rounded-lg hover:bg-[rgba(255,255,255,0.05)] transition-colors"
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        aria-label="Toggle navigation menu"
                    >
                        <span className={`w-6 h-0.5 bg-[#00d4ff] transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`} />
                        <span className={`w-6 h-0.5 bg-[#00d4ff] transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`} />
                        <span className={`w-6 h-0.5 bg-[#00d4ff] transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-[#0f172a]/98 backdrop-blur-xl border-t border-[rgba(0,212,255,0.1)] animate-slide-down">
                    <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className={`px-4 py-3 rounded-lg text-base font-medium transition-colors ${
                                    isActive(link.href)
                                        ? 'text-[#00d4ff] bg-[rgba(0,212,255,0.1)]'
                                        : 'text-[#94a3b8] hover:text-white hover:bg-[rgba(255,255,255,0.05)]'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}
                        <Link
                            href="/submit"
                            onClick={() => setMobileMenuOpen(false)}
                            className="mt-2 px-4 py-3 rounded-lg bg-gradient-to-r from-[#00d4ff] to-[#10b981] text-[#0a0e17] font-bold text-center text-base"
                        >
                            Write Blog
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    );
}
