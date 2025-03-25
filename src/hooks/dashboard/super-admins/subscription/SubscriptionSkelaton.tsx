import React from 'react'

export default function SubscriptionSkelaton() {
    return (
        <section className='min-h-full px-0'>
            {/* Header Skeleton */}
            <div className="bg-white/90 backdrop-blur-xl rounded-3xl border border-gray-100/50 p-6 md:p-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 md:gap-6">
                    <div className="space-y-2">
                        <div className="h-8 w-48 bg-gray-200 rounded-xl relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                        <div className="h-4 w-64 bg-gray-200 rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                    </div>
                    <div className="w-full md:w-32 h-12 bg-gray-200 rounded-2xl relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                </div>
            </div>

            {/* Grid of Subscriber Cards */}
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                    <div
                        key={item}
                        className="p-6 border border-gray-100 rounded-2xl bg-white shadow-lg"
                    >
                        <div className="flex flex-col gap-4">
                            {/* Header with Icon and Status */}
                            <div className="flex items-start justify-between">
                                <div className="p-3 bg-gray-200 rounded-xl relative overflow-hidden w-12 h-12">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                                <div className="w-20 h-6 bg-gray-200 rounded-full relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                            </div>

                            {/* Email and Date Info */}
                            <div className="space-y-3">
                                {/* Email */}
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 bg-gray-200 rounded relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                    <div className="h-4 w-48 bg-gray-200 rounded relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                </div>

                                {/* Date */}
                                <div className="flex items-center gap-2">
                                    <div className="w-5 h-5 bg-gray-200 rounded relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                    <div className="h-4 w-36 bg-gray-200 rounded relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Skeleton */}
            <div className="mt-6 flex justify-center">
                <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((item) => (
                        <div
                            key={item}
                            className="w-10 h-10 bg-gray-200 rounded-lg relative overflow-hidden"
                        >
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}