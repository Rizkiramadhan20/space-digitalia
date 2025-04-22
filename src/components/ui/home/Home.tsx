"use client";

import React, { useEffect, useState, useMemo } from 'react'

import { FetchHome } from '@/components/ui/home/lib/FetchHome'

import HomeSkelaton from '@/components/ui/home/HomeSkelaton'

import { HomeType } from '@/components/ui/home/types/schema'

import HeroContent from '@/components/ui/home/content/HeroContent'

import HeroImage from '@/components/ui/home/content/HeroImage'

import dynamic from 'next/dynamic';

const BackgroundEffects = dynamic(() => import('@/components/ui/home/content/Background'), {
    ssr: false,
})

const Left = dynamic(() => import('@/components/ui/home/content/Left'), {
    ssr: false,
})

const Right = dynamic(() => import('@/components/ui/home/content/Right'), {
    ssr: false,
})

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

    const memoizedHome = useMemo(() => home, [home]);

    if (loading) {
        return <HomeSkelaton />;
    }

    return (
        <section className='min-h-screen relative bg-gradient-to-br from-white via-blue-50 to-blue-100 overflow-hidden mt-[0] xl:mt-[-8rem]'>
            <BackgroundEffects />

            <div className='container px-4 xl:px-10 relative py-12 lg:py-20'>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center'>
                    {memoizedHome.map((item) => (
                        <HeroContent key={item.id} item={item} />
                    ))}

                    {memoizedHome.map((image) => (
                        <HeroImage key={image.id} image={image} />
                    ))}
                </div>
            </div>

            <Left />

            <Right />
        </section>
    )
}
