import React from 'react'

import { motion } from 'framer-motion'

import {
    titleAnimation,
    descriptionAnimation,
    headerContainerAnimation
} from '@/components/ui/company/animation/animation'

export default function CompanyHeader() {
    return (
        <motion.div
            className="mb-12 sm:mb-16"
            {...headerContainerAnimation}
        >
            <motion.h2
                className="text-2xl font-bold text-center text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl"
                {...titleAnimation}
            >
                Company Yang Sudah Kami Kerjakan
            </motion.h2>
            <motion.p
                className="mt-4 text-center text-gray-600"
                {...descriptionAnimation}
            >
                Dipercaya oleh perusahaan terkemuka untuk memberikan solusi terbaik
            </motion.p>
        </motion.div>
    )
}