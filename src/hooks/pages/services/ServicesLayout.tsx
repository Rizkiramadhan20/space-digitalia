"use client"

import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

import { compareDesc, parseISO } from 'date-fns';

import { ServicesType } from '@/hooks/pages/services/lib/schema'

import { FetchServices } from '@/hooks/pages/services/lib/FetchServices'

import ServicesSkeleton from '@/hooks/pages/services/ServicesSkeleton'

import Image from 'next/image'

import annount from '@/base/assets/pages/services/annount.png'

export default function ServicesLayout() {
    const [services, setServices] = useState<ServicesType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = FetchServices(newServices => {
            setServices([...newServices].sort((a, b) =>
                compareDesc(
                    parseISO(a.createdAt as unknown as string),
                    parseISO(b.createdAt as unknown as string)
                )
            ));
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5
            }
        }
    };

    if (loading) {
        return <ServicesSkeleton />;
    }

    return (
        <section className='min-h-full bg-[#e6f4fa]'>
            <div className="container px-4 xl:px-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="flex items-center justify-center flex-col gap-6 py-10 md:py-20"
                >
                    <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <Image
                            src={annount}
                            alt='service'
                            className='w-auto h-[60px] md:h-[100px] object-contain'
                        />
                    </motion.div>
                    <motion.h1
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                        className='text-3xl md:text-5xl font-bold text-center'
                    >
                        Our <span className='text-primary'>Services</span>
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                        className='text-gray-600 text-center text-sm md:text-base max-w-[300px] md:max-w-[400px]'
                    >
                        Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry&apos;s
                    </motion.p>
                </motion.div>

                <div className='relative -mt-44 md:-mt-48 translate-y-1/2'>
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-8 max-w-[1400px] mx-auto bg-white shadow-xl rounded-xl md:rounded-2xl p-4 md:p-12"
                    >
                        {services.map((service, index) => (
                            <motion.div
                                key={service.id}
                                variants={itemVariants}
                                whileHover={{ scale: 1.02 }}
                                className='flex flex-row gap-4 md:gap-6 p-2 md:p-4 hover:bg-gray-50 rounded-lg md:rounded-xl transition-all duration-300'
                            >
                                <motion.div
                                    className="relative w-[50px] h-[50px] md:w-[80px] md:h-[80px] shrink-0"
                                    whileHover={{ scale: 1.1 }}
                                    transition={{ type: "spring", stiffness: 300 }}
                                >
                                    <Image
                                        src={service.imageUrl}
                                        alt={service.title}
                                        width={500}
                                        height={500}
                                        className='w-full h-full object-cover rounded-lg'
                                    />
                                </motion.div>

                                <motion.div
                                    className='flex flex-col gap-1 md:gap-3 items-start justify-center'
                                    initial={{ opacity: 0, x: 20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.5, delay: 0.1 * index }}
                                >
                                    <motion.h3
                                        className='text-xl md:text-2xl font-bold text-gray-800'
                                        whileHover={{ scale: 1.02 }}
                                    >
                                        {service.title}
                                    </motion.h3>
                                    <motion.p
                                        className='text-sm md:text-base text-gray-600 leading-relaxed'
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.5, delay: 0.2 * index }}
                                    >
                                        {service.text}
                                    </motion.p>
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </div>
        </section>
    )
}
