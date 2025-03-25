import React from 'react'

export default function ArticleSkeleton() {
    return (
        <section className='min-h-full bg-gradient-to-b from-gray-50/50 to-white'>
            <div className="container mx-auto px-4 lg:px-8 xl:px-10 py-2 lg:py-12 max-w-7xl">
                {/* Breadcrumb Skeleton */}
                <div className="mb-8 lg:mb-12">
                    <ol className="flex flex-wrap items-center gap-2 sm:gap-0 text-xs lg:text-sm text-gray-600">
                        <li className="flex items-center">
                            <div className="h-4 w-16 bg-gray-100 rounded relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-100 via-white to-gray-100"></div>
                            </div>
                            <span className="mx-2">/</span>
                        </li>
                        <li className="flex items-center">
                            <div className="h-4 w-20 bg-gray-100 rounded relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-100 via-white to-gray-100"></div>
                            </div>
                            <span className="mx-2">/</span>
                        </li>
                        <li className="flex items-center">
                            <div className="h-4 w-24 bg-gray-100 rounded relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-100 via-white to-gray-100"></div>
                            </div>
                        </li>
                    </ol>
                </div>

                {/* Title and Meta Skeleton */}
                <div className="space-y-8 mb-12">
                    <div className="h-20 w-3/4 bg-gray-100 rounded-lg relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-100 via-white to-gray-100"></div>
                    </div>

                    <div className='flex flex-wrap items-center gap-4'>
                        <div className="h-8 w-24 bg-gray-100 rounded-full relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-100 via-white to-gray-100"></div>
                        </div>
                        <div className="h-8 w-32 bg-gray-100 rounded-full relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-100 via-white to-gray-100"></div>
                        </div>
                        <div className="h-8 w-28 bg-gray-100 rounded-full relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-100 via-white to-gray-100"></div>
                        </div>
                    </div>

                    {/* Share buttons skeleton */}
                    <div className="flex gap-3">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-10 w-10 bg-gray-100 rounded-lg relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-100 via-white to-gray-100"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Featured Image Skeleton */}
                <div className="w-full md:h-[600px] h-[400px] relative rounded-3xl overflow-hidden mb-16 bg-gray-100 shadow-2xl shadow-gray-200/60">
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-100 via-white to-gray-100"></div>
                </div>

                {/* Content Layout */}
                <div className='flex flex-col lg:flex-row gap-12 lg:gap-20'>
                    {/* Main Content Skeleton */}
                    <div className='lg:w-2/3 space-y-8'>
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div key={i} className="space-y-4">
                                <div className="h-8 w-3/4 bg-gray-100 rounded relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-100 via-white to-gray-100"></div>
                                </div>
                                {[1, 2, 3].map((j) => (
                                    <div key={j} className="h-4 w-full bg-gray-100 rounded relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-100 via-white to-gray-100"></div>
                                    </div>
                                ))}
                            </div>
                        ))}

                        {/* Tags Skeleton */}
                        <div className='mt-16 space-y-4'>
                            <div className="h-6 w-20 bg-gray-100 rounded relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-100 via-white to-gray-100"></div>
                            </div>
                            <div className='flex flex-wrap gap-2 md:gap-3'>
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="h-8 w-24 bg-gray-100 rounded-full relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-100 via-white to-gray-100"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Sidebar Skeleton */}
                    <div className='lg:w-1/3'>
                        <div className='space-y-6 lg:sticky lg:top-24'>
                            {/* Author Card Skeleton */}
                            <div className='bg-white rounded-2xl p-8 shadow-xl shadow-gray-100/50 border border-gray-100/80'>
                                <div className='flex items-center gap-5'>
                                    <div className="w-16 h-16 bg-gray-100 rounded-full relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-100 via-white to-gray-100"></div>
                                    </div>
                                    <div className="space-y-2">
                                        <div className="h-5 w-32 bg-gray-100 rounded relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-100 via-white to-gray-100"></div>
                                        </div>
                                        <div className="h-4 w-24 bg-gray-100 rounded relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-100 via-white to-gray-100"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Related Articles Skeleton */}
                            <div className='bg-gradient-to-br from-white to-gray-50/50 backdrop-blur-xl rounded-3xl p-8 border border-gray-200/60'>
                                <div className="h-6 w-40 bg-gray-100 rounded mb-6 relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-100 via-white to-gray-100"></div>
                                </div>
                                <div className="space-y-4">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex gap-5 items-center">
                                            <div className="relative w-24 h-24 flex-shrink-0 bg-gray-100 rounded-2xl overflow-hidden">
                                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-100 via-white to-gray-100"></div>
                                            </div>
                                            <div className="flex-1 space-y-2">
                                                <div className="h-4 w-full bg-gray-100 rounded relative overflow-hidden">
                                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-100 via-white to-gray-100"></div>
                                                </div>
                                                <div className="h-4 w-1/2 bg-gray-100 rounded relative overflow-hidden">
                                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-100 via-white to-gray-100"></div>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}