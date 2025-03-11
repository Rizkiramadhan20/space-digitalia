'use client'

import React from 'react'

import { TimestampsProps } from '@/hooks/dashboard/super-admins/transaction/transaction/lib/schema'

export default function Timestamps({ transaction }: TimestampsProps) {
    return (
        <div className="text-sm text-gray-500 flex justify-between pt-4 border-t">
            <span>Dibuat: {transaction.createdAt.toDate().toLocaleString('id-ID')}</span>
            <span>Diperbarui: {transaction.updatedAt.toDate().toLocaleString('id-ID')}</span>
        </div>
    )
}