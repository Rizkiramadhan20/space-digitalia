"use client"

import React, { useState, useEffect } from 'react'

import { FetchCompany } from '@/components/ui/company/lib/FetchCompany'

import { CompanyType } from '@/components/ui/company/lib/schema'

import CompanySkelaton from '@/components/ui/company/CompanySkelaton'

import Image from 'next/image'

import leftImg from "@/base/assets/ui/company/left.png"

export default function Company() {
    const [company, setCompany] = useState<CompanyType[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = FetchCompany((newCompany) => {
            setCompany(newCompany);
            setLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (loading) {
        return <CompanySkelaton />;
    }

    return (
        <section className='min-h-full px-4 xl:px-10 py-6 sm:py-8'>
            <div className="container relative z-10">
                <div className="mb-12 sm:mb-16">
                    <h2 className="text-2xl font-bold text-center text-gray-900 sm:text-3xl md:text-4xl lg:text-5xl">
                        Company Yang Sudah Kami Kerjakan
                    </h2>
                    <p className="mt-4 text-center text-gray-600">
                        Dipercaya oleh perusahaan terkemuka untuk memberikan solusi terbaik
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:gap-8">
                    {company.map((item) => (
                        <div key={item.id} className="transform transition-all duration-300 hover:scale-105">
                            <div className='p-4 bg-white rounded-lg'>
                                <div className='aspect-square overflow-hidden'>
                                    <Image
                                        src={item.imageUrl}
                                        alt={"company"}
                                        width={500}
                                        height={500}
                                        className='object-contain w-full h-full filter grayscale hover:grayscale-0 transition-all duration-300'
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className='absolute top-0 left-0 w-full h-full max-w-[200px] opacity-10 pointer-events-none'>
                    <Image src={leftImg} alt={"left"} className='object-cover w-full h-full' />
                </div>
            </div>
        </section>
    )
}
