import React from 'react'

export default function CompanySkelaton() {
    return (
        <section className='relative min-h-full px-4 py-16 overflow-hidden xl:px-10 sm:py-20'>
            <div className="container relative z-10">
                {/* Header skeleton */}
                <div className="mb-12 sm:mb-16">
                    <div className='h-10 bg-gray-200 rounded relative overflow-hidden w-2/3 mx-auto'>
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                    <div className='h-4 bg-gray-200 rounded relative overflow-hidden w-1/2 mx-auto mt-4'>
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                </div>

                {/* Grid skeleton */}
                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:gap-8">
                    {[...Array(10)].map((_, index) => (
                        <div key={index} className="transform transition-all duration-300">
                            <div className="p-4 bg-white rounded-lg">
                                <div className='aspect-square relative overflow-hidden bg-gray-200'>
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