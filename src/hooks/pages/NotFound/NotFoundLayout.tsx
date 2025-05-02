"use client"
import React from 'react'

import ProfileImage from '@/hooks/pages/NotFound/ui/ProfileImage'

import NotFoundContent from '@/hooks/pages/NotFound/ui/NotFoundContent'

export default function NotFoundLayout() {
    return (
        <section className='min-h-screen py-16 bg-white flex items-center justify-center'>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-12 lg:gap-16 items-center'>
                    <ProfileImage />
                    <NotFoundContent />
                </div>
            </div>
        </section>
    )
}
