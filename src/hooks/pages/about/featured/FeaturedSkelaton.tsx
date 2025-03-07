import React from 'react'

export default function FeaturedSkelaton() {
    return (
        <section className='min-h-full px-4 xl:px-10 py-10 sm:py-20 overflow-hidden'>
            <div className='container grid grid-cols-1 md:grid-cols-2 place-items-center gap-10 relative'>
                {/* Left column skeleton */}
                <div className='flex flex-col gap-6 w-full'>
                    <div className='h-10 bg-gray-200 rounded-lg w-3/4 relative overflow-hidden'>
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
                    <div className='w-32 h-10 bg-gray-200 rounded-full relative overflow-hidden'>
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                </div>

                {/* Right column skeleton */}
                <div className="grid grid-cols-2 gap-4 sm:gap-6 bg-background shadow-xl p-4 sm:p-6 w-full">
                    {[...Array(4)].map((_, index) => (
                        <div
                            key={index}
                            className='flex flex-col sm:flex-row items-center text-center sm:text-left gap-2 sm:gap-3 p-3 sm:p-4 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-300'
                        >
                            <div className="relative w-12 h-12 sm:w-16 sm:h-16 flex-shrink-0">
                                <div className='w-full h-full bg-gray-200 rounded-lg relative overflow-hidden'>
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                            </div>
                            <div className='h-5 bg-gray-200 rounded relative overflow-hidden w-full'>
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}