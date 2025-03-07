import React from 'react'

export default function ProfileSkelaton() {
    return (
        <section className="min-h-full px-0 sm:px-4">
            {/* Header Card Skeleton */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                        <div className="h-8 w-48 bg-gray-200 rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                        <div className="h-4 w-64 bg-gray-200 rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                    </div>
                    <div className="w-full sm:w-32 h-12 bg-gray-200 rounded-xl relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                </div>
            </div>

            {/* Main Content Card Skeleton */}
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100/20 backdrop-blur-xl p-8">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    {/* Profile Image Skeleton */}
                    <div className="flex flex-col items-center space-y-8 order-1 lg:order-2">
                        <div className="w-48 h-48 rounded-full bg-gray-200 ring-4 ring-indigo-50 shadow-xl relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                        <div className="w-40 h-4 bg-gray-200 rounded relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                    </div>

                    {/* Form Fields Skeleton */}
                    <div className="lg:col-span-2 order-2 lg:order-1">
                        <div className="space-y-6">
                            {[1, 2, 3, 4, 5].map((index) => (
                                <div
                                    key={index}
                                    className="p-6 bg-gray-50/50 rounded-2xl border border-gray-100"
                                >
                                    <div className="h-4 w-24 bg-gray-200 rounded mb-2 relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                    <div className="h-8 w-full bg-gray-200 rounded-xl relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
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