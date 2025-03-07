import React from 'react'

export default function ProjectSkeleton() {
    return (
        <section className="min-h-full">
            {/* Hero Section Skeleton - matches HeroProject height */}
            <div className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] bg-gray-200">
                <div className="absolute inset-0 animate-pulse bg-gradient-to-b from-gray-300 to-gray-200"></div>
            </div>

            {/* Main Content Section */}
            <section className='min-h-full py-24 bg-gradient-to-b from-gray-50/40 via-white to-white relative'>
                {/* Filter Bar Skeleton */}
                <div className='absolute top-0 left-0 right-0 mx-4 md:mx-8 lg:mx-auto lg:max-w-6xl 
                    py-6 md:py-8 px-4 md:px-8 
                    bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border border-gray-100/50 
                    transform -translate-y-1/2'>
                    <div className="flex flex-col items-start justify-start w-full gap-4 md:gap-6">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 w-full flex-wrap">
                            {/* Filter Buttons Skeleton */}
                            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-3">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="h-10 w-32 bg-gray-100 rounded-xl relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-100 via-white to-gray-100"></div>
                                    </div>
                                ))}
                            </div>
                            {/* Counter Badge Skeleton */}
                            <div className="h-10 w-40 bg-gray-100 rounded-xl relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-100 via-white to-gray-100"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='container px-4 xl:px-10 mx-auto max-w-[1400px]'>
                    {/* Project Cards Grid Skeleton */}
                    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-5'>
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className='bg-white rounded-3xl shadow-sm border border-gray-100/50 overflow-hidden'>
                                {/* Image Skeleton */}
                                <div className='relative aspect-[16/10] bg-gray-100 overflow-hidden'>
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-100 via-white to-gray-100"></div>
                                </div>

                                {/* Content Skeleton */}
                                <div className="p-6 space-y-4">
                                    {/* Title Skeleton */}
                                    <div className="h-6 w-3/4 bg-gray-100 rounded-lg relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-100 via-white to-gray-100"></div>
                                    </div>

                                    {/* Date Skeleton */}
                                    <div className="h-6 w-24 bg-gray-100 rounded-lg relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-100 via-white to-gray-100"></div>
                                    </div>

                                    {/* Author Card Skeleton */}
                                    <div className='flex items-center gap-4 bg-gray-50/80 rounded-2xl p-4'>
                                        <div className='w-12 h-12 rounded-full bg-gray-100 relative overflow-hidden'>
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-100 via-white to-gray-100"></div>
                                        </div>
                                        <div className='flex flex-col gap-2'>
                                            <div className="h-4 w-24 bg-gray-100 rounded relative overflow-hidden">
                                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-100 via-white to-gray-100"></div>
                                            </div>
                                            <div className="h-3 w-20 bg-gray-100 rounded relative overflow-hidden">
                                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-100 via-white to-gray-100"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </section>
    )
}