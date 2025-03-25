import React from 'react'

import { motion } from 'framer-motion'

import { AnimatedSVG } from '@/hooks/pages/articles/[slug]/ui/ArticleNotFound/AnimationSvg'

export function ContentSection() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="relative container mx-auto px-4 lg:px-8 xl:px-10 py-8 md:py-12 lg:py-16 min-h-[80vh] flex items-center justify-center"
        >
            <div className="text-center space-y-6 md:space-y-8">
                <AnimatedSVG />

                <motion.div
                    className="space-y-3 md:space-y-4"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                >
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 text-transparent bg-clip-text">
                        Article Not Found
                    </h1>
                    <p className="text-lg md:text-xl lg:text-2xl text-slate-600 max-w-lg mx-auto font-light px-4">
                        Oops! The article you&apos;re looking for seems to have wandered off...
                    </p>
                </motion.div>

                <motion.button
                    onClick={() => window.history.back()}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group relative inline-flex items-center px-6 md:px-8 py-3 md:py-4 text-base md:text-lg font-medium rounded-full bg-gradient-to-r from-purple-600 to-blue-600 text-white transition-all duration-200 hover:shadow-lg hover:shadow-purple-500/30"
                >
                    <svg
                        className="w-5 h-5 mr-2 transform group-hover:-translate-x-1 transition-transform duration-200"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Take Me Back
                </motion.button>
            </div>
        </motion.div>
    )
}