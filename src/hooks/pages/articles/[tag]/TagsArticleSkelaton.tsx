import React from 'react'

export default function ArticleSkeleton() {
    return (
        <>
            <div className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
                <div className="absolute inset-0">
                    <div className="w-full h-[130%] bg-gray-200 relative overflow-hidden">
                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/10" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 z-10">
                        {/* Category Title Skeleton */}
                        <div className="h-16 w-72 bg-white/10 rounded-lg backdrop-blur-md relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-white/10 via-white/20 to-white/10"></div>
                        </div>

                        {/* Breadcrumb Skeleton */}
                        <div className="flex items-center gap-4 bg-white/10 px-8 py-3 rounded-full backdrop-blur-md border border-white/20">
                            <div className="h-4 w-16 bg-white/20 rounded-full relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-white/20 via-white/30 to-white/20"></div>
                            </div>
                            <div className="text-white/90">→</div>
                            <div className="h-4 w-24 bg-white/20 rounded-full relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-white/20 via-white/30 to-white/20"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <section className="min-h-full bg-gradient-to-b from-gray-50/50 to-white">
                <div className="container px-4 lg:px-8 xl:px-10 py-2 lg:py-12">
                    {/* Top Article Skeleton */}
                    <div className="mb-10">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 place-items-center bg-white rounded-3xl p-6 border border-gray-100">
                            <div className="w-full h-[150px] md:h-[350px] bg-gray-100 rounded-2xl relative overflow-hidden">
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-100 via-white to-gray-100"></div>
                            </div>

                            <div className="flex flex-col gap-6 w-full">
                                <div className="h-8 w-32 bg-gray-100 rounded-full relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-100 via-white to-gray-100"></div>
                                </div>
                                <div className="space-y-3">
                                    <div className="h-8 w-3/4 bg-gray-100 rounded-lg relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-100 via-white to-gray-100"></div>
                                    </div>
                                    <div className="h-8 w-1/2 bg-gray-100 rounded-lg relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-100 via-white to-gray-100"></div>
                                    </div>
                                </div>
                                <div className="h-20 w-full bg-gray-100 rounded-lg relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-100 via-white to-gray-100"></div>
                                </div>
                                <div className="flex justify-between items-center gap-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gray-100 rounded-full relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-100 via-white to-gray-100"></div>
                                        </div>
                                        <div className="space-y-2">
                                            <div className="h-4 w-24 bg-gray-100 rounded relative overflow-hidden">
                                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-100 via-white to-gray-100"></div>
                                            </div>
                                            <div className="h-3 w-20 bg-gray-100 rounded relative overflow-hidden">
                                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-100 via-white to-gray-100"></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="h-4 w-32 bg-gray-100 rounded relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-100 via-white to-gray-100"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Other Articles Grid Skeleton */}
                    <div className='grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 place-items-center bg-white rounded-3xl p-6 border border-gray-100'>
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm w-full">
                                <div className="w-full h-[250px] bg-gray-100 relative overflow-hidden">
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-100 via-white to-gray-100"></div>
                                </div>
                                <div className="p-6">
                                    <div className="h-4 w-20 bg-gray-100 rounded mb-2 relative overflow-hidden">
                                        <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-100 via-white to-gray-100"></div>
                                    </div>
                                    <div className="space-y-2 mb-4">
                                        <div className="h-6 w-3/4 bg-gray-100 rounded relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-100 via-white to-gray-100"></div>
                                        </div>
                                        <div className="h-6 w-1/2 bg-gray-100 rounded relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-100 via-white to-gray-100"></div>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                        <div className="flex items-center gap-2">
                                            <div className="w-10 h-10 bg-gray-100 rounded-full relative overflow-hidden">
                                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-100 via-white to-gray-100"></div>
                                            </div>
                                            <div className="space-y-1">
                                                <div className="h-4 w-24 bg-gray-100 rounded relative overflow-hidden">
                                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-100 via-white to-gray-100"></div>
                                                </div>
                                                <div className="h-3 w-20 bg-gray-100 rounded relative overflow-hidden">
                                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-100 via-white to-gray-100"></div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="h-4 w-20 bg-gray-100 rounded relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-100 via-white to-gray-100"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
}