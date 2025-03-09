import React from 'react'

import { Metadata } from 'next'

import TransactionLayout from "@/hooks/dashboard/user/transaction/transaction/TransactionLayout"

export const metadata: Metadata = {
    title: 'Transaksi | SPACE DIGITALIA',
    description: 'Transaksi Page for User',
}

export default function Transaction() {
    return (
        <TransactionLayout />
    )
}

