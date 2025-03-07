import React from 'react'
import { motion } from 'framer-motion'

import Image from 'next/image'

import right from '@/base/assets/pages/about/about/right.png'

import left from '@/base/assets/pages/about/about/left.png'

export default function BackgroundImages() {
    return (
        <>
            <motion.div
                className='absolute bottom-0 left-0 opacity-30 pointer-events-none'
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                <Image
                    src={right}
                    alt='right'
                    width={500}
                    height={500}
                    className='w-full max-w-md lg:max-w-lg blur-sm'
                />
            </motion.div>

            <motion.div
                className='absolute top-0 right-0 opacity-30 pointer-events-none'
                animate={{ y: [0, -20, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
            >
                <Image
                    src={left}
                    alt='left'
                    width={500}
                    height={500}
                    className='w-full max-w-md lg:max-w-lg blur-sm'
                />
            </motion.div>
        </>
    )
}