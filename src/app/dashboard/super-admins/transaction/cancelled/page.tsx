import React from 'react'

import { Metadata } from 'next'

import TransactionCancelledLayout from "@/hooks/dashboard/super-admins/transaction/cancelled/TransactionCancelledLayout"

export const metadata: Metadata = {
    title: 'Transaction Cancelled | SPACE DIGITALIA',
    description: 'Transaction Cancelled Page for Super Admins',
}

export default function TransactionCancelled() {
    return (
        <TransactionCancelledLayout />
    )
}

