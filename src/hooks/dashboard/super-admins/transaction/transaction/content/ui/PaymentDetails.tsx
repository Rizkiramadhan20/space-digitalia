'use client'

import React from 'react'

import { PaymentDetailsProps } from '@/hooks/dashboard/super-admins/transaction/transaction/lib/schema'

export default function PaymentDetails({ transaction }: PaymentDetailsProps) {
    return (
        <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 col-span-2 hover:shadow-xl transition-shadow duration-300">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-3 text-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
                Detail Pembayaran
            </h3>
            <div className="grid grid-cols-2 gap-8">
                {/* Payment Method Section */}
                <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                        <span className="text-sm font-medium text-gray-500 block mb-1">Metode Pembayaran</span>
                        <span className="font-semibold text-gray-800">{transaction.paymentMethod}</span>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                        <span className="text-sm font-medium text-gray-500 block mb-1">Status Transaksi</span>
                        <span className={`font-semibold ${['settlement', 'success'].includes(transaction.paymentDetails?.transaction_status || '')
                            ? 'text-green-600'
                            : transaction.paymentDetails?.transaction_status === 'pending'
                                ? 'text-yellow-600'
                                : 'text-red-600'
                            }`}>
                            {transaction.paymentDetails?.transaction_status || 'N/A'}
                        </span>
                    </div>
                </div>

                {/* Order Details Section */}
                <div className="space-y-4">
                    <div className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                        <span className="text-sm font-medium text-gray-500 block mb-1">Order ID</span>
                        <span className="font-mono font-semibold text-gray-800">{transaction.orderId}</span>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                        <span className="text-sm font-medium text-gray-500 block mb-1">Amount</span>
                        <span className="font-semibold text-gray-800">Rp {transaction.amount.toLocaleString()}</span>
                    </div>
                </div>
            </div>
        </div>
    )
}