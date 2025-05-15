"use client"

import React, { useEffect, useState, useMemo } from 'react'

import { motion } from 'framer-motion'

import { collection, getDocs, deleteDoc, doc } from 'firebase/firestore'

import { db } from '@/utils/firebase'

import { Article, Category } from '@/hooks/dashboard/admins/article/lib/schema'

import ArticleModal from '@/hooks/dashboard/admins/article/content/ArticleModal'

import Image from 'next/image'

import ArticleSkeleton from '@/hooks/dashboard/admins/article/ArticleSkelaton'

import { useAuth } from '@/utils/context/AuthContext'

import { toast } from 'react-hot-toast'

export default function ArticleLayout() {
    const { user, hasRole } = useAuth()
    const [articles, setArticles] = useState<Article[]>([])
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)
    const [selectedArticle, setSelectedArticle] = useState<Article | null>(null)
    const [deleteArticleId, setDeleteArticleId] = useState<string | null>(null)
    const [viewArticle, setViewArticle] = useState<Article | null>(null)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCategory, setSelectedCategory] = useState('')
    const [selectedStatus, setSelectedStatus] = useState('')

    useEffect(() => {
        fetchArticles()
        fetchCategories()
    }, [])

    const fetchArticles = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_ARTICLES!))
            const articlesData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Article))
            // Sort articles by createdAt in descending order (newest first)
            const sortedArticles = articlesData.sort((a, b) =>
                b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime()
            )
            setArticles(sortedArticles)
        } catch (error) {
            console.error('Error fetching articles:', error)
        } finally {
            setLoading(false)
        }
    }

    const fetchCategories = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_TAGS_ARTICLE!))
            const categoriesData = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            } as Category))
            setCategories(categoriesData)
        } catch (error) {
            console.error('Error fetching categories:', error)
        }
    }

    const handleDelete = async (id: string) => {
        try {
            await deleteDoc(doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_ARTICLES!, id))
            setArticles(articles.filter(article => article.id !== id))
            const deleteModal = document.getElementById('delete_modal') as HTMLDialogElement | null;
            deleteModal?.close();
            setDeleteArticleId(null);
        } catch (error) {
            console.error('Error deleting article:', error)
        }
    }

    const openDeleteModal = (id: string) => {
        setDeleteArticleId(id);
        const deleteModal = document.getElementById('delete_modal') as HTMLDialogElement | null;
        deleteModal?.showModal();
    }

    const handleEdit = (article: Article) => {
        // Check if user is the author or has admin/super-admin role
        if (article.author.uid !== user?.uid && !hasRole(['super-admins', 'admins'])) {
            toast.error('You can only edit your own articles');
            return;
        }

        setSelectedArticle(article)
        const modal = document.getElementById('article_modal') as HTMLDialogElement | null;
        modal?.showModal();
    }

    const handleView = (article: Article) => {
        setViewArticle(article);
        const viewModal = document.getElementById('view_modal') as HTMLDialogElement | null;
        viewModal?.showModal();
    }

    const refreshArticles = () => {
        fetchArticles();
    };

    const filteredArticles = articles.filter(article => {
        const matchesSearch = article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
            article.author?.name.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesCategory = selectedCategory ? article.category === selectedCategory : true;
        const matchesStatus = selectedStatus ? article.status === selectedStatus : true;

        return matchesSearch && matchesCategory && matchesStatus;
    });

    // Add new function to get unique categories
    const uniqueCategories = useMemo(() => {
        const categoryMap = new Map();
        categories.forEach(category => {
            if (!categoryMap.has(category.category)) {
                categoryMap.set(category.category, category);
            }
        });
        return Array.from(categoryMap.values());
    }, [categories]);

    if (loading) {
        return <ArticleSkeleton />
    }

    return (
        <section className='min-h-full py-0 px-0 sm:py-4 sm:px-4'>
            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white rounded-2xl border border-gray-100 p-6 mb-8"
            >
                <motion.div
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="space-y-1"
                >
                    <motion.h1
                        initial={{ y: -10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.3 }}
                        className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'
                    >
                        Article
                    </motion.h1>
                    <motion.p
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.4 }}
                        className='text-gray-500'
                    >
                        Manage and showcase your article
                    </motion.p>
                </motion.div>

                <motion.button
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                    onClick={() => {
                        setSelectedArticle(null);
                        const modal = document.getElementById('article_modal') as HTMLDialogElement | null;
                        modal?.showModal();
                    }}
                >
                    <motion.svg
                        initial={{ rotate: -180, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </motion.svg>
                    Add Article
                </motion.button>
            </motion.div>

            <motion.div
                initial={{ y: -20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-white rounded-2xl border border-gray-100 p-6 mb-8"
            >
                <div className="flex flex-col md:flex-row gap-4">
                    <div className="flex-1">
                        <div className="relative">
                            <input
                                type="text"
                                placeholder="Search articles..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-4 py-2 pl-10 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            />
                            <svg
                                className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                            </svg>
                        </div>
                    </div>
                    <div className="flex gap-4">
                        <select
                            value={selectedCategory}
                            onChange={(e) => setSelectedCategory(e.target.value)}
                            className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                            <option value="">All Categories</option>
                            {uniqueCategories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.category}
                                </option>
                            ))}
                        </select>
                        <select
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                            className="px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                        >
                            <option value="">All Status</option>
                            <option value="published">Published</option>
                            <option value="draft">Draft</option>
                        </select>
                    </div>
                </div>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredArticles.map((article) => (
                    <div key={article.id} className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden">
                        <div className="relative">
                            <Image
                                src={article.thumbnail}
                                alt={article.title}
                                className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-105"
                                width={400}
                                height={300}
                            />
                            <div className="absolute top-3 right-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${article.status === 'published'
                                    ? 'bg-green-100 text-green-800'
                                    : 'bg-yellow-100 text-yellow-800'
                                    }`}>
                                    {article.status}
                                </span>
                            </div>
                        </div>

                        <div className="p-5">
                            <h3 className="text-xl font-semibold mb-3 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                                {article.title}
                            </h3>

                            <div className="space-y-3 mb-4">
                                <div className="flex items-center gap-2 text-gray-600">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                            d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z" />
                                    </svg>
                                    <span className="text-sm">
                                        {article.category}
                                    </span>
                                </div>

                                <div className="flex items-center gap-3 py-2">
                                    <div className="relative">
                                        <Image
                                            src={article.author?.photoURL}
                                            alt={article.author?.name}
                                            className="w-8 h-8 rounded-full object-cover ring-2 ring-indigo-100 transition-transform duration-300 group-hover:scale-105"
                                            width={100}
                                            height={100}
                                        />
                                        <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full"></span>
                                    </div>

                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-gray-800 line-clamp-1">
                                            {article.author?.name}
                                        </span>
                                        <span className="text-xs text-gray-500">
                                            {article.createdAt?.toDate().toLocaleDateString()}
                                        </span>
                                    </div>
                                </div>

                                <p className="text-gray-600 text-sm line-clamp-2">
                                    {article.description}
                                </p>

                                <div className="flex flex-wrap gap-2 pt-2">
                                    {article.tags?.map((tag, index) => (
                                        <span key={index}
                                            className="text-xs bg-indigo-50 text-indigo-600 px-2.5 py-1 rounded-full hover:bg-indigo-100 transition-colors">
                                            #{tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            <div className="flex justify-end gap-2 pt-3 border-t">
                                <button
                                    onClick={() => handleView(article)}
                                    className="px-4 py-2 text-sm font-medium text-indigo-600 hover:text-indigo-700 hover:bg-indigo-50 rounded-lg transition-colors"
                                >
                                    View
                                </button>
                                <button
                                    onClick={() => openDeleteModal(article.id)}
                                    className="px-4 py-2 text-sm font-medium text-red-600 hover:text-red-700 hover:bg-red-50 rounded-lg transition-colors"
                                >
                                    Delete
                                </button>
                                <button
                                    onClick={() => handleEdit(article)}
                                    className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${article.author.uid === user?.uid || hasRole(['super-admins', 'admins'])
                                        ? 'text-white bg-indigo-600 hover:bg-indigo-700'
                                        : 'text-gray-400 bg-gray-100 cursor-not-allowed'
                                        }`}
                                    disabled={article.author.uid !== user?.uid && !hasRole(['super-admins', 'admins'])}
                                    title={article.author.uid === user?.uid || hasRole(['super-admins', 'admins'])
                                        ? "Edit article"
                                        : "You can only edit your own articles"}
                                >
                                    Edit
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredArticles.length === 0 && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-center py-12"
                >
                    <p className="text-gray-500">No articles found matching your criteria</p>
                </motion.div>
            )}

            <dialog id="delete_modal" className="modal">
                <div className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8"
                    >
                        <h3 className="text-xl font-bold text-slate-800 mb-3">Confirm Deletion</h3>
                        <p className="text-sm text-slate-600 mb-8">
                            Are you sure you want to delete this article? This action cannot be undone.
                        </p>
                        <div className="flex justify-end gap-4">
                            <button
                                className="px-5 py-2.5 text-slate-700 hover:bg-slate-100 rounded-xl transition-all duration-300 font-medium"
                                onClick={() => {
                                    const deleteModal = document.getElementById('delete_modal') as HTMLDialogElement | null;
                                    deleteModal?.close();
                                    setDeleteArticleId(null);
                                }}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-5 py-2.5 bg-red-500 hover:bg-red-600 text-white rounded-xl transition-all duration-300 font-medium"
                                onClick={() => deleteArticleId && handleDelete(deleteArticleId)}
                            >
                                Delete
                            </button>
                        </div>
                    </motion.div>
                </div>
            </dialog>

            <dialog id="view_modal" className="modal">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 bg-black/95 backdrop-blur-md z-[9999] overflow-y-auto scrollbar-thin scrollbar-track-gray-800/40 scrollbar-thumb-gray-600/40"
                    onClick={() => {
                        const viewModal = document.getElementById('view_modal') as HTMLDialogElement | null;
                        viewModal?.close();
                        setViewArticle(null);
                    }}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ type: "spring", duration: 0.5 }}
                        className="container mx-auto min-h-screen p-4 md:p-6 lg:p-8 flex items-center justify-center"
                        onClick={(e) => {
                            e.stopPropagation();
                            if (e.target === e.currentTarget) {
                                const viewModal = document.getElementById('view_modal') as HTMLDialogElement | null;
                                viewModal?.close();
                                setViewArticle(null);
                            }
                        }}
                    >
                        {viewArticle && (
                            <div className="relative w-full max-w-7xl bg-gradient-to-b from-gray-900/80 to-black/80 rounded-2xl shadow-2xl border border-gray-800/50 backdrop-blur-xl">
                                {/* URL Bar */}
                                <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-800/50 overflow-x-auto sm:overflow-x-hidden scrollbar-none">
                                    <div className="flex gap-2">
                                        <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
                                        <div className="w-3 h-3 rounded-full bg-yellow-500/80"></div>
                                        <div className="w-3 h-3 rounded-full bg-green-500/80"></div>
                                    </div>
                                    <div className="flex-1 flex items-center gap-2">
                                        <div className="flex-1 flex items-center px-4 py-1.5 bg-gray-900/50 rounded-lg border border-gray-700/50">
                                            <div className="flex items-center gap-2 text-gray-400 text-sm">
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                                                </svg>
                                                <span className="opacity-75 truncate">https://your-blog.com/articles/{viewArticle.slug}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-track-gray-800/40 scrollbar-thumb-gray-600/40">
                                    {/* Hero Image */}
                                    <div className="relative aspect-video w-full overflow-hidden">
                                        <Image
                                            src={viewArticle.thumbnail}
                                            alt={viewArticle.title}
                                            className="w-full h-full object-cover"
                                            width={500}
                                            height={500}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                                    </div>

                                    {/* Content Section with Glass Morphism */}
                                    <div className="grid md:grid-cols-2 gap-6 md:gap-8 p-4 md:p-6 bg-gradient-to-b from-gray-900/60 to-black/60 backdrop-blur-md">
                                        {/* Left Column */}
                                        <div className="space-y-6">
                                            {/* Author Info with Glass Effect */}
                                            <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/20 border border-gray-700/30 backdrop-blur-md">
                                                <Image
                                                    src={viewArticle.author?.photoURL}
                                                    alt={viewArticle.author?.name}
                                                    className="w-14 h-14 rounded-full ring-2 ring-indigo-500/30"
                                                    width={500}
                                                    height={500}
                                                />
                                                <div>
                                                    <h3 className="text-lg text-white font-medium">{viewArticle.author?.name}</h3>
                                                    <p className="text-sm text-gray-400 capitalize">{viewArticle.author?.role}</p>
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <div className="space-y-4 p-4 rounded-xl bg-gray-800/20 border border-gray-700/30">
                                                <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                                                    Description
                                                </h3>
                                                <p className="text-gray-300 leading-relaxed">
                                                    {viewArticle.description}
                                                </p>
                                            </div>

                                            {/* Content */}
                                            <div className="space-y-4 p-6 rounded-xl bg-gray-800/20 border border-gray-700/30">
                                                <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                                                    Content
                                                </h3>
                                                <div
                                                    className="flex flex-col gap-4 prose text-gray-300 prose-invert max-w-none
                                                    prose-headings:text-transparent prose-headings:bg-clip-text prose-headings:bg-gradient-to-r prose-headings:from-white prose-headings:to-gray-200
                                                    prose-h1:text-3xl prose-h1:font-bold prose-h1:mb-6
                                                    prose-h3:text-xl prose-h3:font-semibold prose-h3:text-cyan-400 prose-h3:mt-8 prose-h3:mb-4
                                                    prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-4
                                                    prose-strong:text-white prose-strong:font-semibold
                                                    prose-blockquote:border-l-4 prose-blockquote:border-primary prose-blockquote:pl-6 
                                                    prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:italic prose-blockquote:text-gray-300
                                                    prose-blockquote:bg-primary/5 prose-blockquote:rounded-xl
                                                    prose-blockquote:shadow-xl prose-blockquote:backdrop-blur-sm 
                                                    prose-blockquote:ring-1 prose-blockquote:ring-primary/20
                                                    prose-ol:mt-4 prose-ol:space-y-2 prose-ol:list-decimal prose-ol:list-inside
                                                    prose-ul:mt-4 prose-ul:space-y-2 prose-ul:list-disc prose-ul:list-inside
                                                    prose-li:text-gray-300 prose-li:marker:text-primary
                                                    [&>*:first-child]:mt-0 [&>*:last-child]:mb-0"
                                                    dangerouslySetInnerHTML={{ __html: viewArticle.content }}
                                                />
                                            </div>
                                        </div>

                                        {/* Right Column */}
                                        <div className="space-y-6">
                                            {/* Status and Tags */}
                                            <div className="p-4 rounded-xl bg-gray-800/20 border border-gray-700/30">
                                                <div className="flex justify-between items-center mb-4">
                                                    <h3 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                                                        Status
                                                    </h3>
                                                    <span className={`px-4 py-1 rounded-full text-sm font-medium ${viewArticle.status === 'published'
                                                        ? 'bg-green-500/10 text-green-400'
                                                        : 'bg-yellow-500/10 text-yellow-400'
                                                        }`}>
                                                        {viewArticle.status}
                                                    </span>
                                                </div>
                                                <div className="flex flex-wrap gap-2 mt-4">
                                                    {viewArticle.tags?.map((tag, index) => (
                                                        <span
                                                            key={index}
                                                            className="flex items-center gap-2 bg-gray-800/40 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-700/30 hover:border-indigo-500/50 transition-all duration-300 hover:scale-105"
                                                        >
                                                            <span className="text-gray-300 text-sm">#{tag}</span>
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Timestamps */}
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="bg-gray-800/30 backdrop-blur-sm p-4 rounded-lg border border-gray-700/30">
                                                    <p className="text-gray-400 text-sm">Created At</p>
                                                    <p className="text-white mt-1">
                                                        {viewArticle.createdAt?.toDate().toLocaleString()}
                                                    </p>
                                                </div>
                                                <div className="bg-gray-800/30 backdrop-blur-sm p-4 rounded-lg border border-gray-700/30">
                                                    <p className="text-gray-400 text-sm">Updated At</p>
                                                    <p className="text-white mt-1">
                                                        {viewArticle.updatedAt?.toDate().toLocaleString()}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </motion.div>
                </motion.div>
            </dialog>

            <ArticleModal
                article={selectedArticle}
                onClose={() => setSelectedArticle(null)}
                onSuccess={refreshArticles}
            />
        </section>
    )
}
