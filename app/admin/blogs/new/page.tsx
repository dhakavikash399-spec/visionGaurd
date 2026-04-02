'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function NewBlogPage() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'reviews',
    excerpt: '',
    content: '',
    author_name: 'Vikash Dhaka Admin',
    read_time: '5 min',
    tags: [] as string[]
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/admin/blogs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/admin/blogs');
      } else {
        alert('Failed to save article.');
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
        <h2 className="text-2xl font-bold text-white">Write New Article</h2>
        <p className="text-[#64748b]">Share your expert security advice and product reviews.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Title</label>
            <input
              type="text"
              required
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#00d4ff] outline-none"
              placeholder="e.g. Best 2026 Doorbell Review"
              onChange={(e) => {
                const title = e.target.value;
                const slug = title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]/g, '');
                setFormData({ ...formData, title, slug });
              }}
            />
          </div>
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Slug (URL)</label>
            <input
              type="text"
              required
              readOnly
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-[#64748b]"
              value={formData.slug}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Category</label>
            <select
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#00d4ff] outline-none"
              value={formData.category}
              onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            >
              <option value="reviews">Product Reviews</option>
              <option value="guides">Buying Guides</option>
              <option value="installation">Installation Tips</option>
              <option value="smart-home">Smart Home</option>
              <option value="security-tips">Security Tips</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Estimated Read Time</label>
            <input
              type="text"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none"
              value={formData.read_time}
              onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-white mb-2">Excerpt</label>
          <textarea
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none h-24 resize-none"
            placeholder="A short summary for the card..."
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-white mb-2">Article Content</label>
          <textarea
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none h-96 font-mono text-sm"
            placeholder="Write your article here..."
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button type="submit" disabled={loading} className="btn-primary px-10">
            {loading ? 'Saving...' : 'Publish Article'}
          </button>
          <Link href="/admin/blogs" className="btn-secondary px-10">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
