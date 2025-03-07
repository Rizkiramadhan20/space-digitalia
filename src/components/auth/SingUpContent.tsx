"use client"

import React, { useState } from 'react'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { signUpSchema, type SignUpFormData } from './lib/auth'

import Image from 'next/image'

import signInImage from '@/base/assets/auth/bg.jpg'

import Link from 'next/link'

import googleIcon from '@/base/assets/auth/google.png'

import githubIcon from "@/base/assets/auth/github.svg"

import dotImg from "@/base/assets/auth/dot.png"

import { useAuth } from '@/utils/context/AuthContext'

import { useRouter } from 'next/navigation'

export default function SignUpContent() {
    const { signUp, loginWithGoogle, loginWithGithub } = useAuth()
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<SignUpFormData>({
        resolver: zodResolver(signUpSchema)
    })

    const onSubmit = async (data: SignUpFormData) => {
        setIsLoading(true)
        try {
            await signUp(data.email, data.password, data.displayName, data.phone)
            router.push('/auth/signin')
        } catch (error) {
            console.error('Registration error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleGoogleSignUp = async () => {
        setIsLoading(true)
        try {
            await loginWithGoogle()
        } catch (error) {
            console.error('Google sign up error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    const handleGithubSignUp = async () => {
        setIsLoading(true)
        try {
            await loginWithGithub()
        } catch (error) {
            console.error('Github sign up error:', error)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <section className='min-h-screen flex items-center justify-center relative overflow-hidden bg-gray-50'>
            {/* Background pattern */}
            <div className="absolute inset-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#2563eb22_1px,transparent_1px),linear-gradient(to_bottom,#2563eb22_1px,transparent_1px)] bg-[size:24rem_24rem] [mask:linear-gradient(to_right,white,transparent_20%,transparent_80%,white)]"></div>
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#2563eb22_1px,transparent_1px),linear-gradient(to_bottom,#2563eb22_1px,transparent_1px)] bg-[size:6rem_6rem] [mask:linear-gradient(to_right,white,transparent_20%,transparent_80%,white)]"></div>
            </div>

            <div className='w-full container p-4 relative z-10'>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white/95 backdrop-blur-sm rounded-3xl shadow-2xl overflow-hidden">
                    {/* Left side - Image */}
                    <div className="relative h-[400px] lg:h-[800px]">
                        <Image
                            src={signInImage}
                            alt='sign in image'
                            className='w-full h-full object-cover'
                            priority
                        />

                        <div className='absolute bottom-0 left-0 w-full p-6 lg:p-10'>
                            <div className='text-white bg-black/30 backdrop-blur-md p-6 rounded-xl flex flex-col items-center justify-center gap-4'>
                                <h3 className='text-2xl lg:text-3xl font-semibold mb-2'>Welcome to the space digitalia</h3>
                                <p className='text-gray-100'>Create your account</p>
                                <Image src={dotImg} alt='dot image' className='w-20 lg:w-24 object-contain mt-4' />
                            </div>
                        </div>
                    </div>

                    {/* Right side - Form */}
                    <div className='flex items-center justify-center p-8 lg:p-14'>
                        <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-md space-y-8'>
                            <div>
                                <h2 className='text-3xl lg:text-4xl font-bold text-gray-900 tracking-tight'>Create your account!</h2>
                            </div>

                            <div className='space-y-6'>
                                <div className='flex gap-4 border-b border-gray-200'>
                                    <Link
                                        href="/auth/signin"
                                        className={`flex-1 py-4 font-medium text-center text-gray-500 hover:text-gray-900 transition-colors`}
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        href="/auth/signup"
                                        className={`flex-1 py-4 font-medium text-center ${true ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-900 transition-colors'}`}
                                    >
                                        Sign Up
                                    </Link>
                                </div>

                                <div className="space-y-1.5">
                                    <label className="relative block">
                                        <span className="absolute inset-y-0 left-4 flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-400">
                                                <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
                                            </svg>
                                        </span>
                                        <input
                                            {...register('displayName')}
                                            type="text"
                                            className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 rounded-xl outline-none transition-all duration-200
                                                ${errors.displayName
                                                    ? 'border-red-300 focus:border-red-500 focus:bg-white'
                                                    : 'border-gray-200 focus:border-primary focus:bg-white'
                                                }`}
                                            placeholder="Display Name"
                                        />
                                    </label>
                                    {errors.displayName && (
                                        <div className="flex items-center gap-1 px-1">
                                            <div className="w-1 h-1 rounded-full bg-red-500"></div>
                                            <span className="text-sm text-red-500">
                                                {errors.displayName.message}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-1.5">
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
                                            className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 rounded-xl outline-none transition-all duration-200
                                                ${errors.email
                                                    ? 'border-red-300 focus:border-red-500 focus:bg-white'
                                                    : 'border-gray-200 focus:border-primary focus:bg-white'
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

                                <div className="space-y-1.5">
                                    <label className="relative block">
                                        <span className="absolute inset-y-0 left-4 flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-400">
                                                <path fillRule="evenodd" d="M1.5 4.5a3 3 0 013-3h1.372c.86 0 1.61.586 1.819 1.42l1.105 4.423a1.875 1.875 0 01-.694 1.955l-1.293.97c-.135.101-.164.249-.126.352a11.285 11.285 0 006.697 6.697c.103.038.25.009.352-.126l.97-1.293a1.875 1.875 0 011.955-.694l4.423 1.105c.834.209 1.42.959 1.42 1.82V19.5a3 3 0 01-3 3h-2.25C8.552 22.5 1.5 15.448 1.5 6.75V4.5z" clipRule="evenodd" />
                                            </svg>
                                        </span>
                                        <input
                                            {...register('phone')}
                                            type="tel"
                                            className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 rounded-xl outline-none transition-all duration-200
                                                ${errors.phone
                                                    ? 'border-red-300 focus:border-red-500 focus:bg-white'
                                                    : 'border-gray-200 focus:border-primary focus:bg-white'
                                                }`}
                                            placeholder="Phone Number"
                                        />
                                    </label>
                                    {errors.phone && (
                                        <div className="flex items-center gap-1 px-1">
                                            <div className="w-1 h-1 rounded-full bg-red-500"></div>
                                            <span className="text-sm text-red-500">
                                                {errors.phone.message}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-1.5">
                                    <label className="relative block">
                                        <span className="absolute inset-y-0 left-4 flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-400">
                                                <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                                            </svg>
                                        </span>
                                        <input
                                            {...register('password')}
                                            type="password"
                                            className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 rounded-xl outline-none transition-all duration-200
                                                ${errors.password
                                                    ? 'border-red-300 focus:border-red-500 focus:bg-white'
                                                    : 'border-gray-200 focus:border-primary focus:bg-white'
                                                }`}
                                            placeholder="Password"
                                        />
                                    </label>
                                    {errors.password && (
                                        <div className="flex items-center gap-1 px-1">
                                            <div className="w-1 h-1 rounded-full bg-red-500"></div>
                                            <span className="text-sm text-red-500">
                                                {errors.password.message}
                                            </span>
                                        </div>
                                    )}
                                </div>

                                <div className="space-y-1.5">
                                    <label className="relative block">
                                        <span className="absolute inset-y-0 left-4 flex items-center">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-400">
                                                <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                                            </svg>
                                        </span>
                                        <input
                                            {...register('confirmPassword')}
                                            type="password"
                                            className={`w-full pl-12 pr-4 py-3.5 bg-gray-50 border-2 rounded-xl outline-none transition-all duration-200
                                                ${errors.confirmPassword
                                                    ? 'border-red-300 focus:border-red-500 focus:bg-white'
                                                    : 'border-gray-200 focus:border-primary focus:bg-white'
                                                }`}
                                            placeholder="Confirm Password"
                                        />
                                    </label>
                                    {errors.confirmPassword && (
                                        <div className="flex items-center gap-1 px-1">
                                            <div className="w-1 h-1 rounded-full bg-red-500"></div>
                                            <span className="text-sm text-red-500">
                                                {errors.confirmPassword.message}
                                            </span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            <button
                                disabled={isLoading}
                                className="w-full py-3.5 bg-primary hover:bg-primary/90 disabled:bg-primary/60 text-white text-lg font-medium rounded-xl transition-all duration-200 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/20"
                            >
                                {isLoading ? (
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                        <span>Processing...</span>
                                    </div>
                                ) : (
                                    'Continue'
                                )}
                            </button>

                            <div className='space-y-6'>
                                <div className='relative text-center'>
                                    <div className='absolute inset-0 flex items-center'>
                                        <div className='w-full border-t border-gray-200'></div>
                                    </div>
                                    <span className='relative inline-block px-4 bg-white text-sm text-gray-600 font-medium'>
                                        Sign in With
                                    </span>
                                </div>

                                <div className='flex justify-center gap-4'>
                                    <button
                                        type="button"
                                        onClick={handleGithubSignUp}
                                        disabled={isLoading}
                                        className='p-3 hover:bg-gray-50 rounded-xl border-2 border-transparent hover:border-gray-200 transition-all duration-200'
                                    >
                                        <Image src={githubIcon} alt='github icon' className='w-6 h-6' />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleGoogleSignUp}
                                        disabled={isLoading}
                                        className='p-3 hover:bg-gray-50 rounded-xl border-2 border-transparent hover:border-gray-200 transition-all duration-200'
                                    >
                                        <Image src={googleIcon} alt='google icon' className='w-6 h-6' />
                                    </button>
                                </div>

                                <div className='text-center text-gray-600'>
                                    Already have an account? {' '}
                                    <Link href="/auth/signin" className='text-primary hover:text-primary/80 font-medium transition-colors'>
                                        Sign in
                                    </Link>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
