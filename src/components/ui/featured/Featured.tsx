"use client";

import React, { useEffect, useState } from 'react'

import { FetchFeatured } from '@/components/ui/featured/lib/FetchFeatured'

import { FeaturedType } from '@/components/ui/featured/lib/schema'

import FeaturedSkelaton from '@/components/ui/featured/FeaturedSkelaton';

import FeaturedItem from '@/components/ui/featured/content/FeaturedItem'

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
        <section className='min-h-full px-4 xl:px-10 py-6 sm:py-8'>
            <div className="container flex flex-wrap gap-6">
                {featured.map((item) => (
                    <FeaturedItem key={item.id} item={item} />
                ))}
            </div>
        </section>
    )
}
