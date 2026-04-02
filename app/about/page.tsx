import { Metadata } from 'next';
import Link from 'next/link';
import { stats } from '@/lib/data';

export const metadata: Metadata = {
    title: 'About VisionGuard',
    description: 'Learn about VisionGuard — your trusted source for independent security camera reviews, doorbell comparisons, and smart home security guides.',
};

export default function AboutPage() {
    return (
        <div className="min-h-screen pt-24 pb-20 px-4">
            <div className="max-w-5xl mx-auto">
                {/* Hero */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-6">
                        About <span className="gradient-text">VisionGuard</span>
                    </h1>
                    <p className="text-[#94a3b8] text-lg max-w-3xl mx-auto leading-relaxed">
                        We started VisionGuard with a simple mission: to help homeowners make informed decisions about their home security. In a market flooded with options, we cut through the noise with honest reviews and practical guides.
                    </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-20">
                    {stats.map((stat) => (
                        <div key={stat.label} className="glass-card p-6 text-center" style={{ transform: 'none' }}>
                            <div className="text-3xl mb-2">{stat.icon}</div>
                            <div className="text-3xl font-bold text-white mb-1">{stat.value}</div>
                            <div className="text-sm text-[#64748b]">{stat.label}</div>
                        </div>
                    ))}
                </div>

                {/* Our Story */}
                <div className="glass-card p-8 md:p-12 mb-12" style={{ transform: 'none' }}>
                    <h2 className="text-2xl font-bold text-white mb-6">Our Story</h2>
                    <div className="space-y-4 text-[#94a3b8] leading-relaxed">
                        <p>
                            VisionGuard was born from frustration. As smart home enthusiasts, we found it nearly impossible to find unbiased, comprehensive reviews of security cameras and video doorbells. Most review sites were little more than thinly-veiled advertisements.
                        </p>
                        <p>
                            We decided to do things differently. Every product on VisionGuard goes through rigorous, real-world testing. We install cameras on our own homes, test doorbells in real weather conditions, and stress-test smart locks over months of daily use.
                        </p>
                        <p>
                            While we do earn affiliate commissions on qualifying purchases (which helps keep the lights on), our editorial opinions are never for sale. If a product doesn&apos;t meet our standards, we say so — regardless of potential revenue.
                        </p>
                    </div>
                </div>

                {/* Values */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
                    {[
                        {
                            icon: '🔍',
                            title: 'Transparency',
                            text: 'We clearly label affiliate links and never hide our monetization. You deserve to know how we sustain our work.',
                        },
                        {
                            icon: '🧪',
                            title: 'Rigorous Testing',
                            text: 'Every product is tested for at least 2 weeks in real conditions. We don\'t just read spec sheets — we live with these products.',
                        },
                        {
                            icon: '🤲',
                            title: 'Community First',
                            text: 'We welcome guest contributions, user reviews, and community feedback. Your experience matters to us and to other readers.',
                        },
                        {
                            icon: '📊',
                            title: 'Data-Driven',
                            text: 'Our reviews include objective measurements — video quality analysis, latency tests, battery life tracking, and more.',
                        },
                    ].map((value) => (
                        <div key={value.title} className="glass-card p-6" style={{ transform: 'none' }}>
                            <div className="text-3xl mb-3">{value.icon}</div>
                            <h3 className="text-lg font-bold text-white mb-2">{value.title}</h3>
                            <p className="text-[#94a3b8] text-sm leading-relaxed">{value.text}</p>
                        </div>
                    ))}
                </div>

                {/* Team */}
                <div className="text-center mb-12">
                    <h2 className="text-2xl font-bold text-white mb-8">Our Team</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {[
                            { name: 'Priya Sharma', role: 'Smart Home Expert', bio: 'Former IoT engineer with 6+ years in smart home tech' },
                            { name: 'Rahul Verma', role: 'Tech Reviewer', bio: 'Consumer electronics journalist covering security tech' },
                            { name: 'Ankit Patel', role: 'Security Consultant', bio: 'Certified security professional and CCTV specialist' },
                        ].map((member) => (
                            <div key={member.name} className="glass-card p-6 text-center" style={{ transform: 'none' }}>
                                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#00d4ff] to-[#10b981] flex items-center justify-center text-2xl font-bold text-[#0a0e17] mx-auto mb-4">
                                    {member.name.charAt(0)}
                                </div>
                                <h3 className="text-lg font-bold text-white">{member.name}</h3>
                                <p className="text-[#00d4ff] text-sm font-medium mb-2">{member.role}</p>
                                <p className="text-[#64748b] text-sm">{member.bio}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-white mb-4">Want to Contribute?</h2>
                    <p className="text-[#94a3b8] mb-6">We&apos;re always looking for passionate writers and security enthusiasts.</p>
                    <Link href="/submit" className="btn-primary text-lg px-8 py-4">
                        Submit Your Blog →
                    </Link>
                </div>
            </div>
        </div>
    );
}
