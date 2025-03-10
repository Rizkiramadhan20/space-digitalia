import React from 'react'

import { Metadata } from 'next'

import TransactionCompletedLayout from "@/hooks/dashboard/user/transaction/completed/TransactionCompletedLayout"

export const metadata: Metadata = {
    title: 'Transaksi Selesai | SPACE DIGITALIA',
    description: 'Transaksi Selesai Page for User',
}

export default function TransactionCompleted() {
    return (
        <TransactionCompletedLayout />
    )
}

