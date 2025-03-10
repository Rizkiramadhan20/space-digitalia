import React from 'react';

import Image from 'next/image';

import { TransactionCardProps } from '@/hooks/dashboard/user/transaction/cancelled/lib/schema';

export default function TransactionCard({ transaction, onViewDetails, onDelete }: TransactionCardProps) {
    return (
        <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
            <div className="relative h-48 w-full overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent z-10" />
                <Image
                    src={transaction.imageUrl}
                    alt={transaction.projectTitle}
                    fill
                    className="object-cover transform group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>

            <div className="p-5 space-y-6">
                <div className="flex justify-between items-start gap-4">
                    <div className="flex-1 space-y-1">
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1 group-hover:text-indigo-600 transition-colors">
                            {transaction.projectTitle}
                        </h3>
                        <p className="text-sm text-gray-500 font-medium tracking-wide">
                            #{transaction.orderId}
                        </p>
                    </div>
                    <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200 shadow-sm">
                        {transaction.status}
                    </span>
                </div>

                <div className="grid gap-3">
                    <div className="flex items-center gap-3 p-3.5 bg-gray-50/70 rounded-xl hover:bg-gray-50 transition-colors">
                        <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-gray-900 truncate">
                                {transaction.userName}
                            </p>
                            <p className="text-sm text-gray-500 truncate">
                                {transaction.userEmail}
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-3 p-3.5 bg-gray-50/70 rounded-xl hover:bg-gray-50 transition-colors">
                        <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <p className="text-sm font-semibold text-gray-900">
                            Rp {transaction.amount.toLocaleString('id-ID')}
                        </p>
                    </div>

                    <div className="flex items-center gap-3 p-3.5 bg-gray-50/70 rounded-xl hover:bg-gray-50 transition-colors">
                        <div className="flex-shrink-0 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-sm">
                            <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                        </div>
                        <p className="text-sm text-gray-700">
                            {transaction.createdAt.toDate().toLocaleDateString('id-ID', {
                                day: 'numeric',
                                month: 'short',
                                year: 'numeric'
                            })}
                        </p>
                    </div>
                </div>

                <div className="space-y-3 pt-2">
                    <button
                        onClick={() => onViewDetails(transaction)}
                        className="w-full px-4 py-2.5 bg-white border border-indigo-200 
                                 text-indigo-600 rounded-xl transition-all duration-200 
                                 hover:bg-indigo-600 hover:text-white hover:border-transparent 
                                 active:bg-indigo-700 font-medium flex items-center justify-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24"
                            strokeWidth={2} stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                            />
                            <path strokeLinecap="round" strokeLinejoin="round"
                                d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                            />
                        </svg>
                        View Details
                    </button>

                    <button
                        onClick={() => onDelete(transaction)}
                        className="w-full px-4 py-2.5 bg-white border border-red-200 
                                 text-red-600 rounded-xl transition-all duration-200
                                 hover:bg-red-50 hover:border-red-300 active:bg-red-100
                                 font-medium flex items-center justify-center gap-2"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        Delete Transaction
                    </button>
                </div>
            </div>
        </div>
    );
}