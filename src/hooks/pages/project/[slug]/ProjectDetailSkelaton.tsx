import React from 'react'

export default function ProjectDetailSkeleton() {
    return (
        <section className="min-h-screen bg-background text-foreground">
            <div className="container px-4 xl:px-10 py-6 sm:py-8">
                {/* Breadcrumbs Skeleton */}
                <div className="mb-8">
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="h-8 w-24 bg-gray-200 rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                        <div className="h-8 w-32 bg-gray-200 rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                        <div className="h-8 w-40 bg-gray-200 rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
                    {/* Left Column Skeleton */}
                    <div className="lg:col-span-8 space-y-6 md:space-y-8">
                        {/* Hero Image Skeleton */}
                        <div className='relative aspect-video rounded-2xl overflow-hidden bg-gray-200'>
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>

                        {/* Gallery Grid Skeleton */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="relative aspect-video rounded-xl overflow-hidden bg-gray-200">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                            ))}
                        </div>

                        {/* Description Section Skeleton */}
                        <div className="bg-card/50 backdrop-blur-sm rounded-xl md:rounded-2xl p-6 md:p-8 space-y-6 border border-border/50">
                            <div className="h-8 w-48 bg-gray-200 rounded-lg relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                            <div className="space-y-3">
                                <div className="h-4 w-full bg-gray-200 rounded-lg relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                                <div className="h-4 w-5/6 bg-gray-200 rounded-lg relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                                <div className="h-4 w-4/6 bg-gray-200 rounded-lg relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                            </div>

                            {/* Content Section Skeleton */}
                            <div className="pt-6">
                                <div className="h-8 w-40 bg-gray-200 rounded-lg relative overflow-hidden mb-4">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                                <div className="space-y-4">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div key={i} className="h-4 w-full bg-gray-200 rounded-lg relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right Column Skeleton */}
                    <div className="lg:col-span-4">
                        <div className="sticky top-4 space-y-6">
                            {/* Author Profile Card Skeleton */}
                            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50">
                                {/* Author Info Skeleton */}
                                <div className="flex items-center gap-4 mb-8">
                                    <div className="w-16 h-16 rounded-full bg-gray-200 relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                    <div>
                                        <div className="h-6 w-32 bg-gray-200 rounded-lg relative overflow-hidden mb-2">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                        </div>
                                        <div className="h-4 w-24 bg-gray-200 rounded-lg relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                        </div>
                                    </div>
                                </div>

                                {/* Project Stats Skeleton */}
                                <div className="space-y-6 mb-8">
                                    {/* Rating Card Skeleton */}
                                    <div className="bg-primary/5 rounded-xl p-4">
                                        <div className="flex items-center justify-between">
                                            <div className="flex gap-1">
                                                {[1, 2, 3, 4, 5].map((i) => (
                                                    <div key={i} className="w-5 h-5 bg-gray-200 rounded-full relative overflow-hidden">
                                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                                    </div>
                                                ))}
                                            </div>
                                            <div className="h-6 w-16 bg-gray-200 rounded-lg relative overflow-hidden">
                                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                            </div>
                                        </div>
                                        <div className="h-4 w-32 bg-gray-200 rounded-lg relative overflow-hidden mt-2">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                        </div>
                                    </div>

                                    {/* Project Metrics Grid Skeleton */}
                                    <div className="grid grid-cols-2 gap-4">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <div key={i} className="bg-card/50 rounded-xl p-4 border border-border/50">
                                                <div className="h-4 w-20 bg-gray-200 rounded-lg relative overflow-hidden mb-2">
                                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                                </div>
                                                <div className="h-6 w-12 bg-gray-200 rounded-lg relative overflow-hidden">
                                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Last Updated Skeleton */}
                                <div className="flex items-center gap-2 p-3 bg-primary/5 rounded-lg">
                                    <div className="h-4 w-4 bg-gray-200 rounded-full relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                    <div className="h-4 w-40 bg-gray-200 rounded-lg relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                </div>
                            </div>

                            {/* License Options Skeleton */}
                            <div className="bg-card/80 backdrop-blur-sm rounded-2xl p-6 border border-border/50">
                                <div className="space-y-4">
                                    <div>
                                        <div className="h-6 w-32 bg-gray-200 rounded-lg relative overflow-hidden mb-2">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                        </div>
                                        <div className="h-4 w-48 bg-gray-200 rounded-lg relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                        </div>
                                    </div>

                                    <div className="h-12 w-full bg-gray-200 rounded-xl relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                    </div>
                                </div>
                            </div>

                            {/* Technologies Card Skeleton */}
                            <div className="bg-card rounded-2xl p-6 border border-border/50 backdrop-blur-md shadow-lg shadow-primary/5">
                                <div className="h-6 w-32 bg-gray-200 rounded-lg relative overflow-hidden mb-6">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                </div>
                                <div className="flex flex-wrap gap-3">
                                    {[1, 2, 3, 4, 5].map((i) => (
                                        <div key={i} className="flex items-center gap-3 px-4 py-2.5 bg-card rounded-xl border border-border/50">
                                            <div className="w-6 h-6 bg-gray-200 rounded-full relative overflow-hidden">
                                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                            </div>
                                            <div className="h-4 w-16 bg-gray-200 rounded-lg relative overflow-hidden">
                                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}