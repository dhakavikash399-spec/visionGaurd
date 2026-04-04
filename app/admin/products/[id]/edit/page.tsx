'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function EditProductPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Indoor Cameras',
    description: '',
    price: '',
    original_price: '',
    rating: 4.5,
    review_count: 0,
    affiliate_link: '',
    image_url: '',
    badge: 'NEW',
    features: [''] as string[],
  });

  // Pre-fill form with existing product data
  useEffect(() => {
    fetch(`/api/admin/products/${id}`)
      .then(async (res) => {
        if (!res.ok) { setNotFound(true); return; }
        const data = await res.json();
        setFormData({
          name:           data.name           || '',
          category:       data.category       || 'Indoor Cameras',
          description:    data.description    || '',
          price:          data.price          || '',
          original_price: data.original_price || '',
          rating:         data.rating         ?? 4.5,
          review_count:   data.review_count   ?? 0,
          affiliate_link: data.affiliate_link || '',
          image_url:      data.image_url      || '',
          badge:          data.badge          || 'NEW',
          features:       Array.isArray(data.features) && data.features.length > 0
                            ? data.features
                            : [''],
        });
      })
      .catch(() => setNotFound(true))
      .finally(() => setFetching(false));
  }, [id]);

  const handleAddFeature = () =>
    setFormData({ ...formData, features: [...formData.features, ''] });

  const handleRemoveFeature = (index: number) => {
    const next = formData.features.filter((_, i) => i !== index);
    setFormData({ ...formData, features: next.length > 0 ? next : [''] });
  };

  const handleFeatureChange = (index: number, value: string) => {
    const next = [...formData.features];
    next[index] = value;
    setFormData({ ...formData, features: next });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/products/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          features: formData.features.filter((f) => f.trim() !== ''),
        }),
      });

      if (res.ok) {
        router.push('/admin/products');
      } else {
        const err = await res.json();
        alert('Failed to update product: ' + (err.error || 'Unknown error'));
      }
    } catch (err) {
      console.error(err);
      alert('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="animate-pulse-glow w-10 h-10 rounded-xl bg-gradient-to-br from-[#00d4ff] to-[#10b981]" />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="text-center py-32">
        <p className="text-2xl text-red-400 font-bold mb-4">Product Not Found</p>
        <Link href="/admin/products" className="btn-secondary">← Back to Products</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8 animate-slide-up">
      <div>
        <h2 className="text-2xl font-bold text-white">Edit Product</h2>
        <p className="text-[#64748b]">Update product details, pricing, and affiliate link.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name & Category */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Product Name</label>
            <input
              type="text"
              required
              value={formData.name}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-[#10b981] transition-colors"
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Category</label>
            <select
              value={formData.category}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-[#10b981] transition-colors"
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option>Indoor Cameras</option>
              <option>Outdoor Cameras</option>
              <option>Doorbell Cameras</option>
              <option>Wireless Systems</option>
            </select>
          </div>
        </div>

        {/* Price & Original Price */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Current Price</label>
            <input
              type="text"
              required
              value={formData.price}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-[#10b981] transition-colors"
              placeholder="e.g. ₹13,999"
              onChange={(e) => setFormData({ ...formData, price: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Original Price (optional)</label>
            <input
              type="text"
              value={formData.original_price}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none"
              placeholder="e.g. ₹17,999"
              onChange={(e) => setFormData({ ...formData, original_price: e.target.value })}
            />
          </div>
        </div>

        {/* Rating & Review Count */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Rating (0–5)</label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="5"
              value={formData.rating}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-[#10b981] transition-colors"
              onChange={(e) => setFormData({ ...formData, rating: parseFloat(e.target.value) })}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Review Count</label>
            <input
              type="number"
              min="0"
              value={formData.review_count}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none"
              onChange={(e) => setFormData({ ...formData, review_count: parseInt(e.target.value) })}
            />
          </div>
        </div>

        {/* Affiliate Link & Image URL */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Affiliate Link</label>
            <input
              type="url"
              required
              value={formData.affiliate_link}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-[#10b981] transition-colors"
              placeholder="https://amzn.to/..."
              onChange={(e) => setFormData({ ...formData, affiliate_link: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Image URL</label>
            <input
              type="text"
              value={formData.image_url}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none"
              placeholder="https://images.unsplash.com/..."
              onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
            />
          </div>
        </div>

        {/* Badge & Description */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Badge</label>
            <select
              value={formData.badge}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none focus:border-[#10b981] transition-colors"
              onChange={(e) => setFormData({ ...formData, badge: e.target.value })}
            >
              <option value="NEW">NEW</option>
              <option value="BEST SELLER">BEST SELLER</option>
              <option value="TOP RATED">TOP RATED</option>
              <option value="DEAL">DEAL</option>
              <option value="EDITOR'S PICK">EDITOR'S PICK</option>
              <option value="">None</option>
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-white mb-2">Short Description</label>
            <textarea
              value={formData.description}
              rows={2}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none resize-none focus:border-[#10b981] transition-colors"
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>
        </div>

        {/* Features */}
        <div>
          <label className="block text-sm font-semibold text-white mb-2">Key Features</label>
          <div className="space-y-3">
            {formData.features.map((feature, index) => (
              <div key={index} className="flex gap-2">
                <input
                  type="text"
                  value={feature}
                  className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-lg text-white outline-none focus:border-[#10b981] transition-colors"
                  placeholder="e.g. 1080p HD Video"
                  onChange={(e) => handleFeatureChange(index, e.target.value)}
                />
                {formData.features.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveFeature(index)}
                    className="px-3 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors text-sm"
                  >
                    ✕
                  </button>
                )}
              </div>
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

        {/* Image preview */}
        {formData.image_url && (
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Image Preview</label>
            <img
              src={formData.image_url}
              alt="Product preview"
              className="h-32 w-auto rounded-xl object-cover border border-white/10"
              onError={(e) => (e.currentTarget.style.display = 'none')}
            />
          </div>
        )}

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            disabled={loading}
            className="btn-primary-emerald px-10 disabled:opacity-50"
          >
            {loading ? 'Saving Changes...' : '✓ Update Product'}
          </button>
          <Link href="/admin/products" className="btn-secondary px-10">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
