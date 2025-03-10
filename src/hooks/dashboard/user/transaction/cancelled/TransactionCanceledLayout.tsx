'use client'

import React, { useEffect, useState } from 'react'

import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore'

import { db } from '@/utils/firebase'

import { useAuth } from '@/utils/context/AuthContext'

import toast from 'react-hot-toast'

import TransactionCanceledSkeleton from '@/hooks/dashboard/user/transaction/cancelled/TransactionCanceledSkelaton'

import { Transaction } from '@/hooks/dashboard/user/transaction/cancelled/lib/schema'

import TransactionList from '@/hooks/dashboard/user/transaction/cancelled/content/TransactionListCancel'

import DeleteConfirmationModal from '@/hooks/dashboard/user/transaction/cancelled/content/DeleteModal'

import TransactionDetailsModal from '@/hooks/dashboard/user/transaction/cancelled/content/TransactionDetailsModal'

import EmptyState from '@/hooks/dashboard/user/transaction/cancelled/content/EmpatyState'

import { useModal } from '@/base/helper/useModal'

import { Pagination } from '@/base/helper/Pagination'

export default function TransactionCanceledLayout() {
    const { user } = useAuth()
    const [canceledTransactions, setCanceledTransactions] = useState<Transaction[]>([]);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 10; // You can adjust this number

    useEffect(() => {
        const fetchCanceledTransactions = async () => {
            if (!user?.uid) return // Early return if no user

            try {
                const transactionRef = collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTIONS as string);
                const q = query(
                    transactionRef,
                    where('status', '==', 'cancelled'),
                    where('userId', '==', user.uid) // Add filter for user's transactions
                );
                const querySnapshot = await getDocs(q);

                const transactions = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Transaction[];

                // Sort transactions by createdAt in descending order
                const sortedTransactions = transactions.sort((a, b) =>
                    b.createdAt.toMillis() - a.createdAt.toMillis()
                );

                setCanceledTransactions(sortedTransactions);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching canceled transactions:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCanceledTransactions();
    }, [user?.uid]);

    useModal({
        isOpen: isModalOpen,
        onClose: () => setIsModalOpen(false)
    });

    // Update delete handler
    const handleDelete = async (transactionId: string) => {
        if (!transactionId) return;

        setIsDeleting(true);
        try {
            const transactionRef = doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTIONS as string, transactionId);
            await deleteDoc(transactionRef);

            // Update local state
            setCanceledTransactions(prev => prev.filter(t => t.id !== transactionId));
            setIsModalOpen(false);

            // Close delete confirmation modal
            const modal = document.getElementById('delete_confirm_modal') as HTMLDialogElement;
            if (modal) modal.close();

            // Show success toast
            toast.success('Transaction deleted successfully');
        } catch (error) {
            console.error('Error deleting transaction:', error);
            toast.error('Failed to delete transaction. Please try again.');
        } finally {
            setIsDeleting(false);
        }
    };

    // Add pagination calculation
    const paginatedTransactions = canceledTransactions.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected);
        window.scrollTo(0, 0); // Scroll to top when page changes
    };

    if (isLoading) return <TransactionCanceledSkeleton />

    if (!canceledTransactions || canceledTransactions.length === 0) {
        return (
            <EmptyState />
        );
    }

    return (
        <section className='min-h-full px-0 sm:px-4'>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                        <h1 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'>
                            Canceled Transaction
                        </h1>
                        <p className='text-gray-500'>Manage and organize your canceled transaction</p>
                    </div>
                </div>
            </div>

            <TransactionList
                transactions={paginatedTransactions}
                onViewDetails={(transaction) => {
                    setSelectedTransaction(transaction);
                    setIsModalOpen(true);
                }}
                onDelete={(transaction) => {
                    setSelectedTransaction(transaction);
                    const modal = document.getElementById('delete_confirm_modal') as HTMLDialogElement;
                    if (modal) modal.showModal();
                }}
            />

            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(canceledTransactions.length / itemsPerPage)}
                onPageChange={handlePageChange}
            />

            {isModalOpen && selectedTransaction && (
                <TransactionDetailsModal
                    transaction={selectedTransaction}
                    onClose={() => setIsModalOpen(false)}
                />
            )}

            <DeleteConfirmationModal
                isDeleting={isDeleting}
                onCancel={() => {
                    const modal = document.getElementById('delete_confirm_modal') as HTMLDialogElement;
                    if (modal) modal.close();
                }}
                onConfirm={() => handleDelete(selectedTransaction?.id || '')}
            />
        </section>
    )
}