'use client'

import React from 'react'

import Image from 'next/image'

import { ProjectOverviewProps } from '@/hooks/dashboard/super-admins/transaction/transaction/lib/schema'

export default function ProjectOverview({ transaction }: ProjectOverviewProps) {
    return (
        <div className="bg-gradient-to-br from-indigo-50 to-white rounded-xl p-3 sm:p-4 shadow-sm">
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                <div className="relative w-full sm:w-48 h-48 sm:h-32 rounded-lg overflow-hidden shadow-md">
                    <Image
                        src={transaction.imageUrl}
                        alt={transaction.projectTitle}
                        fill
                        className="object-cover"
                    />
                </div>
                <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                        {transaction.projectTitle}
                    </h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
                        <div className="flex items-center gap-2">
                            <span className="text-sm sm:text-base text-gray-500">Jumlah:</span>
                            <span className="text-sm sm:text-base font-semibold text-green-600">
                                Rp {transaction.amount.toLocaleString()}
                            </span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="text-sm sm:text-base text-gray-500">Status:</span>
                            <span className={`px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-medium ${transaction.status === 'success' ? 'bg-green-100 text-green-700' :
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