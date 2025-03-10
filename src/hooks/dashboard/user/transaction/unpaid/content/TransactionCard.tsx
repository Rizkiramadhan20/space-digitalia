import React, { useState } from 'react';
import Image from 'next/image';
import { Transaction } from '../lib';
import { handleContinuePayment, updateTransactionStatus } from '../lib/TransactionServices';

interface TransactionCardProps {
    transaction: Transaction;
    onView: (transaction: Transaction) => void;
    onCancel: () => void;
    isLoading: boolean;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({
    transaction,
    onView,
    onCancel,
    isLoading
}) => {
    const [showConfirmCancel, setShowConfirmCancel] = useState(false);
    const [isCancelling, setIsCancelling] = useState(false);

    const handleCancelClick = () => {
        setShowConfirmCancel(true);
    };

    const handleConfirmCancel = async () => {
        setIsCancelling(true);
        try {
            await onCancel();
        } finally {
            setIsCancelling(false);
            setShowConfirmCancel(false);
        }
    };

    return (
        <>
            <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
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
                        <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200">
                            {transaction.status}
                        </span>
                    </div>

                    {/* Info Grid */}
                    <div className="space-y-3">
                        {/* User Info */}
                        <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                            <div className="flex-shrink-0 w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

                    {/* Action Buttons */}
                    <div className="grid grid-cols-3 gap-2 mt-2">
                        <button
                            onClick={() => onView(transaction)}
                            className="px-4 py-2.5 bg-gray-100 hover:bg-gray-200 
                                       text-gray-700 rounded-xl transition-all duration-200 flex items-center 
                                       justify-center gap-2"
                            title="View Details"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24"
                                strokeWidth={2} stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                                />
                                <path strokeLinecap="round" strokeLinejoin="round"
                                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                                />
                            </svg>
                        </button>

                        <button
                            onClick={() => handleContinuePayment(transaction, updateTransactionStatus)}
                            className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 
                                       text-white rounded-xl transition-all duration-200 flex items-center 
                                       justify-center gap-2"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                            Continue
                        </button>

                        <button
                            onClick={handleCancelClick}
                            disabled={isLoading}
                            className="px-4 py-2.5 bg-red-600 hover:bg-red-700 
                                       text-white rounded-xl transition-all duration-200 flex items-center 
                                       justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {isLoading ? (
                                <span className="loading loading-spinner loading-sm"></span>
                            ) : (
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            )}
                            Cancel
                        </button>
                    </div>
                </div>
            </div>

            {/* Confirmation Modal */}
            {showConfirmCancel && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center">
                        <div className="fixed inset-0 transition-opacity" onClick={() => setShowConfirmCancel(false)}>
                            <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                        </div>

                        <div className="relative inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
                            <div className="text-center">
                                <svg className="mx-auto mb-4 text-red-500 w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                                </svg>
                                <h3 className="text-lg font-medium text-gray-900 mb-2">
                                    Cancel Transaction
                                </h3>
                                <p className="text-sm text-gray-500 mb-4">
                                    Are you sure you want to cancel this transaction? This action cannot be undone.
                                </p>
                            </div>

                            <div className="mt-4 flex justify-center gap-3">
                                <button
                                    type="button"
                                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 border border-transparent rounded-md hover:bg-gray-200 focus:outline-none"
                                    onClick={() => setShowConfirmCancel(false)}
                                    disabled={isCancelling}
                                >
                                    No, Keep it
                                </button>
                                <button
                                    type="button"
                                    className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
                                    onClick={handleConfirmCancel}
                                    disabled={isCancelling}
                                >
                                    {isCancelling ? (
                                        <>
                                            <span className="loading loading-spinner loading-sm mr-2"></span>
                                            Cancelling...
                                        </>
                                    ) : (
                                        'Yes, Cancel it'
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};