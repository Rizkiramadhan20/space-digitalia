'use client'

import React, { useEffect, useState } from 'react'

import { collection, query, where, Timestamp, doc, updateDoc, onSnapshot } from 'firebase/firestore'

import { db } from '@/utils/firebase'

import Image from 'next/image'

interface Transaction {
    id: string;
    amount: number;
    createdAt: Timestamp;
    deliveryAddress: null | string;
    deliveryMethod: string;
    imageUrl: string;
    licenseType: string;
    linkTransaction: string;
    orderId: string;
    paymentMethod: string;
    projectId: string;
    projectTitle: string;
    status: string;
    statusDelivery: null | string;
    updatedAt: Timestamp;
    userEmail: string;
    userId: string;
    userName: string;
    paymentDetails: {
        bca_va_number: string;
        finish_redirect_url: string;
        fraud_status: string;
        gross_amount: string;
        order_id: string;
        payment_type: string;
        pdf_url: string;
        status_code: string;
        status_message: string;
        transaction_id: string;
        transaction_status: string;
        transaction_time: string;
        va_numbers: Array<{
            bank: string;
            va_number: string;
        }>;
    };
    downloadUrl: string;
    paymentToken: string;
    redirectUrl: string;
    transactionId: string;
}

// Add this script to your HTML head or import it in your _app.tsx
declare global {
    interface Window {
        snap: {
            pay: (token: string, options: {
                onSuccess: (result: MidtransResult) => void;
                onPending: (result: MidtransResult) => void;
                onError: (result: MidtransResult) => void;
                onClose: () => void;
            }) => void;
        };
    }
}

export default function TransactionUnpaidLayout() {
    const [pendingTransactions, setPendingTransactions] = useState<Transaction[]>([]);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Listen for pending transactions
    useEffect(() => {
        const transactionRef = collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTIONS as string);

        // Create query with const since it's never reassigned
        const q = query(
            transactionRef,
            where('status', '==', 'pending')
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            try {
                const transactions = snapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Transaction[];

                // Sort transactions by createdAt in descending order
                const sortedTransactions = transactions.sort((a, b) =>
                    b.createdAt.toMillis() - a.createdAt.toMillis()
                );

                setPendingTransactions(sortedTransactions);
            } catch (error) {
                console.error('Error in transaction listener:', error);
            }
        });

        return () => unsubscribe();
    }, []); // Remove dependency since we're not filtering by user anymore

    // Update the selected transaction when its data changes
    useEffect(() => {
        if (!selectedTransaction) return;

        const transactionRef = doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTIONS as string, selectedTransaction.id);
        const unsubscribe = onSnapshot(transactionRef, (doc) => {
            if (doc.exists()) {
                const updatedTransaction = {
                    id: doc.id,
                    ...doc.data()
                } as Transaction;

                setSelectedTransaction(updatedTransaction);

                // If transaction is no longer pending, close modal and update list
                if (updatedTransaction.status !== 'pending') {
                    setIsModalOpen(false);
                    setPendingTransactions(prev => prev.filter(t => t.id !== updatedTransaction.id));
                }
            }
        });

        return () => unsubscribe();
    }, [selectedTransaction]);

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

    // Add this new function to handle cancellation
    const handleCancelTransaction = async (transactionId: string) => {
        if (!window.confirm('Are you sure you want to cancel this transaction?')) {
            return;
        }

        setIsLoading(true);
        try {
            const transactionRef = doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTIONS as string, transactionId);
            await updateDoc(transactionRef, {
                status: 'cancelled',
                updatedAt: Timestamp.now()
            });

            // Update local state
            setPendingTransactions(prev => prev.filter(t => t.id !== transactionId));
            setIsModalOpen(false);
            setSelectedTransaction(null);

            // You might want to add a toast notification here
            alert('Transaction cancelled successfully');
        } catch (error) {
            console.error('Error cancelling transaction:', error);
            alert('Failed to cancel transaction');
        } finally {
            setIsLoading(false);
        }
    };

    const updateTransactionStatus = async (transactionId: string, result: MidtransResult) => {
        try {
            // Tentukan status berdasarkan transaction_status dari Midtrans
            let status = 'pending';
            if (result.transaction_status === 'settlement' || result.transaction_status === 'capture') {
                status = 'success';
            } else if (result.transaction_status === 'deny' || result.transaction_status === 'cancel' || result.transaction_status === 'expire') {
                status = 'failed';
            }

            const transactionRef = doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTIONS as string, transactionId);
            await updateDoc(transactionRef, {
                status: status, // Menggunakan status yang sudah ditentukan
                updatedAt: Timestamp.now(),
                paymentDetails: {
                    status_code: result.status_code,
                    status_message: result.status_message,
                    transaction_status: result.transaction_status,
                    transaction_id: result.transaction_id,
                    transaction_time: result.transaction_time,
                    payment_type: result.payment_type,
                    gross_amount: result.gross_amount,
                    fraud_status: result.fraud_status,
                    va_numbers: result.va_numbers
                }
            });
        } catch (error) {
            console.error('Error updating transaction:', error);
        }
    };

    const handleContinuePayment = (transaction: Transaction) => {
        if (!transaction.paymentToken) {
            alert('Payment token not found');
            return;
        }

        const snapScript = "https://app.sandbox.midtrans.com/snap/snap.js";
        const clientKey = process.env.NEXT_PUBLIC_MIDTRANS_CLIENT_KEY;

        const myMidtransClientKey = clientKey;

        const script = document.createElement('script');
        script.src = snapScript;
        script.setAttribute('data-client-key', myMidtransClientKey || '');
        script.onload = () => {
            // Set up a listener for this specific transaction
            const transactionRef = doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTIONS as string, transaction.id);
            const unsubscribe = onSnapshot(transactionRef, (doc) => {
                if (doc.exists()) {
                    const updatedTransaction = {
                        id: doc.id,
                        ...doc.data()
                    } as Transaction;

                    if (updatedTransaction.status !== 'pending') {
                        setIsModalOpen(false);
                        setPendingTransactions(prev => prev.filter(t => t.id !== transaction.id));
                        unsubscribe();
                    }
                }
            });

            // Open Snap popup with proper typing
            window.snap.pay(transaction.paymentToken, {
                onSuccess: async function (result: MidtransResult) {
                    console.log('success', result);
                    await updateTransactionStatus(transaction.id, result);
                    setIsModalOpen(false);
                },
                onPending: async function (result: MidtransResult) {
                    console.log('pending', result);
                    await updateTransactionStatus(transaction.id, result);
                },
                onError: async function (result: MidtransResult) {
                    console.log('error', result);
                    await updateTransactionStatus(transaction.id, result);
                    alert('Payment failed. Please try again.');
                },
                onClose: function () {
                    console.log('customer closed the popup without finishing the payment');
                }
            });
        };
        document.body.appendChild(script);
    };

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
                    <div key={transaction.id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
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
                                <span className="inline-flex px-3 py-1 text-xs font-medium rounded-full bg-yellow-50 text-yellow-700 border border-yellow-200">
                                    {transaction.status}
                                </span>
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

                            {/* Action Button - Only View Details */}
                            <button
                                onClick={() => {
                                    setSelectedTransaction(transaction);
                                    setIsModalOpen(true);
                                }}
                                className="w-full mt-2 px-4 py-2.5 bg-indigo-600 hover:bg-indigo-700 
                                           text-white rounded-xl transition-all duration-200 flex items-center 
                                           justify-center gap-2 font-medium"
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
                <div
                    className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
                    onClick={handleClickOutside}
                >
                    <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl">
                        {/* Modal Header */}
                        <div className="p-6 border-b border-gray-100">
                            <div className="flex justify-between items-center">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900">
                                        Transaction Details
                                    </h2>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-sm text-gray-500">Order ID:</span>
                                        <span className="text-sm font-medium text-gray-700">{selectedTransaction.orderId}</span>
                                    </div>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-all"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Modal Content */}
                        <div className="p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
                            {/* Project Overview Card */}
                            <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                                <div className="flex gap-6 p-4">
                                    <div className="relative w-40 h-40 rounded-lg overflow-hidden">
                                        <Image
                                            src={selectedTransaction.imageUrl}
                                            alt={selectedTransaction.projectTitle}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="text-xl font-semibold text-gray-900 mb-3">
                                            {selectedTransaction.projectTitle}
                                        </h3>
                                        <div className="flex gap-6">
                                            <div>
                                                <span className="text-sm text-gray-500 block mb-1">Amount</span>
                                                <span className="text-lg font-semibold text-green-600">
                                                    Rp {selectedTransaction.amount.toLocaleString('id-ID')}
                                                </span>
                                            </div>
                                            <div>
                                                <span className="text-sm text-gray-500 block mb-1">Status</span>
                                                <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full
                                                    ${selectedTransaction.status === 'success' ? 'bg-green-100 text-green-700' :
                                                        selectedTransaction.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                            'bg-red-100 text-red-700'}`}>
                                                    {selectedTransaction.status.toUpperCase()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Info Grid */}
                            <div className="grid grid-cols-2 gap-6 mt-6">
                                {/* Basic Information */}
                                <div className="bg-gray-50 rounded-xl p-6">
                                    <h4 className="text-base font-semibold text-gray-900 mb-4">Basic Information</h4>
                                    <dl className="space-y-4">
                                        <div className="flex justify-between">
                                            <dt className="text-sm text-gray-600">Project ID</dt>
                                            <dd className="text-sm font-medium text-gray-900">{selectedTransaction.projectId}</dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt className="text-sm text-gray-600">License Type</dt>
                                            <dd className="text-sm font-medium text-gray-900">{selectedTransaction.licenseType}</dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt className="text-sm text-gray-600">Delivery Method</dt>
                                            <dd className="text-sm font-medium text-gray-900">{selectedTransaction.deliveryMethod}</dd>
                                        </div>
                                    </dl>
                                </div>

                                {/* User Information */}
                                <div className="bg-gray-50 rounded-xl p-6">
                                    <h4 className="text-base font-semibold text-gray-900 mb-4">User Information</h4>
                                    <dl className="space-y-4">
                                        <div className="flex justify-between">
                                            <dt className="text-sm text-gray-600">Name</dt>
                                            <dd className="text-sm font-medium text-gray-900">{selectedTransaction.userName}</dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt className="text-sm text-gray-600">Email</dt>
                                            <dd className="text-sm font-medium text-gray-900">{selectedTransaction.userEmail}</dd>
                                        </div>
                                        <div className="flex justify-between">
                                            <dt className="text-sm text-gray-600">User ID</dt>
                                            <dd className="text-sm font-medium text-gray-900">{selectedTransaction.userId}</dd>
                                        </div>
                                    </dl>
                                </div>
                            </div>

                            {/* URLs and Links */}
                            <div className="mt-6 pt-4 border-t border-gray-200">
                                <h4 className="text-base font-semibold text-gray-900 mb-4">URLs & Links</h4>
                                <div className="space-y-3">
                                    <a href={selectedTransaction.linkTransaction} target="_blank" rel="noopener noreferrer" className="block py-2 text-indigo-600 hover:text-indigo-700">
                                        Transaction Link ↗
                                    </a>
                                </div>
                            </div>

                            {/* Timestamps */}
                            <div className="mt-6 pt-4 border-t border-gray-200">
                                <div className="flex justify-between text-sm">
                                    <div>
                                        <span className="text-gray-500">Created:</span>
                                        <span className="ml-2 text-gray-900">{selectedTransaction.createdAt.toDate().toLocaleString('id-ID')}</span>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Updated:</span>
                                        <span className="ml-2 text-gray-900">{selectedTransaction.updatedAt.toDate().toLocaleString('id-ID')}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Modal action buttons */}
                            <div className="mt-6 pt-4 border-t border-gray-200">
                                <div className="flex gap-4">
                                    <button
                                        onClick={() => handleContinuePayment(selectedTransaction)}
                                        className="flex-1 px-4 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl transition-all duration-200 flex items-center justify-center gap-2"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                        Continue Payment
                                    </button>

                                    <button
                                        onClick={() => handleCancelTransaction(selectedTransaction.id)}
                                        disabled={isLoading}
                                        className="flex-1 px-4 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        {isLoading ? (
                                            <span>Processing...</span>
                                        ) : (
                                            <>
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                                </svg>
                                                Cancel Transaction
                                            </>
                                        )}
                                    </button>
                                </div>
                            </div>

                            {/* Add this section in the modal content, after the basic information cards */}
                            <div className="mt-6 bg-gray-50 rounded-xl p-6">
                                <h4 className="text-base font-semibold text-gray-900 mb-4">Payment Details</h4>
                                <div className="space-y-4">
                                    {selectedTransaction.paymentDetails.payment_type === 'bank_transfer' && (
                                        <div className="bg-white p-4 rounded-lg border border-gray-200">
                                            <h5 className="font-medium text-gray-900 mb-3">Bank Transfer Details</h5>
                                            {selectedTransaction.paymentDetails.va_numbers.map((va, index) => (
                                                <div key={index} className="space-y-2">
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-gray-600">Bank</span>
                                                        <span className="font-medium text-gray-900 uppercase">{va.bank}</span>
                                                    </div>
                                                    <div className="flex justify-between items-center">
                                                        <span className="text-gray-600">VA Number</span>
                                                        <div className="flex items-center gap-2">
                                                            <span className="font-medium text-gray-900">{va.va_number}</span>
                                                            <button
                                                                onClick={() => navigator.clipboard.writeText(va.va_number)}
                                                                className="p-1 hover:bg-gray-100 rounded"
                                                                title="Copy VA Number"
                                                            >
                                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                                                </svg>
                                                            </button>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <div className="mt-3 pt-3 border-t border-gray-100">
                                                <div className="flex justify-between items-center">
                                                    <span className="text-gray-600">Total Amount</span>
                                                    <span className="font-medium text-gray-900">
                                                        Rp {parseFloat(selectedTransaction.paymentDetails.gross_amount).toLocaleString('id-ID')}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    <div className="flex flex-col gap-3">
                                        <a
                                            href={selectedTransaction.paymentDetails.pdf_url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                            </svg>
                                            Download Payment Instructions
                                        </a>
                                    </div>

                                    <div className="bg-yellow-50 border border-yellow-100 rounded-lg p-4">
                                        <div className="flex items-start gap-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-600 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <div>
                                                <p className="text-sm font-medium text-yellow-800">Payment Status</p>
                                                <p className="text-sm text-yellow-700 mt-1">{selectedTransaction.paymentDetails.status_message}</p>
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