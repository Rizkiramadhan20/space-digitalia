import React from 'react'

import { Metadata } from 'next'

import TransactionCanceledLayout from "@/hooks/dashboard/user/transaction/cancelled/TransactionCanceledLayout"

export const metadata: Metadata = {
    title: 'Transaksi Dibatalkan | SPACE DIGITALIA',
    description: 'Transaksi Dibatalkan Page for User',
}

export default function TransactionCanceled() {
    return (
        <TransactionCanceledLayout />
    )
}

