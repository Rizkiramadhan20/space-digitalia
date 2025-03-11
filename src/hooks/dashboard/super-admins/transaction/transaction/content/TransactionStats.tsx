'use client'

import React from 'react'

import { TransactionStatsProps } from '@/hooks/dashboard/super-admins/transaction/transaction/lib/schema'

export default function TransactionStats({ filteredTransactions, transactions }: TransactionStatsProps) {
    return (
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-6">
            <div className="bg-gradient-to-br from-indigo-50/50 to-white rounded-2xl p-4 border border-indigo-100/50 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-indigo-600/10 rounded-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Total</p>
                        <p className="text-lg font-semibold text-indigo-600">{filteredTransactions.length}</p>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-br from-green-50/50 to-white rounded-2xl p-4 border border-green-100/50 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-600/10 rounded-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Success</p>
                        <p className="text-lg font-semibold text-green-600">
                            {transactions.filter(t => t.status === 'success').length}
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-br from-yellow-50/50 to-white rounded-2xl p-4 border border-yellow-100/50 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-yellow-600/10 rounded-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Pending</p>
                        <p className="text-lg font-semibold text-yellow-600">
                            {transactions.filter(t => t.status === 'pending').length}
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-gradient-to-br from-red-50/50 to-white rounded-2xl p-4 border border-red-100/50 shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-red-600/10 rounded-xl">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </div>
                    <div>
                        <p className="text-sm text-gray-500">Cancelled</p>
                        <p className="text-lg font-semibold text-red-600">
                            {transactions.filter(t => t.status === 'cancelled').length}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}