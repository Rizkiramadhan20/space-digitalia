import Image from 'next/image'

import { Transaction } from '@/hooks/dashboard/super-admins/transaction/paid/lib/paid'

interface TransactionGridProps {
    transactions: Transaction[];
    onTransactionClick: (transaction: Transaction) => void;
}

export default function TransactionGrid({ transactions, onTransactionClick }: TransactionGridProps) {
    if (transactions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 px-4">
                <div className="bg-gray-50 rounded-full p-4 mb-4">
                    <svg className="w-8 h-8 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                            d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">No transactions found</h3>
                <p className="text-gray-500 text-center">
                    Try adjusting your search or filter criteria
                </p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {transactions.map((transaction, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="relative h-48 w-full">
                        <Image
                            src={transaction.imageUrl}
                            alt={transaction.projectTitle}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    </div>

                    <div className="p-5">
                        <div className="flex justify-between items-start gap-4 mb-4">
                            <div className="flex-1">
                                <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                                    {transaction.projectTitle}
                                </h3>
                                <p className="text-sm text-gray-500 font-medium">
                                    #{transaction.orderId}
                                </p>
                            </div>
                            <div className="flex flex-col gap-2 items-end">
                                <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-green-50 text-green-700 border border-green-200">
                                    {transaction.paymentDetails.transaction_status}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <div className="flex-shrink-0 w-10 h-10 relative">
                                    {transaction.userPhotoURL ? (
                                        <Image
                                            src={transaction.userPhotoURL}
                                            alt={transaction.userName}
                                            fill
                                            className="object-cover rounded-full ring-2 ring-white shadow-sm"
                                            sizes="40px"
                                        />
                                    ) : (
                                        <div className="w-full h-full bg-gradient-to-br from-indigo-100 to-indigo-50 rounded-full flex items-center justify-center ring-2 ring-white shadow-sm">
                                            <svg
                                                className="w-5 h-5 text-indigo-500"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                                />
                                            </svg>
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-gray-900 truncate">
                                        {transaction.userName}
                                    </p>
                                    <p className="text-xs text-gray-500 truncate mt-0.5">
                                        {transaction.userEmail}
                                    </p>
                                </div>
                            </div>

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

                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                    <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                </div>
                                <p className="text-sm text-gray-700">
                                    {transaction.paymentDetails.transaction_time}
                                </p>
                            </div>
                        </div>

                        <button
                            onClick={() => onTransactionClick(transaction)}
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
            ))}
        </div>
    );
}