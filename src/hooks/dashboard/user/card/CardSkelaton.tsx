import React from 'react'

export default function CardSkelaton() {
    return (
        <section>
            <div className="flex flex-col gap-8">
                {/* Welcome Message with Digital Clock Skeleton */}
                <div className="bg-white backdrop-blur-lg rounded-3xl p-6 shadow-lg">
                    <div className="flex items-center justify-between gap-8">
                        <div className="h-8 w-64 bg-gray-200 rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                        <div className="h-8 w-32 bg-gray-200 rounded-xl relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                    </div>
                </div>

                {/* Stats Cards Skeleton */}
                <div className="flex flex-wrap gap-4 md:gap-8">
                    {[1, 2, 3, 4, 5].map((item) => (
                        <div key={item} className="flex-1 min-w-[250px] bg-white backdrop-blur-lg rounded-3xl p-6 shadow-lg">
                            <div className="flex items-center justify-between">
                                <div className="w-14 h-14 bg-gray-200 rounded-2xl relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                                <div className="h-8 w-20 bg-gray-200 rounded-full relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                            </div>
                            <div className="mt-6">
                                <div className="h-10 w-24 bg-gray-200 rounded-lg mb-2 relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                                <div className="h-5 w-32 bg-gray-200 rounded relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Main Content Row */}
                <div className="flex flex-wrap gap-4 md:gap-8">
                    {/* Sales Chart Skeleton */}
                    <div className="flex-[2] min-w-[320px] bg-white backdrop-blur-lg rounded-3xl p-6 md:p-8 shadow-lg">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                            <div className="h-8 w-48 bg-gray-200 rounded-lg relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                            <div className="flex flex-wrap w-full md:w-auto gap-4">
                                <div className="w-full md:w-32 h-10 bg-gray-200 rounded-xl relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                                <div className="w-full md:w-32 h-10 bg-gray-200 rounded-xl relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                            </div>
                        </div>
                        <div className="h-[350px] bg-gray-200 rounded-xl relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                    </div>

                    {/* Category Distribution Skeleton */}
                    <div className="flex-1 min-w-[320px] bg-white backdrop-blur-lg rounded-3xl p-6 md:p-8 shadow-lg">
                        <div className="h-8 w-48 bg-gray-200 rounded-lg mb-8 relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                        <div className="h-[280px] bg-gray-200 rounded-xl mb-6 relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                        <div className="space-y-3">
                            {[1, 2, 3, 4].map((item) => (
                                <div key={item} className="h-12 bg-gray-200 rounded-xl relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Top Selling Items Skeleton */}
                    <div className="w-full bg-white backdrop-blur-lg rounded-3xl p-6 md:p-8 shadow-lg">
                        <div className="h-8 w-48 bg-gray-200 rounded-lg mb-8 relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                        <div className="flex flex-wrap gap-4">
                            {[1, 2, 3].map((item) => (
                                <div key={item} className="flex-1 min-w-[300px] flex items-center gap-4 p-3">
                                    <div className="w-16 h-16 bg-gray-200 rounded-xl relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                    <div className="flex-1">
                                        <div className="h-5 w-32 bg-gray-200 rounded mb-2 relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                        </div>
                                        <div className="h-4 w-20 bg-gray-200 rounded relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}