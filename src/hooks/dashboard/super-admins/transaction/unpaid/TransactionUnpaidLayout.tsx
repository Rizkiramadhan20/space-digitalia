'use client'

import React, { useEffect, useState } from 'react'

import { collection, query, where, getDocs } from 'firebase/firestore'

import { db } from '@/utils/firebase'

import TransactionUnpaidSkeleton from '@/hooks/dashboard/super-admins/transaction/unpaid/TransactionUnpaidSkelaton'

import EmptyUnpaidTransaction from '@/hooks/dashboard/super-admins/transaction/unpaid/content/empety'

import { Transaction } from '@/hooks/dashboard/super-admins/transaction/unpaid/lib/schema'

import { useModal } from '@/base/helper/useModal';

import { useModalWithClose } from '@/base/helper/ModalWithClose';

import { Pagination } from '@/base/helper/Pagination';

import { TransactionCard } from '@/hooks/dashboard/super-admins/transaction/unpaid/content/ui/TransactionCard'

import { TransactionDetailsModal } from '@/hooks/dashboard/super-admins/transaction/unpaid/content/ui/TransactionModal'

export default function TransactionUnpaidLayout() {
    const [pendingTransactions, setPendingTransactions] = useState<Transaction[]>([]);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const [itemsPerPage] = useState(9); // Show 9 items per page (3x3 grid)

    const { handleClickOutside } = useModalWithClose({
        isOpen: isModalOpen,
        onClose: () => setIsModalOpen(false)
    });

    useModal({
        isOpen: isModalOpen,
        onClose: () => setIsModalOpen(false)
    });

    useEffect(() => {
        const fetchPendingTransactions = async () => {
            try {
                const transactionRef = collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTIONS as string);
                const q = query(transactionRef, where('status', '==', 'pending'));
                const querySnapshot = await getDocs(q);

                const transactions = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Transaction[];

                // Sort transactions by createdAt in descending order
                const sortedTransactions = transactions.sort((a, b) =>
                    b.createdAt.toMillis() - a.createdAt.toMillis()
                );

                setPendingTransactions(sortedTransactions);
            } catch (error) {
                console.error('Error fetching pending transactions:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchPendingTransactions();
    }, []);

    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected);
        // Scroll to top of the page when changing pages
        window.scrollTo(0, 0);
    };

    // Calculate pagination values
    const indexOfLastItem = (currentPage + 1) * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentTransactions = pendingTransactions.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(pendingTransactions.length / itemsPerPage);

    if (isLoading) {
        return <TransactionUnpaidSkeleton />
    }

    if (pendingTransactions.length === 0) {
        return <EmptyUnpaidTransaction />
    }

    return (
        <section className='min-h-full px-0 sm:px-4'>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                        <h1 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'>
                            Unpaid Transaction
                        </h1>
                        <p className='text-gray-500'>Manage and organize your unpaid transaction</p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {currentTransactions.map((transaction) => (
                    <TransactionCard
                        key={transaction.id}
                        transaction={transaction}
                        onViewDetails={(transaction) => {
                            setSelectedTransaction(transaction);
                            setIsModalOpen(true);
                        }}
                    />
                ))}
            </div>

            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />

            {isModalOpen && selectedTransaction && (
                <TransactionDetailsModal
                    transaction={selectedTransaction}
                    onClose={() => setIsModalOpen(false)}
                    handleClickOutside={handleClickOutside}
                />
            )}
        </section>
    )
}