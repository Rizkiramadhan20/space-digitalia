'use client'

import React, { useEffect, useState } from 'react'

import { collection, query, where, getDocs, doc, getDoc } from 'firebase/firestore'

import { db } from '@/utils/firebase'

import Image from 'next/image'

import { Transaction } from '@/hooks/dashboard/super-admins/transaction/free/lib/free'

import TransactionFreeSkeleton from '@/hooks/dashboard/super-admins/transaction/free/TransactionFreeSkelaton'

import { Pagination } from '@/base/helper/Pagination'

export default function TransactionFreeLayout() {
    const [pendingTransactions, setPendingTransactions] = useState<Transaction[]>([]);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projectSoldCount, setProjectSoldCount] = useState<number>(0);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(0);
    const itemsPerPage = 9; // 3x3 grid

    // Calculate pagination
    const paginatedTransactions = pendingTransactions.slice(
        currentPage * itemsPerPage,
        (currentPage + 1) * itemsPerPage
    );

    const handlePageChange = (selectedItem: { selected: number }) => {
        setCurrentPage(selectedItem.selected);
        // Scroll to top of the page when changing pages
        window.scrollTo(0, 0);
    };

    useEffect(() => {
        const fetchPendingTransactions = async () => {
            setIsLoading(true);
            try {
                const transactionRef = collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTIONS as string);
                const q = query(
                    transactionRef,
                    where('status', '==', 'success'),
                    where('paymentMethod', '==', 'free')
                );
                const querySnapshot = await getDocs(q);

                const transactions = querySnapshot.docs.map(doc => ({
                    ...doc.data()
                })) as Transaction[];

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

    useEffect(() => {
        const fetchProjectSoldCount = async () => {
            if (selectedTransaction) {
                try {
                    const projectRef = doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_PROJECT as string, selectedTransaction.projectId);
                    const projectSnap = await getDoc(projectRef);

                    if (projectSnap.exists()) {
                        const projectData = projectSnap.data();
                        setProjectSoldCount(projectData.sold || 0);
                    }
                } catch (error) {
                    console.error('Error fetching project sold count:', error);
                    setProjectSoldCount(0);
                }
            }
        };

        fetchProjectSoldCount();
    }, [selectedTransaction]);

    if (isLoading) {
        return <TransactionFreeSkeleton />;
    }

    return (
        <section className='min-h-full px-0 sm:px-4'>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                        <h1 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'>
                            Free Transaction
                        </h1>
                        <p className='text-gray-500'>Manage and organize your free transaction</p>
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
                {paginatedTransactions.map((transaction: Transaction) => (
                    <div key={transaction.orderId} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">
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

            {/* Add Pagination */}
            {pendingTransactions.length > 0 && (
                <Pagination
                    currentPage={currentPage}
                    totalPages={Math.ceil(pendingTransactions.length / itemsPerPage)}
                    onPageChange={handlePageChange}
                />
            )}

            {isModalOpen && selectedTransaction && (
                <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto" onClick={handleClickOutside}>
                    <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl transform transition-all my-4">
                        {/* Modal Header */}
                        <div className="p-4 sm:p-6 border-b">
                            <div className="flex justify-between items-start sm:items-center gap-4">
                                <div className="space-y-1">
                                    <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Transaction Details</h2>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <span className={`inline-block w-2 h-2 rounded-full ${selectedTransaction.status === 'success' ? 'bg-green-500' : 'bg-yellow-500'}`}></span>
                                        <span>Status: {selectedTransaction.status.toUpperCase()}</span>
                                        <span className="text-gray-300">|</span>
                                        <span>Order ID: {selectedTransaction.orderId}</span>
                                    </div>
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
                        <div className="p-4 sm:p-6 max-h-[calc(100vh-120px)] overflow-y-auto space-y-6">
                            {/* Project Information */}
                            <Section title="Project Information" icon="document">
                                <div className="relative w-full h-48 mb-6 rounded-xl overflow-hidden">
                                    <Image
                                        src={selectedTransaction.imageUrl}
                                        alt={selectedTransaction.projectTitle}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 768px) 100vw, 768px"
                                    />
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <InfoField label="Project Title" value={selectedTransaction.projectTitle} />
                                    <InfoField label="Project ID" value={selectedTransaction.projectId} icon="id" />
                                    <InfoField label="License Type" value={selectedTransaction.licenseType} />
                                    <InfoField
                                        label="Amount"
                                        value={`Rp ${selectedTransaction.amount.toLocaleString('id-ID')}`}
                                        highlight
                                        icon="money"
                                    />
                                    <InfoField
                                        label="Total Download"
                                        value={projectSoldCount}
                                        highlight
                                        icon="download"
                                    />
                                </div>
                            </Section>

                            {/* Transaction Details */}
                            <Section title="Transaction Details" icon="transaction">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <InfoField label="Order ID" value={selectedTransaction.orderId} icon="id" />
                                    <InfoField label="Transaction ID" value={selectedTransaction.transactionId} icon="id" />
                                    <InfoField label="Payment Method" value={selectedTransaction.paymentMethod} />
                                    <InfoField label="Delivery Method" value={selectedTransaction.deliveryMethod} />
                                    <InfoField label="Status" value={selectedTransaction.status} icon="status" />
                                    <InfoField label="Processing Status" value={selectedTransaction.isProcessing ? 'Yes' : 'No'} icon="status" />
                                </div>
                            </Section>

                            {/* Payment Details */}
                            <Section title="Payment Details" icon="payment">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <InfoField label="Fraud Status" value={selectedTransaction.paymentDetails.fraud_status} icon="status" />
                                    <InfoField
                                        label="Gross Amount"
                                        value={`Rp ${selectedTransaction.paymentDetails.gross_amount}`}
                                        icon="money"
                                    />
                                    <InfoField label="Payment Type" value={selectedTransaction.paymentDetails.payment_type} />
                                    <InfoField
                                        label="Transaction Time"
                                        value={new Date(selectedTransaction.paymentDetails.transaction_time).toLocaleString('id-ID', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit'
                                        })}
                                        icon="calendar"
                                    />
                                </div>
                            </Section>

                            {/* User Information */}
                            <Section title="User Information" icon="user">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <InfoField label="Name" value={selectedTransaction.userName} icon="user" />
                                    <InfoField label="Email" value={selectedTransaction.userEmail} />
                                    <InfoField label="User ID" value={selectedTransaction.userId} icon="id" />
                                </div>
                            </Section>

                            {/* Links */}
                            <Section title="Related Links" icon="link">
                                <div className="space-y-4">
                                    <LinkButton
                                        href={selectedTransaction.downloadUrl}
                                        label="Download URL"
                                        icon="download"
                                    />

                                    <LinkButton
                                        href={selectedTransaction.linkTransaction}
                                        label="Transaction Link"
                                        icon="external"
                                    />
                                </div>
                            </Section>

                            {/* Timestamps */}
                            <Section title="Timestamps" icon="clock">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <InfoField
                                        label="Created At"
                                        value={selectedTransaction.createdAt.toDate().toLocaleString('id-ID', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit',
                                            timeZoneName: 'short'
                                        })}
                                        icon="calendar"
                                    />
                                    <InfoField
                                        label="Updated At"
                                        value={selectedTransaction.updatedAt.toDate().toLocaleString('id-ID', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            second: '2-digit',
                                            timeZoneName: 'short'
                                        })}
                                        icon="calendar"
                                    />
                                </div>
                            </Section>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}

// Helper Components
const Section = ({
    title,
    icon,
    children
}: {
    title: string;
    icon: 'document' | 'transaction' | 'payment' | 'user' | 'link' | 'clock';
    children: React.ReactNode;
}) => {
    const icons = {
        document: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />,
        transaction: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />,
        payment: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />,
        user: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />,
        link: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />,
        clock: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    };

    return (
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2 text-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {icons[icon]}
                </svg>
                {title}
            </h3>
            {children}
        </div>
    );
};

const InfoField = ({
    label,
    value,
    highlight = false,
    icon = null
}: {
    label: string;
    value: string | number;
    highlight?: boolean;
    icon?: 'download' | 'user' | 'calendar' | 'money' | 'status' | 'id' | null;
}) => {
    const icons = {
        download: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
        ),
        user: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        ),
        calendar: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
        ),
        money: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        ),
        status: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
        ),
        id: (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        )
    };

    return (
        <div className={`p-3 rounded-xl ${highlight ? 'bg-indigo-50' : 'bg-gray-50'} hover:bg-gray-100 transition-colors duration-200`}>
            <span className={`text-sm font-medium block mb-1 ${highlight ? 'text-indigo-600' : 'text-gray-500'}`}>{label}</span>
            <div className="flex items-center gap-2">
                {icon && (
                    <svg className="w-5 h-5 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        {icons[icon]}
                    </svg>
                )}
                <span className={`font-medium ${highlight ? 'text-indigo-700' : 'text-gray-800'}`}>{value}</span>
            </div>
        </div>
    );
};

const LinkButton = ({
    href,
    label,
    icon
}: {
    href: string;
    label: string;
    icon: 'download' | 'external';
}) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-2 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 text-indigo-600 hover:text-indigo-700 transition-colors duration-200"
    >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            {icon === 'download'
                ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            }
        </svg>
        {label}
    </a>
);
