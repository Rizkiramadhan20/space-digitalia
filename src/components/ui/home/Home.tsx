"use client";

import React, { useEffect, useState } from 'react'

import { FetchHome } from '@/components/ui/home/lib/FetchHome'

import HomeSkelaton from '@/components/ui/home/HomeSkelaton'

import { HomeType } from '@/components/ui/home/lib/schema'

import Link from 'next/link'

import Image from 'next/image'

import vector1 from "@/base/assets/ui/home/Vector1.png"

import vector2 from "@/base/assets/ui/home/Vector2.png"

export default function Home() {
    const [home, setHome] = useState<HomeType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = FetchHome((newHome) => {
            setHome(newHome);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <HomeSkelaton />;
    }

    return (
        <section className='min-h-screen relative bg-gradient-to-br from-white via-blue-50 to-blue-100 overflow-hidden mt-[0] xl:mt-[-8rem]'>
            {/* Enhanced glass-morphism background elements */}
            <div className='absolute -z-10 inset-0'>
                <div className='absolute top-1/4 left-1/3 w-96 h-96 bg-blue-300/20 rounded-full blur-[100px] animate-pulse'></div>
                <div className='absolute bottom-1/3 right-1/4 w-[30rem] h-[30rem] bg-purple-300/20 rounded-full blur-[100px] animate-pulse delay-700'></div>
                <div className='absolute top-1/2 left-1/2 w-80 h-80 bg-pink-300/20 rounded-full blur-[100px] animate-pulse delay-1000'></div>
            </div>

            <div className='container px-4 xl:px-10 relative z-10 py-12 lg:py-20'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center'>
                    {home.map((item) => (
                        <div key={item.id} className='flex flex-col gap-8 lg:gap-10 items-center text-center lg:text-start lg:items-start transform transition-all duration-500 hover:translate-y-[-5px]'>
                            <h1 className='text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent'
                                style={{ lineHeight: '1.2' }}>
                                {item.title}
                            </h1>

                            <p className='text-lg md:text-xl text-gray-600/90 leading-relaxed max-w-2xl'>
                                {item.description}
                            </p>

                            <div className='flex flex-col sm:flex-row gap-4 sm:gap-6 mt-4 w-full sm:w-auto'>
                                <Link
                                    href={item.button1.link}
                                    className='group relative px-8 py-4 rounded-full bg-blue-600 text-white font-semibold overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-blue-500/30 hover:scale-105 w-full sm:w-fit'
                                >
                                    <span className='relative z-10'>{item.button1.text}</span>
                                    <div className='absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300'></div>
                                </Link>

                                <Link
                                    href={item.button2.link}
                                    className='group px-8 py-4 rounded-full border-2 border-blue-600 text-blue-600 font-semibold transition-all duration-300 hover:bg-blue-50/80 hover:shadow-2xl hover:shadow-blue-500/20 hover:scale-105 backdrop-blur-sm w-full sm:w-fit'
                                >
                                    {item.button2.text}
                                </Link>
                            </div>
                        </div>
                    ))}

                    {home.map((image) => (
                        <div
                            className="relative w-full aspect-square xl:aspect-[4/5] overflow-hidden"
                            key={image.id}
                        >
                            <Image
                                fill
                                src={image.imageUrl}
                                alt={image.title}
                                className='object-cover w-full h-full'
                                priority
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className='absolute bottom-0 right-0 opacity-20 transform hover:opacity-30 transition-opacity duration-500 animate-float'>
                <Image src={vector1} alt='vector-1' />
            </div>

            <div className='absolute bottom-[-10rem] left-0 opacity-20 transform hover:opacity-30 transition-opacity duration-500 animate-float-delayed'>
                <Image src={vector2} alt='vector-2' />
            </div>
        </section>
    )
}
