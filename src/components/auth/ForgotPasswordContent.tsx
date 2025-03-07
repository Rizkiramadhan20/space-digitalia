'use client'

import React, { useState } from 'react'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { forgotPasswordSchema, type ForgotPasswordFormData } from './lib/auth'

import Image from 'next/image'

import signInImage from '@/base/assets/auth/bg.jpg'

import Link from 'next/link'

import dotImg from "@/base/assets/auth/dot.png"

import { useAuth } from '@/utils/context/AuthContext'

export default function ForgotPasswordContent() {
    const { forgotPassword } = useAuth()
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ForgotPasswordFormData>({
        resolver: zodResolver(forgotPasswordSchema),
    })

    const onSubmit = async (data: ForgotPasswordFormData) => {
        try {
            setIsLoading(true)
            await forgotPassword(data.email)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className='min-h-screen flex items-center justify-center p-4 relative overflow-hidden'>
            {/* Background pattern */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#2563eb33_1px,transparent_1px),linear-gradient(to_bottom,#2563eb33_1px,transparent_1px)] bg-[size:24rem_24rem] [mask:linear-gradient(to_right,white,transparent_20%,transparent_80%,white)]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#2563eb33_1px,transparent_1px),linear-gradient(to_bottom,#2563eb33_1px,transparent_1px)] bg-[size:6rem_6rem] [mask:linear-gradient(to_right,white,transparent_20%,transparent_80%,white)]"></div>
            </div>

            <div className='w-full container relative z-10'>
                {/* Add Back to Sign In link */}
                <Link
                    href="/auth/signin"
                    className="group inline-flex items-center gap-2 px-4 py-2 rounded-full text-gray-600 hover:text-primary bg-white/90 hover:bg-gray-100 transition-all duration-300 mb-4"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform duration-300"
                    >
                        <path fillRule="evenodd" d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 11-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z" clipRule="evenodd" />
                    </svg>
                    Back to Sign In
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden">
                    {/* Left side - Image */}
                    <div className="relative h-[400px] lg:h-[700px]">
                        <Image
                            src={signInImage}
                            alt='forgot password image'
                            className='w-full h-full object-cover'
                            priority
                        />

                        <div className='absolute bottom-0 left-0 w-full p-6 lg:p-10'>
                            <div className='text-white bg-black/30 backdrop-blur-md p-6 rounded-xl flex flex-col items-center justify-center gap-4'>
                                <h3 className='text-2xl lg:text-3xl font-semibold mb-2'>Reset your password</h3>
                                <p className='text-gray-100'>We&apos;ll help you get back into your account</p>
                                <Image src={dotImg} alt='dot image' className='w-20 lg:w-24 object-contain mt-4' />
                            </div>
                        </div>
                    </div>

                    {/* Right side - Form */}
                    <div className='flex items-center justify-center p-6 lg:p-12'>
                        <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-md space-y-8'>
                            <div>
                                <h2 className='text-3xl lg:text-4xl font-bold text-gray-900'>Forgot Password?</h2>
                                <p className='mt-4 text-gray-600'>Enter your email address and we&apos;ll send you instructions to reset your password.</p>
                            </div>

                            <div className='space-y-6'>
                                <div className="space-y-1">
                                    <label className="relative block">
                                        <span className="absolute inset-y-0 left-4 flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-400">
                                                <path d="M1.5 8.67v8.58a3 3 0 003 3h15a3 3 0 003-3V8.67l-8.928 5.493a3 3 0 01-3.144 0L1.5 8.67z" />
                                                <path d="M22.5 6.908V6.75a3 3 0 00-3-3h-15a3 3 0 00-3 3v.158l9.714 5.978a1.5 1.5 0 001.572 0L22.5 6.908z" />
                                            </svg>
                                        </span>
                                        <input
                                            {...register('email')}
                                            type="email"
                                            className={`w-full pl-12 pr-4 py-4 bg-white border-2 rounded-xl outline-none transition-all
                                                ${errors.email
                                                    ? 'border-red-300 focus:border-red-500'
                                                    : 'border-gray-100 focus:border-primary'
                                                }`}
                                            placeholder="Email"
                                        />
                                    </label>
                                    {errors.email && (
                                        <div className="flex items-center gap-1 px-1">
                                            <div className="w-1 h-1 rounded-full bg-red-500"></div>
                                            <span className="text-sm text-red-500">
                                                {errors.email.message}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button
                                disabled={isLoading}
                                className="w-full py-4 bg-primary hover:bg-primary/90 text-white text-lg font-medium rounded-xl transition-colors disabled:opacity-50"
                            >
                                {isLoading ? 'Sending...' : 'Send Reset Instructions'}
                            </button>

                            <div className='text-center text-gray-500'>
                                Remember your password? {' '}
                                <Link href="/auth/signin" className='text-primary hover:text-primary/80 font-medium'>
                                    Sign in
                                </Link>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
} 