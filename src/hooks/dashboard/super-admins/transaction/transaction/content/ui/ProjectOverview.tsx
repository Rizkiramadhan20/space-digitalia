'use client'

import React from 'react'

import Image from 'next/image'

import { ProjectOverviewProps } from '@/hooks/dashboard/super-admins/transaction/transaction/lib/schema'

export default function ProjectOverview({ transaction }: ProjectOverviewProps) {
    return (
        <div className="bg-gradient-to-br from-indigo-50 to-white rounded-xl p-4 shadow-sm">
            <div className="flex gap-6">
                <div className="relative w-48 h-32 rounded-lg overflow-hidden shadow-md">
                    <Image
                        src={transaction.imageUrl}
                        alt={transaction.projectTitle}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {transaction.projectTitle}
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500">Jumlah:</span>
                            <span className="font-semibold text-green-600">
                                Rp {transaction.amount.toLocaleString()}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500">Status:</span>
                            <span className={`px-3 py-1 rounded-full text-sm font-medium ${transaction.status === 'success' ? 'bg-green-100 text-green-700' :
                                transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                    'bg-red-100 text-red-700'
                                }`}>
                                {transaction.status.toUpperCase()}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}