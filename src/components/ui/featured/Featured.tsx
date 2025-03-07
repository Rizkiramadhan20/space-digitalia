"use client";

import React, { useEffect, useState } from 'react'

import { FetchFeatured } from '@/components/ui/featured/lib/FetchFeatured'

import { FeaturedType } from '@/components/ui/featured/lib/schema'

import FeaturedSkelaton from '@/components/ui/featured/FeaturedSkelaton';

import Image from 'next/image'

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
                {
                    featured.map((item) => {
                        return (
                            <div
                                key={item.id}
                                className='group flex-1 min-w-[280px] flex flex-row items-start gap-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden p-4'
                            >
                                <div className="relative w-24 h-24 flex-shrink-0">
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.title}
                                        fill
                                        className='object-cover rounded-lg group-hover:scale-105 transition-transform duration-300'
                                    />
                                </div>

                                <div className="flex flex-col gap-2">
                                    <h3 className='text-lg font-semibold text-gray-800 line-clamp-2'>{item.title}</h3>
                                    <p className='text-sm text-gray-600 line-clamp-3'>{item.text}</p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </section>
    )
}
