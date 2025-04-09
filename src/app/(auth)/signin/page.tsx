import React from 'react'

import { Metadata } from 'next'

import SignInContent from "@/components/auth/SignInContent"

export const metadata: Metadata = {
    title: 'Sign In | Space Digitalia',
    description: 'Sign In to your account',
}

export default function SignIn() {
    return (
        <SignInContent />
    )
}
