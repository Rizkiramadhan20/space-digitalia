import React from 'react'
import ForgotPasswordContent from '@/components/auth/ForgotPasswordContent'
import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Forgot Password | Space Digitalia',
    description: 'Reset your password for Space Digitalia account',
}

export default function ForgotPasswordPage() {
    return <ForgotPasswordContent />
} 