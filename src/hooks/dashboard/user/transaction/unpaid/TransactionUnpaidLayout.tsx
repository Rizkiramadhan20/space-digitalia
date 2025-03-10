'use client'

import React, { useState } from 'react';

import { useTransactions } from '@/hooks/dashboard/user/transaction/unpaid/lib/useTransactiont';

import { cancelTransaction } from '@/hooks/dashboard/user/transaction/unpaid/lib/TransactionServices';

import { Transaction } from '@/hooks/dashboard/user/transaction/unpaid/lib';

import { TransactionCard } from '@/hooks/dashboard/user/transaction/unpaid/content/TransactionCard';

import { TransactionModal } from '@/hooks/dashboard/user/transaction/unpaid/content/TransactionModal';

import { toast } from 'react-hot-toast';

import TransactionSkeleton from '@/hooks/dashboard/user/transaction/unpaid/TransactionUnpaidSkelaton';

export default function TransactionUnpaidLayout() {
    const {
        pendingTransactions,
        selectedTransaction,
        setSelectedTransaction,
        isModalOpen,
        setIsModalOpen,
        isLoading: isLoadingTransactions
    } = useTransactions();
    const [isLoading, setIsLoading] = useState(false);

    const handleViewTransaction = (transaction: Transaction) => {
        setSelectedTransaction(transaction);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedTransaction(null);
    };

    const handleCancelTransaction = async (transactionId: string) => {
        try {
            setIsLoading(true);
            await cancelTransaction(transactionId);
            toast.success('Transaction cancelled successfully');
        } catch (error) {
            console.error('Error cancelling transaction:', error);
            toast.error('Failed to cancel transaction');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoadingTransactions) {
        return <TransactionSkeleton />;
    }

    if (pendingTransactions.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center min-h-[70vh] p-4">
                {/* Decorative background */}
                <div className="absolute inset-0 grid grid-cols-2 -space-x-52 opacity-20 dark:opacity-5">
                    <div className="blur-[106px] h-56 bg-gradient-to-br from-indigo-100 to-purple-100"></div>
                    <div className="blur-[106px] h-32 bg-gradient-to-r from-cyan-100 to-sky-100"></div>
                </div>

                <div className="relative flex flex-col items-center text-center">
                    {/* Modern icon with animation */}
                    <div className="relative mb-6">
                        <div className="absolute inset-0 bg-indigo-50 rounded-full animate-pulse"></div>
                        <div className="relative p-6 bg-white rounded-full shadow-2xl">
                            <svg
                                className="w-12 h-12 sm:w-16 sm:h-16 text-indigo-500"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1.5"
                                    d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                                />
                            </svg>
                        </div>
                    </div>

                    {/* Text content */}
                    <h3 className="mb-3 text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                        Belum Ada Transaksi Belum Lunas
                    </h3>
                    <p className="max-w-md mb-6 text-base sm:text-lg text-gray-500">
                        Saat ini belum ada transaksi yang sedang dalam proses pengiriman.
                    </p>

                    {/* Action button */}
                    <button
                        onClick={() => window.location.href = '/dashboard/user'}
                        className="inline-flex items-center px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-600 to-indigo-700 text-white transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:from-indigo-500 hover:to-indigo-600 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        <svg
                            className="w-5 h-5 mr-2"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M7 16l-4-4m0 0l4-4m-4 4h18"
                            />
                        </svg>
                        Kembali ke Dashboard
                    </button>
                </div>

                {/* Decorative elements */}
                <div className="absolute bottom-0 left-0 right-0 hidden sm:block">
                    <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-40"></div>
                    <div className="grid grid-cols-3 gap-8 px-8 py-6 text-sm text-gray-500">
                        <div className="flex items-center justify-center">
                            <div className="w-2 h-2 mr-2 rounded-full bg-indigo-500"></div>
                            Transaksi Aman
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="w-2 h-2 mr-2 rounded-full bg-indigo-500"></div>
                            Pengiriman Terpantau
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="w-2 h-2 mr-2 rounded-full bg-indigo-500"></div>
                            Dukungan 24/7
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <section className='min-h-full px-0 sm:px-4'>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                        <h1 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'>
                            Transaksi Belum Lunas
                        </h1>

                        <p className='text-gray-500'>Kelola dan urutkan transaksi Anda yang belum lunas</p>
                    </div>

                    <button
                        className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-indigo-100 hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        Filter
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pendingTransactions.map((transaction) => (
                    <TransactionCard
                        key={transaction.id}
                        transaction={transaction}
                        onView={() => handleViewTransaction(transaction)}
                        onCancel={() => handleCancelTransaction(transaction.id)}
                        isLoading={isLoading}
                    />
                ))}
            </div>

            {selectedTransaction && (
                <TransactionModal
                    transaction={selectedTransaction}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            )}
        </section>
    );
}