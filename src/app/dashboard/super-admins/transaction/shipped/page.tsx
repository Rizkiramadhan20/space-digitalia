import React from 'react'

import { Metadata } from 'next'

import TransactionShippedLayout from "@/hooks/dashboard/super-admins/transaction/shipped/TransactionShippedLayout"

export const metadata: Metadata = {
    title: 'Dikirim | SPACE DIGITALIA',
    description: 'Dikirim Page for Super Admins',
}

export default function TransactionShipped() {
    return (
        <TransactionShippedLayout />
    )
}

