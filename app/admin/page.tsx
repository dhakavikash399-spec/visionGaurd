'use client';

import { useState, useEffect, useRef } from 'react';
import { signOut, useSession } from 'next-auth/react';
import { isAdmin as checkIsAdmin, getAdminStats, fetchBlogsByStatus } from '@/lib/db/queries/admin';
import { approveBlog, rejectBlog, deleteBlog } from '@/lib/db/queries/blogs';
import AdminLogin from '@/components/AdminLogin';
import ProfileHeader from '@/components/ProfileHeader';
import Link from 'next/link';
import { uploadProductImage } from '@/lib/upload';

type BlogStatus = 'pending' | 'published' | 'rejected' | 'draft';
type MainTab = 'blogs' | 'products' | 'messages';

import {
    fetchAllProductsForAdmin,
    createProduct,
    updateProduct,
    deleteProduct
} from '@/lib/db/queries/products';
import {
    fetchContactMessages,
    updateMessageStatus
} from '@/lib/db/queries/contact';
import type { AffiliateProduct } from '@/lib/db/queries/products';

export default function AdminPage() {
    const { data: session, status: sessionStatus } = useSession();
    const [authenticated, setAuthenticated] = useState(false);
    const [user, setUser] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [mainTab, setMainTab] = useState<MainTab>('blogs');
    const [activeTab, setActiveTab] = useState<BlogStatus>('pending');
    const [blogs, setBlogs] = useState<any[]>([]);
    const [products, setProducts] = useState<AffiliateProduct[]>([]);
    const [messages, setMessages] = useState<any[]>([]);
    const [stats, setStats] = useState({
        total: 0,
        pending: 0,
        published: 0,
        rejected: 0,
        draft: 0,
    });
    const [processing, setProcessing] = useState<string | null>(null);

    const [showProductModal, setShowProductModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<AffiliateProduct | null>(null);
    const [productForm, setProductForm] = useState<Omit<AffiliateProduct, 'id'>>({
        name: '',
        description: '',
        price: '',
        imageUrl: '',
        affiliateLink: '',
        destinations: [],
        features: [],
        category: '',
        originalPrice: '',
        rating: 4.5,
        reviewCount: 0,
        badge: '',
        isActive: true,
    });
    const [imageUploading, setImageUploading] = useState(false);
    const [imageUploadProgress, setImageUploadProgress] = useState(0);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const productImageInputRef = useRef<HTMLInputElement>(null);

    // Check admin access via NextAuth session
    useEffect(() => {
        if (status === 'loading') return;
        const sessionUser = session?.user as any;

        const verifyAdmin = async () => {
            if (sessionUser) {
                const isUserAdmin = await checkIsAdmin(sessionUser.role);
                if (isUserAdmin) {
                    setAuthenticated(true);
                    setUser(sessionUser);
                    return;
                }
            }
            setAuthenticated(false);
        };

        verifyAdmin();
        setLoading(false);
    }, [status, session]);

    useEffect(() => {
        if (authenticated) {
            if (mainTab === 'blogs') {
                loadStats();
                loadBlogs();
            } else if (mainTab === 'products') {
                loadProducts();
            } else if (authenticated && mainTab === 'messages') {
                loadMessages();
            }
        }
    }, [authenticated, mainTab, activeTab]);

    const loadStats = async () => {
        const adminStats = await getAdminStats();
        setStats(adminStats);
    };

    const loadBlogs = async () => {
        const blogsData = await fetchBlogsByStatus(activeTab);
        setBlogs(blogsData);
    };

    const loadProducts = async () => {
        const productsData = await fetchAllProductsForAdmin();
        setProducts(productsData);
    };

    const loadMessages = async () => {
        const messagesData = await fetchContactMessages();
        setMessages(messagesData);
    };

    const handleUpdateMessageStatus = async (id: string, status: string) => {
        setProcessing(id);
        try {
            const result = await updateMessageStatus(id, status);
            if (result.success) {
                await loadMessages();
            } else {
                alert('Failed to update status');
            }
        } catch (error) {
            console.error('Error updating message status:', error);
        } finally {
            setProcessing(null);
        }
    };

    const handleProductImageUpload = async (file: File) => {
        setImageUploading(true);
        setImageUploadProgress(0);
        try {
            const url = await uploadProductImage(file, (percent) => {
                setImageUploadProgress(percent);
            });
            setProductForm(prev => ({ ...prev, imageUrl: url }));
            setImagePreview(url);
        } catch (error: any) {
            alert('Image upload failed: ' + (error.message || 'Unknown error'));
        } finally {
            setImageUploading(false);
            setImageUploadProgress(0);
        }
    };

    const handleProductSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!productForm.imageUrl) {
            alert('Please upload a product image first.');
            return;
        }
        setProcessing('product-form');
        try {
            if (editingProduct) {
                const { error } = await updateProduct(editingProduct.id, productForm);
                if (error) throw error;
            } else {
                const { error } = await createProduct(productForm);
                if (error) throw error;
            }
            setShowProductModal(false);
            setEditingProduct(null);
            setProductForm({
                name: '',
                description: '',
                price: '',
                imageUrl: '',
                affiliateLink: '',
                destinations: [],
                features: [],
                category: '',
                originalPrice: '',
                rating: 4.5,
                reviewCount: 0,
                badge: '',
                isActive: true,
            });
            setImagePreview(null);
            await loadProducts();
        } catch (error: any) {
            alert(error.message || 'Error saving product');
        } finally {
            setProcessing(null);
        }
    };

    const handleDeleteProduct = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;
        setProcessing(id);
        try {
            const { error } = await deleteProduct(id);
            if (error) throw error;
            await loadProducts();
        } catch (error: any) {
            alert(error.message || 'Error deleting product');
        } finally {
            setProcessing(null);
        }
    };

    const openEditProduct = (product: AffiliateProduct) => {
        setEditingProduct(product);
        setProductForm({
            name: product.name,
            description: product.description || '',
            price: product.price,
            imageUrl: product.imageUrl,
            affiliateLink: product.affiliateLink,
            destinations: product.destinations,
            features: product.features || [],
            category: product.category || '',
            originalPrice: product.originalPrice || '',
            rating: typeof product.rating === 'number' ? product.rating : 4.5,
            reviewCount: typeof product.reviewCount === 'number' ? product.reviewCount : 0,
            badge: product.badge || '',
            isActive: product.isActive,
        });
        setImagePreview(product.imageUrl || null);
        setShowProductModal(true);
    };

    const handleApprove = async (blogId: string) => {
        setProcessing(blogId);
        try {
            const result = await approveBlog(blogId);
            if (result.success) {
                await loadBlogs();
                await loadStats();
            } else {
                alert('Failed to approve blog');
            }
        } catch (error) {
            console.error('Error approving blog:', error);
            alert('An error occurred');
        } finally {
            setProcessing(null);
        }
    };

    const handleReject = async (blogId: string) => {
        if (!confirm('Are you sure you want to reject this blog?')) {
            return;
        }

        setProcessing(blogId);
        try {
            const result = await rejectBlog(blogId);
            if (result.success) {
                await loadBlogs();
                await loadStats();
            } else {
                alert('Failed to reject blog');
            }
        } catch (error) {
            console.error('Error rejecting blog:', error);
            alert('An error occurred');
        } finally {
            setProcessing(null);
        }
    };

    const handleDeleteBlog = async (blogId: string, blogTitle: string) => {
        if (!confirm(`Are you sure you want to PERMANENTLY DELETE this blog?\n\n"${blogTitle}"\n\nThis action cannot be undone!`)) {
            return;
        }

        setProcessing(blogId);
        try {
            const result = await deleteBlog(blogId);
            if (result.success) {
                await loadBlogs();
                await loadStats();
            } else {
                alert('Failed to delete blog: ' + result.error);
            }
        } catch (error) {
            console.error('Error deleting blog:', error);
            alert('An error occurred');
        } finally {
            setProcessing(null);
        }
    };

    const handleLogout = async () => {
        await signOut({ redirect: false });
        setAuthenticated(false);
        setBlogs([]);
        setStats({
            total: 0,
            pending: 0,
            published: 0,
            rejected: 0,
            draft: 0,
        });
    };

    if (!authenticated) {
        return <AdminLogin onLoginSuccess={() => setAuthenticated(true)} />;
    }

    return (
        <div className="min-h-screen bg-[#0a0e17]">
            {/* Header */}
            <div className="bg-[#0f172a]/50 backdrop-blur-xl border-b border-white/5 pt-10">
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-4xl font-black text-white tracking-tight mb-2">
                                Admin <span className="text-[#00d4ff]">Dashboard</span>
                            </h1>
                            <p className="text-gray-400 font-medium">
                                System management and content control panel.
                            </p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link
                                href="/submit"
                                className="px-5 py-2.5 bg-[#00d4ff] hover:bg-[#00d4ff]/90 text-[#0a0e17] rounded-xl transition-all font-bold shadow-lg shadow-[#00d4ff]/20"
                            >
                                Create New Blog
                            </Link>
                            <Link
                                href="/"
                                className="px-5 py-2.5 bg-white/5 hover:bg-white/10 text-white rounded-xl border border-white/10 transition-all font-medium"
                            >
                                View Website ↗
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="px-5 py-2.5 bg-red-500/10 hover:bg-red-500/20 text-red-500 rounded-xl border border-red-500/20 transition-all font-bold"
                            >
                                Logout
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Profile Header */}
            <div className="max-w-7xl mx-auto px-4 mt-6">
                {user && (
                    <ProfileHeader
                        userId={user.id}
                        email={user.email}
                        onProfileUpdate={loadBlogs}
                    />
                )}
            </div>

            {/* Main Tabs */}
            <div className="max-w-7xl mx-auto px-4 mt-6">
                <div className="flex bg-white/5 p-1 rounded-xl border border-white/10 w-fit">
                    <button
                        onClick={() => setMainTab('blogs')}
                        className={`px-6 py-2 rounded-lg font-bold transition-all ${mainTab === 'blogs' ? 'bg-[#00d4ff] text-[#0a0e17] shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        Blogs
                    </button>
                    <button
                        onClick={() => setMainTab('products')}
                        className={`px-6 py-2 rounded-lg font-bold transition-all ${mainTab === 'products' ? 'bg-[#00d4ff] text-[#0a0e17] shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        Products
                    </button>
                    <button
                        onClick={() => setMainTab('messages')}
                        className={`px-6 py-2 rounded-lg font-bold transition-all ${mainTab === 'messages' ? 'bg-[#00d4ff] text-[#0a0e17] shadow-lg' : 'text-gray-400 hover:text-white hover:bg-white/5'
                            }`}
                    >
                        Messages
                    </button>
                </div>
            </div>

            {mainTab === 'blogs' && (
                <>
                    {/* Stats */}
                    <div className="max-w-7xl mx-auto px-4 py-6">
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
                            <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-5 border border-white/10">
                                <div className="text-gray-500 text-[10px] font-bold uppercase tracking-widest mb-1">Total Content</div>
                                <div className="text-3xl font-black text-white">{stats.total}</div>
                            </div>
                            <div className="bg-yellow-500/5 backdrop-blur-lg rounded-2xl p-5 border border-yellow-500/20">
                                <div className="text-yellow-500/50 text-[10px] font-bold uppercase tracking-widest mb-1">Pending Review</div>
                                <div className="text-3xl font-black text-yellow-500">{stats.pending}</div>
                            </div>
                            <div className="bg-[#00d4ff]/5 backdrop-blur-lg rounded-2xl p-5 border border-[#00d4ff]/20">
                                <div className="text-[#00d4ff]/50 text-[10px] font-bold uppercase tracking-widest mb-1">Live Guides</div>
                                <div className="text-3xl font-black text-[#00d4ff]">{stats.published}</div>
                            </div>
                            <div className="bg-red-500/5 backdrop-blur-lg rounded-2xl p-5 border border-red-500/20">
                                <div className="text-red-500/50 text-[10px] font-bold uppercase tracking-widest mb-1">Rejected</div>
                                <div className="text-3xl font-black text-red-500">{stats.rejected}</div>
                            </div>
                            <div className="bg-gray-500/5 backdrop-blur-lg rounded-2xl p-5 border border-gray-500/20">
                                <div className="text-gray-500/50 text-[10px] font-bold uppercase tracking-widest mb-1">Drafts</div>
                                <div className="text-3xl font-black text-gray-400">{stats.draft}</div>
                            </div>
                        </div>

                        {/* Tabs */}
                        <div className="bg-white/5 backdrop-blur-lg rounded-xl p-1.5 mb-8 border border-white/10 w-fit">
                            <div className="flex gap-2">
                                {(['pending', 'published', 'rejected', 'draft'] as BlogStatus[]).map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={`px-6 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all ${activeTab === tab
                                            ? 'bg-[#00d4ff] text-[#0a0e17]'
                                            : 'text-gray-400 hover:text-white hover:bg-white/5'
                                            }`}
                                    >
                                        {tab} ({tab === 'pending' ? stats.pending : tab === 'published' ? stats.published : tab === 'rejected' ? stats.rejected : stats.draft})
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Blogs List */}
                        <div className="space-y-4">
                            {blogs.length === 0 ? (
                                <div className="bg-white/10 backdrop-blur-lg rounded-lg p-12 text-center border border-white/20">
                                    <p className="text-gray-300 text-lg">
                                        No blogs found
                                    </p>
                                </div>
                            ) : (
                                blogs.map((blog) => (
                                    <div
                                        key={blog.id}
                                        className="bg-white/10 backdrop-blur-lg rounded-lg p-6 border border-white/20 hover:bg-white/15 transition-all"
                                    >
                                        <div className="flex flex-col md:flex-row gap-4">
                                            {/* Cover Image */}
                                            <div className="w-full md:w-48 h-32 flex-shrink-0">
                                                <img
                                                    src={blog.cover_image || '/images/jaipur-hawa-mahal.webp'}
                                                    alt={blog.title_en}
                                                    className="w-full h-full object-cover rounded-lg"
                                                />
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div>
                                                        <h3 className="text-xl font-bold text-white mb-1">
                                                            {blog.title_en}
                                                        </h3>
                                                        <p className="text-gray-300 text-sm mb-2">
                                                            {blog.excerpt_en || 'No excerpt'}
                                                        </p>
                                                    </div>
                                                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${blog.status === 'pending' ? 'bg-yellow-500/20 text-yellow-300' :
                                                        blog.status === 'published' ? 'bg-green-500/20 text-green-300' :
                                                            blog.status === 'rejected' ? 'bg-red-500/20 text-red-300' :
                                                                'bg-gray-500/20 text-gray-300'
                                                        }`}>
                                                        {blog.status}
                                                    </span>
                                                </div>

                                                    <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-4">
                                                        <span>Category: {blog.category}</span>
                                                        <span>Tag: {blog.destination || 'N/A'}</span>
                                                        <span>
                                                            Created: {new Date(blog.created_at).toLocaleDateString()}
                                                        </span>
                                                        {blog.author && (
                                                            <span>
                                                                Author: {typeof blog.author === 'object' ? blog.author.name : 'Unknown'}
                                                            </span>
                                                        )}
                                                    </div>

                                                {/* Actions */}
                                                {activeTab === 'pending' && (
                                                    <div className="flex flex-wrap gap-3">
                                                            <button
                                                                onClick={() => handleApprove(blog.id)}
                                                                disabled={processing === blog.id}
                                                                className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                                            >
                                                                {processing === blog.id ? 'Processing...' : 'Approve'}
                                                            </button>
                                                            <button
                                                                onClick={() => handleReject(blog.id)}
                                                                disabled={processing === blog.id}
                                                                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                                            >
                                                                Reject
                                                            </button>
                                                            <Link
                                                                href={`/blogs/${blog.slug || blog.id}/`}
                                                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all"
                                                            >
                                                                View
                                                            </Link>
                                                            <button
                                                                onClick={() => handleDeleteBlog(blog.id, blog.title_en)}
                                                                disabled={processing === blog.id}
                                                                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                                            >
                                                                Delete
                                                            </button>
                                                    </div>
                                                )}

                                                {activeTab !== 'pending' && (
                                                    <div className="flex flex-wrap gap-3">
                                                            <Link
                                                                href={`/blogs/${blog.slug || blog.id}/`}
                                                                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-all"
                                                            >
                                                                View
                                                            </Link>
                                                            <Link
                                                                href={`/edit/${blog.slug || blog.id}`}
                                                                className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg font-semibold transition-all"
                                                            >
                                                                Edit
                                                            </Link>
                                                            {activeTab === 'rejected' && (
                                                                <button
                                                                    onClick={() => handleApprove(blog.id)}
                                                                    disabled={processing === blog.id}
                                                                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                                                >
                                                                    Approve
                                                                </button>
                                                            )}
                                                            <button
                                                                onClick={() => handleDeleteBlog(blog.id, blog.title_en)}
                                                                disabled={processing === blog.id}
                                                                className="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-lg font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                                            >
                                                                Delete
                                                            </button>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </div>
                </>
            )}

            {mainTab === 'products' && (
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">Manage Affiliate Products</h2>
                        <button
                            onClick={() => {
                                setEditingProduct(null);
                                setProductForm({
                                    name: '',
                                    description: '',
                                    price: '',
                                    imageUrl: '',
                                    affiliateLink: '',
                                    destinations: [],
                                    isActive: true,
                                });
                                setImagePreview(null);
                                setShowProductModal(true);
                            }}
                            className="px-6 py-2 bg-[#00d4ff] hover:bg-[#00d4ff]/90 text-[#0a0e17] font-bold rounded-lg transition-all shadow-lg shadow-[#00d4ff]/10"
                        >
                            Add New Product
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {products.length === 0 ? (
                            <div className="col-span-full py-12 text-center bg-white/10 rounded-xl border border-white/20">
                                <p className="text-gray-300">No products found</p>
                            </div>
                        ) : (
                            products.map((product) => (
                                <div key={product.id} className="bg-white/10 backdrop-blur-lg rounded-xl overflow-hidden border border-white/20">
                                    <div className="aspect-square relative">
                                        <img
                                            src={product.imageUrl || '/images/pushkar.webp'}
                                            alt={product.name}
                                            className="w-full h-full object-cover"
                                        />
                                        {!product.isActive && (
                                            <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                                                <span className="px-3 py-1 bg-red-600 text-white rounded-full text-xs font-bold uppercase tracking-wider">
                                                    Inactive
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                    <div className="p-4">
                                        <h3 className="text-white font-bold text-lg mb-1 truncate">{product.name}</h3>
                                        <p className="text-desert-gold font-bold mb-2">{product.price}</p>
                                        <div className="flex flex-wrap gap-1 mb-4">
                                            {product.destinations.map(d => (
                                                <span key={d} className="px-2 py-0.5 bg-white/10 text-gray-300 text-xs rounded-full">
                                                    {d}
                                                </span>
                                            ))}
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => openEditProduct(product)}
                                                className="flex-1 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-semibold rounded-lg transition-all border border-white/10"
                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={() => handleDeleteProduct(product.id)}
                                                disabled={processing === product.id}
                                                className="flex-1 py-2 bg-red-600/10 hover:bg-red-600/20 text-red-400 text-sm font-semibold rounded-lg transition-all border border-red-500/10"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}

            {mainTab === 'messages' && (
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-white">Contact Messages</h2>
                        <button
                            onClick={loadMessages}
                            className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-all flex items-center gap-2"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                            Refresh
                        </button>
                    </div>

                    <div className="space-y-4">
                        {messages.length === 0 ? (
                            <div className="bg-white/10 backdrop-blur-lg rounded-lg p-12 text-center border border-white/20">
                                <p className="text-gray-300 text-lg">
                                    No messages found
                                </p>
                            </div>
                        ) : (
                            messages.map((msg) => (
                                <div
                                    key={msg.id}
                                    className={`bg-white/10 backdrop-blur-lg rounded-lg p-6 border transition-all ${msg.status === 'new' ? 'border-desert-gold/50 bg-white/15' : 'border-white/20'
                                        }`}
                                >
                                    <div className="flex flex-col md:flex-row justify-between gap-4">
                                        <div className="flex-1">
                                            <div className="flex items-center gap-3 mb-2">
                                                <h3 className="text-xl font-bold text-white">{msg.subject}</h3>
                                                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${msg.status === 'new' ? 'bg-desert-gold text-black' : 'bg-gray-500 text-white'
                                                    }`}>
                                                    {msg.status}
                                                </span>
                                            </div>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 text-sm text-gray-400 mb-4">
                                                <p><span className="text-gray-500">From:</span> <span className="text-white">{msg.name}</span> ({msg.email})</p>
                                                <p><span className="text-gray-500">Date:</span> {new Date(msg.created_at).toLocaleString()}</p>
                                            </div>
                                            <div className="bg-black/20 rounded-lg p-4 text-gray-200 whitespace-pre-wrap italic border border-white/5">
                                                "{msg.message}"
                                            </div>
                                        </div>
                                        <div className="flex flex-row md:flex-col gap-2 justify-end">
                                            {msg.status === 'new' ? (
                                                <button
                                                    onClick={() => handleUpdateMessageStatus(msg.id, 'read')}
                                                    disabled={processing === msg.id}
                                                    className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold transition-all disabled:opacity-50"
                                                >
                                                    Mark as Read
                                                </button>
                                            ) : (
                                                <button
                                                    onClick={() => handleUpdateMessageStatus(msg.id, 'new')}
                                                    disabled={processing === msg.id}
                                                    className="px-4 py-2 bg-white/5 hover:bg-white/10 text-white rounded-lg text-sm font-semibold transition-all border border-white/10"
                                                >
                                                    Mark as Unread
                                                </button>
                                            )}
                                            <a
                                                href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                                                className="px-4 py-2 bg-[#00d4ff] hover:bg-[#00d4ff]/90 text-[#0a0e17] rounded-lg text-sm font-bold transition-all text-center"
                                            >
                                                Reply via Email
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}
