import React from 'react'

export default function AboutSkeleton() {
    return (
        <section className='min-h-screen relative bg-gradient-to-br from-white via-blue-50 to-blue-100 overflow-hidden mt-[0] xl:mt-[-8rem]'>
            {/* Enhanced glass-morphism background elements to match Home.tsx */}
            <div className='absolute -z-10 inset-0'>
                <div className='absolute top-1/4 left-1/3 w-96 h-96 bg-blue-300/20 rounded-full blur-[100px] animate-pulse'></div>
                <div className='absolute bottom-1/3 right-1/4 w-[30rem] h-[30rem] bg-purple-300/20 rounded-full blur-[100px] animate-pulse delay-700'></div>
                <div className='absolute top-1/2 left-1/2 w-80 h-80 bg-pink-300/20 rounded-full blur-[100px] animate-pulse delay-1000'></div>
            </div>

            <div className='container mx-auto px-4 xl:px-10 relative z-10 py-12 lg:py-20'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center'>
                    {/* Image skeleton */}
                    <div className="relative w-full aspect-square xl:aspect-[4/5] rounded-lg overflow-hidden">
                        <div className="w-full h-full bg-gray-200 relative overflow-hidden">
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>
                    </div>

                    <div className='flex flex-col gap-6 lg:gap-8 items-center text-center xl:text-start xl:items-start'>
                        {/* Title skeleton */}
                        <div className='w-3/4 h-14 bg-gray-200 rounded-lg relative overflow-hidden'>
                            <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                        </div>

                        {/* Text skeleton */}
                        <div className='w-full space-y-3'>
                            <div className='h-4 bg-gray-200 rounded relative overflow-hidden'>
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                            <div className='h-4 bg-gray-200 rounded relative overflow-hidden w-5/6'>
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                            <div className='h-4 bg-gray-200 rounded relative overflow-hidden w-4/6'>
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                        </div>

                        {/* Description skeleton */}
                        <div className='w-full space-y-3'>
                            <div className='h-4 bg-gray-200 rounded relative overflow-hidden'>
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                            <div className='h-4 bg-gray-200 rounded relative overflow-hidden w-5/6'>
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                            <div className='h-4 bg-gray-200 rounded relative overflow-hidden w-4/6'>
                                <div className="absolute inset-0 -translate-x-full animate-[shimmer_1.5s_infinite] bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}