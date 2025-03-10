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
            <div className="flex flex-col items-center justify-center min-h-[400px] text-gray-500">
                <svg
                    className="w-16 h-16 mb-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                </svg>
                <p className="text-lg font-medium">No pending transactions</p>
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