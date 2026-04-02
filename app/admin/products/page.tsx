'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function ManageProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/admin/products')
      .then(res => res.json())
      .then(data => { setProducts(Array.isArray(data) ? data : []); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white">Products</h2>
          <p className="text-[#64748b] text-sm">Manage your affiliate product listings and pricing.</p>
        </div>
        <Link href="/admin/products/new" className="btn-primary">
          + Add New Product
        </Link>
      </div>

      <div className="glass-card overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/5 text-[#94a3b8] text-xs uppercase tracking-widest font-bold">
              <th className="px-6 py-4">Product Name</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">Rating</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {products.length > 0 ? products.map((product: any) => (
              <tr key={product.id} className="hover:bg-white/5 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-xl overflow-hidden flex-shrink-0">
                      {product.image_url
                        ? <img src={product.image_url} alt="" className="w-full h-full object-cover" />
                        : '📦'}
                    </div>
                    <div>
                      <span className="text-white font-medium text-sm block truncate max-w-xs">{product.name}</span>
                      <span className="text-[10px] text-[#475569]">{product.badge || 'No Badge'}</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-md bg-[#10b981]/10 text-[#10b981] text-[10px] font-bold uppercase">
                    {product.category}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <span className="text-white text-sm font-bold">{product.price}</span>
                  {product.original_price && (
                    <span className="text-[#475569] text-[10px] line-through ml-2">{product.original_price}</span>
                  )}
                </td>
                <td className="px-6 py-4 text-[#94a3b8] text-sm">
                  ⭐ {product.rating} <span className="text-[#475569] text-xs">({product.review_count})</span>
                </td>
                <td className="px-6 py-4 text-right space-x-3">
                  <Link
                    href={`/admin/products/${product.id}/edit`}
                    className="text-[#64748b] hover:text-[#00d4ff] transition-colors text-sm font-medium"
                  >
                    Edit
                  </Link>
                  <DeleteProductButton
                    id={product.id}
                    name={product.name}
                    onDeleted={() => setProducts(prev => prev.filter(p => p.id !== product.id))}
                  />
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={5} className="px-6 py-12 text-center text-[#475569] text-sm italic">
                  {loading ? 'Fetching products...' : 'No products listed yet.'}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function DeleteProductButton({
  id, name, onDeleted,
}: { id: number; name: string; onDeleted: () => void }) {
  const [deleting, setDeleting] = useState(false);

  const handleDelete = async () => {
    if (!confirm(`Delete "${name}"?\n\nThis action cannot be undone.`)) return;
    setDeleting(true);
    try {
      const res = await fetch(`/api/admin/products/${id}`, { method: 'DELETE' });
      if (res.ok) onDeleted();
      else alert('Failed to delete product.');
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
