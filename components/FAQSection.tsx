'use client';

import { useState } from 'react';

interface FAQItem {
    question: string;
    answer: string;
}

interface FAQSectionProps {
    faqs: FAQItem[];
}

export default function FAQSection({ faqs }: FAQSectionProps) {
    const [open, setOpen] = useState<number | null>(0);

    return (
        <section className="py-20 px-4 relative">
            <div className="absolute inset-0 bg-grid opacity-30" />
            <div className="max-w-3xl mx-auto relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 text-white">
                    Frequently Asked <span className="gradient-text">Questions</span>
                </h2>
                <p className="text-center text-[#94a3b8] text-lg max-w-2xl mx-auto mb-12">
                    Everything you need to know about home security cameras and doorbells
                </p>

                <div className="space-y-3">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className={`glass-card overflow-hidden transition-all duration-300 ${
                                open === index ? 'border-[rgba(0,212,255,0.3)]' : ''
                            }`}
                            style={{ transform: 'none' }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'none';
                            }}
                        >
                            <button
                                onClick={() => setOpen(open === index ? null : index)}
                                className="w-full flex items-center justify-between p-5 text-left"
                            >
                                <span className="font-semibold text-white pr-4">{faq.question}</span>
                                <svg
                                    className={`w-5 h-5 text-[#00d4ff] flex-shrink-0 transition-transform duration-300 ${
                                        open === index ? 'rotate-180' : ''
                                    }`}
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {open === index && (
                                <div className="px-5 pb-5 animate-fade-in">
                                    <p className="text-[#94a3b8] leading-relaxed">{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
