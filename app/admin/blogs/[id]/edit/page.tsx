'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import Link from 'next/link';

export default function EditBlogPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [notFound, setNotFound] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    slug: '',
    category: 'reviews',
    excerpt: '',
    content: '',
    author_name: '',
    read_time: '5 min',
    tags: [] as string[],
  });

  // Pre-fill form with existing blog data
  useEffect(() => {
    fetch(`/api/admin/blogs/${id}`)
      .then(async (res) => {
        if (!res.ok) { setNotFound(true); return; }
        const data = await res.json();
        setFormData({
          title:       data.title       || '',
          slug:        data.slug        || '',
          category:    data.category    || 'reviews',
          excerpt:     data.excerpt     || '',
          content:     data.content     || '',
          author_name: data.author_name || '',
          read_time:   data.read_time   || '5 min',
          tags:        data.tags        || [],
        });
      })
      .catch(() => setNotFound(true))
      .finally(() => setFetching(false));
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(`/api/admin/blogs/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        router.push('/admin/blogs');
      } else {
        const err = await res.json();
        alert('Failed to update article: ' + (err.error || 'Unknown error'));
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
        <p className="text-2xl text-red-400 font-bold mb-4">Article Not Found</p>
        <Link href="/admin/blogs" className="btn-secondary">← Back to Articles</Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl space-y-8 animate-slide-up">
      <div>
        <h2 className="text-2xl font-bold text-white">Edit Article</h2>
        <p className="text-[#64748b]">Update your security review or guide.</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Title</label>
            <input
              type="text"
              required
              value={formData.title}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#00d4ff] outline-none transition-colors"
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
              value={formData.slug}
              readOnly
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-[#64748b] cursor-not-allowed"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-semibold text-white mb-2">Category</label>
            <select
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#00d4ff] outline-none transition-colors"
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
            <label className="block text-sm font-semibold text-white mb-2">Read Time</label>
            <input
              type="text"
              value={formData.read_time}
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none"
              onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold text-white mb-2">Author Name</label>
          <input
            type="text"
            value={formData.author_name}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white focus:border-[#00d4ff] outline-none"
            onChange={(e) => setFormData({ ...formData, author_name: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-white mb-2">Excerpt</label>
          <textarea
            value={formData.excerpt}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none h-24 resize-none focus:border-[#00d4ff] transition-colors"
            placeholder="A short summary for the card..."
            onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-white mb-2">Article Content</label>
          <textarea
            value={formData.content}
            className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white outline-none h-96 font-mono text-sm focus:border-[#00d4ff] transition-colors resize-y"
            placeholder="Write your article here..."
            onChange={(e) => setFormData({ ...formData, content: e.target.value })}
          />
        </div>

        <div className="flex gap-4 pt-4">
          <button type="submit" disabled={loading} className="btn-primary px-10 disabled:opacity-50">
            {loading ? 'Saving Changes...' : '✓ Update Article'}
          </button>
          <Link href="/admin/blogs" className="btn-secondary px-10">Cancel</Link>
        </div>
      </form>
    </div>
  );
}
