'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewProductPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: '',
    category: 'Security Cameras',
    description: '',
    price: '',
    original_price: '',
    rating: 4.5,
    review_count: 0,
    affiliate_link: '',
    image_url: '',
    badge: 'NEW',
    features: ['']
  });

  const handleAddFeature = () => setFormData({ ...formData, features: [...formData.features, ''] });
  
  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features];
    newFeatures[index] = value;
    setFormData({ ...formData, features: newFeatures });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/admin/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/admin/products');
      } else {
        alert('Failed to save product.');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl space-y-8 animate-slide-up">
      <div>
        <h2 className="text-2xl font-bold text-white">Add New Product</h2>
        <p className="text-[#64748b]">Upload a new security camera or doorbell to your affiliate listings.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Product Name</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-[#10b981]"
              placeholder="e.g. Ring Video Doorbell 4"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Category</label>
            <select
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-[#10b981]"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option>Security Cameras</option>
              <option>Video Doorbells</option>
              <option>NVR Systems</option>
              <option>Smart Locks</option>
              <option>Sensors & Alarms</option>
              <option>Accessories</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Current Price</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none"
              placeholder="e.g. ₹13,999"
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Original Price (optional)</label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none"
              placeholder="e.g. ₹17,999"
              onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Affiliate Link</label>
            <input
              type="url"
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none"
              placeholder="https://amzn.to/..."
              onChange={(e) => setFormData({ ...formData, affiliate_link: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Image URL</label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none"
              placeholder="https://images.unsplash.com/..."
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-white mb-2">Key Features (Pills)</label>
          <div className="space-y-3">
            {formData.features.map((feature, index) => (
              <input
                key={index}
                type="text"
                className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white outline-none"
                placeholder="e.g. 1080p HD Video"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
              />
            ))}
            <button
              type="button"
              onClick={handleAddFeature}
              className="text-xs text-[#10b981] hover:underline"
            >
              + Add another feature
            </button>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button type="submit" disabled={loading} className="btn-primary-emerald px-10">
            {loading ? 'Adding...' : 'Add Product'}
          </button>
          <Link href="/admin/products" className="btn-secondary px-10">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
