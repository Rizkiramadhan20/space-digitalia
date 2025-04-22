import Image from 'next/image'

import { motion } from 'framer-motion'

import { memo } from 'react'

import { FeaturedItemProps } from '@/components/ui/featured/lib/schema'

function FeaturedItem({ item }: FeaturedItemProps) {
    return (
        <motion.div
            className='group flex-1 min-w-[280px] flex flex-row items-start gap-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden p-4'
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.5, ease: 'easeOut' }}
        >
            <motion.div
                className="relative w-24 h-24 flex-shrink-0"
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
            >
                <Image
                    src={item.imageUrl}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className='object-cover rounded-lg group-hover:scale-105 transition-transform duration-300'
                    loading="lazy"
                    quality={75}
                />
            </motion.div>

            <div className="flex flex-col gap-2">
                <motion.h2
                    className='text-lg font-semibold text-gray-800 line-clamp-2'
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                >
                    {item.title}
                </motion.h2>
                <motion.p
                    className='text-sm text-gray-600 line-clamp-3'
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                >
                    {item.text}
                </motion.p>
            </div>
        </motion.div>
    )
}

export default memo(FeaturedItem);