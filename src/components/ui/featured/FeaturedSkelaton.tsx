import React from 'react'

export default function FeaturedSkelaton() {
    return (
        <section className='min-h-full px-4 xl:px-10 py-6 sm:py-8'>
            <div className="container flex flex-wrap gap-6">
                {[...Array(4)].map((_, index) => (
                    <div
                        key={index}
                        className='flex-1 min-w-[280px] flex flex-row items-start gap-4 bg-white rounded-xl shadow-sm p-4'
                    >
                        {/* Image skeleton */}
                        <div className="relative w-24 h-24 flex-shrink-0">
                            <div className='w-full h-full bg-gray-200 rounded-lg relative overflow-hidden'>
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                        </div>

                        {/* Content skeleton */}
                        <div className="flex flex-col gap-2">
                            <div className='h-6 bg-gray-200 rounded relative overflow-hidden w-3/4'>
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                            <div className='space-y-2'>
                                <div className='h-4 bg-gray-200 rounded relative overflow-hidden w-full'>
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                                <div className='h-4 bg-gray-200 rounded relative overflow-hidden w-5/6'>
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}