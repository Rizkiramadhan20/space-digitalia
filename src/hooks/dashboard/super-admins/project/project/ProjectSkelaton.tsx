import React from 'react'

export default function ProjectSkelaton() {
    return (
        <section className='min-h-full px-0 sm:px-4'>
            {/* Header Section Skeleton */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8 relative overflow-hidden">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                        <div className="h-8 w-48 bg-gray-200 rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                        <div className="h-4 w-64 bg-gray-200 rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                    </div>
                    <div className="w-full sm:w-auto">
                        <div className="h-12 w-full sm:w-40 bg-gray-200 rounded-xl relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Projects Grid Skeleton */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                    <div
                        key={i}
                        className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                        {/* Image Container Skeleton */}
                        <div className="relative h-48 overflow-hidden bg-gray-200">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            {/* Status Badge Skeleton */}
                            <div className="absolute top-3 left-3">
                                <div className="h-6 w-20 bg-gray-300/50 backdrop-blur-md rounded-full relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-300/50 via-gray-200/50 to-gray-300/50"></div>
                                </div>
                            </div>
                        </div>

                        {/* Content Container Skeleton */}
                        <div className="p-5 space-y-4">
                            {/* Title and Description Skeleton */}
                            <div className="space-y-2">
                                <div className="h-6 w-3/4 bg-gray-200 rounded-lg relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                                <div className="space-y-1">
                                    <div className="h-4 w-full bg-gray-200 rounded-lg relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                    <div className="h-4 w-2/3 bg-gray-200 rounded-lg relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Stats Skeleton */}
                            <div className="grid grid-cols-3 gap-2 py-3 border-y border-gray-100">
                                {[1, 2, 3].map((stat) => (
                                    <div key={stat} className="text-center space-y-1">
                                        <div className="h-5 w-12 mx-auto bg-gray-200 rounded animate-pulse"></div>
                                        <div className="h-4 w-16 mx-auto bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                ))}
                            </div>

                            {/* Actions Skeleton */}
                            <div className="flex items-center justify-end gap-2">
                                {[1, 2, 3].map((action) => (
                                    <div key={action} className="h-9 w-9 bg-gray-200 rounded-lg animate-pulse"></div>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Pagination Skeleton */}
            <div className="flex justify-center mt-8">
                <nav className="flex items-center gap-1">
                    <div className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div className="flex gap-1">
                        {[1, 2, 3].map((page) => (
                            <div key={page} className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse"></div>
                        ))}
                        <div className="h-10 w-6 bg-gray-200 rounded-lg animate-pulse mx-1"></div>
                        {[1, 2].map((page) => (
                            <div key={page} className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse"></div>
                        ))}
                    </div>
                    <div className="h-10 w-10 bg-gray-200 rounded-lg animate-pulse"></div>
                </nav>
            </div>
        </section>
    )
}