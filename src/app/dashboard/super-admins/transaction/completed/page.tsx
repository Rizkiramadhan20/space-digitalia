import React from 'react'

import { Metadata } from 'next'

import ComplatedLayout from "@/hooks/dashboard/super-admins/transaction/complated/ComplatedLayout"

export const metadata: Metadata = {
    title: 'Transaction Completed | SPACE DIGITALIA',
    description: 'Transaction Completed Page for Super Admins',
}

export default function TransactionCompleted() {
    return (
        <ComplatedLayout />
    )
}

