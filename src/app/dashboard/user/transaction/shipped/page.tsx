import React from 'react'

import { Metadata } from 'next'

import TransactionShippedLayout from "@/hooks/dashboard/user/transaction/shipped/TransactionShippedLayout"

export const metadata: Metadata = {
    title: 'Transaksi Dikirim | SPACE DIGITALIA',
    description: 'Transaksi Dikirim Page for User',
}

export default function TransactionShipped() {
    return (
        <TransactionShippedLayout />
    )
}

