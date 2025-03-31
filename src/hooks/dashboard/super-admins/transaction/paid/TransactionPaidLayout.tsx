'use client'

import React, { useEffect, useState } from 'react'

import { collection, getDocs, query } from 'firebase/firestore'

import { db } from '@/utils/firebase'

import { Transaction } from '@/hooks/dashboard/super-admins/transaction/paid/lib/paid'

import TransactionPaidSkeleton from './TransactionPaidSkelaton'

import TransactionGrid from '@/hooks/dashboard/super-admins/transaction/paid/content/TransactionGrid'

import TransactionFilter from '@/hooks/dashboard/super-admins/transaction/paid/content/TransactionFilter'

import TransactionHeader from '@/hooks/dashboard/super-admins/transaction/paid/content/Transactionheader'

import TransactionModal from '@/hooks/dashboard/super-admins/transaction/paid/content/modal/TransactionModal'

import { Pagination } from '@/base/helper/Pagination'

import { useModal } from '@/base/helper/useModal'

export default function TransactionPaidLayout() {
    const [successTransactions, setSuccessTransactions] = useState<Transaction[]>([]);
    const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Filter states
    const [dateRange, setDateRange] = useState({
        startDate: '',
        endDate: ''
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [isFilterVisible, setIsFilterVisible] = useState(false);

    // Pagination states
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 9;

    useEffect(() => {
        const fetchSuccessTransactions = async () => {
            try {
                const transactionRef = collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTIONS as string);
                const q = query(transactionRef);
                const querySnapshot = await getDocs(q);

                const transactions = querySnapshot.docs
                    .map(doc => ({
                        ...doc.data()
                    })) as Transaction[];

                const successTransactions = transactions.filter(
                    transaction => transaction.paymentDetails?.transaction_status === 'settlement'
                );

                const sortedTransactions = successTransactions.sort((a, b) =>
                    b.createdAt.toMillis() - a.createdAt.toMillis()
                );

                setSuccessTransactions(sortedTransactions);
                setFilteredTransactions(sortedTransactions);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching success transactions:', error);
            }
        };

        fetchSuccessTransactions();
    }, []);

    useEffect(() => {
        let filtered = [...successTransactions];

        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(transaction =>
                transaction.projectTitle.toLowerCase().includes(query) ||
                transaction.orderId.toLowerCase().includes(query)
            );
        }

        if (dateRange.startDate && dateRange.endDate) {
            const start = new Date(dateRange.startDate).getTime();
            const end = new Date(dateRange.endDate).getTime();
            filtered = filtered.filter(transaction => {
                const txDate = transaction.createdAt.toDate().getTime();
                return txDate >= start && txDate <= end;
            });
        }

        if (selectedStatus !== 'all') {
            filtered = filtered.filter(transaction =>
                transaction.deliveryMethod === selectedStatus
            );
        }

        setFilteredTransactions(filtered);
    }, [successTransactions, searchQuery, dateRange, selectedStatus]);

    useModal({
        isOpen: isModalOpen,
        onClose: () => setIsModalOpen(false)
    });

    const paginatedTransactions = filteredTransactions.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    if (isLoading) {
        return <TransactionPaidSkeleton />;
    }

    return (
        <section className='min-h-full px-0 sm:px-4'>
            <TransactionHeader
                isFilterVisible={isFilterVisible}
                setIsFilterVisible={setIsFilterVisible}
            />

            <TransactionFilter
                isFilterVisible={isFilterVisible}
                dateRange={dateRange}
                setDateRange={setDateRange}
                searchQuery={searchQuery}
                setSearchQuery={setSearchQuery}
                selectedStatus={selectedStatus}
                setSelectedStatus={setSelectedStatus}
            />

            <TransactionGrid
                transactions={paginatedTransactions}
                onTransactionClick={(transaction) => {
                    setSelectedTransaction(transaction);
                    setIsModalOpen(true);
                }}
            />

            {filteredTransactions.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={totalPages}
                    onPageChange={handlePageChange}
                />
            )}

            <TransactionModal
                isOpen={isModalOpen}
                transaction={selectedTransaction}
                onClose={() => setIsModalOpen(false)}
            />
        </section>
    )
}