import React from 'react'

export default function TestimonialSkelaton() {
    return (
        <section className='min-h-full px-4 xl:px-10 py-6 sm:py-8'>
            <div className="container">
                {/* Header skeleton */}
                <div className="text-center mb-16 sm:mb-24 md:mb-32 relative max-w-3xl mx-auto px-4">
                    <div className="w-32 h-4 bg-gray-200 rounded mx-auto mb-3 sm:mb-5 relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                    <div className="w-3/4 h-12 bg-gray-200 rounded mx-auto relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                </div>

                {/* Testimonial cards skeleton */}
                <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 container relative justify-center">
                    {[...Array(6)].map((_, index) => (
                        <div
                            key={index}
                            className={`w-[calc(50%-0.375rem)] lg:w-[calc(33.333%-1rem)]
                                      p-3 sm:p-6 lg:p-8 rounded-2xl sm:rounded-3xl
                                      bg-white/90 backdrop-blur-xl
                                      border border-white/30
                                      shadow-[0_8px_30px_rgb(0,0,0,0.04)]
                                      ${index % 3 === 1 ? 'lg:translate-y-16' : ''}`}
                        >
                            <div className="flex items-start gap-2 sm:gap-5 mb-3 sm:mb-4">
                                {/* Avatar skeleton */}
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gray-200 rounded-lg sm:rounded-xl relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>

                                <div className="flex-1">
                                    {/* Name skeleton */}
                                    <div className="w-24 h-4 bg-gray-200 rounded mb-2 relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                    {/* Role skeleton */}
                                    <div className="w-32 h-3 bg-gray-200 rounded relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Message skeleton */}
                            <div className="space-y-2">
                                {[...Array(3)].map((_, i) => (
                                    <div key={i} className="h-3 bg-gray-200 rounded relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}