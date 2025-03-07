import React from 'react'

import { motion } from 'framer-motion'

import Image from 'next/image'

import { AboutItemProps } from '@/hooks/pages/about/about/lib/schema'

export default function AboutItem({ item, index }: AboutItemProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.2 }}
            viewport={{ once: true }}
            className={`flex flex-col items-center justify-center mb-20 last:mb-0`}
        >
            <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}>
                <motion.div
                    className="relative"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                >
                    <Image
                        src={item.imageUrl}
                        alt={item.title}
                        width={600}
                        height={600}
                        className='w-full h-[250px] sm:h-[400px] lg:h-[600px] object-cover'
                    />
                    <div className="absolute inset-0" />
                </motion.div>

                <motion.div
                    className="flex flex-col gap-8 lg:gap-10 px-4 lg:px-0"
                    initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        viewport={{ once: true }}
                        className='text-blue-600 font-semibold text-lg tracking-wider uppercase relative inline-block
                        before:content-[""] before:absolute before:-bottom-2 before:left-0 before:w-20 before:h-1 before:bg-blue-600'
                    >
                        {item.title}
                    </motion.h1>
                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        viewport={{ once: true }}
                        className='text-3xl lg:text-4xl xl:text-5xl font-bold leading-tight text-gray-900 
                        bg-gradient-to-r from-gray-900 to-blue-900 bg-clip-text text-transparent'
                    >
                        {item.text}
                    </motion.h3>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.8 }}
                        viewport={{ once: true }}
                        className='text-lg text-gray-600 leading-relaxed hover:text-gray-800 transition-colors duration-300'
                    >
                        {item.description}
                    </motion.p>
                </motion.div>
            </div>
        </motion.div>
    )
}