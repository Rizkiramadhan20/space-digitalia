"use client";

import React, { useEffect, useState } from 'react'

import { FetchFeatured } from '@/hooks/pages/about/featured/lib/FetchFeatured'

import { FeaturedType } from '@/hooks/pages/about/featured/lib/schema'

import FeaturedSkelaton from '@/hooks/pages/about/featured/FeaturedSkelaton'

import HeroSection from '@/hooks/pages/about/featured/content/HeroSection'

import FeaturedGrid from '@/hooks/pages/about/featured/content/FeaturedGrid'

export default function Featured() {
    const [featured, setFeatured] = useState<FeaturedType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = FetchFeatured((newFeatured) => {
            setFeatured(newFeatured);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <FeaturedSkelaton />;
    }

    return (
        <section className='min-h-full px-4 xl:px-10 py-10 sm:py-20 overflow-hidden'>
            <div className='container grid grid-cols-1 md:grid-cols-2 place-items-center gap-10 relative'>
                <HeroSection />
                <FeaturedGrid featured={featured} />
            </div>
        </section>
    )
}
