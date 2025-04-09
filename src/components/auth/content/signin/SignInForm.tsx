'use client'

import React from 'react'

import Link from 'next/link'

import Image from 'next/image'

import { useForm } from 'react-hook-form'

import { zodResolver } from '@hookform/resolvers/zod'

import { signInSchema, type SignInFormData } from '@/components/auth/lib/auth'

import googleIcon from '@/base/assets/auth/google.png'

import githubIcon from "@/base/assets/auth/github.svg"

interface SignInFormProps {
    isLoading: boolean;
    onSubmit: (data: SignInFormData) => Promise<void>;
    onGoogleSignIn: () => Promise<void>;
    onGithubSignIn: () => Promise<void>;
}

export default function SignInForm({ isLoading, onSubmit, onGoogleSignIn, onGithubSignIn }: SignInFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignInFormData>({
        resolver: zodResolver(signInSchema),
    })

    return (
        <form onSubmit={handleSubmit(onSubmit)} className='w-full max-w-md space-y-8'>
            <div>
                <h2 className='text-3xl lg:text-4xl font-bold text-gray-900'>Login your account!</h2>
            </div>

            <div className='space-y-6'>
                <div className='flex gap-4 border-b border-gray-200'>
                    <Link
                        href="/signin"
                        className={`flex-1 py-4 font-medium text-center ${true ? 'text-primary border-b-2 border-primary' : 'text-gray-500 hover:text-gray-700'}`}
                    >
                        Sign In
                    </Link>
                    <Link
                        href="/signup"
                        className={`flex-1 py-4 font-medium text-center text-gray-500 hover:text-gray-700`}
                    >
                        Sign Up
                    </Link>
                </div>

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

                <div className="space-y-1">
                    <label className="relative block">
                        <span className="absolute inset-y-0 left-4 flex items-center">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-gray-400">
                                <path fillRule="evenodd" d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z" clipRule="evenodd" />
                            </svg>
                        </span>
                        <input
                            {...register('password')}
                            type="password"
                            className={`w-full pl-12 pr-4 py-4 bg-white border-2 rounded-xl outline-none transition-all
                                ${errors.password
                                    ? 'border-red-300 focus:border-red-500'
                                    : 'border-gray-100 focus:border-primary'
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

                <div className='flex justify-end'>
                    <Link href='/auth/forgot-password' className='text-sm text-primary hover:text-primary/80 font-medium'>
                        Forgot password?
                    </Link>
                </div>
            </div>

            <button
                disabled={isLoading}
                className="w-full py-4 bg-primary hover:bg-primary/90 text-white text-lg font-medium rounded-xl transition-colors disabled:opacity-50"
            >
                {isLoading ? 'Loading...' : 'Continue'}
            </button>

            <div className='space-y-6'>
                <div className='relative text-center'>
                    <div className='absolute inset-0 flex items-center'>
                        <div className='w-full border-t border-gray-200'></div>
                    </div>
                    <span className='relative inline-block px-4 bg-white text-sm text-gray-500'>
                        Sign in With
                    </span>
                </div>

                <div className='flex justify-center'>
                    <button
                        type="button"
                        onClick={onGithubSignIn}
                        className='p-3 hover:bg-gray-50 rounded-lg transition-colors'
                    >
                        <Image src={githubIcon} alt='github icon' className='w-10 h-10' />
                    </button>

                    <button
                        type="button"
                        onClick={onGoogleSignIn}
                        className='p-3 hover:bg-gray-50 rounded-lg transition-colors'
                    >
                        <Image src={googleIcon} alt='google icon' className='w-10 h-10' />
                    </button>
                </div>

                <div className='text-center text-gray-500'>
                    Don&apos;t have an account? {' '}
                    <Link href="/auth/signup" className='text-primary hover:text-primary/80 font-medium'>
                        Sign up
                    </Link>
                </div>
            </div>
        </form>
    )
}