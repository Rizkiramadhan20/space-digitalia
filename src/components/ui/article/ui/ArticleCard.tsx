import Image from 'next/image';

import Link from 'next/link';

import { formatDistanceToNow } from 'date-fns';

import { id } from 'date-fns/locale';

import { ArticleCardProps } from '@/components/ui/article/lib/schema';

import { formatSlug } from '@/base/helper/formatSlug';

import { motion } from 'framer-motion';

export default function ArticleCard({ article }: ArticleCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.03 }}
            transition={{ duration: 0.3 }}
        >
            <Link href={`/articles/${formatSlug(article.category)}/${formatSlug(article.slug)}`} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                <motion.div
                    className="relative h-64 overflow-hidden"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4 }}
                >
                    <Image
                        src={article?.thumbnail || ''}
                        alt={article?.title || 'Article thumbnail'}
                        className="w-full h-full object-cover"
                        width={500}
                        height={500}
                    />
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                    />
                </motion.div>

                <motion.div
                    className="p-6"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                >
                    <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-50 text-blue-600">{article?.category}</span>
                        <time className="text-sm text-gray-500">{formatDistanceToNow(new Date(article.createdAt), { addSuffix: true, locale: id })}</time>
                    </div>
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 group-hover:text-blue-600 transition-colors line-clamp-2">{article?.title}</h3>
                    <p className="text-gray-600 mb-6 line-clamp-2">{article?.description}</p>

                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full overflow-hidden ring-2 ring-gray-100">
                            <Image
                                src={article?.author?.photoURL}
                                alt={article?.author?.name}
                                width={32}
                                height={32}
                                className="w-full h-full object-cover"
                            />
                        </div>
                        <div className='flex flex-col'>
                            <span className="text-sm font-medium text-gray-700">{article?.author?.name}</span>
                            <span className="text-sm text-gray-500">{article?.author?.role}</span>
                        </div>
                    </div>
                </motion.div>
            </Link>
        </motion.div>
    );
}