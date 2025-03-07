"use client"

import React, { useEffect, useState } from 'react'

import { motion } from 'framer-motion'

import { FetchAbout } from '@/hooks/pages/about/about/lib/FetchAbout'

import { AboutType } from '@/hooks/pages/about/about/lib/schema'

import AboutSkeleton from '@/hooks/pages/about/about/AboutSkeleton'

import BackgroundImages from '@/hooks/pages/about/about/content/BackgroundImages'

import AboutItem from '@/hooks/pages/about/about/content/AboutItem'

export default function AboutLayout() {
    const [about, setAbout] = useState<AboutType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = FetchAbout((newAbout) => {
            setAbout(newAbout);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <AboutSkeleton />;
    }

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className='relative min-h-screen bg-gradient-to-br from-gray-50 to-blue-50 flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden -mt-16'
        >
            <div className='container relative z-10'>
                {about.map((item, index) => (
                    <AboutItem key={item.id} item={item} index={index} />
                ))}
            </div>

            <BackgroundImages />
        </motion.section>
    )
}