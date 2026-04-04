'use client';

import { useMemo, useState } from 'react';

type FAQItem = {
    question: string;
    answer: string;
};

const FAQs: FAQItem[] = [
    {
        question: 'Do I need a subscription to use CCTV cameras?',
        answer: 'Some systems work without subscriptions using local storage (microSD/NVR). Cloud features may require a subscription depending on the brand and plan you choose.',
    },
    {
        question: 'What’s the best camera placement for outdoor security?',
        answer: 'Focus on entry points (front door, driveway, side gates) and places where someone would approach. Mount at an appropriate height to cover faces while avoiding easy tampering.',
    },
    {
        question: 'How does night vision compare to regular day footage?',
        answer: 'Night vision is usually achieved via infrared LEDs. Expect lower detail than daytime, but good systems provide clear motion detection and usable footage for identification.',
    },
    {
        question: 'How do AI alerts reduce false notifications?',
        answer: 'AI detection filters out common non-threat events (like moving shadows) and focuses on people or vehicles. Always tune sensitivity and zones for your environment.',
    },
    {
        question: 'Can I view cameras remotely on my phone?',
        answer: 'Yes. Most modern security apps support live view, playback, and alert notifications from your mobile device. For privacy, enable strong passwords and two-factor authentication where available.',
    },
];

export default function SecurityFAQSection() {
    const [openIndex, setOpenIndex] = useState<number | null>(0);

    const faqJsonLd = useMemo(() => {
        return {
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            mainEntity: FAQs.map((faq) => ({
                '@type': 'Question',
                name: faq.question,
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: faq.answer,
                },
            })),
        };
    }, []);

    return (
        <section className="py-14 px-4">
            <div className="max-w-6xl mx-auto">
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
                />

                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-white">Security Questions, Answered</h2>
                    <p className="text-gray-400 mt-2">Quick guidance to help you choose the right cameras and setup.</p>
                </div>

                <div className="space-y-4">
                    {FAQs.map((faq, idx) => {
                        const open = openIndex === idx;
                        return (
                            <div
                                key={faq.question}
                                className={`rounded-2xl border border-white/10 bg-white/5 overflow-hidden transition-all ${
                                    open ? 'ring-1 ring-[#00d4ff]/20' : 'hover:bg-white/10'
                                }`}
                            >
                                <button
                                    onClick={() => setOpenIndex(open ? null : idx)}
                                    className="w-full text-left p-6 flex items-start justify-between gap-4"
                                    aria-expanded={open}
                                >
                                    <div>
                                        <div className="text-white font-bold">{faq.question}</div>
                                    </div>
                                    <div className={`w-9 h-9 rounded-xl border border-white/10 flex items-center justify-center transition-transform ${open ? 'rotate-180' : ''}`}>
                                        <svg className="w-4 h-4 text-gray-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M6 9l6 6 6-6" />
                                        </svg>
                                    </div>
                                </button>

                                <div className={`px-6 pb-6 transition-all ${open ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'}`}>
                                    <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}

