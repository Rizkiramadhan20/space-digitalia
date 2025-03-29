import React from 'react'

import Image from 'next/image'

import profile from "@/base/assets/pages/notfound/greg-WWVTIQGY.svg"

import notfoundImg from "@/base/assets/pages/notfound/404-WBZW57IZ.svg"

import Link from 'next/link'

export default function NotFound() {
    return (
        <section className='min-h-screen py-16 lg:py-24 bg-gradient-to-b from-[#0f172a] to-[#1e293b] relative overflow-hidden'>
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-12 items-center'>
                    <div className='max-w-md mx-auto sm:mx-0 transform hover:scale-105 duration-500 ease-in-out'>
                        <Image
                            src={profile}
                            alt="image"
                            className='w-full h-auto brightness-105 drop-shadow-2xl'
                        />
                    </div>
                    <div className='text-center sm:text-left space-y-8 animate-fadeIn'>
                        <div className='max-w-sm mx-auto sm:mx-0 mb-8 transform hover:scale-105 duration-500 ease-in-out'>
                            <Image
                                src={notfoundImg}
                                alt='not-found'
                                className='w-full h-auto brightness-105 drop-shadow-2xl'
                            />
                        </div>
                        <h3 className='text-4xl md:text-5xl font-bold text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-pink-600'>
                            Oops, this page doesn&apos;t exist
                        </h3>
                        <p className='text-lg text-gray-300 mb-8 max-w-lg leading-relaxed'>
                            The link that led you here is called a &ldquo;broken link.&rdquo; You can check how many of such links your website has with our free broken link checker tool.
                        </p>
                        <Link
                            href="/"
                            className='inline-block bg-gradient-to-r from-purple-600 to-pink-600 text-white font-semibold px-8 py-4 rounded-xl transition-all duration-300 shadow-lg hover:shadow-purple-500/50 hover:-translate-y-1 hover:scale-105'
                        >
                            Back to Home
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}
