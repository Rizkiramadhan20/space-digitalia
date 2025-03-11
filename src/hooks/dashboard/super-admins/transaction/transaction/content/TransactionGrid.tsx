'use client'

import React from 'react'

import Image from 'next/image'

import { TransactionGridProps } from '@/hooks/dashboard/super-admins/transaction/transaction/lib/schema'

export default function TransactionGrid({
    paginatedTransactions,
    setSelectedTransaction,
    setIsModalOpen
}: TransactionGridProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6">
            {paginatedTransactions.map((transaction) => (
                <div
                    key={transaction.id}
                    className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm 
                             hover:shadow-xl hover:border-gray-200 transition-all duration-300 
                             transform hover:-translate-y-1"
                >
                    <div className="relative h-48 overflow-hidden">
                        <Image
                            src={transaction.imageUrl}
                            alt={transaction.projectTitle}
                            fill
                            className="object-cover transform group-hover:scale-105 transition-transform duration-300"
                        />
                        <div className="absolute top-3 right-3">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium 
                                ${transaction.status === 'success'
                                    ? 'bg-green-100 text-green-800'
                                    : transaction.status === 'pending'
                                        ? 'bg-yellow-100 text-yellow-800'
                                        : 'bg-red-100 text-red-800'
                                }`}>
                                {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                            </span>
                        </div>
                    </div>

                    <div className="p-5 space-y-4">
                        <h3 className="font-semibold text-gray-800 line-clamp-1 text-lg group-hover:text-indigo-600 transition-colors">
                            {transaction.projectTitle}
                        </h3>

                        <div className="flex items-center justify-between bg-gray-50 p-3 rounded-xl">
                            <span className="text-gray-600 text-sm">Amount</span>
                            <span className="font-semibold text-gray-900">
                                Rp {transaction.amount.toLocaleString()}
                            </span>
                        </div>

                        <div className="space-y-2.5">
                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500 flex items-center gap-1.5">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                                        />
                                    </svg>
                                    Payment
                                </span>
                                <span className="font-medium text-gray-900">{transaction.paymentMethod}</span>
                            </div>

                            <div className="flex items-center justify-between text-sm">
                                <span className="text-gray-500 flex items-center gap-1.5">
                                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                            d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                        />
                                    </svg>
                                    License
                                </span>
                                <span className="font-medium text-gray-900">{transaction.licenseType}</span>
                            </div>
                        </div>

                        <div className="pt-4 border-t border-gray-100">
                            <div className="flex items-center gap-3">
                                <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-indigo-100 shadow-sm">
                                    <Image
                                        src={transaction.userPhotoURL}
                                        alt={transaction.userName}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-gray-900 truncate group-hover:text-indigo-600 transition-colors">
                                        {transaction.userName}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate group-hover:text-gray-600 transition-colors">
                                        {transaction.userEmail}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="text-xs text-gray-500">
                            {transaction.createdAt.toDate().toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </div>

                        <button
                            onClick={() => {
                                setSelectedTransaction(transaction)
                                setIsModalOpen(true)
                            }}
                            className="w-full mt-2 px-4 py-2.5 bg-white border border-indigo-200 
                                     hover:bg-indigo-50 hover:border-indigo-300 text-indigo-600 
                                     rounded-xl transition-all duration-200 flex items-center 
                                     justify-center gap-2 group-hover:bg-indigo-600 
                                     group-hover:text-white font-medium"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                strokeWidth={2} stroke="currentColor" className="w-4 h-4">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                />
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                />
                            </svg>
                            View Details
                        </button>
                    </div>
                </div>
            ))}
        </div>
    )
}