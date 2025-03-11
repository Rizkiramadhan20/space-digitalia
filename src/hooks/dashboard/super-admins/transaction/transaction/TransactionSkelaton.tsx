import React from 'react'

export default function TransactionSkeleton() {
    return (
        <section className='min-h-full px-0 sm:px-4'>
            {/* Header Card */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100/50 p-6 lg:p-8 mb-8 backdrop-blur-sm">
                <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
                    {/* Left side - Title and Description */}
                    <div className="space-y-3">
                        <div className="relative">
                            <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
                            <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gray-200 rounded-full animate-pulse"></div>
                        </div>
                        <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
                    </div>

                    {/* Right side - Filter Button */}
                    <div className="w-full lg:w-40 h-12 bg-gray-200 rounded-2xl animate-pulse"></div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
                    {[1, 2, 3, 4].map((item) => (
                        <div key={item} className="bg-gray-50 rounded-2xl p-4 animate-pulse">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gray-200 rounded-xl w-9 h-9"></div>
                                <div>
                                    <div className="h-4 w-16 bg-gray-200 rounded mb-1"></div>
                                    <div className="h-5 w-10 bg-gray-200 rounded"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Transaction Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                    <div key={item} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm">
                        {/* Image Skeleton */}
                        <div className="h-48 bg-gray-200 animate-pulse relative">
                            <div className="absolute top-3 right-3">
                                <div className="w-20 h-6 bg-gray-300 rounded-full"></div>
                            </div>
                        </div>

                        <div className="p-5 space-y-4">
                            {/* Title */}
                            <div className="h-6 w-3/4 bg-gray-200 rounded-lg animate-pulse"></div>

                            {/* Amount */}
                            <div className="bg-gray-50 p-3 rounded-xl">
                                <div className="flex items-center justify-between">
                                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            </div>

                            {/* Transaction Details */}
                            <div className="space-y-2.5">
                                <div className="flex items-center justify-between">
                                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            </div>

                            {/* User Info */}
                            <div className="pt-4 border-t border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
                                    <div className="flex-1">
                                        <div className="h-4 w-32 bg-gray-200 rounded mb-1 animate-pulse"></div>
                                        <div className="h-3 w-40 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Date */}
                            <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>

                            {/* View Details Button */}
                            <div className="w-full h-10 bg-gray-200 rounded-xl animate-pulse"></div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}