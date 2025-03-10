'use client'

import React, { useState } from 'react';

import { useTransactions } from '@/hooks/dashboard/user/transaction/unpaid/lib/useTransactiont';

import { cancelTransaction } from '@/hooks/dashboard/user/transaction/unpaid/lib/TransactionServices';

import { Transaction } from '@/hooks/dashboard/user/transaction/unpaid/lib';

import { TransactionCard } from '@/hooks/dashboard/user/transaction/unpaid/content/TransactionCard';

import { TransactionModal } from '@/hooks/dashboard/user/transaction/unpaid/content/TransactionModal';

import { toast } from 'react-hot-toast';

import TransactionSkeleton from '@/hooks/dashboard/user/transaction/unpaid/TransactionUnpaidSkelaton';

import EmptyUnpaidTransaction from '@/hooks/dashboard/user/transaction/unpaid/content/empety'

import { Pagination } from '@/base/helper/Pagination';

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
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 6;

    // Update pagination calculations
    const offset = currentPage * itemsPerPage;
    const currentTransactions = pendingTransactions.slice(offset, offset + itemsPerPage);
    const pageCount = Math.ceil(pendingTransactions.length / itemsPerPage);

    const handlePageChange = ({ selected }: { selected: number }) => {
        setCurrentPage(selected);
    };

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
            <EmptyUnpaidTransaction />
        );
    }

    return (
        <section className='min-h-full px-0 sm:px-4'>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                        <h1 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'>
                            Transaksi Belum Dibayar
                        </h1>

                        <p className='text-gray-500'>Kelola dan urutkan transaksi Anda yang belum dibayar</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentTransactions.map((transaction) => (
                    <TransactionCard
                        key={transaction.id}
                        transaction={transaction}
                        onView={() => handleViewTransaction(transaction)}
                        onCancel={() => handleCancelTransaction(transaction.id)}
                        isLoading={isLoading}
                    />
                ))}
            </div>

            <div className='mt-8'>
                <Pagination
                    currentPage={currentPage}
                    totalPages={pageCount}
                    onPageChange={handlePageChange}
                />
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