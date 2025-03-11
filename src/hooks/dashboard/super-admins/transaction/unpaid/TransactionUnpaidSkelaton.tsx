import React from 'react'

export default function TransactionUnpaidSkeleton() {
    return (
        <section className='min-h-full px-0 sm:px-4'>
            {/* Header */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                        {/* Title Skeleton */}
                        <div className="h-8 w-48 bg-gray-200 rounded-lg animate-pulse"></div>
                        {/* Subtitle Skeleton */}
                        <div className="h-4 w-64 bg-gray-200 rounded animate-pulse"></div>
                    </div>
                </div>
            </div>

            {/* Transaction Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                    <div key={item} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                        {/* Image Skeleton */}
                        <div className="relative h-48 w-full bg-gray-200 animate-pulse"></div>

                        {/* Content Container */}
                        <div className="p-5">
                            {/* Header */}
                            <div className="flex justify-between items-start gap-4 mb-4">
                                <div className="flex-1">
                                    <div className="h-6 w-3/4 bg-gray-200 rounded animate-pulse mb-2"></div>
                                    <div className="h-4 w-1/2 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                                <div className="w-20 h-6 bg-gray-200 rounded-full animate-pulse"></div>
                            </div>

                            {/* Info Grid */}
                            <div className="space-y-3">
                                {/* User Info Skeleton */}
                                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100">
                                    <div className="w-12 h-12 rounded-full bg-gray-200 animate-pulse"></div>
                                    <div className="flex-1">
                                        <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2"></div>
                                        <div className="h-3 w-32 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                </div>

                                {/* Amount Skeleton */}
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
                                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                                </div>

                                {/* Date Skeleton */}
                                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                    <div className="w-10 h-10 rounded-full bg-gray-200 animate-pulse"></div>
                                    <div className="h-4 w-32 bg-gray-200 rounded animate-pulse"></div>
                                </div>
                            </div>

                            {/* Action Button Skeleton */}
                            <div className="w-full h-10 bg-gray-200 rounded-xl animate-pulse mt-2"></div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}