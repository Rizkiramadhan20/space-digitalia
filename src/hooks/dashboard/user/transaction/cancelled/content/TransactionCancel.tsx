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

import Header from '@/hooks/dashboard/user/transaction/cancelled/content/HeaderCancel'

import EmptyState from '@/hooks/dashboard/user/transaction/cancelled/content/EmpatyState'

export default function TransactionCanceledLayout() {
    const { user } = useAuth()
    const [canceledTransactions, setCanceledTransactions] = useState<Transaction[]>([]);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchCanceledTransactions = async () => {
            if (!user?.uid) return

            try {
                const transactionRef = collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTIONS as string);
                const q = query(
                    transactionRef,
                    where('status', '==', 'cancelled'),
                    where('userId', '==', user.uid)
                );
                const querySnapshot = await getDocs(q);

                const transactions = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Transaction[];

                const sortedTransactions = transactions.sort((a, b) =>
                    b.createdAt.toMillis() - a.createdAt.toMillis()
                );

                setCanceledTransactions(sortedTransactions);
            } catch (error) {
                console.error('Error fetching canceled transactions:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCanceledTransactions();
    }, [user?.uid]);

    const handleDelete = async (transactionId: string) => {
        if (!transactionId) return;

        setIsDeleting(true);
        try {
            const transactionRef = doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTIONS as string, transactionId);
            await deleteDoc(transactionRef);

            setCanceledTransactions(prev => prev.filter(t => t.id !== transactionId));
            setIsModalOpen(false);

            const modal = document.getElementById('delete_confirm_modal') as HTMLDialogElement;
            if (modal) modal.close();

            toast.success('Transaction deleted successfully');
        } catch (error) {
            console.error('Error deleting transaction:', error);
            toast.error('Failed to delete transaction. Please try again.');
        } finally {
            setIsDeleting(false);
        }
    };

    if (isLoading) return <TransactionCanceledSkeleton />

    if (!canceledTransactions || canceledTransactions.length === 0) {
        return <EmptyState />
    }

    return (
        <section className='min-h-full px-0 sm:px-4'>
            <Header />

            <TransactionList
                transactions={canceledTransactions}
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