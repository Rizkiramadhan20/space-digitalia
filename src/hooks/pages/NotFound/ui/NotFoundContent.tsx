import React from 'react'

import Image from 'next/image'

import Link from 'next/link'

import { motion } from 'framer-motion'

import notfoundImg from "@/base/assets/pages/notfound/404-WBZW57IZ.svg"

export default function NotFoundContent() {
    return (
        <motion.div
            className='text-center sm:text-left space-y-8'
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
        >
            <motion.div
                className='max-w-sm mx-auto sm:mx-0 mb-8'
                initial={{ scale: 0.5, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.4 }}
            >
                <Image
                    src={notfoundImg}
                    alt='not-found'
                    className='w-full h-auto drop-shadow-xl animate-bounce-slow [filter:invert(0.4)_sepia(0.1)_saturate(0.6)]'
                    priority
                />
            </motion.div>
            <motion.h3
                className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.6 }}
            >
                Oops, this page doesn&apos;t exist
            </motion.h3>
            <motion.p
                className='text-lg md:text-xl text-gray-600 mb-8 max-w-lg leading-relaxed'
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.8 }}
            >
                The link that led you here is called a &ldquo;broken link.&rdquo; You can check how many of such links your website has with our free broken link checker tool.
            </motion.p>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 1 }}
            >
                <Link
                    href="/"
                    className='inline-block bg-gray-900 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-gray-300 hover:-translate-y-1 hover:scale-105'
                >
                    Back to Home
                </Link>
            </motion.div>
        </motion.div>
    )
}