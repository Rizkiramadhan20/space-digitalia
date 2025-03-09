import React from 'react'

import { Metadata } from 'next'

import TransactionFreeLayout from "@/hooks/dashboard/super-admins/transaction/free/TransactionFreeLayout"

export const metadata: Metadata = {
    title: 'Free Transaction | SPACE DIGITALIA',
    description: 'Free Transaction Page for Super Admins',
}

export default function TransactionFree() {
    return (
        <TransactionFreeLayout />
    )
}

