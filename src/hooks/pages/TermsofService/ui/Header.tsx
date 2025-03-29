"use client"

import { motion } from 'framer-motion'

export const Header = () => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center justify-center mb-12 lg:mb-16"
        >
            <div className="relative">
                <div className="absolute -inset-1.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 animate-pulse"></div>
                <h1 className="relative text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-2 text-center">
                    Terms of Service
                </h1>
            </div>
            <p className="mt-4 text-gray-600 text-center max-w-2xl text-sm md:text-base">
                Ketentuan layanan Space Digitalia yang mengatur penggunaan platform kami
            </p>
        </motion.div>
    )
}