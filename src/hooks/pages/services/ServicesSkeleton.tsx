import React from 'react'

export default function ServicesSkeleton() {
    return (
        <>
            <section className='min-h-full bg-[#e6f4fa]'>
                <div className="container px-4 xl:px-10">
                    <div className="flex items-center justify-center flex-col gap-6 py-10 md:py-20">
                        {/* Logo skeleton */}
                        <div className='w-[60px] h-[60px] md:h-[100px] bg-gray-200 rounded-lg animate-pulse' />

                        {/* Title skeleton */}
                        <div className='h-12 bg-gray-200 rounded-lg w-[200px] md:w-[300px] animate-pulse' />

                        {/* Description skeleton */}
                        <div className='w-[300px] md:w-[400px] h-16 bg-gray-200 rounded-lg animate-pulse' />
                    </div>

                    <div className='relative -mt-44 md:-mt-48 translate-y-1/2'>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-[1400px] mx-auto bg-white shadow-xl rounded-xl md:rounded-2xl p-4 md:p-12">
                            {[...Array(4)].map((_, index) => (
                                <div key={index} className='flex flex-row gap-4 md:gap-6 p-2 md:p-4 rounded-lg md:rounded-xl'>
                                    {/* Image skeleton */}
                                    <div className="relative w-[50px] h-[50px] md:w-[80px] md:h-[80px] shrink-0 bg-gray-200 rounded-lg animate-pulse" />

                                    <div className='flex flex-col gap-2 md:gap-3 flex-1'>
                                        {/* Title skeleton */}
                                        <div className='h-6 md:h-8 bg-gray-200 rounded w-3/4 animate-pulse' />
                                        {/* Text skeleton */}
                                        <div className='h-4 md:h-5 bg-gray-200 rounded w-full animate-pulse' />
                                        <div className='h-4 md:h-5 bg-gray-200 rounded w-2/3 animate-pulse' />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            <section className='bg-white pt-[180px] pb-20'>
                <div className="container px-4 xl:px-10 mx-auto">
                    {[...Array(2)].map((_, index) => (
                        <div key={index} className='mb-32 last:mb-0'>
                            <div className='grid grid-cols-1 lg:grid-cols-2 gap-16 items-center'>
                                <div className='space-y-8'>
                                    {/* Title skeleton */}
                                    <div className='h-10 bg-gray-200 rounded-lg w-3/4 animate-pulse' />
                                    {/* Description skeleton */}
                                    <div className='space-y-3'>
                                        <div className='h-4 bg-gray-200 rounded w-full animate-pulse' />
                                        <div className='h-4 bg-gray-200 rounded w-5/6 animate-pulse' />
                                        <div className='h-4 bg-gray-200 rounded w-4/6 animate-pulse' />
                                    </div>
                                    {/* Button skeleton */}
                                    <div className='h-12 bg-gray-200 rounded-full w-40 animate-pulse' />
                                </div>

                                {/* Image skeleton */}
                                <div className='relative aspect-[4/3] rounded-3xl bg-gray-200 animate-pulse' />
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className='min-h-full bg-gradient-to-r from-blue-600 to-blue-800'>
                <div className="container px-4 xl:px-10 py-28 mx-auto">
                    <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8 md:gap-12'>
                        {[...Array(4)].map((_, index) => (
                            <div
                                key={index}
                                className='flex flex-col gap-6 items-center justify-center p-8 rounded-2xl bg-white/10'
                            >
                                {/* Number skeleton */}
                                <div className='h-16 bg-white/20 rounded-lg w-32 animate-pulse' />
                                {/* Description skeleton */}
                                <div className='h-12 bg-white/20 rounded-lg w-full animate-pulse' />
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    )
} 