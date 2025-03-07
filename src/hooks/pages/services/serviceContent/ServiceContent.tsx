"use client"

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import { ServicesContent } from '@/hooks/pages/services/serviceContent/lib/schema'

import { FetchServicesContent } from './lib/FetchServicesContent';

import { parseISO, compareDesc } from 'date-fns';

import ServicesSkeleton from '@/hooks/pages/services/ServicesSkeleton';

import Link from 'next/link';

import Image from 'next/image';

export default function ServiceContent() {
    const [servicesContent, setServicesContent] = useState<ServicesContent[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = FetchServicesContent(newServicesContent => {
            setServicesContent([...newServicesContent].sort((a, b) =>
                compareDesc(
                    parseISO(a.createdAt as unknown as string),
                    parseISO(b.createdAt as unknown as string)
                )
            ));
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const fadeInUp = {
        hidden: { opacity: 0, y: 60 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.6,
                ease: "easeOut"
            }
        }
    };

    const staggerContainer = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    if (loading) {
        return <ServicesSkeleton />;
    }

    return (
        <motion.section
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className='bg-white pt-[220px] sm:pt-[200px] pb-20 overflow-hidden'
        >
            <div className="container px-4 xl:px-10 mx-auto">
                {servicesContent.map((serviceContent, index) => (
                    <motion.div
                        key={serviceContent.id}
                        variants={fadeInUp}
                        viewport={{ once: true }}
                        className='mb-32 last:mb-0'
                    >
                        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-16 items-center ${index % 2 === 0 ? '' : 'lg:flex-row-reverse'}`}>
                            <motion.div
                                className='space-y-8'
                                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                <motion.div
                                    className="space-y-6"
                                    initial={{ opacity: 0 }}
                                    whileInView={{ opacity: 1 }}
                                    transition={{ duration: 0.5, delay: 0.3 }}
                                    viewport={{ once: true }}
                                >
                                    <motion.h2
                                        className='text-3xl md:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600 leading-tight'
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        {serviceContent.title}
                                    </motion.h2>
                                    <motion.p
                                        className='text-gray-600 text-sm md:text-base leading-relaxed'
                                        initial={{ opacity: 0 }}
                                        whileInView={{ opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.4 }}
                                        viewport={{ once: true }}
                                    >
                                        {serviceContent.description}
                                    </motion.p>
                                </motion.div>

                                <motion.div
                                    className="w-fit"
                                    whileHover="hover"
                                    initial="initial"
                                    variants={{
                                        initial: {
                                            x: 0
                                        },
                                        hover: {
                                            x: 0
                                        }
                                    }}
                                >
                                    <Link
                                        href={serviceContent.buttonLink}
                                        className='inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-full font-semibold hover:shadow-lg hover:shadow-blue-500/30 transition-all duration-300'
                                    >
                                        {serviceContent.buttonText}
                                        <motion.svg
                                            className="w-5 h-5 ml-2"
                                            variants={{
                                                initial: { x: 0 },
                                                hover: { x: 10 }
                                            }}
                                            transition={{ type: "spring", stiffness: 400 }}
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                        </motion.svg>
                                    </Link>
                                </motion.div>
                            </motion.div>

                            <motion.div
                                className='relative group'
                                initial={{ opacity: 0, x: index % 2 === 0 ? 50 : -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                <motion.div
                                    className='relative overflow-hidden rounded-3xl'
                                    whileHover={{ scale: 1.03 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <Image
                                        src={serviceContent.imageUrl}
                                        alt={serviceContent.title}
                                        width={800}
                                        height={800}
                                        className='w-full aspect-[4/3] object-cover'
                                    />
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                ))}
            </div>
        </motion.section>
    )
}
