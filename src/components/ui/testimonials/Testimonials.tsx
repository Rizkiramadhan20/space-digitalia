"use client";

import React, { useState, useEffect, useMemo, memo } from 'react'

import { FetchTestimonials } from '@/components/ui/testimonials/lib/FetchTestimonials'

import { TestimonialProps } from '@/components/ui/testimonials/types/schema'

import TestimonialSkelaton from '@/components/ui/testimonials/TestimonialSkelaton'

import TestimonialHeader from '@/components/ui/testimonials/content/TestimonialHeader'

import TestimonialCard from '@/components/ui/testimonials/content/TestimonialCard'

import LoadMoreButton from '@/components/ui/testimonials/content/LoadMore'

const Testimonials = () => {
    const [testimonials, setTestimonials] = useState<TestimonialProps[]>([]);
    const [loading, setLoading] = useState(true);
    const [showAll, setShowAll] = useState(false);

    useEffect(() => {
        const unsubscribe = FetchTestimonials((newTestimonials) => {
            setTestimonials(newTestimonials);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const memoizedTestimonials = useMemo(() => testimonials, [testimonials]);

    if (loading) {
        return <TestimonialSkelaton />;
    }

    const displayedTestimonials = showAll ? memoizedTestimonials : memoizedTestimonials.slice(0, 6);

    return (
        <section className='min-h-full px-4 xl:px-10 py-6 sm:py-8 md:py-12'>
            <div className="container mx-auto">
                <TestimonialHeader />

                <div className="flex flex-wrap gap-3 sm:gap-4 md:gap-6 justify-center [perspective:1000px] relative">
                    {!showAll && (
                        <div
                            className="absolute bottom-0 left-0 w-full h-[8rem] sm:h-[10rem] md:h-[12rem] z-20 pointer-events-none"
                            style={{
                                background: 'linear-gradient(to top, rgba(255,255,255,1) 0%, rgba(255,255,255,0.8) 40%, rgba(255,255,255,0) 100%)',
                                boxShadow: '0 -10px 20px 10px white'
                            }}
                        >
                            <div
                                className="absolute bottom-0 left-0 w-full h-1/2 pointer-events-auto"
                                style={{ background: 'transparent' }}
                            ></div>
                        </div>
                    )}

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6 w-full">
                        {displayedTestimonials.map((testimonial, index) => (
                            <TestimonialCard
                                key={testimonial.id}
                                testimonial={testimonial}
                                index={index}
                                showAll={showAll}
                                totalDisplayed={displayedTestimonials.length}
                            />
                        ))}
                    </div>
                </div>

                {testimonials.length > 6 && !showAll && (
                    <div className="mt-4 sm:mt-6 md:mt-8">
                        <LoadMoreButton showAll={showAll} onClick={() => setShowAll(true)} />
                    </div>
                )}
            </div>
        </section>
    )
}

export default memo(Testimonials);