import { motion } from 'framer-motion'

import Image from 'next/image'

import { FeaturedGridProps } from '@/hooks/pages/about/featured/lib/schema'

export default function FeaturedGrid({ featured }: FeaturedGridProps) {
    return (
        <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 gap-4 sm:gap-6 bg-background shadow-xl p-4 sm:p-6 w-full"
        >
            {featured.map((item, index) => (
                <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className='flex flex-col sm:flex-row items-center text-center sm:text-left gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300'
                >
                    <motion.div
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                        className="relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0"
                    >
                        <Image
                            src={item.imageUrl}
                            alt={item.title}
                            fill
                            className='object-contain'
                        />
                    </motion.div>
                    <motion.h3
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: index * 0.1 + 0.3 }}
                        className='text-sm sm:text-base font-semibold text-gray-800'
                    >
                        {item.title}
                    </motion.h3>
                </motion.div>
            ))}
        </motion.div>
    )
}