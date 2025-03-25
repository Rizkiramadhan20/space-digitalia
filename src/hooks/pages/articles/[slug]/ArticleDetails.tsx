"use client"

import React, { useEffect, useState } from 'react'

import { FetchArticleDetails, FetchRelatedArticles } from '@/hooks/pages/articles/[slug]/lib/FetchArticle'

import { ArticleType } from '@/hooks/pages/articles/articles/lib/schema'

import Link from 'next/link'

import { format } from 'date-fns'

import Image from 'next/image'

import ShareButtons from '@/hooks/pages/articles/[slug]/ShareButton'

import { database } from '@/utils/firebase'

import { ref, set, onValue, get } from 'firebase/database'

import ArticleSkeleton from '@/hooks/pages/articles/[slug]/ArticleDetailsSkelaton'

import { formatSlug } from '@/base/helper/formatSlug'

export default function ArticleDetails({ slug }: { slug: string }) {
    const [articleData, setArticleData] = useState<ArticleType[]>([])

    const [loading, setLoading] = useState(true)

    const [relatedArticles, setRelatedArticles] = useState<ArticleType[]>([])

    const [viewCount, setViewCount] = useState(0)

    useEffect(() => {
        const unsubscribe = FetchArticleDetails(slug, (article: ArticleType[]) => {
            setArticleData(article)
            setLoading(false)
        })

        const viewCountRef = ref(database, `${process.env.NEXT_PUBLIC_ARTICLE_VIEWS}/${slug}/total`)
        const viewCountUnsubscribe = onValue(viewCountRef, (snapshot) => {
            setViewCount(snapshot.val() || 0)
        })

        const recordView = async () => {
            try {
                const response = await fetch('https://ipapi.co/json/')
                const data = await response.json()
                const ipAddress = data.ip.replace(/\./g, '_')

                const ipViewRef = ref(database, `${process.env.NEXT_PUBLIC_ARTICLE_VIEWS}/${slug}/ips/${ipAddress}`)
                const ipViewSnapshot = await get(ipViewRef)

                if (!ipViewSnapshot.exists()) {
                    await set(ipViewRef, {
                        timestamp: new Date().toISOString(),
                        city: data.city,
                        region: data.region,
                        country: data.country_name,
                        latitude: data.latitude,
                        longitude: data.longitude,
                        isp: data.org,
                        timezone: data.timezone
                    })

                    // Increment total views
                    const totalViewsRef = ref(database, `${process.env.NEXT_PUBLIC_ARTICLE_VIEWS}/${slug}/total`)
                    const totalViewsSnapshot = await get(totalViewsRef)
                    const currentViews = totalViewsSnapshot.val() || 0
                    await set(totalViewsRef, currentViews + 1)
                }
            } catch (error) {
                console.error('Error recording view:', error)
            }
        }

        recordView()

        FetchRelatedArticles(slug, (articles: ArticleType[]) => {
            setRelatedArticles(articles)
        })

        return () => {
            unsubscribe()
            viewCountUnsubscribe()
        }
    }, [slug])

    if (loading) {
        return <ArticleSkeleton />
    }

    const filteredArticle = articleData.find(item => item.slug === slug)

    if (!filteredArticle) {
        return <div>Article not found</div>
    }

    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

    return (
        <section className='min-h-full bg-gradient-to-b from-gray-50/50 to-white'>
            <div className="container mx-auto px-4 lg:px-8 xl:px-10 py-2 lg:py-12 max-w-7xl">
                <div className="mb-8 lg:mb-12">
                    <ol className="flex flex-wrap items-center gap-2 sm:gap-0 text-xs lg:text-sm text-gray-600">
                        <li className="flex items-center">
                            <Link href='/' className="flex items-center hover:text-blue-600 transition-colors">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="h-4 w-4 stroke-current mr-1">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                                </svg>
                                <span>Home</span>
                            </Link>
                            <span className="mx-2">/</span>
                        </li>

                        <li className="flex items-center">
                            <Link href='/articles' className="flex items-center hover:text-blue-600 transition-colors">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="h-4 w-4 stroke-current mr-1">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
                                </svg>
                                <span>Articles</span>
                            </Link>
                            <span className="mx-2">/</span>
                        </li>
                        <li className="flex items-center">
                            <span className="flex items-center text-gray-800">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    className="h-4 w-4 stroke-current mr-1">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
                                </svg>
                                <span className="font-medium">{filteredArticle.slug}</span>
                            </span>
                        </li>
                    </ol>
                </div>

                <div className="space-y-8 mb-12">
                    <h1 className='text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-gray-900 leading-tight tracking-tight'>{filteredArticle.title}</h1>

                    <div className='flex flex-wrap items-center gap-4'>
                        <div className='text-sm text-indigo-700 bg-indigo-50 px-4 py-2 rounded-full capitalize font-medium hover:bg-indigo-100 transition-colors'>
                            {filteredArticle.category}
                        </div>
                        <span className='text-sm text-gray-600 font-medium flex items-center gap-2'>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            {format(new Date(filteredArticle.createdAt), 'MMMM dd, yyyy')}
                        </span>
                        <span className='text-sm text-gray-600 font-medium flex items-center gap-2'>
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                            </svg>
                            {viewCount} views
                        </span>
                    </div>

                    <ShareButtons
                        url={currentUrl}
                        title={filteredArticle.title}
                        description={`Check out this article: ${filteredArticle.title}`}
                        media={filteredArticle.thumbnail}
                    />
                </div>

                <div className="w-full md:h-[600px] h-[400px] relative rounded-3xl overflow-hidden mb-16 shadow-2xl shadow-gray-200/60">
                    <Image
                        src={filteredArticle.thumbnail}
                        alt={filteredArticle.title}
                        fill
                        className='object-cover w-full h-full transition-all duration-700 hover:scale-105'
                        priority
                    />
                </div>

                <div className='flex flex-col lg:flex-row gap-12 lg:gap-20'>
                    <div className='lg:w-2/3'>
                        <div className="prose prose-lg max-w-none
                            prose-headings:text-gray-900 prose-headings:tracking-tight
                            prose-p:text-gray-700 prose-p:leading-relaxed prose-p:mb-6
                            
                            prose-h1:text-4xl prose-h1:font-bold prose-h1:mb-8
                            prose-h2:text-3xl prose-h2:font-semibold prose-h2:mb-6 prose-h2:mt-12
                            prose-h3:text-2xl prose-h3:font-semibold prose-h3:text-gray-800 prose-h3:mt-10 prose-h3:mb-4
                            
                            prose-ul:mt-6 prose-ul:mb-8 prose-ul:space-y-3
                            prose-ol:mt-6 prose-ol:mb-8 prose-ol:space-y-3
                            prose-li:text-gray-700 prose-li:leading-relaxed
                            [&_ol>li]:list-decimal
                            [&_ul>li]:list-disc
                            [&_li[data-list=bullet]]:list-disc
                            [&_ol>li]:ml-4
                            [&_ul>li]:ml-4
                            
                            prose-strong:text-gray-900 prose-strong:font-semibold
                            
                            prose-a:text-indigo-600 prose-a:font-medium prose-a:no-underline hover:prose-a:underline
                            
                            prose-blockquote:border-l-4 prose-blockquote:border-indigo-500
                            prose-blockquote:pl-6 prose-blockquote:py-4 prose-blockquote:my-8
                            prose-blockquote:text-gray-700 prose-blockquote:italic
                            prose-blockquote:bg-indigo-50/50 prose-blockquote:rounded-r-2xl
                            
                            [&_.ql-code-block-container]:mockup-code 
                            [&_.ql-code-block-container]:w-full 
                            [&_.ql-code-block-container]:my-6
                            [&_.ql-code-block-container]:bg-gray-900
                            [&_.ql-code-block-container]:p-4
                            [&_.ql-code-block]:before:content-['$'] 
                            [&_.ql-code-block]:before:mr-2 
                            [&_.ql-code-block]:before:text-red-500
                            [&_.ql-code-block]:flex
                            [&_.ql-code-block]:items-center
                            [&_.ql-code-block]:text-sm
                            [&_.ql-code-block]:font-mono
                            [&_.ql-code-block]:px-3
                            [&_.ql-code-block]:py-1
                            
                            [&_.ql-code-block_span.hljs-keyword]:text-pink-400
                            [&_.ql-code-block_span.hljs-string]:text-green-400
                            [&_.ql-code-block_span.hljs-number]:text-orange-400
                            [&_.ql-code-block_span.hljs-function]:text-blue-400
                            [&_.ql-code-block_span.hljs-comment]:text-gray-500
                            [&_.ql-code-block_span.hljs-variable]:text-purple-400
                            [&_.ql-code-block_span.hljs-operator]:text-yellow-400
                            [&_.ql-code-block]:text-gray-300
                            
                            prose-code:bg-gray-100 
                            prose-code:text-gray-800 
                            prose-code:px-2 
                            prose-code:py-0.5 
                            prose-code:rounded-md
                            prose-code:font-mono
                            
                            [&_.ql-ui]:hidden"
                            dangerouslySetInnerHTML={{ __html: filteredArticle.content }}
                        />

                        <div className='mt-16 space-y-4'>
                            <h2 className='text-xl font-semibold text-gray-900'>
                                Tags
                            </h2>

                            <div className='flex flex-wrap gap-2 md:gap-3'>
                                {filteredArticle.tags.map((tag) => (
                                    <Link
                                        href={`/articles/${formatSlug(tag)}`}
                                        key={tag}
                                        className='inline-flex items-center px-4 py-2 text-sm font-medium text-indigo-600 bg-indigo-50 
                                            rounded-full hover:bg-indigo-100 duration-200 
                                            border border-indigo-100/50 hover:border-indigo-200/50
                                            shadow-sm hover:shadow-md hover:-translate-y-0.5 transform transition-all'
                                    >
                                        #<span className="ml-1">{tag}</span>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className='lg:w-1/3'>
                        <div className='space-y-6 lg:sticky lg:top-24'>
                            <div className='bg-white rounded-2xl p-8 shadow-xl shadow-gray-100/50 border border-gray-100/80'>
                                <div className='flex items-center gap-5'>
                                    <Image
                                        src={filteredArticle.author.photoURL}
                                        alt={filteredArticle.author.name}
                                        width={100}
                                        height={100}
                                        className='w-16 h-16 rounded-full ring-4 ring-offset-4 ring-indigo-500/80'
                                    />
                                    <div>
                                        <p className='font-bold text-lg text-gray-900'>{filteredArticle.author.name}</p>
                                        <p className='text-sm text-gray-600 mt-1'>{filteredArticle.author.role}</p>
                                    </div>
                                </div>
                            </div>

                            {relatedArticles.filter(article => article.slug !== slug).length > 0 && (
                                <div className='bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/60'>
                                    <h3 className='text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2'>
                                        Related Articles
                                    </h3>

                                    <div className='space-y-2'>
                                        {relatedArticles
                                            .filter(article => article.slug !== slug)
                                            .map((article) => (
                                                <Link
                                                    href={`/articles/${formatSlug(article.tags[0])}/${formatSlug(article.slug)}`}
                                                    key={article.slug}
                                                    className='group block p-3 -mx-3 rounded-2xl hover:bg-gray-50/80 transition-all duration-300'
                                                >
                                                    <div className='flex gap-5 items-center'>
                                                        <div className='relative w-24 h-24 flex-shrink-0 rounded-2xl overflow-hidden ring-1 ring-gray-100'>
                                                            <Image
                                                                src={article.thumbnail}
                                                                alt={article.title}
                                                                fill
                                                                className='object-cover transition-all duration-500 group-hover:scale-110'
                                                            />
                                                        </div>

                                                        <div className='flex-1 space-y-2'>
                                                            <h4 className='text-sm font-semibold text-gray-800 line-clamp-2 group-hover:text-indigo-600 transition-colors'>
                                                                {article.title}
                                                            </h4>

                                                            <div className='flex items-center gap-3 text-xs text-gray-500'>
                                                                <span className='flex items-center gap-1.5'>
                                                                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                                    </svg>
                                                                    {format(new Date(article.createdAt), 'MMM dd, yyyy')}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Link>
                                            ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
