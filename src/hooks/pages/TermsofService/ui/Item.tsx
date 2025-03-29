"use client"

import { motion } from 'framer-motion'

interface SectionItemProps {
    title: string
    content: string
    icon: string
    index: number
}

export const SectionItem = ({ title, content, icon, index }: SectionItemProps) => {
    return (
        <motion.section
            key={index}
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group flex gap-4 md:gap-6 p-4 rounded-xl hover:bg-white/50 transition-all duration-300"
        >
            <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: index * 0.1 + 0.2 }}
                className="flex-shrink-0 mt-1"
            >
                <div className="p-2 rounded-lg bg-blue-50 group-hover:bg-blue-100 transition-colors duration-300">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={icon} />
                    </svg>
                </div>
            </motion.div>
            <div>
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.3 }}
                    className="text-xl md:text-2xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300"
                >
                    {title}
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 + 0.4 }}
                    className="text-gray-600 leading-relaxed text-sm md:text-base"
                >
                    {content}
                </motion.p>
            </div>
        </motion.section>
    )
}