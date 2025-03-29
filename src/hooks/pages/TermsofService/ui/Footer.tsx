"use client"

import { motion } from 'framer-motion'

export const Footer = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-8 pt-6 border-t border-gray-200/50"
        >
            <p className="text-sm text-gray-500 text-center flex items-center justify-center gap-2 hover:text-gray-600 transition-colors duration-300">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                Terakhir diperbarui: {new Date().toLocaleDateString('id-ID')}
            </p>
        </motion.div>
    )
}