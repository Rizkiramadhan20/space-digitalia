'use client'

import React, { useEffect, useState } from 'react'

import { collection, onSnapshot } from 'firebase/firestore'

import { db } from '@/utils/firebase'

import { Filters, Transaction } from '@/hooks/dashboard/super-admins/transaction/transaction/lib/schema'

import { Pagination } from '@/base/helper/Pagination'

import { useModal } from '@/base/helper/useModal'

import { useModalWithClose } from '@/base/helper/ModalWithClose'

import TransactionSkeleton from '@/hooks/dashboard/super-admins/transaction/transaction/TransactionSkelaton'

import Filter from '@/hooks/dashboard/super-admins/transaction/transaction/content/Filter'

import TransactionHeader from '@/hooks/dashboard/super-admins/transaction/transaction/content/TransactionHeader'

import TransactionStats from '@/hooks/dashboard/super-admins/transaction/transaction/content/TransactionStats'

import TransactionGrid from '@/hooks/dashboard/super-admins/transaction/transaction/content/TransactionGrid'

import TransactionModal from '@/hooks/dashboard/super-admins/transaction/transaction/content/TransactionModal'

export default function TransactionLayout() {
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([])
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
    const [filters, setFilters] = useState<Filters>({
        status: [],
        paymentMethod: [],
        paymentType: []
    })
    const [currentPage, setCurrentPage] = useState(0)
    const itemsPerPage = 9
    const [isLoading, setIsLoading] = useState(true)

    useModal({
        isOpen: isModalOpen,
        onClose: () => setIsModalOpen(false)
    })

    const { handleClickOutside } = useModalWithClose({
        isOpen: isModalOpen,
        onClose: () => setIsModalOpen(false)
    })

    const applyFilters = () => {
        let filtered = [...transactions];

        if (filters.status.length > 0) {
            filtered = filtered.filter(transaction =>
                filters.status.includes(transaction.status)
            );
        }

        if (filters.paymentMethod.length > 0) {
            filtered = filtered.filter(transaction =>
                filters.paymentMethod.includes(transaction.deliveryMethod)
            );
        }

        if (filters.paymentType.length > 0) {
            filtered = filtered.filter(transaction => {
                if (filters.paymentType.includes('free')) {
                    return transaction.amount === 0;
                }
                return filters.paymentType.includes(transaction.paymentDetails?.payment_type || '');
            });
        }

        setFilteredTransactions(filtered);
    }

    useEffect(() => {
        const transactionsRef = collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTIONS as string)

        const unsubscribe = onSnapshot(transactionsRef, (snapshot) => {
            const transactionData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Transaction[]

            const filteredAndSortedTransactions = transactionData
                .filter(transaction => transaction.status !== 'cancelled')
                .sort((a, b) =>
                    b.createdAt.toDate().getTime() - a.createdAt.toDate().getTime()
                )

            setTransactions(filteredAndSortedTransactions)
            setFilteredTransactions(filteredAndSortedTransactions)
            setIsLoading(false)
        })

        return () => unsubscribe()
    }, [])

    if (isLoading) {
        return <TransactionSkeleton />
    }

    const paginatedTransactions = filteredTransactions.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    )

    const handlePageChange = ({ selected }: { selected: number }) => {
        setCurrentPage(selected)
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    return (
        <section className='min-h-full px-0 sm:px-4'>
            <div className="bg-white rounded-3xl shadow-lg border border-gray-100/50 p-6 lg:p-8 mb-8 backdrop-blur-sm">
                <TransactionHeader
                    isFilterModalOpen={isFilterModalOpen}
                    setIsFilterModalOpen={setIsFilterModalOpen}
                />
                <TransactionStats
                    filteredTransactions={filteredTransactions}
                    transactions={transactions}
                />
            </div>

            {isFilterModalOpen && (
                <Filter
                    setFilters={setFilters}
                    filters={filters}
                    transactions={transactions}
                    setFilteredTransactions={setFilteredTransactions}
                    applyFilters={applyFilters}
                />
            )}

            <TransactionGrid
                paginatedTransactions={paginatedTransactions}
                setSelectedTransaction={setSelectedTransaction}
                setIsModalOpen={setIsModalOpen}
            />

            <Pagination
                currentPage={currentPage}
                totalPages={Math.ceil(filteredTransactions.length / itemsPerPage)}
                onPageChange={handlePageChange}
            />

            {isModalOpen && selectedTransaction && (
                <TransactionModal
                    selectedTransaction={selectedTransaction}
                    handleClickOutside={handleClickOutside}
                    setIsModalOpen={setIsModalOpen}
                />
            )}
        </section>
    )
}
