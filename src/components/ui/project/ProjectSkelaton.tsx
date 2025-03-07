import React from 'react'

export default function ProjectSkelaton() {
    return (
        <section className="relative min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gray-900 via-black to-black text-white py-12 sm:py-20 px-4 sm:px-6 lg:px-8 flex justify-center items-center">
            <div className="container">
                <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
                    {/* Text Content - Right Side */}
                    <div className="text-left lg:order-2 space-y-8">
                        <div className="h-24 bg-gray-800/50 rounded-lg relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-800/50 via-gray-700/50 to-gray-800/50"></div>
                        </div>
                        <div className="space-y-4">
                            {[...Array(3)].map((_, i) => (
                                <div key={i} className="h-6 bg-gray-800/50 rounded relative overflow-hidden" style={{ width: `${90 - i * 5}%` }}>
                                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-800/50 via-gray-700/50 to-gray-800/50"></div>
                                </div>
                            ))}
                        </div>
                        <div className="h-12 w-48 bg-gray-800/50 rounded-full relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-800/50 via-gray-700/50 to-gray-800/50"></div>
                        </div>
                    </div>

                    {/* Project Cards Grid - Left Side */}
                    <div className="lg:order-1">
                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                            {/* Left Column Skeleton */}
                            <div className="flex flex-col overflow-hidden rounded-3xl shadow-[0_0_40px_rgba(100,100,255,0.15)] backdrop-blur-sm bg-gradient-to-b from-gray-900/60 to-black/60 border border-gray-800/50" style={{ height: "600px", maxHeight: "70vh" }}>
                                <div className="flex flex-col gap-4 sm:gap-8 p-3 sm:p-4">
                                    {[...Array(4)].map((_, index) => (
                                        <div key={`left-${index}`} className="w-full aspect-video bg-gray-800/50 rounded-xl relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-800/50 via-gray-700/50 to-gray-800/50"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Right Column Skeleton */}
                            <div className="flex flex-col overflow-hidden rounded-3xl shadow-[0_0_40px_rgba(100,100,255,0.15)] backdrop-blur-sm bg-gradient-to-b from-gray-900/60 to-black/60 border border-gray-800/50" style={{ height: "600px", maxHeight: "70vh" }}>
                                <div className="flex flex-col gap-4 sm:gap-8 p-3 sm:p-4">
                                    {[...Array(4)].map((_, index) => (
                                        <div key={`right-${index}`} className="w-full aspect-video bg-gray-800/50 rounded-xl relative overflow-hidden">
                                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-800/50 via-gray-700/50 to-gray-800/50"></div>
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