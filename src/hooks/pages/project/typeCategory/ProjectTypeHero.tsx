"use client"

import React, { useState, useEffect } from 'react'

import Image from 'next/image'

import Link from 'next/link'

import { IoIosArrowForward } from 'react-icons/io'

import { motion, useScroll, useTransform } from 'framer-motion'

import banner from '@/base/assets/pages/project/bg.jpg'

import { FetchTypeCategory } from '@/hooks/pages/project/typeCategory/lib/FetchTypeCategory'

import { ProjectType } from '@/components/ui/project/lib/schema'

import ProjectTypeSkelaton from '@/hooks/pages/project/typeCategory/ProjectTypeSkelaton'

import ProjectTypeNotFound from '@/hooks/pages/project/typeCategory/ProjectTypeNotFound'

export default function ProjectTypeHero({ typeCategory }: { typeCategory: string }) {
    const [project, setProject] = useState<ProjectType | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const { scrollY } = useScroll();
    const y = useTransform(scrollY, [0, 500], [0, 250]);
    const opacity = useTransform(scrollY, [0, 300], [1, 0]);
    const titleY = useTransform(scrollY, [0, 300], [0, 100]);
    const scale = useTransform(scrollY, [0, 300], [1, 0.9]);

    useEffect(() => {
        const unsubscribe = FetchTypeCategory(typeCategory, (data) => {
            if (data && data.length > 0) {
                setProject(data[0])
            }
            setIsLoading(false)
        })

        return () => unsubscribe()
    }, [typeCategory])

    if (isLoading) {
        return <ProjectTypeSkelaton />
    }

    if (!project) {
        return <ProjectTypeNotFound typeCategory={typeCategory} />
    }

    return (
        <div className="relative h-[60vh] md:h-[70vh] lg:h-[80vh] overflow-hidden">
            <motion.div
                className="absolute inset-0"
                style={{ y }}
            >
                <Image
                    src={banner}
                    alt="banner"
                    className='w-full h-[130%] object-cover brightness-[0.85]'
                    priority
                    quality={100}
                />
                <motion.div
                    className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/10"
                    style={{ opacity }}
                />
                <motion.div
                    className="absolute inset-0 flex flex-col items-center justify-center gap-8 z-10"
                    style={{
                        opacity,
                        y: titleY,
                        scale,
                    }}
                >
                    <h3 className='text-5xl md:text-6xl lg:text-7xl font-bold text-white tracking-tight drop-shadow-lg capitalize'>
                        {typeCategory}
                    </h3>
                    <div className="flex items-center gap-4 bg-white/10 px-8 py-3 rounded-full backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all duration-300">
                        <Link href="/" className='text-sm md:text-base text-white hover:text-primary transition-all duration-300'>
                            Home
                        </Link>
                        <IoIosArrowForward className="text-white/90 text-sm" />
                        <Link href="/project" className='text-sm md:text-base text-white hover:text-primary transition-all duration-300'>
                            Project
                        </Link>
                        <IoIosArrowForward className="text-white/90 text-sm" />
                        <span className='text-sm md:text-base text-white/80 capitalize'>{typeCategory}</span>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    )
}