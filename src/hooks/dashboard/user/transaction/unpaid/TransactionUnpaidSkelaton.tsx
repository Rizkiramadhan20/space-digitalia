import React from 'react'

export default function UnpaidSkelaton() {
    return (
        <section className='min-h-screen bg-gradient-to-b from-gray-50/50 via-white to-gray-50/30 py-12'>
            <div className="container">
                <div className="flex flex-col gap-12">
                    {/* Search Bar Skeleton */}
                    <div className="search relative max-w-2xl mx-auto w-full">
                        <div className="w-full h-14 rounded-2xl bg-gray-200/80 animate-pulse"></div>
                    </div>

                    {/* Order Grid Skeleton */}
                    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6'>
                        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                            <div
                                key={i}
                                className="bg-white/95 p-6 rounded-2xl shadow-sm border border-gray-100/80 
                                backdrop-blur-xl"
                            >
                                {/* Order Header Skeleton */}
                                <div className="flex justify-between items-start mb-4">
                                    <div className="space-y-2">
                                        <div className="h-6 w-28 bg-gray-200 rounded-lg animate-pulse"></div>
                                        <div className="h-4 w-36 bg-gray-200 rounded-lg animate-pulse"></div>
                                    </div>
                                    <div className="h-8 w-8 bg-gray-200 rounded-full animate-pulse"></div>
                                </div>

                                {/* Status Badge Skeleton */}
                                <div className="mb-4">
                                    <div className="h-6 w-24 bg-gray-200 rounded-full animate-pulse"></div>
                                </div>

                                {/* Amount Skeleton */}
                                <div className="mb-6 space-y-2">
                                    <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
                                    <div className="h-7 w-32 bg-gray-200 rounded animate-pulse"></div>
                                </div>

                                {/* Action Buttons Skeleton */}
                                <div className="flex gap-3">
                                    <div className="flex-1 h-10 bg-gray-200 rounded-xl animate-pulse"></div>
                                    <div className="w-24 h-10 bg-gray-200 rounded-xl animate-pulse"></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination Skeleton */}
                    <div className="flex justify-center gap-2">
                        {[1, 2, 3, 4, 5].map((i) => (
                            <div
                                key={i}
                                className="w-10 h-10 bg-gray-200 rounded-lg animate-pulse"
                            ></div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}