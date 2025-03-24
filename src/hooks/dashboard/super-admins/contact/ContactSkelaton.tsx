import React from 'react'
import { motion } from 'framer-motion'

export default function ContactSkelaton() {
    // Membuat array dengan 6 item untuk menampilkan 6 skeleton card
    const skeletonCards = Array(6).fill(null)

    return (
        <section className='min-h-full px-0'>
            {/* Header Section Skeleton */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-white/90 backdrop-blur-xl rounded-3xl border border-gray-100/50 p-6 md:p-8 transition-all duration-300 z-10"
            >
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
                    <div className="space-y-2">
                        {/* Title Skeleton */}
                        <div className="h-8 w-32 bg-gray-200 rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                        {/* Subtitle Skeleton */}
                        <div className="h-4 w-64 bg-gray-200 rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                    </div>
                    {/* Button Skeleton */}
                    <div className="w-full md:w-32 h-12 bg-gray-200 rounded-2xl relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                </div>
            </motion.div>

            {/* Cards Grid Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
                {skeletonCards.map((_, index) => (
                    <div
                        key={index}
                        className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 relative overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                            <div className="space-y-2 flex-1">
                                {/* Name Skeleton */}
                                <div className="h-6 w-32 bg-gray-200 rounded-lg relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                                {/* Email Skeleton */}
                                <div className="h-4 w-48 bg-gray-200 rounded-lg relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                            </div>
                            {/* Status Icon Skeleton */}
                            <div className="h-8 w-8 bg-gray-200 rounded-xl relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                        </div>

                        {/* Message Preview Skeleton */}
                        <div className="space-y-2 mb-4">
                            <div className="h-4 w-full bg-gray-200 rounded-lg relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                            <div className="h-4 w-3/4 bg-gray-200 rounded-lg relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            {/* Status Badge Skeleton */}
                            <div className="h-6 w-16 bg-gray-200 rounded-full relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                            {/* Date Skeleton */}
                            <div className="h-4 w-24 bg-gray-200 rounded-lg relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}