type FeatureHighlightItem = {
    title: string;
    description: string;
    icon: string;
};

const DEFAULT_FEATURES: FeatureHighlightItem[] = [
    {
        title: 'AI Detection',
        description: 'Smart person/vehicle alerts help you focus on what matters—reducing false notifications.',
        icon: '🧠',
    },
    {
        title: 'Night Vision',
        description: 'Clear infrared night monitoring for driveways, entrances, and outdoor areas.',
        icon: '🌙',
    },
    {
        title: 'Instant Alerts',
        description: 'Real-time push alerts with video clips so you can respond immediately.',
        icon: '🚨',
    },
    {
        title: 'Remote Access',
        description: 'View live feeds and recorded events from anywhere—simple, secure, and fast.',
        icon: '📱',
    },
];

export default function FeatureHighlight({
    items = DEFAULT_FEATURES,
    title = 'Smart Features Built for Peace of Mind',
}: {
    items?: FeatureHighlightItem[];
    title?: string;
}) {
    return (
        <section className="py-14 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="mb-10">
                    <h2 className="text-3xl font-bold text-white">{title}</h2>
                    <p className="text-gray-400 mt-2">
                        Modern surveillance should feel effortless—setup, monitoring, and alerts in one place.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {items.map((f) => (
                        <div
                            key={f.title}
                            className="rounded-2xl border border-white/10 bg-white/5 p-5 hover:bg-white/10 transition-all"
                        >
                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#00d4ff]/20 to-[#10b981]/10 border border-white/10 flex items-center justify-center text-2xl">
                                {f.icon}
                            </div>
                            <h3 className="text-white font-bold mt-4">{f.title}</h3>
                            <p className="text-gray-400 text-sm mt-2 leading-relaxed">{f.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

