'use client'

import React, { useEffect, useState } from 'react'

import { collection, getDocs, query } from 'firebase/firestore'

import { db } from '@/utils/firebase'

import Image from 'next/image'

import { Transaction } from '@/hooks/dashboard/super-admins/transaction/paid/lib/paid'

export default function TransactionPaidLayout() {
    const [successTransactions, setSuccessTransactions] = useState<Transaction[]>([]);
    const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([]);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Filter states
    const [dateRange, setDateRange] = useState({
        startDate: '',
        endDate: ''
    });
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedStatus, setSelectedStatus] = useState('all');
    const [isFilterVisible, setIsFilterVisible] = useState(false);

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

                // Filter transactions where paymentDetails.transaction_status is 'settlement'
                const successTransactions = transactions.filter(
                    transaction => transaction.paymentDetails?.transaction_status === 'settlement'
                );

                // Sort transactions by createdAt in descending order
                const sortedTransactions = successTransactions.sort((a, b) =>
                    b.createdAt.toMillis() - a.createdAt.toMillis()
                );

                setSuccessTransactions(sortedTransactions);
                setFilteredTransactions(sortedTransactions); // Initialize filtered with all transactions
            } catch (error) {
                console.error('Error fetching success transactions:', error);
            }
        };

        fetchSuccessTransactions();
    }, []);

    // Apply filters
    useEffect(() => {
        let filtered = [...successTransactions];

        // Search filter
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            filtered = filtered.filter(transaction =>
                transaction.projectTitle.toLowerCase().includes(query) ||
                transaction.orderId.toLowerCase().includes(query)
            );
        }

        // Date range filter
        if (dateRange.startDate && dateRange.endDate) {
            const start = new Date(dateRange.startDate).getTime();
            const end = new Date(dateRange.endDate).getTime();
            filtered = filtered.filter(transaction => {
                const txDate = transaction.createdAt.toDate().getTime();
                return txDate >= start && txDate <= end;
            });
        }

        // Status filter
        if (selectedStatus !== 'all') {
            filtered = filtered.filter(transaction =>
                transaction.paymentDetails.transaction_status === selectedStatus
            );
        }

        setFilteredTransactions(filtered);
    }, [successTransactions, searchQuery, dateRange, selectedStatus]);

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [isModalOpen]);

    // Handle click outside modal
    const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            setIsModalOpen(false);
        }
    };

    // Handle Esc key press
    useEffect(() => {
        const handleEscKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                setIsModalOpen(false);
            }
        };

        if (isModalOpen) {
            document.addEventListener('keydown', handleEscKey);
        }

        return () => {
            document.removeEventListener('keydown', handleEscKey);
        };
    }, [isModalOpen]);

    return (
        <section className='min-h-full px-0 sm:px-4'>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                        <h1 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'>
                            Paid Transaction
                        </h1>
                        <p className='text-gray-500'>Manage and organize your paid transaction</p>
                    </div>

                    {/* Filter Toggle Button */}
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
                                    Transaction Status
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {[
                                        { id: 'settlement', icon: '✅', label: 'Settlement' },
                                        { id: 'pending', icon: '🕒', label: 'Pending' },
                                        { id: 'cancel', icon: '❌', label: 'Cancelled' }
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
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Search by project title or order ID"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full px-4 py-2.5 bg-white/50 border-2 border-transparent hover:border-gray-200 rounded-2xl focus:outline-none focus:border-indigo-500/20 focus:bg-indigo-50/30 transition-all duration-300"
                                    />
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                                    </svg>
                                </div>
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

            {/* Transaction Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTransactions.map((transaction, index) => (
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

            {isModalOpen && selectedTransaction && (
                <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto" onClick={handleClickOutside}>
                    <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl transform transition-all my-4">
                        {/* Modal Header */}
                        <div className="p-4 sm:p-6 border-b">
                            <div className="flex justify-between items-start sm:items-center gap-4">
                                <div className="space-y-1">
                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Transaction Details</h2>
                                    <p className="text-sm text-gray-500 flex items-center gap-2">
                                        <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                                        Order ID: {selectedTransaction.orderId}
                                    </p>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-1.5 sm:p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-4 sm:p-6 max-h-[calc(100vh-120px)] overflow-y-auto">
                            {/* Project Information Card */}
                            <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                                <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3 text-gray-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                    Project Information
                                </h3>

                                <div className="relative w-full h-40 sm:h-56 mb-4 sm:mb-6 rounded-xl overflow-hidden group">
                                    <Image
                                        src={selectedTransaction.imageUrl}
                                        alt={selectedTransaction.projectTitle}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 700px"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                                    <div className="bg-gray-50 p-3 sm:p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                        <span className="text-sm font-medium text-gray-500 block mb-1">Project Title</span>
                                        <span className="font-semibold text-gray-800">{selectedTransaction.projectTitle}</span>
                                    </div>

                                    <div className="bg-gray-50 p-3 sm:p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                        <span className="text-sm font-medium text-gray-500 block mb-1">Project ID</span>
                                        <span className="font-mono font-semibold text-gray-800">{selectedTransaction.projectId}</span>
                                    </div>

                                    <div className="bg-gray-50 p-3 sm:p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                        <span className="text-sm font-medium text-gray-500 block mb-1">License Type</span>
                                        <span className="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                                            {selectedTransaction.licenseType}
                                        </span>
                                    </div>

                                    <div className="bg-indigo-50 p-3 sm:p-4 rounded-xl hover:bg-indigo-100 transition-colors duration-200">
                                        <span className="text-sm font-medium text-indigo-600 block mb-1">Amount</span>
                                        <span className="font-semibold text-indigo-700">
                                            Rp {selectedTransaction.amount.toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Delivery Information */}
                            <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300 mt-4 sm:mt-6">
                                <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3 text-gray-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                    Delivery Information
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                                    <div className="bg-gray-50 p-3 sm:p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                        <span className="text-sm font-medium text-gray-500 block mb-1">Delivery Method</span>
                                        <span className="font-semibold text-gray-800">{selectedTransaction.deliveryMethod}</span>
                                    </div>
                                    <div className="bg-gray-50 p-3 sm:p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                        <span className="text-sm font-medium text-gray-500 block mb-1">Status Delivery</span>
                                        <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full ${selectedTransaction.statusDelivery === 'completed'
                                            ? 'bg-green-50 text-green-700 border border-green-200'
                                            : selectedTransaction.statusDelivery === 'delivered'
                                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                                : selectedTransaction.statusDelivery === 'shipping'
                                                    ? 'bg-blue-50 text-blue-700 border border-blue-200'
                                                    : selectedTransaction.statusDelivery === 'processing'
                                                        ? 'bg-yellow-50 text-yellow-700 border border-yellow-200'
                                                        : selectedTransaction.statusDelivery === 'pending'
                                                            ? 'bg-orange-50 text-orange-700 border border-orange-200'
                                                            : 'bg-red-50 text-red-700 border border-red-200'
                                            }`}>
                                            {selectedTransaction.statusDelivery?.charAt(0).toUpperCase() +
                                                selectedTransaction.statusDelivery?.slice(1) || 'N/A'}
                                        </span>
                                    </div>
                                </div>

                                {selectedTransaction.deliveryAddress && (
                                    <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-100">
                                        <h4 className="text-base sm:text-md font-semibold mb-4 sm:mb-6 text-gray-700 flex items-center gap-2 sm:gap-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            Delivery Address
                                        </h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                                            <div className="col-span-2 bg-indigo-50 p-3 sm:p-4 rounded-xl">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                    </div>
                                                    <div>
                                                        <p className="font-semibold text-gray-800">{selectedTransaction.deliveryAddress.fullName}</p>
                                                        <p className="text-sm text-gray-600">{selectedTransaction.deliveryAddress.phone}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="col-span-2 space-y-3 sm:space-y-4">
                                                <div className="bg-gray-50 p-3 sm:p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                                    <span className="text-sm font-medium text-gray-500 block mb-1">Street Address</span>
                                                    <span className="font-medium text-gray-800">{selectedTransaction.deliveryAddress.streetAddress}</span>
                                                </div>

                                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
                                                    <div className="bg-gray-50 p-3 sm:p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                                        <span className="text-sm font-medium text-gray-500 block mb-1">City</span>
                                                        <span className="font-medium text-gray-800">{selectedTransaction.deliveryAddress.city}</span>
                                                    </div>
                                                    <div className="bg-gray-50 p-3 sm:p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                                        <span className="text-sm font-medium text-gray-500 block mb-1">Province</span>
                                                        <span className="font-medium text-gray-800">{selectedTransaction.deliveryAddress.province}</span>
                                                    </div>
                                                    <div className="bg-gray-50 p-3 sm:p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                                        <span className="text-sm font-medium text-gray-500 block mb-1">Postal Code</span>
                                                        <span className="font-medium text-gray-800">{selectedTransaction.deliveryAddress.postalCode}</span>
                                                    </div>
                                                </div>

                                                <div className="bg-gray-50 p-3 sm:p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                                    <span className="text-sm font-medium text-gray-500 block mb-1">Additional Details</span>
                                                    <span className="font-medium text-gray-800">{selectedTransaction.deliveryAddress.details}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Payment Details */}
                            <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-lg border border-gray-100 col-span-2 hover:shadow-xl transition-shadow duration-300 mt-4 sm:mt-6">
                                <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3 text-gray-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                    </svg>
                                    Detail Pembayaran
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                                    {/* Left Column */}
                                    <div className="space-y-3 sm:space-y-4">
                                        <div className="bg-gray-50 p-3 sm:p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                            <span className="text-sm font-medium text-gray-500 block mb-1">Metode Pembayaran</span>
                                            <span className="font-semibold text-gray-800">{selectedTransaction.paymentMethod}</span>
                                        </div>
                                        <div className="bg-gray-50 p-3 sm:p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                            <span className="text-sm font-medium text-gray-500 block mb-1">Status Transaksi</span>
                                            <span className={`font-semibold ${selectedTransaction.status === 'success' ? 'text-green-600' :
                                                selectedTransaction.status === 'pending' ? 'text-yellow-600' :
                                                    'text-red-600'
                                                }`}>
                                                {selectedTransaction.status.toUpperCase()}
                                            </span>
                                        </div>
                                        <div className="bg-gray-50 p-3 sm:p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                            <span className="text-sm font-medium text-gray-500 block mb-1">Transaction Time</span>
                                            <span className="font-semibold text-gray-800">
                                                {selectedTransaction.paymentDetails.transaction_time}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Right Column */}
                                    <div className="space-y-3 sm:space-y-4">
                                        <div className="bg-gray-50 p-3 sm:p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                            <span className="text-sm font-medium text-gray-500 block mb-1">Order ID</span>
                                            <span className="font-mono font-semibold text-gray-800">{selectedTransaction.orderId}</span>
                                        </div>
                                        <div className="bg-gray-50 p-3 sm:p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                            <span className="text-sm font-medium text-gray-500 block mb-1">Amount</span>
                                            <span className="font-semibold text-gray-800">Rp {selectedTransaction.amount.toLocaleString()}</span>
                                        </div>
                                        <div className="bg-gray-50 p-3 sm:p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                            <span className="text-sm font-medium text-gray-500 block mb-1">Transaction ID</span>
                                            <span className="font-mono font-semibold text-gray-800">
                                                {selectedTransaction.paymentDetails.transaction_id}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* VA Numbers Section */}
                                {selectedTransaction.paymentDetails.va_numbers && selectedTransaction.paymentDetails.va_numbers.length > 0 && (
                                    <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-100">
                                        <h4 className="text-base sm:text-md font-semibold mb-4 sm:mb-6 text-gray-700">Virtual Account Numbers</h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                                            {selectedTransaction.paymentDetails.va_numbers.map((va, index) => (
                                                <div key={index} className="bg-indigo-50 p-3 sm:p-4 rounded-xl hover:bg-indigo-100 transition-all duration-200">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-sm font-medium text-indigo-600">
                                                            {va.bank.toUpperCase()} Virtual Account
                                                        </span>
                                                        <span className="px-2 py-1 bg-white rounded-lg text-xs font-medium text-indigo-600 border border-indigo-100">
                                                            {va.bank.toUpperCase()}
                                                        </span>
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <span className="font-mono text-lg font-semibold text-gray-800">
                                                            {va.va_number}
                                                        </span>
                                                        <button
                                                            onClick={() => navigator.clipboard.writeText(va.va_number)}
                                                            className="p-2 hover:bg-indigo-100 rounded-lg transition-colors"
                                                            title="Copy VA Number"
                                                        >
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                            </svg>
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* User Information */}
                            <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-lg border border-gray-100 mb-4 sm:mb-6 mt-4 sm:mt-6">
                                <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3">
                                    <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>
                                    User Information
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                                    <div className="bg-gray-50 p-3 sm:p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                        <span className="text-sm font-medium text-gray-500 block mb-1">Name</span>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                            <span className="font-semibold text-gray-800">{selectedTransaction.userName}</span>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-3 sm:p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                        <span className="text-sm font-medium text-gray-500 block mb-1">Email</span>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <span className="font-medium text-gray-800">{selectedTransaction.userEmail}</span>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-3 sm:p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                        <span className="text-sm font-medium text-gray-500 block mb-1">User ID</span>
                                        <div className="flex items-center gap-3">
                                            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                                                </svg>
                                            </div>
                                            <span className="font-mono font-medium text-gray-800">{selectedTransaction.userId}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Timestamps */}
                            <div className="bg-white rounded-2xl p-4 sm:p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
                                <h3 className="text-base sm:text-lg font-semibold mb-4 sm:mb-6 flex items-center gap-2 sm:gap-3 text-gray-800">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    Timestamps
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                                    <div className="bg-gray-50 p-3 sm:p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                                </svg>
                                            </div>
                                            <div>
                                                <span className="text-sm font-medium text-gray-500 block">Created At</span>
                                                <span className="font-medium text-gray-800">
                                                    {selectedTransaction.createdAt.toDate().toLocaleString('id-ID', {
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="bg-gray-50 p-3 sm:p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                </svg>
                                            </div>
                                            <div>
                                                <span className="text-sm font-medium text-gray-500 block">Updated At</span>
                                                <span className="font-medium text-gray-800">
                                                    {selectedTransaction.updatedAt.toDate().toLocaleString('id-ID', {
                                                        day: 'numeric',
                                                        month: 'long',
                                                        year: 'numeric',
                                                        hour: '2-digit',
                                                        minute: '2-digit'
                                                    })}
                                                </span>
                                            </div>
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