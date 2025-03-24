import React from 'react'

export default function CardSkelaton() {
    return (
        <section className='min-h-full px-0 sm:px-2'>
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
                    {/* Generate 8 skeleton cards untuk semua stats (Weather, Total, Products, Users, Admin, Testimonials, Articles, Partners, Network) */}
                    {[...Array(9)].map((_, index) => (
                        <div key={index} className="flex-1 min-w-[250px] bg-white backdrop-blur-lg rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100/20">
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

                {/* Recap Analysis Section Skeleton */}
                <div className="mt-8">
                    <div className="h-8 w-48 bg-gray-200 rounded-lg mb-6 relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="bg-white backdrop-blur-lg rounded-3xl p-6 shadow-lg">
                                <div className="flex items-center justify-between">
                                    <div className="w-14 h-14 bg-gray-200 rounded-2xl relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                    <div className="h-8 w-20 bg-gray-200 rounded-full relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                </div>
                                <div className="mt-6">
                                    <div className="h-10 w-full bg-gray-200 rounded-lg mb-2 relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                    <div className="h-5 w-32 bg-gray-200 rounded relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sales Chart Skeleton */}
                <div className="mt-8">
                    <div className="h-8 w-48 bg-gray-200 rounded-lg mb-6 relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                        <div className="flex flex-wrap w-full md:w-auto gap-4">
                            <div className="w-full md:w-32 h-10 bg-gray-200 rounded-xl relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                            <div className="w-full md:w-32 h-10 bg-gray-200 rounded-xl relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                        </div>
                    </div>
                    <div className="relative w-full h-[350px] bg-gray-200 rounded-xl overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                </div>

                {/* Category Distribution Skeleton */}
                <div className="mt-8">
                    <div className="h-8 w-48 bg-gray-200 rounded-lg mb-6 relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                    <div className="relative h-[280px] bg-gray-200 rounded-xl mb-6 overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                    <div className="mt-6 space-y-3">
                        {[...Array(4)].map((_, index) => (
                            <div key={index} className="flex items-center justify-between p-3 bg-gray-200 rounded-xl relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Selling Items Skeleton */}
                <div className="mt-8">
                    <div className="h-8 w-48 bg-gray-200 rounded-lg mb-6 relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                    <div className="flex flex-wrap gap-4">
                        {[...Array(3)].map((_, index) => (
                            <div key={index} className="flex-1 min-w-[300px] flex items-center justify-between p-3 bg-gray-200 rounded-xl relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}