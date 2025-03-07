"use client"

import React, { useEffect, useState } from 'react'

import { compareDesc, parseISO } from 'date-fns';

import { FetchTestimonialCount } from '@/hooks/pages/services/testimonialCount/lib/FetchTestimonialCount'

import { TestimonialCount } from '@/hooks/pages/services/testimonialCount/lib/schema'

import CountUp from 'react-countup';

import ServicesSkeleton from '@/hooks/pages/services/ServicesSkeleton';

export default function TestiMonialCount() {
    const [testimonialCount, setTestimonialCount] = useState<TestimonialCount[]>([]);
    const [loading, setLoading] = useState(true);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const unsubscribe = FetchTestimonialCount(newTestimonialCount => {
            setTestimonialCount([...newTestimonialCount].sort((a, b) =>
                compareDesc(
                    parseISO(a.createdAt as unknown as string),
                    parseISO(b.createdAt as unknown as string)
                )
            ));
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    useEffect(() => {
        const handleScroll = () => {
            const element = document.getElementById('count-section');
            if (element) {
                const rect = element.getBoundingClientRect();
                const isInView = rect.top <= window.innerHeight && rect.bottom >= 0;
                if (isInView && !isVisible) {
                    setIsVisible(true);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();

        return () => window.removeEventListener('scroll', handleScroll);
    }, [isVisible]);

    if (loading) {
        return <ServicesSkeleton />;
    }

    return (
        <section
            id="count-section"
            className='min-h-full bg-gradient-to-r from-blue-600 to-blue-800 flex items-center justify-center'
        >
            <div className="container px-4 xl:px-10 py-20 mx-auto">
                <div className='grid grid-cols-2 xl:grid-cols-4 gap-8 md:gap-12'>
                    {testimonialCount.map((testimonialCount) => {
                        const match = testimonialCount.number.toString().match(/^(\d+)([A-Za-z]+)?$/);
                        const number = match ? parseInt(match[1], 10) : 0;
                        const suffix = match ? match[2] || '' : '';

                        return (
                            <div
                                key={testimonialCount.id}
                                className='flex flex-col gap-6 items-center justify-center w-full p-8 rounded-2xl bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-300'
                            >
                                <div className="text-center">
                                    <div className='text-4xl md:text-5xl font-bold text-white flex items-center justify-center'>
                                        {isVisible && (
                                            <CountUp
                                                start={0}
                                                end={number}
                                                duration={2.5}
                                                useEasing={true}
                                            />
                                        )}
                                        <span className="ml-1">{suffix}</span>
                                    </div>
                                </div>

                                <p className='text-white/90 text-center text-base md:text-lg font-medium'>
                                    {testimonialCount.description}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}
