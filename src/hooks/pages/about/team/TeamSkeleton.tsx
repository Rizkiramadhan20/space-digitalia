import React from 'react'

export default function TeamSkeleton() {
    return (
        <section className='min-h-full px-4 xl:px-10 py-16 sm:py-24 bg-gradient-to-b from-white to-gray-50'>
            <div className='container'>
                {/* Title skeleton */}
                <div className='flex flex-col gap-6 w-full mb-16'>
                    <div className='h-12 bg-gray-200 rounded-lg w-1/3 relative overflow-hidden'>
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                </div>

                {/* Team grid skeleton */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-8">
                    {[...Array(8)].map((_, index) => (
                        <div key={index} className='flex flex-col'>
                            {/* Image skeleton */}
                            <div className="relative w-full aspect-square mb-6 overflow-hidden rounded-2xl">
                                <div className='w-full h-full bg-gray-200 relative overflow-hidden'>
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                            </div>

                            {/* Text content skeleton */}
                            <div className="text-center space-y-2">
                                <div className='h-4 bg-gray-200 rounded w-2/3 mx-auto relative overflow-hidden'>
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                                <div className='h-6 bg-gray-200 rounded w-3/4 mx-auto relative overflow-hidden'>
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
} 