import React from 'react'

export default function ServiceSkelaton() {
    return (
        <section className='min-h-full px-4 xl:px-10 py-6 sm:py-8'>
            <div className="container mx-auto max-w-7xl">
                {/* Header skeleton */}
                <div className="flex items-center justify-center mb-20 text-center">
                    <div className='text-3xl sm:text-4xl md:text-5xl font-bold max-w-4xl w-full h-16 bg-gray-200 rounded-lg relative overflow-hidden'>
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                </div>

                <div className="flex flex-col gap-16 sm:gap-32 relative">
                    {/* Path skeleton for desktop */}
                    <div className="absolute left-[50px] top-[130px] h-[calc(100%-120px)] w-full hidden md:block z-[-1]">
                        <div className="h-full w-[2px] bg-gray-200 mx-auto"></div>
                    </div>

                    {[...Array(3)].map((_, index) => (
                        <div
                            key={index}
                            className={`flex flex-col md:flex-row items-center gap-12 md:gap-20 relative service-section z-10
                            ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                            data-index={index}
                        >
                            <div className="flex-1 flex flex-col gap-8 md:gap-10">
                                {/* Profile card */}
                                <div className='group flex flex-col sm:flex-row gap-6 items-start sm:items-center p-6 sm:p-8 bg-white/80 backdrop-blur-sm'>
                                    {/* Profile image */}
                                    <div className='w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-gray-200 relative overflow-hidden'>
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                    <div>
                                        {/* Profile title */}
                                        <div className='h-8 bg-gray-200 rounded w-48 mb-2 sm:mb-3 relative overflow-hidden'>
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                        </div>
                                        {/* Profile text */}
                                        <div className='h-6 bg-gray-200 rounded w-64 relative overflow-hidden'>
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Title */}
                                <div className='h-12 bg-gray-200 rounded w-3/4 relative overflow-hidden'>
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>

                                {/* Description lines */}
                                <div className='space-y-4'>
                                    {[...Array(3)].map((_, i) => (
                                        <div
                                            key={i}
                                            className='h-6 bg-gray-200 rounded relative overflow-hidden text-lg sm:text-xl'
                                            style={{ width: `${95 - i * 5}%` }}
                                        >
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Image container */}
                            <div className="flex-1 w-full">
                                <div className='w-full aspect-square bg-gray-200 rounded-lg relative overflow-hidden'>
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