import { motion } from 'framer-motion';

import Image from 'next/image';

import { ServiceItemProps } from '@/components/ui/service/lib/schema';

export default function ServiceItem({ item, index }: ServiceItemProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={`flex flex-col md:flex-row items-center gap-12 md:gap-20 relative service-section z-10
            ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
            data-index={index}
        >
            <div className="flex-1 flex flex-col gap-8 md:gap-10">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    whileHover={{ scale: 1.02 }}
                    className='group flex flex-col sm:flex-row gap-6 items-start sm:items-center p-6 sm:p-8 bg-white/80 backdrop-blur-sm'
                >
                    <Image
                        src={item.profile.image}
                        alt={item.profile.title}
                        width={100}
                        height={100}
                        className='w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover'
                    />
                    <div>
                        <h3 className='font-bold text-xl sm:text-2xl mb-2 sm:mb-3 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-violet-600'>
                            {item.profile.title}
                        </h3>
                        <p className='text-base sm:text-lg text-gray-600'>{item.profile.text}</p>
                    </div>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, x: index % 2 === 1 ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className='font-bold text-3xl sm:text-4xl md:text-5xl leading-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-600'
                >
                    {item.title}
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, x: index % 2 === 1 ? 30 : -30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className='text-lg sm:text-xl text-gray-600 leading-relaxed'
                >
                    {item.description}
                </motion.p>
            </div>

            <motion.div
                className="flex-1 w-full"
                initial={{ opacity: 0, x: index % 2 === 0 ? 40 : -40, scale: 0.9 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: true, margin: "-70px" }}
                transition={{ duration: 0.7, delay: 0.3 }}
                whileHover={{ scale: 1.04, rotate: 1 }}
                whileTap={{ scale: 0.98 }}
            >
                <Image
                    src={item.imageUrl}
                    alt={item.title}
                    width={800}
                    height={800}
                    className='w-full h-auto'
                />
            </motion.div>
        </motion.div>
    );
}