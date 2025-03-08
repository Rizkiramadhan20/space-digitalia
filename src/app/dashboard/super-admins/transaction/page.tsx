import React from 'react'

import { Metadata } from 'next'

import TransactionLayout from "@/hooks/dashboard/super-admins/transaction/transaction/TransactionLayout"

export const metadata: Metadata = {
    title: 'Transaction | SPACE DIGITALIA',
    description: 'Transaction Page for Super Admins',
}

export default function Transaction() {
    return (
        <TransactionLayout />
    )
}

