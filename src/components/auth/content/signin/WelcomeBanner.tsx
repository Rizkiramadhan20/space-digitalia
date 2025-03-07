import React from 'react'

import Image from 'next/image'

import signInImage from '@/base/assets/auth/bg.jpg'

import dotImg from "@/base/assets/auth/dot.png"

export default function WelcomeBanner() {
    return (
        <div className="relative h-[400px] lg:h-[700px]">
            <Image
                src={signInImage}
                alt='sign in image'
                className='w-full h-full object-cover'
                priority
            />

            <div className='absolute bottom-0 left-0 w-full p-6 lg:p-10'>
                <div className='text-white bg-black/30 backdrop-blur-md p-6 rounded-xl flex flex-col items-center justify-center gap-4'>
                    <h3 className='text-2xl lg:text-3xl font-semibold mb-2'>Welcome to the space digitalia</h3>
                    <p className='text-gray-100'>Login to explore</p>
                    <Image src={dotImg} alt='dot image' className='w-20 lg:w-24 object-contain mt-4' />
                </div>
            </div>
        </div>
    )
}