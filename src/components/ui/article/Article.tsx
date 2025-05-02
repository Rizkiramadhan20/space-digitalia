"use client";

import React, { useState, useEffect, memo } from 'react';

import { motion } from 'framer-motion';

import { useRouter } from 'next/navigation';

import { FetchArticle } from '@/components/ui/article/lib/FetchArticle';

import { ArticleType } from '@/components/ui/article/lib/schema';

import ArticleSkelaton from '@/components/ui/article/ArticleSkelaton';

import ArticleCard from '@/components/ui/article/ui/ArticleCard';

import TopArticle from '@/components/ui/article/ui/TopArticle';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: {
            duration: 0.5
        }
    }
}

const Article = () => {
    const router = useRouter();
    const [article, setArticle] = useState<ArticleType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = FetchArticle((newArticle) => {
            const sortedArticle = newArticle.sort((a, b) =>
                new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
            );
            setArticle(sortedArticle);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const topArticle = article.length > 0 ? article[0] : null;
    const otherArticle = article.filter(item => item !== topArticle);

    const handleViewAll = () => {
        router.push('/articles');
    };

    if (loading) {
        return <ArticleSkelaton />;
    }

    return (
        <motion.section
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className='min-h-full px-4 xl:px-10 py-6 sm:py-20'
        >
            <div className="container">
                <motion.div
                    variants={itemVariants}
                    viewport={{ once: true }}
                    className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-8 mb-20"
                >
                    <div className="space-y-3">
                        <motion.h2
                            variants={itemVariants}
                            className="text-4xl md:text-5xl font-bold text-gray-900 tracking-tight"
                        >
                            Latest Articles
                        </motion.h2>
                        <motion.p
                            variants={itemVariants}
                            className="text-gray-600 text-lg font-normal"
                        >
                            Stay updated with our newest insights
                        </motion.p>
                    </div>
                    <motion.button
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleViewAll}
                        className="group relative inline-flex items-center justify-center px-6 py-3 font-medium text-white bg-gray-900 rounded-lg overflow-hidden"
                    >
                        <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                        <span className="relative flex items-center gap-2">
                            View All Articles
                            <motion.svg
                                className="w-4 h-4"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                animate={{ x: [0, 5, 0] }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 1.5,
                                    ease: "easeInOut"
                                }}
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </motion.svg>
                        </span>
                    </motion.button>
                </motion.div>

                {topArticle && (
                    <motion.div
                        variants={itemVariants}
                        viewport={{ once: true }}
                        className="mb-20"
                    >
                        <TopArticle article={topArticle} />
                    </motion.div>
                )}

                <motion.div
                    variants={containerVariants}
                    viewport={{ once: true, amount: 0.1 }}
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                    {otherArticle.map((item, index) => (
                        <motion.div
                            key={index}
                            variants={itemVariants}
                            viewport={{ once: true }}
                            whileHover={{ y: -10 }}
                            transition={{ duration: 0.3 }}
                        >
                            <ArticleCard article={item} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </motion.section>
    )
}

export default memo(Article);