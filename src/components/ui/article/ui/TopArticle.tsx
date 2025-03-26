import Image from 'next/image';

import Link from 'next/link';

import { formatDistanceToNow } from 'date-fns';

import { id } from 'date-fns/locale';

import { TopArticleProps } from '@/components/ui/article/lib/schema';

import { formatSlug } from '@/base/helper/formatSlug';

import { motion } from 'framer-motion';

export default function TopArticle({ article }: TopArticleProps) {
    const contentVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    return (
        <motion.div
            className='group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300'
        >
            <Link href={`/articles/${formatSlug(article.category)}/${formatSlug(article.slug)}`} className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                    <motion.div
                        className="relative h-[200px] sm:h-[450px] w-full overflow-hidden"
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Image
                            src={article?.thumbnail || ''}
                            alt={article?.title || 'Featured article thumbnail'}
                            className="w-full h-full object-cover"
                            width={1200}
                            height={400}
                        />
                        <motion.div
                            className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.6 }}
                            whileHover={{ opacity: 0.8 }}
                        />
                    </motion.div>

                    <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <motion.div
                            className="flex items-center gap-3 mb-6"
                            variants={contentVariants}
                            initial="hidden"
                            whileInView="visible"
                        >
                            <motion.span
                                className="px-4 py-1.5 rounded-full text-sm font-medium bg-blue-50 text-blue-600"
                                whileHover={{ scale: 1.05 }}
                            >
                                {article?.category}
                            </motion.span>
                            <motion.time
                                className="text-sm text-gray-500"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                {formatDistanceToNow(new Date(article.createdAt), { addSuffix: true, locale: id })}
                            </motion.time>
                        </motion.div>

                        <motion.h3
                            className="text-2xl lg:text-3xl font-bold mb-4 text-gray-900 leading-tight"
                            variants={contentVariants}
                            initial="hidden"
                            whileInView="visible"
                            transition={{ delay: 0.1 }}
                        >
                            {article?.title}
                        </motion.h3>

                        <motion.p
                            className="text-gray-600 text-lg mb-8 line-clamp-3"
                            variants={contentVariants}
                            initial="hidden"
                            whileInView="visible"
                            transition={{ delay: 0.2 }}
                        >
                            {article?.description}
                        </motion.p>

                        <div className="flex flex-col gap-6 mt-auto">
                            <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl">
                                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-white">
                                    <Image
                                        src={article?.author?.photoURL || '/default-avatar.png'}
                                        alt={article?.author?.name || 'Author'}
                                        width={48}
                                        height={48}
                                        className="w-full h-full object-cover"
                                    />
                                </div>
                                <div>
                                    <p className="font-medium text-gray-900">{article?.author?.name}</p>
                                    <p className="text-sm text-gray-500">{article?.author?.role}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
}