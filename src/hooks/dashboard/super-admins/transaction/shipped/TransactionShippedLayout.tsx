"use client"

import React, { useEffect, useState } from 'react'

import { useRouter } from 'next/navigation'

import { collection, getDocs, query, doc, updateDoc, serverTimestamp } from 'firebase/firestore'

import { db } from '@/utils/firebase'

import Image from 'next/image'

import { Transaction } from '@/hooks/dashboard/super-admins/transaction/paid/lib/paid'

import TransactionPaidSkeleton from '@/hooks/dashboard/super-admins/transaction/paid/TransactionPaidSkelaton'

import { Pagination } from '@/base/helper/Pagination'

import { toast } from 'react-hot-toast'

import EmptyShippedTransaction from "@/hooks/dashboard/super-admins/transaction/shipped/content/empety"

import { useModal } from '@/base/helper/useModal'

import SearchBar from "@/hooks/dashboard/super-admins/transaction/shipped/content/SearchStatusDelivery"

export default function TransactionShippedLayout() {
    const [successTransactions, setSuccessTransactions] = useState<Transaction[]>([]);
    const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    const [dateRange, setDateRange] = useState({
        startDate: '',
        endDate: ''
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [isFilterVisible, setIsFilterVisible] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [isUpdating, setIsUpdating] = useState(false);
    const itemsPerPage = 9;

    const router = useRouter();

    useModal({
        isOpen: isModalOpen,
        onClose: () => setIsModalOpen(false)
    });

    useEffect(() => {
        const fetchShippedTransactions = async () => {
            try {
                const transactionRef = collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTIONS as string);
                const q = query(transactionRef);
                const querySnapshot = await getDocs(q);

                const transactions = querySnapshot.docs
                    .map(doc => ({
                        ...doc.data()
                    })) as Transaction[];

                const shippedTransactions = transactions.filter(
                    transaction =>
                        transaction.paymentDetails?.transaction_status === 'settlement' &&
                        transaction.statusDelivery === 'pending'
                );

                const sortedTransactions = shippedTransactions.sort((a, b) =>
                    b.createdAt.toMillis() - a.createdAt.toMillis()
                );

                setSuccessTransactions(sortedTransactions);
                setFilteredTransactions(sortedTransactions);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching shipped transactions:', error);
            }
        };

        fetchShippedTransactions();
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
                transaction.statusDelivery === selectedStatus
            );
        }

        setFilteredTransactions(filtered);
    }, [successTransactions, searchQuery, dateRange, selectedStatus]);

    const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            setIsModalOpen(false);
        }
    };

    const paginatedTransactions = filteredTransactions.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage);

    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const handleStatusUpdate = async (newStatus: string) => {
        if (!selectedTransaction) return;

        setIsUpdating(true);
        try {
            const transactionRef = doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTIONS as string, selectedTransaction.orderId);

            if (newStatus === 'completed') {
                let timeLeft = 10;
                const toastId = toast.loading(`Moving to completed transactions in ${timeLeft} seconds...`);

                // Create interval to update the countdown
                const interval = setInterval(() => {
                    timeLeft -= 1;
                    toast.loading(`Moving to completed transactions in ${timeLeft} seconds...`, {
                        id: toastId,
                    });
                }, 1000);

                // Set a timeout for 10 seconds
                setTimeout(async () => {
                    clearInterval(interval); // Clear the interval
                    try {
                        // Just update the status in the current collection
                        await updateDoc(transactionRef, {
                            statusDelivery: newStatus,
                            updatedAt: serverTimestamp()
                        });

                        // Update local state to remove the transaction from view
                        setSuccessTransactions(prev => prev.filter(tx => tx.orderId !== selectedTransaction.orderId));
                        setIsModalOpen(false);

                        // Show success message
                        toast.success('Transaction moved to completed successfully!', {
                            id: toastId,
                        });

                        // Redirect to completed transactions page
                        router.push('/dashboard/super-admins/transaction/completed');
                    } catch (error) {
                        console.error('Error updating transaction:', error);
                        toast.error('Failed to move transaction to completed', {
                            id: toastId,
                        });
                    }
                }, 10000); // 10 seconds delay
            } else {
                // For other status updates, just update the document
                await updateDoc(transactionRef, {
                    statusDelivery: newStatus,
                    updatedAt: serverTimestamp()
                });

                setSuccessTransactions(prev => prev.map(tx =>
                    tx.orderId === selectedTransaction.orderId
                        ? { ...tx, statusDelivery: newStatus }
                        : tx
                ));

                setSelectedTransaction(prev => prev ? { ...prev, statusDelivery: newStatus } : null);
                toast.success('Status updated successfully!');
            }
        } catch (error) {
            console.error('Error updating status:', error);
            toast.error('Failed to update status');
        } finally {
            setIsUpdating(false);
        }
    };

    if (isLoading) {
        return <TransactionPaidSkeleton />;
    }

    return (
        <section className='min-h-full px-0 sm:px-4'>
            {successTransactions.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                        <div className="space-y-1">
                            <h1 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'>
                                Transaksi yang Dikirim
                            </h1>
                            <p className='text-gray-500'>Kelola dan urutkan transaksi yang sedang dikirim</p>
                        </div>

                        <button
                            onClick={() => setIsFilterVisible(!isFilterVisible)}
                            className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-indigo-100 hover:shadow-lg transform hover:-translate-y-0.5"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                            </svg>
                            Filter
                        </button>
                    </div>

                    {/* Collapsible Filter Section */}
                    <div className={`overflow-hidden transition-all duration-300 ease-in-out ${isFilterVisible ? 'max-h-[500px] opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
                        <div className="space-y-6 border-t border-gray-100 pt-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                                {/* Status Filter */}
                                <div className="space-y-3">
                                    <label className="text-gray-700 font-semibold flex items-center gap-2">
                                        <span className="h-1.5 w-1.5 bg-indigo-600 rounded-full"></span>
                                        Delivery Status
                                    </label>
                                    <div className="flex flex-wrap gap-2">
                                        {[
                                            { id: 'pending', icon: '🕒', label: 'Pending' },
                                            { id: 'processing', icon: '⚙️', label: 'Processing' },
                                            { id: 'shipping', icon: '🚚', label: 'Shipping' },
                                            { id: 'delivered', icon: '📦', label: 'Delivered' },
                                            { id: 'completed', icon: '✅', label: 'Completed' }
                                        ].map(({ id, icon, label }) => (
                                            <div
                                                key={id}
                                                onClick={() => setSelectedStatus(selectedStatus === id ? 'all' : id)}
                                                className={`cursor-pointer px-4 py-2.5 rounded-2xl border-2 transition-all duration-300 flex items-center gap-2 flex-1 min-w-[120px]
                                                    ${selectedStatus === id
                                                        ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-700 shadow-sm shadow-indigo-100'
                                                        : 'bg-white/50 border-transparent hover:border-gray-200 text-gray-600 hover:bg-gray-50/50'
                                                    }`}
                                            >
                                                <span className="text-xl">{icon}</span>
                                                <span className="font-medium">{label}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                {/* Date Range */}
                                <div className="space-y-3">
                                    <label className="text-gray-700 font-semibold flex items-center gap-2">
                                        <span className="h-1.5 w-1.5 bg-indigo-600 rounded-full"></span>
                                        Date Range
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <div className="bg-white/50 border-2 border-transparent hover:border-gray-200 rounded-2xl p-2 transition-all duration-300">
                                            <input
                                                type="date"
                                                value={dateRange.startDate}
                                                onChange={(e) => setDateRange(prev => ({ ...prev, startDate: e.target.value }))}
                                                className="w-full px-2 py-1 bg-transparent focus:outline-none"
                                            />
                                        </div>
                                        <div className="bg-white/50 border-2 border-transparent hover:border-gray-200 rounded-2xl p-2 transition-all duration-300">
                                            <input
                                                type="date"
                                                value={dateRange.endDate}
                                                onChange={(e) => setDateRange(prev => ({ ...prev, endDate: e.target.value }))}
                                                className="w-full px-2 py-1 bg-transparent focus:outline-none"
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Search */}
                                <div className="space-y-3">
                                    <label className="text-gray-700 font-semibold flex items-center gap-2">
                                        <span className="h-1.5 w-1.5 bg-indigo-600 rounded-full"></span>
                                        Search
                                    </label>
                                    <SearchBar
                                        value={searchQuery}
                                        onChange={setSearchQuery}
                                        placeholder="Search by project title or order ID..."
                                    />
                                </div>
                            </div>

                            {/* Filter Actions */}
                            <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
                                <button
                                    onClick={() => {
                                        setSearchQuery('');
                                        setDateRange({ startDate: '', endDate: '' });
                                        setSelectedStatus('all');
                                    }}
                                    className="px-6 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 flex items-center gap-2 font-medium"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                    Reset Filter
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Content Section */}
            {successTransactions.length === 0 ? (
                <EmptyShippedTransaction />
            ) : filteredTransactions.length === 0 ? (
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                    {selectedStatus !== 'all' ? (
                        <div className="text-center space-y-4">
                            <div className="w-20 h-20 mx-auto bg-indigo-50 rounded-full flex items-center justify-center">
                                <svg className="w-10 h-10 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">
                                No {selectedStatus} Delivery
                            </h3>
                            <p className="text-gray-500 max-w-sm mx-auto">
                                There are currently no transactions with status &quot;{selectedStatus}&quot;.
                                Try selecting a different status or check back later.
                            </p>
                            <button
                                onClick={() => setSelectedStatus('all')}
                                className="inline-flex items-center px-6 py-3 bg-gradient-to-r 
                                         from-indigo-600 to-indigo-700 hover:from-indigo-700 
                                         hover:to-indigo-800 text-white rounded-xl transition-all 
                                         duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
                            >
                                View All Transactions
                            </button>
                        </div>
                    ) : searchQuery ? (
                        <div className="text-center space-y-4">
                            <div className="w-20 h-20 mx-auto bg-gray-50 rounded-full flex items-center justify-center">
                                <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">
                                No Results Found
                            </h3>
                            <p className="text-gray-500 max-w-sm mx-auto">
                                No transactions match your search &quot;<span className="font-medium">{searchQuery}</span>&quot;.
                                Try adjusting your search terms.
                            </p>
                            <button
                                onClick={() => setSearchQuery('')}
                                className="inline-flex items-center px-6 py-3 bg-gradient-to-r 
                                         from-indigo-600 to-indigo-700 hover:from-indigo-700 
                                         hover:to-indigo-800 text-white rounded-xl transition-all 
                                         duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
                            >
                                Clear Search
                            </button>
                        </div>
                    ) : dateRange.startDate || dateRange.endDate ? (
                        <div className="text-center space-y-4">
                            <div className="w-20 h-20 mx-auto bg-gray-50 rounded-full flex items-center justify-center">
                                <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                    />
                                </svg>
                            </div>
                            <h3 className="text-xl font-semibold text-gray-900">
                                No Transactions in Date Range
                            </h3>
                            <p className="text-gray-500 max-w-sm mx-auto">
                                No transactions found between the selected dates.
                                Try selecting a different date range.
                            </p>
                            <button
                                onClick={() => setDateRange({ startDate: '', endDate: '' })}
                                className="inline-flex items-center px-6 py-3 bg-gradient-to-r 
                                         from-indigo-600 to-indigo-700 hover:from-indigo-700 
                                         hover:to-indigo-800 text-white rounded-xl transition-all 
                                         duration-300 transform hover:-translate-y-0.5 hover:shadow-lg"
                            >
                                Reset Date Range
                            </button>
                        </div>
                    ) : null}
                </div>
            ) : (
                <>
                    {/* Transaction Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {paginatedTransactions.map((transaction, index) => (
                            <div key={index} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
                                {/* Image Container */}
                                <div className="relative h-48 w-full">
                                    <Image
                                        src={transaction.imageUrl}
                                        alt={transaction.projectTitle}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                    />
                                </div>

                                {/* Content Container */}
                                <div className="p-5">
                                    {/* Header */}
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

                                    {/* Info Grid */}
                                    <div className="space-y-3">
                                        {/* User Info */}
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
                                                {transaction.paymentDetails.transaction_time}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Action Button */}
                                    <button
                                        onClick={() => {
                                            setSelectedTransaction(transaction);
                                            setIsModalOpen(true);
                                        }}
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

                    {/* Add Pagination Component */}
                    <div className="mt-6">
                        <Pagination
                            currentPage={currentPage}
                            totalPages={totalPages}
                            onPageChange={handlePageChange}
                        />
                    </div>
                </>
            )}

            {/* Transaction Details Modal */}
            {isModalOpen && selectedTransaction && (
                <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 z-50" onClick={handleClickOutside}>
                    <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden">
                        {/* Modal Header */}
                        <div className="p-6 border-b border-gray-100">
                            <div className="flex justify-between items-center">
                                <h2 className="text-2xl font-bold text-gray-900">Transaction Details</h2>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                            {/* Project Information */}
                            <div className="space-y-6">
                                <div className="relative w-full h-64 rounded-xl overflow-hidden">
                                    <Image
                                        src={selectedTransaction.imageUrl}
                                        alt={selectedTransaction.projectTitle}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 1024px) 100vw, 1024px"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">Project Details</h3>
                                        <div className="space-y-4">
                                            <div className="bg-gray-50 p-4 rounded-xl">
                                                <p className="text-sm text-gray-500">Project Title</p>
                                                <p className="font-medium">{selectedTransaction.projectTitle}</p>
                                            </div>
                                            <div className="bg-gray-50 p-4 rounded-xl">
                                                <p className="text-sm text-gray-500">Order ID</p>
                                                <p className="font-mono font-medium">{selectedTransaction.orderId}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-semibold mb-4">Delivery Status</h3>
                                        <div className="bg-gray-50 p-4 rounded-xl">
                                            <p className="text-sm text-gray-500 mb-2">Current Status</p>
                                            <select
                                                value={selectedTransaction.statusDelivery}
                                                onChange={(e) => handleStatusUpdate(e.target.value)}
                                                disabled={isUpdating}
                                                className="w-full p-2 border rounded-lg"
                                            >
                                                <option value="pending">🕒 Pending</option>
                                                <option value="processing">⚙️ Processing</option>
                                                <option value="shipping">🚚 Shipping</option>
                                                <option value="delivered">📦 Delivered</option>
                                                <option value="completed">✅ Completed</option>
                                                <option value="cancelled">❌ Cancelled</option>
                                            </select>
                                            {isUpdating && (
                                                <div className="mt-2 text-sm text-indigo-600">
                                                    Updating status...
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                {/* User Information */}
                                <div>
                                    <h3 className="text-lg font-semibold mb-4">Customer Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-gray-50 p-4 rounded-xl">
                                            <div className="flex items-center gap-4">
                                                <div className="w-12 h-12 relative rounded-full overflow-hidden">
                                                    {selectedTransaction.userPhotoURL ? (
                                                        <Image
                                                            src={selectedTransaction.userPhotoURL}
                                                            alt={selectedTransaction.userName}
                                                            fill
                                                            className="object-cover"
                                                            sizes="48px"
                                                        />
                                                    ) : (
                                                        <div className="w-full h-full bg-indigo-100 flex items-center justify-center">
                                                            <svg className="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                            </svg>
                                                        </div>
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-medium">{selectedTransaction.userName}</p>
                                                    <p className="text-sm text-gray-500">{selectedTransaction.userEmail}</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-xl">
                                            <p className="text-sm text-gray-500">User ID</p>
                                            <p className="font-mono font-medium">{selectedTransaction.userId}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Payment Information */}
                                <div className="mt-6">
                                    <h3 className="text-lg font-semibold mb-4">Payment Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-gray-50 p-4 rounded-xl">
                                            <p className="text-sm text-gray-500">Amount</p>
                                            <p className="font-medium">Rp {selectedTransaction.amount.toLocaleString('id-ID')}</p>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-xl">
                                            <p className="text-sm text-gray-500">Payment Method</p>
                                            <p className="font-medium">{selectedTransaction.paymentMethod}</p>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-xl">
                                            <p className="text-sm text-gray-500">Transaction Status</p>
                                            <p className="font-medium">{selectedTransaction.paymentDetails.transaction_status}</p>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-xl">
                                            <p className="text-sm text-gray-500">Transaction Time</p>
                                            <p className="font-medium">{selectedTransaction.paymentDetails.transaction_time}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Delivery Information */}
                                {selectedTransaction.deliveryAddress && (
                                    <div className="mt-6">
                                        <h3 className="text-lg font-semibold mb-4">Delivery Information</h3>
                                        <div className="space-y-4">
                                            <div className="bg-gray-50 p-4 rounded-xl">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                                                        <svg className="w-6 h-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p className="font-medium">{selectedTransaction.deliveryAddress.fullName}</p>
                                                        <p className="text-sm text-gray-500">{selectedTransaction.deliveryAddress.phone}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                <div className="bg-gray-50 p-4 rounded-xl">
                                                    <p className="text-sm text-gray-500">Street Address</p>
                                                    <p className="font-medium">{selectedTransaction.deliveryAddress.streetAddress}</p>
                                                </div>
                                                <div className="bg-gray-50 p-4 rounded-xl">
                                                    <p className="text-sm text-gray-500">City</p>
                                                    <p className="font-medium">{selectedTransaction.deliveryAddress.city}</p>
                                                </div>
                                                <div className="bg-gray-50 p-4 rounded-xl">
                                                    <p className="text-sm text-gray-500">Province</p>
                                                    <p className="font-medium">{selectedTransaction.deliveryAddress.province}</p>
                                                </div>
                                                <div className="bg-gray-50 p-4 rounded-xl">
                                                    <p className="text-sm text-gray-500">Postal Code</p>
                                                    <p className="font-medium">{selectedTransaction.deliveryAddress.postalCode}</p>
                                                </div>
                                            </div>

                                            {selectedTransaction.deliveryAddress.details && (
                                                <div className="bg-gray-50 p-4 rounded-xl">
                                                    <p className="text-sm text-gray-500">Additional Details</p>
                                                    <p className="font-medium">{selectedTransaction.deliveryAddress.details}</p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                )}

                                {/* Timestamps */}
                                <div className="mt-6">
                                    <h3 className="text-lg font-semibold mb-4">Timestamps</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="bg-gray-50 p-4 rounded-xl">
                                            <p className="text-sm text-gray-500">Created At</p>
                                            <p className="font-medium">
                                                {selectedTransaction.createdAt.toDate().toLocaleString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>
                                        <div className="bg-gray-50 p-4 rounded-xl">
                                            <p className="text-sm text-gray-500">Updated At</p>
                                            <p className="font-medium">
                                                {selectedTransaction.updatedAt.toDate().toLocaleString('id-ID', {
                                                    day: 'numeric',
                                                    month: 'long',
                                                    year: 'numeric',
                                                    hour: '2-digit',
                                                    minute: '2-digit'
                                                })}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
