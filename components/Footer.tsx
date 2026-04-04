'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
    const [message, setMessage] = useState('');

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!email || !email.includes('@')) {
            setStatus('error');
            setMessage('Please enter a valid email.');
            return;
        }

        setStatus('loading');

        try {
            const res = await fetch('/api/newsletter/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email }),
            });
            const data = await res.json();

            if (data.error) {
                setStatus('error');
                setMessage('Something went wrong. Please try again.');
            } else if (data.alreadySubscribed) {
                setStatus('success');
                setMessage('You are already subscribed!');
            } else {
                setStatus('success');
                setMessage('Thank you for subscribing!');
                setEmail('');
            }
        } catch (err: any) {
            console.error('Newsletter error:', err);
            setStatus('error');
            setMessage('Something went wrong. Please try again.');
        }
    };

    return (
        <footer className="bg-[#050810] text-[#8fa0ba] py-16 px-4 border-t border-[#00d4ff]/10">
            <div className="max-w-7xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
                    {/* Brand */}
                    <div>
                        <div className="flex items-center gap-2 mb-4">
                            <Image
                                src="/VisionGuard_logo.webp"
                                alt="VisionGuard Logo"
                                width={40}
                                height={40}
                                className="h-10 w-auto"
                            />
                            <span className="text-xl font-bold text-white">VisionGuard</span>
                        </div>
                        <p className="text-[#8fa0ba] mb-6">
                            Your ultimate guide to home security and smart surveillance. Discover advanced cameras, protect your space, and share your experiences.
                        </p>
                        <div className="flex gap-3">
                            <a
                                href="https://x.com/VisionGuard"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Twitter"
                                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-desert-gold hover:-translate-y-1 transition-all"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                                </svg>
                            </a>
                            <a
                                href="https://www.instagram.com/VisionGuardinfo/"
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Instagram"
                                className="w-10 h-10 bg-gray-700 rounded-full flex items-center justify-center hover:bg-desert-gold hover:-translate-y-1 transition-all"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                                </svg>
                            </a>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="font-semibold text-lg text-white mb-6">Quick Links</h4>
                        <div className="flex flex-col gap-3">
                            <Link href="/" className="hover:text-[#00d4ff] hover:translate-x-1 transition-all">
                                Home
                            </Link>
                            <Link href="/blogs/" className="hover:text-[#00d4ff] hover:translate-x-1 transition-all">
                                Security Guides
                            </Link>
                            <Link href="/products/" className="hover:text-[#00d4ff] hover:translate-x-1 transition-all">
                                Cameras
                            </Link>

                            <Link href="/about/" className="hover:text-[#00d4ff] hover:translate-x-1 transition-all">
                                About Us
                            </Link>
                            <Link href="/contact/" className="hover:text-[#00d4ff] hover:translate-x-1 transition-all">
                                Contact Us
                            </Link>
                            <Link href="/submit/" className="hover:text-[#00d4ff] hover:translate-x-1 transition-all">
                                Submit Guide
                            </Link>
                        </div>
                    </div>

                    {/* Resources */}
                    <div>
                        <h4 className="font-semibold text-lg text-white mb-6">Top Categories</h4>
                        <div className="flex flex-col gap-3">
                            <Link href="/products?category=Security%20Cameras" className="hover:text-[#00d4ff] hover:translate-x-1 transition-all">
                                Security Cameras
                            </Link>
                            <Link href="/products?category=Smart%20Locks" className="hover:text-[#00d4ff] hover:translate-x-1 transition-all">
                                Smart Locks
                            </Link>
                            <Link href="/products?category=Alarm%20Systems" className="hover:text-[#00d4ff] hover:translate-x-1 transition-all">
                                Alarm Systems
                            </Link>
                            <Link href="/products?category=Sensors" className="hover:text-[#00d4ff] hover:translate-x-1 transition-all">
                                Safety Sensors
                            </Link>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h4 className="font-semibold text-lg text-white mb-6">Stay Updated</h4>
                        <p className="mb-4 text-sm font-light">
                            Get the latest security tips, reviews, and deals delivered to your inbox.
                        </p>
                        <form onSubmit={handleSubscribe} className="flex flex-col gap-2 relative">
                            <div className="relative">
                                <input
                                    type="email"
                                    placeholder="Your email address"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-4 py-3 bg-[#111827] text-white rounded-lg border border-[#1f2937] focus:outline-none focus:border-[#00d4ff] focus:ring-1 focus:ring-[#00d4ff]/30 transition-all text-sm placeholder-gray-500"
                                    required
                                    disabled={status === 'loading'}
                                />
                            </div>
                            <button
                                type="submit"
                                disabled={status === 'loading' || status === 'success'}
                                className="px-4 py-2 bg-desert-gold rounded-lg hover:bg-[#c49740] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                {status === 'loading' ? (
                                    <span className="animate-spin text-xl">⟳</span>
                                ) : status === 'success' ? (
                                    <span className="text-xl">✓</span>
                                ) : (
                                    'Subscribe'
                                )}
                            </button>
                        </form>
                        {message && (
                            <p className={`mt-2 text-sm ${status === 'success' ? 'text-green-400' : 'text-red-400'}`}>
                                {message}
                            </p>
                        )}
                    </div>
                </div>

                {/* Bottom */}
                <div className="pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-500 text-sm">
                    <p>&copy; {new Date().getFullYear()} VisionGuard. All rights reserved.</p>
                    <div className="flex gap-6">
                        <Link href="/privacy-policy/" className="hover:text-desert-gold transition-colors">
                            Privacy Policy
                        </Link>
                        <Link href="/terms-of-service/" className="hover:text-desert-gold transition-colors">
                            Terms of Service
                        </Link>
                        <Link href="/admin/" className="hover:text-desert-gold transition-colors text-xs font-semibold text-gray-400 flex items-center gap-1 mt-1">
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                            </svg>
                            Admin Login
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
