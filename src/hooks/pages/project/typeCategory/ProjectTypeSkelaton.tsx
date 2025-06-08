import React from 'react'

export default function ProjectTypeTitleSkelaton() {
    return (
        <section className="min-h-full py-24 bg-gradient-to-b from-gray-50/40 via-white to-white relative">
            <div className="container px-4 xl:px-10 mx-auto max-w-[1400px]">
                {/* Header Section Skeleton */}
                <div className='absolute top-0 left-0 right-0 mx-4 md:mx-8 lg:mx-auto lg:max-w-6xl 
                    py-6 md:py-8 px-4 md:px-8 
                    bg-white/80 backdrop-blur-xl rounded-3xl shadow-lg border border-gray-100/50 
                    transform -translate-y-1/2 z-10'>
                    <div className="flex flex-col items-start justify-start w-full gap-4 md:gap-6">
                        {/* Filter Buttons Group */}
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 w-full flex-wrap">
                            {/* Filter Group */}
                            <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-3">
                                {/* Category Filter */}
                                <div className="h-11 w-32 bg-gray-200 rounded-xl relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>

                                {/* Type Filter */}
                                <div className="h-11 w-32 bg-gray-200 rounded-xl relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>

                                {/* License Filter */}
                                <div className="h-11 w-32 bg-gray-200 rounded-xl relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                            </div>

                            {/* Products Counter Badge */}
                            <div className="h-11 w-48 bg-gray-200 rounded-xl relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Grid Layout Skeleton */}
                <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8 mt-5'>
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                        <div key={i} className='group bg-white rounded-3xl shadow-sm 
                            hover:shadow-xl overflow-hidden transition-all duration-500 
                            border border-gray-100/50 hover:border-gray-200
                            hover:-translate-y-1 hover:scale-[1.02]'>
                            {/* Image Skeleton */}
                            <div className='relative aspect-[16/10] overflow-hidden bg-gray-200'>
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>

                            {/* Card Content Skeleton */}
                            <div className="p-6 space-y-4">
                                {/* Title Skeleton */}
                                <div className="h-6 w-3/4 bg-gray-200 rounded-lg relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>

                                {/* Description Skeleton */}
                                <div className="space-y-2">
                                    <div className="h-4 w-full bg-gray-200 rounded-lg relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                    <div className="h-4 w-5/6 bg-gray-200 rounded-lg relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                </div>

                                {/* Date Skeleton */}
                                <div className="h-8 w-32 bg-gray-200 rounded-lg relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>

                                {/* Author Info Skeleton */}
                                <div className='flex items-center gap-4 
                                    bg-gradient-to-r from-gray-50/80 to-gray-50/40
                                    backdrop-blur-sm rounded-2xl p-4 
                                    border border-gray-100/80'>
                                    <div className='w-12 h-12 rounded-full bg-gray-200 relative overflow-hidden'>
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                    <div className='flex flex-col gap-1'>
                                        <div className="h-4 w-24 bg-gray-200 rounded-lg relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                        </div>
                                        <div className="h-3 w-16 bg-gray-200 rounded-lg relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Pagination Skeleton */}
                <div className="mt-12 flex flex-col sm:flex-row gap-4 px-4 xl:px-10 justify-between items-center">
                    <div className="h-6 w-32 bg-gray-200 rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                    <div className="h-10 w-64 bg-gray-200 rounded-xl relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                </div>
            </div>
        </section>
    );
} 