"use client"

import React, { useEffect, useState } from 'react'

import { FetchArticleDetails, FetchRelatedArticles } from '@/hooks/pages/articles/[slug]/lib/FetchArticle'

import { ArticleType } from '@/hooks/pages/articles/articles/lib/schema'

import Link from 'next/link'

import Image from 'next/image'

import { database } from '@/utils/firebase'

import { ref, set, onValue, get } from 'firebase/database'

import ArticleSkeleton from '@/hooks/pages/articles/[slug]/ArticleDetailsSkelaton'

import { formatSlug } from '@/base/helper/formatSlug'

import ArticleNotFound from '@/hooks/pages/articles/[slug]/ArticleNotFound'

import Breadcrumb from '@/hooks/pages/articles/[slug]/ui/content/Breadcrumb'

import ArticleHeader from '@/hooks/pages/articles/[slug]/ui/content/ArticleHeader'

import RelatedArticles from '@/hooks/pages/articles/[slug]/ui/content/RelatedArticles'

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
            // Check if this article has been viewed in this session
            const sessionKey = `article_view_${slug}`
            if (sessionStorage.getItem(sessionKey)) {
                return // Skip if already viewed in this session
            }

            try {
                const response = await fetch('/api/ip-info')
                const data = await response.json()

                const ipIdentifier = data.ip ? data.ip.replace(/\./g, '_') : 'unknown'
                const visitorRef = ref(database, `${process.env.NEXT_PUBLIC_ARTICLE_VIEWS}/${slug}/visitors/${ipIdentifier}`)
                const visitorSnapshot = await get(visitorRef)

                if (!visitorSnapshot.exists()) {
                    // Only increment total and save visitor data if this IP hasn't viewed before
                    await set(visitorRef, {
                        first_visit: new Date().toISOString(),
                        last_visit: new Date().toISOString(),
                        city: data.city || 'unknown',
                        region: data.region || 'unknown',
                        country: data.country_name || 'unknown',
                        latitude: data.latitude || 0,
                        longitude: data.longitude || 0,
                        isp: data.org || 'unknown',
                        timezone: data.timezone || 'unknown',
                        visit_count: 1
                    })

                    // Increment total views
                    const totalRef = ref(database, `${process.env.NEXT_PUBLIC_ARTICLE_VIEWS}/${slug}/total`)
                    const totalSnapshot = await get(totalRef)
                    await set(totalRef, (totalSnapshot.val() || 0) + 1)
                } else {
                    // Just update the last visit time and increment visit count
                    const currentData = visitorSnapshot.val()
                    await set(visitorRef, {
                        ...currentData,
                        last_visit: new Date().toISOString(),
                        visit_count: (currentData.visit_count || 0) + 1
                    })
                }

                // Mark as viewed in this session
                sessionStorage.setItem(sessionKey, 'true')

            } catch (error) {
                console.error('Error recording view:', error)
                // Handle anonymous view if IP detection fails
                const anonymousRef = ref(database, `${process.env.NEXT_PUBLIC_ARTICLE_VIEWS}/${slug}/visitors/anonymous`)
                const anonymousSnapshot = await get(anonymousRef)

                if (!anonymousSnapshot.exists()) {
                    await set(anonymousRef, {
                        first_visit: new Date().toISOString(),
                        last_visit: new Date().toISOString(),
                        visit_count: 1
                    })

                    // Increment total views for anonymous visitors
                    const totalRef = ref(database, `${process.env.NEXT_PUBLIC_ARTICLE_VIEWS}/${slug}/total`)
                    const totalSnapshot = await get(totalRef)
                    await set(totalRef, (totalSnapshot.val() || 0) + 1)
                }

                // Mark as viewed in this session
                sessionStorage.setItem(sessionKey, 'true')
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
        return <ArticleNotFound />
    }

    const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

    return (
        <section className='min-h-full bg-gradient-to-b from-gray-50/50 to-white'>
            <div className="container mx-auto px-4 lg:px-8 xl:px-10 py-2 lg:py-12 max-w-7xl">
                <div className="mb-8 lg:mb-12">
                    <Breadcrumb slug={slug} tags={filteredArticle.tags} />
                </div>

                <ArticleHeader
                    title={filteredArticle.title}
                    category={filteredArticle.category}
                    createdAt={filteredArticle.createdAt}
                    viewCount={viewCount}
                    thumbnail={filteredArticle.thumbnail}
                    currentUrl={currentUrl}
                />

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
                            <RelatedArticles
                                articles={relatedArticles}
                                currentSlug={slug}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
