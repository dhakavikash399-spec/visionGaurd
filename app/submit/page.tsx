'use client';

import { useState, useEffect } from 'react';
import { blogCategories } from '@/lib/data';
import { useSession } from 'next-auth/react';

export default function SubmitPage() {
    const { data: session } = useSession();

    const [formData, setFormData] = useState({
        title: '',
        category: '',
        excerpt: '',
        content: '',
        authorName: '',
        authorEmail: '',
    });

    useEffect(() => {
        if (session?.user) {
            setFormData(prev => ({
                ...prev,
                authorName: session.user?.name || prev.authorName,
                authorEmail: session.user?.email || prev.authorEmail
            }));
        }
    }, [session]);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In production, this would POST to an API
        setSubmitted(true);
    };

    if (submitted) {
        return (
            <div className="min-h-screen pt-24 pb-20 px-4 flex items-center justify-center">
                <div className="glass-card p-12 text-center max-w-lg" style={{ transform: 'none' }}>
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#10b981] flex items-center justify-center text-4xl mx-auto mb-6">
                        ✓
                    </div>
                    <h2 className="text-2xl font-bold text-white mb-4">Blog Submitted!</h2>
                    <p className="text-[#94a3b8] mb-6">
                        Thank you for your contribution! Our editorial team will review your submission and get back to you within 48 hours.
                    </p>
                    <a href="/" className="btn-primary">Back to Home</a>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-24 pb-20 px-4">
            <div className="max-w-3xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                        Submit Your <span className="gradient-text">Blog</span>
                    </h1>
                    <p className="text-[#94a3b8] text-lg max-w-2xl mx-auto">
                        Share your security expertise with our community. All submissions are reviewed by our editorial team.
                    </p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Title */}
                    <div>
                        <label className="block text-sm font-semibold text-white mb-2">Article Title *</label>
                        <input
                            type="text"
                            required
                            placeholder="e.g. Best Outdoor Security Cameras for Indian Climate"
                            value={formData.title}
                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                            className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-white placeholder:text-[#475569] focus:outline-none focus:border-[#00d4ff] transition-colors"
                        />
                    </div>

                    {/* Category */}
                    <div>
                        <label className="block text-sm font-semibold text-white mb-2">Category *</label>
                        <select
                            required
                            value={formData.category}
                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                            className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-white focus:outline-none focus:border-[#00d4ff] transition-colors appearance-none"
                        >
                            <option value="" className="bg-[#0f172a]">Select a category</option>
                            {blogCategories.map((cat) => (
                                <option key={cat.id} value={cat.id} className="bg-[#0f172a]">
                                    {cat.icon} {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Author Info */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-semibold text-white mb-2">Your Name *</label>
                            <input
                                type="text"
                                required
                                placeholder="Your full name"
                                value={formData.authorName}
                                onChange={(e) => setFormData({ ...formData, authorName: e.target.value })}
                                className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-white placeholder:text-[#475569] focus:outline-none focus:border-[#00d4ff] transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-semibold text-white mb-2">Email *</label>
                            <input
                                type="email"
                                required
                                placeholder="your@email.com"
                                value={formData.authorEmail}
                                onChange={(e) => setFormData({ ...formData, authorEmail: e.target.value })}
                                className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-white placeholder:text-[#475569] focus:outline-none focus:border-[#00d4ff] transition-colors"
                            />
                        </div>
                    </div>

                    {/* Excerpt */}
                    <div>
                        <label className="block text-sm font-semibold text-white mb-2">Excerpt / Summary *</label>
                        <textarea
                            required
                            rows={3}
                            placeholder="A brief summary of your article (150-300 characters)"
                            value={formData.excerpt}
                            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                            className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-white placeholder:text-[#475569] focus:outline-none focus:border-[#00d4ff] transition-colors resize-none"
                        />
                    </div>

                    {/* Content */}
                    <div>
                        <label className="block text-sm font-semibold text-white mb-2">Article Content *</label>
                        <textarea
                            required
                            rows={12}
                            placeholder="Write your article here... You can use basic formatting."
                            value={formData.content}
                            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                            className="w-full px-4 py-3 bg-[rgba(255,255,255,0.05)] border border-[rgba(255,255,255,0.1)] rounded-xl text-white placeholder:text-[#475569] focus:outline-none focus:border-[#00d4ff] transition-colors resize-none"
                        />
                    </div>

                    {/* Guidelines */}
                    <div className="glass-card p-5" style={{ transform: 'none' }}>
                        <h3 className="text-sm font-bold text-white mb-3">📋 Submission Guidelines</h3>
                        <ul className="text-[#64748b] text-sm space-y-2">
                            <li className="flex items-start gap-2">
                                <span className="text-[#10b981] mt-0.5">✓</span>
                                Articles should be original and at least 500 words
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[#10b981] mt-0.5">✓</span>
                                Focus on practical, helpful content for home security enthusiasts
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[#10b981] mt-0.5">✓</span>
                                Include your hands-on experience with any reviewed products
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="text-[#10b981] mt-0.5">✓</span>
                                No spam, promotional content, or plagiarized material
                            </li>
                        </ul>
                    </div>

                    {/* Submit */}
                    <button type="submit" className="btn-primary w-full justify-center text-lg py-4">
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                        Submit Article for Review
                    </button>
                </form>
            </div>
        </div>
    );
}
