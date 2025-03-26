import React from 'react'

import { motion } from 'framer-motion'

import Image from 'next/image'

import leftImg from "@/base/assets/ui/company/left.png"

import { backgroundImageAnimation } from '@/components/ui/company/animation/animation'

export default function CompanyBackground() {
    return (
        <motion.div
            className='absolute top-0 left-0 w-full h-full max-w-[200px] opacity-10 pointer-events-none'
            {...backgroundImageAnimation}
        >
            <Image src={leftImg} alt={"left"} className='object-cover w-full h-full' />
        </motion.div>
    )
}