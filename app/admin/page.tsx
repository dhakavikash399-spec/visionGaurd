"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ blogs: 0, products: 0 });
  const [recentBlogs, setRecentBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/stats")
      .then(res => res.json())
      .then(data => {
        setStats(data.stats);
        setRecentBlogs(data.recentBlogs || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading dashboard stats...</div>;

  return (
    <div className="space-y-12 animate-fade-in">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass-card p-8 flex items-center justify-between group">
          <div>
            <p className="text-[#64748b] text-sm mb-1 uppercase tracking-wider font-bold">Total Articles</p>
            <h3 className="text-4xl font-black text-white">{stats.blogs}</h3>
          </div>
          <div className="text-4xl opacity-20 group-hover:opacity-100 transition-all">📝</div>
        </div>
        
        <div className="glass-card p-8 flex items-center justify-between group">
          <div>
            <p className="text-[#64748b] text-sm mb-1 uppercase tracking-wider font-bold">Total Products</p>
            <h3 className="text-4xl font-black text-white">{stats.products}</h3>
          </div>
          <div className="text-4xl opacity-20 group-hover:opacity-100 transition-all">📦</div>
        </div>

        <div className="glass-card p-8 flex items-center justify-between group overflow-hidden relative">
          <div className="relative z-10">
            <p className="text-[#64748b] text-sm mb-1 uppercase tracking-wider font-bold">Account Balance</p>
            <h3 className="text-4xl font-black text-[#10b981]">$0.00</h3>
          </div>
          <div className="text-4xl opacity-20 group-hover:opacity-100 transition-all">💰</div>
        </div>
      </div>

      {/* Tables Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="glass-card p-8">
          <div className="flex justify-between items-center mb-6">
            <h4 className="text-lg font-bold text-white">Recent Articles</h4>
            <Link href="/admin/blogs" className="text-xs text-[#00d4ff] hover:underline">Manage All</Link>
          </div>
          <div className="space-y-4">
            {recentBlogs.length > 0 ? recentBlogs.map((blog: any) => (
              <div key={blog.slug} className="flex justify-between items-center p-4 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all">
                <span className="text-sm font-medium text-white truncate mr-4">{blog.title}</span>
                <span className="text-xs text-[#475569] shrink-0">{new Date(blog.published_at).toLocaleDateString()}</span>
              </div>
            )) : <p className="text-[#475569] text-sm py-4">No articles added yet.</p>}
          </div>
        </div>

        <div className="glass-card p-8">
          <h4 className="text-lg font-bold text-white mb-6">Quick Actions</h4>
          <div className="grid grid-cols-2 gap-4">
            <Link href="/admin/blogs/new" className="p-6 rounded-2xl bg-gradient-to-br from-[#00d4ff]/20 to-transparent border border-[#00d4ff]/30 text-center hover:scale-[1.02] transition-all">
              <span className="block text-2xl mb-2">➕</span>
              <span className="text-sm font-bold text-white">New Article</span>
            </Link>
            <Link href="/admin/products/new" className="p-6 rounded-2xl bg-gradient-to-br from-[#10b981]/20 to-transparent border border-[#10b981]/30 text-center hover:scale-[1.02] transition-all">
              <span className="block text-2xl mb-2">🏷️</span>
              <span className="text-sm font-bold text-white">Add Product</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
