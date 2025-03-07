import { motion } from 'framer-motion';

import Image from 'next/image';

import Link from 'next/link';

import { formatDistanceToNow } from 'date-fns';

import { id } from 'date-fns/locale';

import { ArticleCardProps } from '@/hooks/pages/articles/articles/lib/schema';

import { formatSlug } from '@/base/helper/formatSlug';

export function ArticleCard({ article }: ArticleCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            <Link href={`/articles/${formatSlug(article.tags[0])}/${article.slug}`}
                className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="w-full h-[200px] overflow-hidden"
                >
                    <Image
                        src={article.thumbnail}
                        alt={article.title}
                        width={500}
                        height={500}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                </motion.div>

                <div className="p-6">
                    <motion.span
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="text-blue-600 text-xs font-medium tracking-wider uppercase"
                    >
                        {article.category}
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-xl font-bold text-gray-800 mt-2 mb-3 line-clamp-2"
                    >
                        {article.title}
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-sm text-gray-600 line-clamp-3 mb-6"
                    >
                        {article.description}
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 }}
                        className="flex items-center justify-between pt-4 border-t border-gray-100"
                    >
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 overflow-hidden rounded-full">
                                <Image
                                    src={article.author.photoURL}
                                    alt={article.author.name}
                                    width={500}
                                    height={500}
                                    className="w-full h-full object-cover"
                                />
                            </div>

                            <div className="flex flex-col">
                                <p className="text-sm font-medium text-gray-700">{article.author.name}</p>
                                <p className="text-xs text-gray-500">{article.author.role}</p>
                            </div>
                        </div>
                        <p className="text-xs text-gray-500 italic">
                            {formatDistanceToNow(new Date(article.createdAt), { addSuffix: true, locale: id })}
                        </p>
                    </motion.div>
                </div>
            </Link>
        </motion.div>
    );
}