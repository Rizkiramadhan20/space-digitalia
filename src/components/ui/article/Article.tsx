"use client";

import React, { useEffect, useState } from 'react'

import { formatDistanceToNow } from 'date-fns';

import { id } from 'date-fns/locale'; // untuk Bahasa Indonesia

import { FetchArticle } from '@/components/ui/article/lib/FetchArticle'

import { ArticleType } from '@/components/ui/article/lib/schema'

import ArticleSkelaton from '@/components/ui/article/ArticleSkelaton';

import { useRouter } from 'next/navigation';

import Image from 'next/image';

import Link from 'next/link';

import { formatSlug } from '@/base/helper/formatSlug';

export default function Article() {
    const [article, setArticle] = useState<ArticleType[]>([]);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = FetchArticle((newArticle) => {
            // Sort articles by date in descending order (newest first)
            const sortedArticles = newArticle.sort((a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            setArticle(sortedArticles);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <ArticleSkelaton />;
    }

    const handleViewAll = () => {
        router.push("/articles");
    }

    // Mengambil maksimal 4 artikel terbaru (1 utama + 3 artikel lainnya)
    const limitedArticles = article.slice(0, 4);
    const topArticle = limitedArticles.length > 0 ? limitedArticles[0] : null;  // Artikel utama
    const otherArticles = limitedArticles.length > 1 ? limitedArticles.slice(1) : [];  // Maksimal 3 artikel lainnya

    return (
        <section className='min-h-full px-4 xl:px-10 py-6 sm:py-20'>
            <div className="container">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 mb-20">
                    <div className="space-y-3">
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight">
                            Latest Articles
                        </h2>
                        <p className="text-gray-600 text-lg font-normal">Stay updated with our newest insights</p>
                    </div>
                    <button
                        onClick={handleViewAll}
                        className="group relative inline-flex items-center justify-center px-6 py-3 font-medium text-white bg-gray-900 rounded-lg overflow-hidden transition-all duration-300 ease-out hover:scale-102"
                    >
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        <span className="relative flex items-center gap-2">
                            View All Articles
                            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </span>
                    </button>
                </div>

                {topArticle && (
                    <div className="mb-20">
                        <div className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                                <div className="relative h-[200px] sm:h-[400px] lg:h-full w-full overflow-hidden">
                                    <Image
                                        src={topArticle?.thumbnail || ''}
                                        alt={topArticle?.title || 'Featured article thumbnail'}
                                        className="w-full h-full object-cover transition duration-700 group-hover:scale-103"
                                        width={1200}
                                        height={400}
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-60" />
                                </div>

                                <div className="p-8 lg:p-12 flex flex-col justify-center">
                                    <div className="flex items-center gap-3 mb-6">
                                        <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-blue-50 text-blue-600">
                                            {topArticle?.category}
                                        </span>
                                        <time className="text-sm text-gray-500">
                                            {formatDistanceToNow(new Date(topArticle.createdAt), { addSuffix: true, locale: id })}
                                        </time>
                                    </div>

                                    <h3 className="text-2xl lg:text-3xl font-bold mb-4 text-gray-900 leading-tight">{topArticle?.title}</h3>
                                    <p className="text-gray-600 text-lg mb-8 line-clamp-3">{topArticle?.description}</p>

                                    <div className="flex flex-col gap-6 mt-auto">
                                        <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                                            <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white">
                                                <Image
                                                    src={topArticle?.author?.photoURL || '/default-avatar.png'}
                                                    alt={topArticle?.author?.name || 'Author'}
                                                    width={48}
                                                    height={48}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <div>
                                                <p className="font-medium text-gray-900">{topArticle?.author?.name}</p>
                                                <p className="text-sm text-gray-500">{topArticle?.author?.role}</p>
                                            </div>
                                        </div>

                                        <Link
                                            href={`/articles/${formatSlug(topArticle.category)}/${formatSlug(topArticle.slug)}`}
                                            className="inline-flex items-center justify-center px-4 py-3 font-medium text-white bg-gray-900 rounded-lg transition duration-300 hover:bg-gray-800 hover:scale-102"
                                        >
                                            Read More
                                            <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {otherArticles.map((item, index) => (
                        <Link href={`/articles/${item.slug}`} key={index} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src={item?.thumbnail || ''}
                                    alt={item?.title || 'Article thumbnail'}
                                    className="w-full h-full object-cover transition duration-700 group-hover:scale-105"
                                    width={500}
                                    height={500}
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>
                            <div className="p-6">
                                <div className="flex items-center gap-3 mb-4">
                                    <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-600">{item?.category}</span>
                                    <time className="text-sm text-gray-500">{formatDistanceToNow(new Date(item.createdAt), { addSuffix: true, locale: id })}</time>
                                </div>
                                <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">{item?.title}</h3>
                                <p className="text-gray-600 mb-6 line-clamp-2">{item?.description}</p>

                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-gray-100">
                                        <Image
                                            src={item?.author?.photoURL}
                                            alt={item?.author?.name}
                                            width={32}
                                            height={32}
                                            className="w-full h-full object-cover"
                                        />
                                    </div>
                                    <div className='flex flex-col'>
                                        <span className="text-sm font-medium text-gray-700">{item?.author?.name}</span>
                                        <span className="text-sm text-gray-500">{item?.author?.role}</span>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    )
}
