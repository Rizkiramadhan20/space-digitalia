import { motion } from 'framer-motion';

import Image from 'next/image';

import Link from 'next/link';

import { formatDistanceToNow } from 'date-fns';

import { id } from 'date-fns/locale';

import { TopArticleProps } from '@/hooks/pages/articles/articles/lib/schema';

import { formatSlug } from '@/base/helper/formatSlug';

export function TopArticle({ article }: TopArticleProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <Link href={`/articles/${formatSlug(article.tags[0])}/${article.slug}`}
                className="group block mb-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 place-items-center bg-white rounded-3xl p-6 border border-gray-100 shadow-sm transition-all duration-300">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="w-full h-[150px] md:h-[350px] overflow-hidden rounded-2xl"
                    >
                        <Image
                            src={article.thumbnail}
                            alt={article.title}
                            width={500}
                            height={500}
                            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                        />
                    </motion.div>

                    <div className="flex flex-col gap-6">
                        <motion.span
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                            className="text-blue-600 font-medium text-sm tracking-wider uppercase p-2 bg-blue-50 rounded-full w-fit"
                        >
                            {article.category}
                        </motion.span>
                        <motion.h2
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-2xl lg:text-4xl font-bold text-gray-800 line-clamp-3"
                        >
                            {article.title}
                        </motion.h2>
                        <motion.p
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className="text-base text-gray-600 line-clamp-3"
                        >
                            {article.description}
                        </motion.p>

                        <motion.div
                            initial={{ scaleX: 0 }}
                            whileInView={{ scaleX: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.4 }}
                            className="divider rounded-full w-full h-[1px] bg-gray-400"
                        />

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className="flex justify-between items-center gap-4"
                        >
                            <div className="flex items-center gap-3">
                                <div className="w-12 h-12 overflow-hidden">
                                    <Image
                                        src={article.author.photoURL}
                                        alt={article.author.name}
                                        width={50}
                                        height={50}
                                        className="w-full h-full object-cover"
                                    />
                                </div>

                                <div className="flex flex-col">
                                    <p className="font-semibold text-gray-800">{article.author.name}</p>
                                    <p className="text-sm text-gray-500">{article.author.role}</p>
                                </div>
                            </div>

                            <p className="text-sm text-gray-500 italic">
                                {formatDistanceToNow(new Date(article.createdAt), { addSuffix: true, locale: id })}
                            </p>
                        </motion.div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}