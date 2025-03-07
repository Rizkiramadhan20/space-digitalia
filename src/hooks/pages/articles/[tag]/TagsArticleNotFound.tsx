import React from 'react'
import { motion } from 'framer-motion'

export default function TagsArticleNotFound({ tags }: { tags: string[] }) {
    return (
        <section className='min-h-screen bg-gradient-to-b from-blue-50/50 via-white to-white flex items-center'>
            <div className="container mx-auto px-4 lg:px-8 xl:px-10 py-2 lg:py-12 max-w-7xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20 items-center">
                    <motion.div
                        className="order-2 md:order-1 space-y-6"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <motion.h1
                            className="text-4xl lg:text-5xl font-bold text-gray-900 leading-tight"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2, duration: 0.5 }}
                        >
                            Oops! Artikel Tidak Ditemukan
                        </motion.h1>
                        <motion.p
                            className="text-lg text-gray-600 leading-relaxed"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            Kami tidak dapat menemukan artikel apa pun dalam tag <span className="font-semibold text-blue-600">&quot;{tags[0]}&quot;</span>. Artikel tersebut mungkin telah dipindahkan atau dihapus.
                        </motion.p>
                        <motion.div
                            className="pt-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.5 }}
                        >
                            <motion.button
                                onClick={() => window.history.back()}
                                className="inline-flex items-center px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-xl transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                </svg>
                                Kembali
                            </motion.button>
                        </motion.div>
                    </motion.div>
                    <motion.div
                        className="order-1 md:order-2 flex justify-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{
                            duration: 0.8,
                            type: "spring",
                            bounce: 0.4
                        }}
                    >
                        <svg
                            className="w-full max-w-lg"
                            viewBox="0 0 550 500"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            {/* Background Circle */}
                            <circle cx="275" cy="250" r="200" fill="#EFF6FF" />

                            {/* Main Document */}
                            <rect x="175" y="150" width="200" height="250" rx="8" fill="white" stroke="#3B82F6" strokeWidth="4" />

                            {/* Document Lines */}
                            <line x1="200" y1="190" x2="350" y2="190" stroke="#CBD5E1" strokeWidth="4" strokeLinecap="round" />
                            <line x1="200" y1="220" x2="350" y2="220" stroke="#CBD5E1" strokeWidth="4" strokeLinecap="round" />
                            <line x1="200" y1="250" x2="300" y2="250" stroke="#CBD5E1" strokeWidth="4" strokeLinecap="round" />

                            {/* Search Icon */}
                            <circle cx="350" cy="300" r="60" fill="#BFDBFE" stroke="#3B82F6" strokeWidth="4" />
                            <circle cx="350" cy="300" r="25" fill="none" stroke="#3B82F6" strokeWidth="4" />
                            <line x1="390" y1="340" x2="420" y2="370" stroke="#3B82F6" strokeWidth="4" strokeLinecap="round" />

                            {/* Question Mark */}
                            <path
                                d="M345 285v-2c0-5 4-8 8-8 4 0 8 3 8 8s-4 8-8 8v4"
                                stroke="#3B82F6"
                                strokeWidth="4"
                                strokeLinecap="round"
                            />
                            <circle cx="353" cy="295" r="2" fill="#3B82F6" />

                            {/* Floating Elements */}
                            <rect x="150" y="180" width="40" height="40" rx="8" fill="#93C5FD" opacity="0.5" />
                            <rect x="400" y="220" width="30" height="30" rx="6" fill="#93C5FD" opacity="0.5" />
                            <circle cx="180" cy="350" r="15" fill="#93C5FD" opacity="0.5" />
                            <circle cx="420" cy="280" r="10" fill="#93C5FD" opacity="0.5" />
                        </svg>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
