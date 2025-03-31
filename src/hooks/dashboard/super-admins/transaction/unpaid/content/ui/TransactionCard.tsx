import Image from 'next/image'

import { TransactionCardProps } from '@/hooks/dashboard/super-admins/transaction/unpaid/lib/schema'

export function TransactionCard({ transaction, onViewDetails }: TransactionCardProps) {
    return (
        <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
            {/* Image Container */}
            <div className="relative h-48 w-full">
                <Image
                    src={transaction.imageUrl}
                    alt={transaction.projectTitle}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </div>

            {/* Content Container */}
            <div className="p-5">
                {/* Header */}
                <div className="flex justify-between items-start gap-4 mb-4">
                    <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                            {transaction.projectTitle}
                        </h3>
                        <p className="text-sm text-gray-500 font-medium">
                            #{transaction.orderId}
                        </p>
                    </div>
                    <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200">
                        {transaction.status}
                    </span>
                </div>

                {/* Info Grid */}
                <div className="space-y-3">
                    {/* User Info */}
                    <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="relative flex-shrink-0 w-12 h-12">
                            {transaction.userPhotoURL ? (
                                <Image
                                    src={transaction.userPhotoURL}
                                    alt={transaction.userName}
                                    fill
                                    className="rounded-full object-cover ring-2 ring-white"
                                />
                            ) : (
                                <div className="w-full h-full rounded-full bg-gradient-to-br from-indigo-100 to-indigo-50 flex items-center justify-center">
                                    <svg className="w-6 h-6 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                </div>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-semibold text-gray-900 truncate mb-0.5">
                                {transaction.userName}
                            </p>
                            <p className="text-xs text-gray-500 truncate flex items-center gap-1.5">
                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                                {transaction.userEmail}
                            </p>
                        </div>
                    </div>

                    {/* Amount */}
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <p className="text-sm font-semibold text-gray-900">
                            Rp {transaction.amount.toLocaleString('id-ID')}
                        </p>
                    </div>

                    {/* Date */}
                    <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                        <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

                {/* Action Button */}
                <button
                    onClick={() => onViewDetails(transaction)}
                    className="w-full mt-2 px-4 py-2.5 bg-white border border-indigo-200 
                             hover:bg-indigo-50 hover:border-indigo-300 text-indigo-600 
                             rounded-xl transition-all duration-200 flex items-center 
                             justify-center gap-2 group-hover:bg-indigo-600 
                             group-hover:text-white font-medium"
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
            </div>
        </div>
    )
}