'use client'

import React, { useEffect, useState } from 'react'

import { db } from '@/utils/firebase'

import { collection, query, where, getDocs } from 'firebase/firestore'

import Image from 'next/image'

import Link from 'next/link'

import { Transaction } from '@/hooks/dashboard/super-admins/transaction/complated/lib/schema'

import { useModal } from '@/base/helper/useModal'

export default function ComplatedLayout() {
    const [completedTransactions, setCompletedTransactions] = useState<Transaction[]>([])
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [showFilters, setShowFilters] = useState(false)
    const [licenseTypes, setLicenseTypes] = useState<string[]>([])
    const [filters, setFilters] = useState({
        licenseType: '',
        fromDate: '',
    })

    useModal({
        isOpen: isModalOpen,
        onClose: () => {
            setIsModalOpen(false)
            setSelectedTransaction(null)
        }
    })

    useEffect(() => {
        const fetchCompletedTransactions = async () => {
            try {
                const transactionsRef = collection(db, process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTIONS as string)
                const q = query(
                    transactionsRef,
                    where('statusDelivery', '==', 'completed')
                )

                const querySnapshot = await getDocs(q)
                const transactions = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    licenseType: doc.data().licenseType,
                    ...doc.data()
                })) as Transaction[];

                // Extract unique license types from transactions
                const uniqueLicenseTypes = [...new Set(transactions.map(t => t.licenseType))];
                setLicenseTypes(uniqueLicenseTypes);

                setCompletedTransactions(transactions);
            } catch (error) {
                console.error('Error fetching completed transactions:', error)
            }
        }

        fetchCompletedTransactions()
    }, [])

    const handleOpenModal = (transaction: Transaction) => {
        setSelectedTransaction(transaction)
        setIsModalOpen(true)
    }

    const handleFilterChange = (key: string, value: string) => {
        setFilters(prev => ({ ...prev, [key]: value }))
    }

    const filteredTransactions = completedTransactions.filter(transaction => {
        let matches = true;

        if (filters.licenseType && transaction.licenseType !== filters.licenseType) {
            matches = false;
        }

        if (filters.fromDate) {
            const txDate = transaction.createdAt.toDate();
            if (txDate < new Date(filters.fromDate)) {
                matches = false;
            }
        }

        return matches;
    });

    return (
        <section className='min-h-full px-0 sm:px-4'>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                        <h1 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'>
                            Transaction Completed
                        </h1>
                        <p className='text-gray-500'>Manage and organize your transaction completed</p>
                    </div>

                    <button
                        onClick={() => setShowFilters(!showFilters)}
                        className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-indigo-100 hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        {showFilters ? 'Hide Filters' : 'Show Filters'}
                    </button>
                </div>

                {/* Add Filter Panel */}
                {showFilters && (
                    <div className="mt-6 bg-base-200/50 backdrop-blur-sm rounded-2xl p-6 border border-base-300 shadow-sm">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-medium flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                                        </svg>
                                        License Type
                                    </span>
                                </label>
                                <select
                                    className="select select-bordered w-full bg-white/50 hover:bg-white transition-colors duration-300"
                                    value={filters.licenseType}
                                    onChange={(e) => handleFilterChange('licenseType', e.target.value)}
                                >
                                    <option value="">All Licenses</option>
                                    {licenseTypes.map((type) => (
                                        <option key={type} value={type}>{type}</option>
                                    ))}
                                </select>
                            </div>

                            <div className="form-control w-full">
                                <label className="label">
                                    <span className="label-text font-medium flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 opacity-70" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                        From Date
                                    </span>
                                </label>
                                <div className="relative">
                                    <input
                                        type="date"
                                        className="input input-bordered w-full bg-white/50 hover:bg-white transition-colors duration-300 pr-10"
                                        value={filters.fromDate}
                                        onChange={(e) => handleFilterChange('fromDate', e.target.value)}
                                        placeholder="Select date..."
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                </div>
                                <label className="label">
                                    <span className="label-text-alt text-base-content/60">Shows transactions from this date onwards</span>
                                </label>
                            </div>
                        </div>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 sm:gap-6">
                {filteredTransactions.map((transaction: Transaction) => (
                    <div key={transaction.id} className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-100">
                        <div className="relative h-48 overflow-hidden">
                            <Image
                                src={transaction.imageUrl}
                                alt={transaction.projectTitle}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="p-6 space-y-4">
                            <div className="space-y-2">
                                <h2 className="text-xl font-semibold text-gray-800 line-clamp-1">
                                    {transaction.projectTitle}
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    <span className="px-3 py-1 text-sm bg-green-100 text-green-700 rounded-full">
                                        {transaction.statusDelivery}
                                    </span>
                                    <span className="px-3 py-1 text-sm bg-blue-100 text-blue-700 rounded-full">
                                        {transaction.licenseType}
                                    </span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                                <Link
                                    href={transaction.linkTransaction}
                                    className="text-indigo-600 hover:text-indigo-700 font-medium transition-colors"
                                    rel='noopener noreferrer'
                                    target='_blank'
                                >
                                    Lihat Transaksi
                                </Link>
                                <button
                                    onClick={() => handleOpenModal(transaction)}
                                    className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 rounded-lg transition-all duration-300 shadow-sm hover:shadow-md"
                                >
                                    Lihat Detail
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Transaction Details Modal */}
            <dialog
                id="transaction_details_modal"
                className="modal"
                open={isModalOpen}
            >
                <div className="modal-box w-11/12 max-w-5xl bg-white p-0 rounded-2xl overflow-hidden max-h-[90vh] flex flex-col">
                    {selectedTransaction && (
                        <>
                            {/* Hero Section with Image - Fixed height */}
                            <div className="relative flex-shrink-0">
                                <div className="relative h-40 sm:h-56 w-full">
                                    <Image
                                        src={selectedTransaction.imageUrl}
                                        alt={selectedTransaction.projectTitle}
                                        fill
                                        className="object-cover"
                                    />
                                    {/* Dark overlay gradient */}
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
                                </div>
                                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8">
                                    <h3 className="font-bold text-xl sm:text-3xl text-white mb-2">{selectedTransaction.projectTitle}</h3>
                                </div>
                            </div>

                            {/* Content Container - Scrollable */}
                            <div className="p-4 sm:p-8 space-y-4 sm:space-y-6 overflow-y-auto flex-grow">
                                {/* Status Pills */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
                                    <div className="flex-1 min-w-[160px] px-4 py-3 rounded-xl bg-gradient-to-r from-green-50 to-green-100 border border-green-200 shadow-sm hover:shadow-md transition-all duration-300">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                                            <div>
                                                <p className="text-xs text-green-600 font-medium">Status</p>
                                                <p className="text-green-700 font-semibold mt-0.5">{selectedTransaction.status}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-1 min-w-[160px] px-4 py-3 rounded-xl bg-gradient-to-r from-blue-50 to-blue-100 border border-blue-200 shadow-sm hover:shadow-md transition-all duration-300">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                                            <div>
                                                <p className="text-xs text-blue-600 font-medium">Delivery</p>
                                                <p className="text-blue-700 font-semibold mt-0.5">{selectedTransaction.statusDelivery}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex-1 min-w-[160px] px-4 py-3 rounded-xl bg-gradient-to-r from-purple-50 to-purple-100 border border-purple-200 shadow-sm hover:shadow-md transition-all duration-300">
                                        <div className="flex items-center gap-3">
                                            <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                                            <div>
                                                <p className="text-xs text-purple-600 font-medium">License</p>
                                                <p className="text-purple-700 font-semibold mt-0.5">{selectedTransaction.licenseType}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Information Grid */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
                                    {/* Transaction Card */}
                                    <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:bg-white/80">
                                        <h4 className="text-lg font-semibold mb-6 text-gray-800 flex items-center gap-3">
                                            <div className="p-2 bg-indigo-50 rounded-lg">
                                                <svg className="w-5 h-5 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                                </svg>
                                            </div>
                                            Transaction Details
                                        </h4>
                                        <div className="space-y-3">
                                            <InfoRow label="Transaction ID" value={selectedTransaction.transactionId} />
                                            <InfoRow label="Amount" value={selectedTransaction.amount} />
                                            <InfoRow label="Created" value={selectedTransaction.createdAt.toDate().toLocaleString()} />
                                        </div>
                                    </div>

                                    {/* User Card */}
                                    <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:bg-white/80 h-fit">
                                        <h4 className="text-lg font-semibold mb-6 text-gray-800 flex items-center gap-3">
                                            <div className="p-2 bg-blue-50 rounded-lg">
                                                <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                </svg>
                                            </div>
                                            User Information
                                        </h4>
                                        <div className="space-y-3">
                                            <InfoRow label="Name" value={selectedTransaction.userName} />
                                            <InfoRow label="Email" value={selectedTransaction.userEmail} />
                                            <InfoRow label="User ID" value={selectedTransaction.userId} />
                                        </div>
                                    </div>

                                    {/* Payment Card */}
                                    <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:bg-white/80">
                                        <h4 className="text-lg font-semibold mb-6 text-gray-800 flex items-center gap-3">
                                            <div className="p-2 bg-emerald-50 rounded-lg">
                                                <svg className="w-5 h-5 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                                </svg>
                                            </div>
                                            Payment Details
                                        </h4>
                                        <div className="space-y-3">
                                            <InfoRow label="Method" value={selectedTransaction.paymentMethod} />
                                            <InfoRow label="Transaction Status" value={selectedTransaction.paymentDetails.transaction_status} />
                                            <InfoRow label="Transaction Time" value={selectedTransaction.paymentDetails.transaction_time} />
                                            <InfoRow label="Transaction ID" value={selectedTransaction.paymentDetails.transaction_id} />
                                            <InfoRow label="Payment Type" value={selectedTransaction.paymentDetails.payment_type} />
                                            <InfoRow label="Amount" value={selectedTransaction.paymentDetails.gross_amount} />
                                            <InfoRow label="Status Code" value={selectedTransaction.paymentDetails.status_code} />
                                            <InfoRow label="Status Message" value={selectedTransaction.paymentDetails.status_message} />
                                            <InfoRow label="Fraud Status" value={selectedTransaction.paymentDetails.fraud_status} />

                                            {/* Virtual Account Numbers */}
                                            {selectedTransaction.paymentDetails.va_numbers && selectedTransaction.paymentDetails.va_numbers.length > 0 && (
                                                <div className="mt-4 p-4 bg-gray-50 rounded-xl">
                                                    <h5 className="font-medium text-gray-700 mb-3">Virtual Account Details</h5>
                                                    {selectedTransaction.paymentDetails.va_numbers.map((va, index) => (
                                                        <div key={index} className="space-y-2">
                                                            <InfoRow label="Bank" value={va.bank} />
                                                            <InfoRow label="VA Number" value={va.va_number} />
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Delivery Card */}
                                    <div className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 hover:bg-white/80 h-fit">
                                        <h4 className="text-lg font-semibold mb-6 text-gray-800 flex items-center gap-3">
                                            <div className="p-2 bg-orange-50 rounded-lg">
                                                <svg className="w-5 h-5 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                            </div>
                                            Delivery Address
                                        </h4>
                                        <div className="space-y-3">
                                            <div className="bg-white rounded-xl p-5 shadow-sm hover:shadow-md transition-all duration-300 border border-gray-100">
                                                {/* Header with name and phone */}
                                                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 mb-4">
                                                    <h5 className="text-gray-900 font-semibold flex-1">
                                                        {selectedTransaction.deliveryAddress.fullName}
                                                    </h5>
                                                    <div className="flex items-center gap-2 bg-gray-50 px-3 py-1.5 rounded-full w-fit">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                        </svg>
                                                        <span className="text-sm text-gray-600 font-medium">
                                                            {selectedTransaction.deliveryAddress.phone}
                                                        </span>
                                                    </div>
                                                </div>

                                                {/* Address details */}
                                                <div className="space-y-3">
                                                    <div className="flex items-start gap-3">
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                        <div className="space-y-1">
                                                            <p className="text-gray-700 leading-relaxed">
                                                                {selectedTransaction.deliveryAddress.streetAddress}
                                                            </p>
                                                            <p className="text-gray-600">
                                                                {selectedTransaction.deliveryAddress.province}, {selectedTransaction.deliveryAddress.postalCode}
                                                            </p>
                                                        </div>
                                                    </div>

                                                    {/* Map container with proper aspect ratio */}
                                                    <div className="relative w-full rounded-lg overflow-hidden bg-gray-50 mt-4 h-[200px]">
                                                        <iframe
                                                            title="Location Map"
                                                            className="absolute inset-0 w-full h-full border-0"
                                                            style={{ width: '100%', height: '100%' }}
                                                            src={`https://www.openstreetmap.org/export/embed.html?bbox=106.62206172943115%2C-6.576112400000001%2C106.64206172943115%2C-6.572112400000001&layer=mapnik&marker=${selectedTransaction.deliveryAddress.district}`}
                                                            allowFullScreen
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {selectedTransaction.deliveryAddress.details && (
                                                <div className="mt-4 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-100 rounded-xl shadow-sm">
                                                    <div className="flex items-center gap-2 text-amber-700 mb-1">
                                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                        </svg>
                                                        <span className="font-medium text-sm">Additional Notes</span>
                                                    </div>
                                                    <p className="text-amber-700 text-sm pl-6">
                                                        {selectedTransaction.deliveryAddress.details}
                                                    </p>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
                <form method="dialog" className="modal-backdrop">
                    <button
                        onClick={() => setIsModalOpen(false)}
                        className="cursor-default absolute inset-0 w-full h-full bg-black/50"
                    />
                </form>
            </dialog>
        </section>
    )
}

const InfoRow = ({ label, value }: { label: string; value: string }) => (
    <div className="group flex flex-col sm:flex-row sm:justify-between sm:items-center p-2.5 rounded-lg hover:bg-white/80 transition-all duration-200 space-y-1 sm:space-y-0">
        <span className="text-gray-500 text-sm font-medium">{label}</span>
        <span className="font-semibold text-gray-800 bg-white px-3 py-1.5 rounded-md shadow-sm group-hover:shadow transition-all duration-200 break-all">{value}</span>
    </div>
)
