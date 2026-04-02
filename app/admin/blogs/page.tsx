'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ManageBlogsPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const loadBlogs = () => {
    setLoading(true);
    fetch('/api/admin/blogs')
      .then(res => res.json())
      .then(data => { setBlogs(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  };

  useEffect(() => { loadBlogs(); }, []);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Articles</h2>
          <p className="text-[#64748b] text-sm">Create and modify your security reviews and guides.</p>
        </div>
        <Link href="/admin/blogs/new" className="btn-primary">
          + Write New Article
        </Link>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/5 text-[#94a3b8] text-xs uppercase tracking-widest font-bold">
              <th className="px-6 py-4">Article Title</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Author</th>
              <th className="px-6 py-4">Date</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {blogs.length > 0 ? blogs.map((blog: any) => (
              <tr key={blog.id} className="hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4">
                  <span className="text-white font-medium text-sm block truncate max-w-xs">{blog.title}</span>
                  <span className="text-[10px] text-[#475569]">{blog.slug}</span>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-md bg-[#00d4ff]/10 text-[#00d4ff] text-[10px] font-bold uppercase">
                    {blog.category}
                  </span>
                </td>
                <td className="px-6 py-4 text-[#94a3b8] text-sm">{blog.author_name}</td>
                <td className="px-6 py-4 text-[#64748b] text-xs">
                  {blog.published_at ? new Date(blog.published_at).toLocaleDateString() : '—'}
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  <Link
                    href={`/admin/blogs/${blog.id}/edit`}
                    className="inline-text-btn text-[#64748b] hover:text-[#00d4ff] transition-colors text-sm font-medium"
                  >
                    Edit
                  </Link>
                  <DeleteBlogButton
                    id={blog.id}
                    title={blog.title}
                    onDeleted={() => setBlogs(prev => prev.filter(b => b.id !== blog.id))}
                  />
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-[#475569] text-sm italic">
                  {loading ? 'Fetching blogs...' : 'No articles found. Write your first one!'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DeleteBlogButton({
  id, title, onDeleted,
}: { id: number; title: string; onDeleted: () => void }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Delete "${title}"?\n\nThis action cannot be undone.`)) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/blogs/${id}`, { method: 'DELETE' });
      if (res.ok) onDeleted();
      else alert('Failed to delete article.');
    } catch {
      alert('Network error. Please try again.');
    } finally {
      setDeleting(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={deleting}
      className="text-[#64748b] hover:text-red-400 transition-colors text-sm font-medium disabled:opacity-40"
    >
      {deleting ? '…' : 'Delete'}
    </button>
  );
}
