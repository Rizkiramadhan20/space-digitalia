import React from 'react'

import { Metadata } from 'next'

import TransactionPaidLayout from "@/hooks/dashboard/user/transaction/paid/TransactionPaidLayout"

export const metadata: Metadata = {
    title: 'Paid Transaction | SPACE DIGITALIA',
    description: 'Paid Transaction Page for Super Admins',
}

export default function TransactionPaid() {
    return (
        <TransactionPaidLayout />
    )
}

