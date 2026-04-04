'use client';

import type { AffiliateProduct } from '@/lib/db/queries/products';

type ComparisonTableProps = {
    title?: string;
    products: AffiliateProduct[];
    featureOrder?: string[];
};

function normalizeFeature(s: string) {
    return s.trim().toLowerCase();
}

export default function ComparisonTable({
    title = 'Feature Comparison',
    products,
    featureOrder,
}: ComparisonTableProps) {
    const productList = products.filter(Boolean);

    const featureLabelByKey = new Map<string, string>();
    for (const p of productList) {
        for (const f of p.features ?? []) {
            const key = normalizeFeature(f);
            if (!key) continue;
            if (!featureLabelByKey.has(key)) featureLabelByKey.set(key, f.trim());
        }
    }

    const defaultOrder = featureOrder && featureOrder.length > 0
        ? featureOrder.map(normalizeFeature).filter(Boolean)
        : Array.from(featureLabelByKey.keys());

    const orderedFeatureKeys = [
        ...defaultOrder,
        ...Array.from(featureLabelByKey.keys()).filter((k) => !defaultOrder.includes(k)),
    ];

    const hasFeature = (p: AffiliateProduct, featureKey: string) => {
        const target = featureKey;
        return (p.features ?? []).some((f) => normalizeFeature(f) === target);
    };

    if (productList.length === 0) return null;

    return (
        <section className="py-10 px-4">
            <div className="max-w-6xl mx-auto">
                <div className="mb-6">
                    <h2 className="text-3xl font-bold text-white">{title}</h2>
                    <p className="text-gray-400 mt-2">
                        Compare key capabilities across our recommended CCTV and home security products.
                    </p>
                </div>

                <div className="overflow-x-auto rounded-2xl border border-white/10 bg-[#0a0e17]">
                    <table className="min-w-[720px] w-full border-collapse">
                        <thead className="bg-white/5">
                            <tr>
                                <th className="sticky left-0 z-10 text-left px-4 py-4 text-xs font-bold text-gray-300 border-b border-white/10">
                                    Features
                                </th>
                                {productList.map((p) => (
                                    <th
                                        key={p.id}
                                        className="px-4 py-4 text-left text-xs font-bold text-gray-300 border-b border-white/10"
                                    >
                                        <div className="flex flex-col gap-2">
                                            <span className="text-sm text-white line-clamp-1">{p.name}</span>
                                            <span className="text-[11px] text-gray-400">
                                                {p.category ? p.category : 'Security'}
                                            </span>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>

                        <tbody className="bg-transparent">
                            {orderedFeatureKeys.map((featureKey) => {
                                const label = featureLabelByKey.get(featureKey) ?? featureKey;
                                return (
                                    <tr key={featureKey} className="border-b border-white/5">
                                        <td className="sticky left-0 z-0 bg-[#0a0e17] px-4 py-3 text-sm font-semibold text-gray-200 border-b border-white/5">
                                            {label}
                                        </td>
                                        {productList.map((p) => {
                                            const ok = hasFeature(p, featureKey);
                                            return (
                                                <td
                                                    key={p.id}
                                                    className="px-4 py-3 border-b border-white/5 text-center"
                                                >
                                                    {ok ? (
                                                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-green-500/15 text-green-300 border border-green-500/20">
                                                            ✓
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/5 text-gray-500 border border-white/10">
                                                            —
                                                        </span>
                                                    )}
                                                </td>
                                            );
                                        })}
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </section>
    );
}

