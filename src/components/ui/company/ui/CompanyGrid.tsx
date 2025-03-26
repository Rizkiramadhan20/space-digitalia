import React from 'react'

import { motion } from 'framer-motion'

import Image from 'next/image'

import { CompanyGridProps } from '@/components/ui/company/types/company'

import {
    containerVariants,
    itemVariants,
    companyLogoContainerAnimation,
    companyLogoAnimation
} from '@/components/ui/company/animation/animation'

export default function CompanyGrid({ companies }: CompanyGridProps) {
    return (
        <motion.div
            className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
        >
            {companies.map((item) => (
                <motion.div
                    key={item.id}
                    className="transform transition-all duration-300"
                    variants={itemVariants}
                    whileHover={{ scale: 1.05 }}
                >
                    <motion.div
                        className='p-4 bg-white rounded-lg'
                        transition={{ duration: 0.3 }}
                    >
                        <motion.div
                            className='aspect-square overflow-hidden'
                            {...companyLogoContainerAnimation}
                        >
                            <motion.div
                                {...companyLogoAnimation}
                            >
                                <Image
                                    src={item.imageUrl}
                                    alt={"company"}
                                    width={500}
                                    height={500}
                                    className='object-contain w-full h-full filter grayscale hover:grayscale-0 transition-all duration-300'
                                />
                            </motion.div>
                        </motion.div>
                    </motion.div>
                </motion.div>
            ))}
        </motion.div>
    )
}