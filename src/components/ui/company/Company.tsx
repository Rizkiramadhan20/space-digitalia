"use client"

import React, { useState, useEffect } from 'react'

import { FetchCompany } from '@/components/ui/company/lib/FetchCompany'

import { CompanyType } from '@/components/ui/company/types/company'

import CompanySkelaton from '@/components/ui/company/CompanySkelaton'

import CompanyHeader from '@/components/ui/company/ui/CompanyHeader'

import CompanyGrid from '@/components/ui/company/ui/CompanyGrid'

import CompanyBackground from '@/components/ui/company/ui/Background'

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
                <CompanyHeader />
                <CompanyGrid companies={company} />
                <CompanyBackground />
            </div>
        </section>
    )
}
