"use client"

import React, { useEffect, useState } from 'react'

import Image from 'next/image'

import Link from 'next/link'

import { IoIosArrowForward } from 'react-icons/io'

import { motion, useScroll, useTransform } from 'framer-motion'

import banner from '@/base/assets/pages/articles/category.jpg'

import { fetchArticlesByTag } from '@/hooks/pages/articles/[tag]/lib/FetchTags'

import { ArticleType } from '@/hooks/pages/articles/articles/lib/schema'

import TagsArticleSkelaton from '@/hooks/pages/articles/[tag]/TagsArticleSkelaton'

export default function TagsArticleHero({ tags }: { tags: string[] }) {
    const { scrollY } = useScroll()
    const [article, setArticle] = useState<ArticleType | null>(null)
    const [isLoading, setIsLoading] = useState(true)

    const animations = {
        y: useTransform(scrollY, [0, 500], [0, 250]),
        opacity: useTransform(scrollY, [0, 300], [1, 0]),
        titleY: useTransform(scrollY, [0, 300], [0, 100]),
        scale: useTransform(scrollY, [0, 300], [1, 0.9])
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await fetchArticlesByTag(tags[0])
                const matchedArticle = data.find(item =>
                    item.tags.some(tag => tags.includes(tag))
                )
                setArticle(matchedArticle || null)
            } finally {
                setIsLoading(false)
            }
        }
        fetchData()
    }, [tags])

    if (isLoading) return <TagsArticleSkelaton />
    if (!article) return null

    return (
        <div className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
            <motion.div className="absolute inset-0" style={{ y: animations.y }}>
                <Image
                    src={banner}
                    alt="banner"
                    className='w-full h-[130%] object-cover brightness-[0.85]'
                    priority
                    quality={100}
                />
                <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/10"
                    style={{ opacity: animations.opacity }}
                />
                <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-8 z-10"
                    style={{
                        opacity: animations.opacity,
                        y: animations.titleY,
                        scale: animations.scale,
                    }}
                >
                    <h3 className='text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight drop-shadow-lg uppercase'
                        style={{ letterSpacing: '.3em' }}>
                        {tags[0]}
                    </h3>
                    <div className="flex items-center gap-4 bg-white/10 px-8 py-3 rounded-full backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300">
                        <Link href="/" className='text-sm md:text-base text-white hover:text-primary transition-all duration-300'>
                            Home
                        </Link>
                        <IoIosArrowForward className="text-white/90 text-sm" />
                        <span className='text-sm md:text-base text-white/80 capitalize'>
                            {tags[0]}
                        </span>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}