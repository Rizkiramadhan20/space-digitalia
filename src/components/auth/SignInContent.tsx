'use client'

import React, { useEffect, useState } from 'react'

import Link from 'next/link'

import { useAuth } from '@/utils/context/AuthContext'

import SignInForm from '@/components/auth/content/signin/SignInForm'

import WelcomeBanner from '@/components/auth/content/signin/WelcomeBanner'

import InactiveAccountModal from '@/components/auth/content/signin/InactieAccountModal'

import type { SignInFormData } from '@/components/auth/lib/auth'

import { toast } from 'react-hot-toast'

export default function SignInContent() {
    const {
        user,
        login,
        loginWithGoogle,
        loginWithGithub,
        showInactiveModal,
        setShowInactiveModal,
    } = useAuth()
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        if (showInactiveModal) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [showInactiveModal])

    if (user) {
        return null
    }

    const handleSubmit = async (data: SignInFormData) => {
        try {
            setIsLoading(true)
            await login(data.email, data.password)
        } finally {
            setIsLoading(false)
        }
    }

    const handleGoogleSignIn = async () => {
        try {
            setIsLoading(true)
            await loginWithGoogle()
        } catch (error) {
            if (error instanceof Error) {
                if (error.message.includes('auth/popup-blocked')) {
                    toast.error('Please allow popups for this site to login with Google')
                } else {
                    toast.error('Failed to login with Google')
                }
            }
        } finally {
            setIsLoading(false)
        }
    }

    const handleGithubSignIn = async () => {
        try {
            setIsLoading(true)
            await loginWithGithub()
        } catch (error) {
            if (error instanceof Error) {
                if (error.message.includes('auth/popup-blocked')) {
                    toast.error('Please allow popups for this site to login with Github')
                } else {
                    toast.error('Failed to login with Github')
                }
            }
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <section className='min-h-screen flex items-center justify-center p-4 relative overflow-hidden'>
                {/* Background pattern */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#2563eb33_1px,transparent_1px),linear-gradient(to_bottom,#2563eb33_1px,transparent_1px)] bg-[size:24rem_24rem] [mask:linear-gradient(to_right,white,transparent_20%,transparent_80%,white)]"></div>
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#2563eb33_1px,transparent_1px),linear-gradient(to_bottom,#2563eb33_1px,transparent_1px)] bg-[size:6rem_6rem] [mask:linear-gradient(to_right,white,transparent_20%,transparent_80%,white)]"></div>
                </div>

                <div className='w-full container relative z-10'>
                    {/* Add Back to Home link outside the form */}
                    <Link
                        href="/"
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
                        Back to Home
                    </Link>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 bg-white/90 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden">
                        <WelcomeBanner />
                        <div className='flex items-center justify-center p-6 lg:p-12'>
                            <SignInForm
                                isLoading={isLoading}
                                onSubmit={handleSubmit}
                                onGoogleSignIn={handleGoogleSignIn}
                                onGithubSignIn={handleGithubSignIn}
                            />
                        </div>
                    </div>
                </div>
            </section>

            <InactiveAccountModal
                show={showInactiveModal}
                onClose={() => setShowInactiveModal(false)}
            />
        </>
    )
}
