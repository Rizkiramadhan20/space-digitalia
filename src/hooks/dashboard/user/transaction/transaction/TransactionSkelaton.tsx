import React from 'react'

export default function TransactionSkeleton() {
    return (
        <section className='min-h-full px-0 sm:px-4'>
            {/* Header Skeleton */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                        <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
                        <div className="h-4 w-64 bg-gray-200 rounded-lg animate-pulse"></div>
                    </div>
                    <div className="w-full sm:w-40 h-12 bg-gray-200 rounded-xl animate-pulse"></div>
                </div>
            </div>

            {/* Filter Section Skeleton */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 mb-8">
                <div className="p-6 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Status Filter */}
                        <div className="space-y-3">
                            <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
                            <div className="grid grid-cols-2 gap-2">
                                {[1, 2, 3, 4].map((item) => (
                                    <div key={item} className="h-10 bg-gray-200 rounded-xl animate-pulse"></div>
                                ))}
                            </div>
                        </div>

                        {/* Payment Method Filter */}
                        <div className="space-y-3">
                            <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                            <div className="grid grid-cols-2 gap-2">
                                {[1, 2].map((item) => (
                                    <div key={item} className="h-10 bg-gray-200 rounded-xl animate-pulse"></div>
                                ))}
                            </div>
                        </div>

                        {/* Payment Type Filter */}
                        <div className="space-y-3">
                            <div className="h-5 w-28 bg-gray-200 rounded animate-pulse"></div>
                            <div className="grid grid-cols-2 gap-2">
                                {[1, 2, 3].map((item) => (
                                    <div key={item} className="h-10 bg-gray-200 rounded-xl animate-pulse"></div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Filter Actions */}
                    <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                        <div className="w-28 h-10 bg-gray-200 rounded-xl animate-pulse"></div>
                        <div className="w-32 h-10 bg-gray-200 rounded-xl animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Transaction Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div
                        key={i}
                        className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
                    >
                        {/* Image Skeleton */}
                        <div className="relative h-48 bg-gray-200 animate-pulse">
                            {/* Status Badge Skeleton */}
                            <div className="absolute top-3 right-3">
                                <div className="h-6 w-20 bg-white/50 rounded-full animate-pulse"></div>
                            </div>
                        </div>

                        <div className="p-5 space-y-4">
                            {/* Title Skeleton */}
                            <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse"></div>

                            {/* Amount Box Skeleton */}
                            <div className="bg-gray-50 p-3 rounded-xl">
                                <div className="flex justify-between items-center">
                                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-5 w-24 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            </div>

                            {/* Transaction Details Skeleton */}
                            <div className="space-y-2.5">
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-1.5">
                                        <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                                <div className="flex justify-between items-center">
                                    <div className="flex items-center gap-1.5">
                                        <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="h-4 w-28 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                    <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            </div>

                            {/* User Info Skeleton */}
                            <div className="pt-4 border-t border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
                                    <div className="flex-1 space-y-2">
                                        <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="h-3 w-40 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Date Skeleton */}
                            <div className="h-3 w-36 bg-gray-200 rounded animate-pulse"></div>

                            {/* Button Skeleton */}
                            <div className="w-full h-10 bg-gray-200 rounded-xl animate-pulse mt-2"></div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}