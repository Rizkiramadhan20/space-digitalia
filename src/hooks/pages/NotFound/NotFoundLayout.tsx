import React from 'react'

import Image from 'next/image'

import profile from "@/base/assets/pages/notfound/greg-WWVTIQGY.svg"

import notfoundImg from "@/base/assets/pages/notfound/404-WBZW57IZ.svg"

import Link from 'next/link'

export default function NotFoundLayout() {
    return (
        <section className='min-h-screen py-16 lg:py-24 bg-white'>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-12 lg:gap-16 items-center'>
                    <div className='max-w-md mx-auto sm:mx-0 transform hover:scale-105 duration-500 ease-in-out'>
                        <Image
                            src={profile}
                            alt="image"
                            className='w-full h-auto drop-shadow-xl animate-floa'
                            priority
                        />
                    </div>
                    <div className='text-center sm:text-left space-y-8 animate-fadeIn'>
                        <div className='max-w-sm mx-auto sm:mx-0 mb-8 transform hover:scale-105 duration-500 ease-in-out'>
                            <Image
                                src={notfoundImg}
                                alt='not-found'
                                className='w-full h-auto drop-shadow-xl animate-bounce-slow [filter:invert(0.4)_sepia(0.1)_saturate(0.6)]'
                                priority
                            />
                        </div>
                        <h3 className='text-4xl md:text-5xl lg:text-6xl font-bold text-gray-800 mb-6'>
                            Oops, this page doesn&apos;t exist
                        </h3>
                        <p className='text-lg md:text-xl text-gray-600 mb-8 max-w-lg leading-relaxed'>
                            The link that led you here is called a &ldquo;broken link.&rdquo; You can check how many of such links your website has with our free broken link checker tool.
                        </p>
                        <Link
                            href="/"
                            className='inline-block bg-gray-900 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-gray-300 hover:-translate-y-1 hover:scale-105'
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
