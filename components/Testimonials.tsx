type Testimonial = {
    name: string;
    role: string;
    quote: string;
    rating: number;
};

const DEFAULT_TESTIMONIALS: Testimonial[] = [
    {
        name: 'Aarav',
        role: 'Homeowner',
        quote: 'The alerts are fast and the night vision is genuinely useful. Setup took less than an hour.',
        rating: 5,
    },
    {
        name: 'Meera',
        role: 'Small business owner',
        quote: 'I love that I can quickly check footage on my phone. The comparison made choosing easy.',
        rating: 5,
    },
    {
        name: 'Kunal',
        role: 'New homeowner',
        quote: 'Great guidance on camera placement and what to look for. The product picks feel trustworthy.',
        rating: 4,
    },
];

export default function Testimonials({
    testimonials = DEFAULT_TESTIMONIALS,
}: {
    testimonials?: Testimonial[];
}) {
    return (
        <section className="py-14 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="mb-10">
                    <h2 className="text-3xl font-bold text-white">Trusted by People Who Care</h2>
                    <p className="text-gray-400 mt-2">
                        Real feedback from customers who installed better surveillance with confidence.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {testimonials.map((t) => (
                        <div
                            key={t.name}
                            className="rounded-2xl border border-white/10 bg-white/5 p-6 hover:bg-white/10 transition-all"
                        >
                            <div className="flex items-center gap-2">
                                <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#00d4ff]/20 to-[#10b981]/10 border border-white/10 flex items-center justify-center font-bold text-white">
                                    {t.name.slice(0, 1).toUpperCase()}
                                </div>
                                <div>
                                    <div className="text-white font-bold">{t.name}</div>
                                    <div className="text-gray-400 text-sm">{t.role}</div>
                                </div>
                            </div>

                            <div className="mt-4 flex items-center gap-1">
                                {Array.from({ length: 5 }).map((_, i) => {
                                    const star = i + 1;
                                    return (
                                        <svg
                                            key={star}
                                            className={`w-4 h-4 ${star <= t.rating ? 'text-[#f59e0b]' : 'text-[#334155]'}`}
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    );
                                })}
                            </div>

                            <p className="text-gray-300 mt-4 leading-relaxed">“{t.quote}”</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

