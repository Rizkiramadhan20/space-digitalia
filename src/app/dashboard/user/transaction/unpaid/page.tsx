import React from 'react'

import { Metadata } from 'next'

import TransactionUnpaidLayout from "@/hooks/dashboard/user/transaction/unpaid/TransactionUnpaidLayout"

export const metadata: Metadata = {
    title: 'Unpaid Transaction | SPACE DIGITALIA',
    description: 'Unpaid Transaction Page for User',
}

export default function TransactionUnpaid() {
    return (
        <TransactionUnpaidLayout />
    )
}

