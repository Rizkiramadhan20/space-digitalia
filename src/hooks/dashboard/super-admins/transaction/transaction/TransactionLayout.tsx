'use client'

import React, { useEffect, useState } from 'react'

import { collection, onSnapshot, Timestamp } from 'firebase/firestore'

import { db } from '@/utils/firebase'

import Image from 'next/image'
import dynamic from 'next/dynamic'
import { Document, Page, Text, View, StyleSheet, PDFDownloadLink as PDFDownloadLinkOriginal } from '@react-pdf/renderer'

interface VaNumber {
    bank: string;
    va_number: string;
}

interface DeliveryAddress {
    city: string;
    details: string;
    district: string;
    fullName: string;
    phone: string;
    postalCode: string;
    province: string;
    streetAddress: string;
}

interface PaymentDetails {
    bill_key?: string;
    biller_code?: string;
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
    va_numbers: VaNumber[];
}

interface Transaction {
    id: string;
    amount: number;
    createdAt: Timestamp;
    deliveryAddress: DeliveryAddress;
    deliveryMethod: string;
    downloadUrl: string | null;
    imageUrl: string;
    licenseType: string;
    linkTransaction: string;
    orderId: string;
    paymentDetails: PaymentDetails;
    paymentMethod: string;
    paymentToken: string;
    projectId: string;
    projectTitle: string;
    redirectUrl: string;
    status: string;
    statusDelivery: string;
    transactionId: string;
    updatedAt: Timestamp;
    userEmail: string;
    userId: string;
    userName: string;
}

interface Filters {
    status: string[];
    paymentMethod: string[];
    dateRange: {
        start: Date | null;
        end: Date | null;
    };
    priceRange: {
        min: number | null;
        max: number | null;
    };
}

// Buat client component wrapper untuk PDFDownloadLink
const PDFDownloadLink = dynamic(
    () => Promise.resolve(PDFDownloadLinkOriginal),
    {
        ssr: false,
        loading: () => (
            <button className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl opacity-50 cursor-wait">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Loading PDF Generator...
            </button>
        )
    }
)

// Definisikan styles untuk PDF yang lebih modern
const styles = StyleSheet.create({
    page: {
        padding: 40,
        backgroundColor: '#ffffff',
    },
    header: {
        marginBottom: 30,
    },
    headerTitle: {
        fontSize: 28,
        color: '#1e293b',
        marginBottom: 8,
        fontWeight: 'bold',
    },
    headerSubtitle: {
        fontSize: 12,
        color: '#64748b',
    },
    section: {
        marginBottom: 25,
        backgroundColor: '#f8fafc',
        padding: 20,
        borderRadius: 8,
    },
    sectionTitle: {
        fontSize: 14,
        color: '#3730a3',
        fontWeight: 'bold',
        textTransform: 'uppercase',
        letterSpacing: 1,
        marginBottom: 15,
        borderBottom: '1 solid #e2e8f0',
        paddingBottom: 8,
    },
    row: {
        flexDirection: 'row',
        marginBottom: 8,
        alignItems: 'center',
    },
    label: {
        width: 140,
        fontSize: 10,
        color: '#64748b',
        textTransform: 'uppercase',
        letterSpacing: 0.5,
    },
    value: {
        flex: 1,
        fontSize: 12,
        color: '#1e293b',
        fontWeight: 'medium',
    },
    highlight: {
        backgroundColor: '#818cf81a',
        padding: 12,
        borderRadius: 6,
        marginBottom: 8,
    },
    highlightText: {
        color: '#3730a3',
        fontSize: 14,
        fontWeight: 'bold',
    },
    footer: {
        position: 'absolute',
        bottom: 30,
        left: 40,
        right: 40,
        textAlign: 'center',
        color: '#94a3b8',
        fontSize: 10,
        borderTop: '1 solid #e2e8f0',
        paddingTop: 20,
    },
    deliverySection: {
        backgroundColor: '#fef3c7', // Light yellow background
        padding: 20,
        borderRadius: 8,
        marginBottom: 25,
    },
    deliveryStatus: {
        fontSize: 12,
        padding: '4 8',
        borderRadius: 4,
        alignSelf: 'flex-start',
        marginBottom: 8,
    },
    deliveryStatusPending: {
        backgroundColor: '#fef3c7',
        color: '#92400e',
    },
    deliveryStatusSuccess: {
        backgroundColor: '#dcfce7',
        color: '#166534',
    },
    mapLink: {
        color: '#4f46e5',
        fontSize: 10,
        textDecoration: 'underline',
    },
});

// Komponen PDF yang lebih modern
const TransactionPDF = ({ transaction }: { transaction: Transaction }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            {/* Header */}
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Transaction Receipt</Text>
                <Text style={styles.headerSubtitle}>
                    Generated on {new Date().toLocaleDateString('id-ID', {
                        day: 'numeric',
                        month: 'long',
                        year: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                    })}
                </Text>
            </View>

            {/* Transaction Summary */}
            <View style={[styles.section, styles.highlight]}>
                <Text style={styles.highlightText}>
                    Rp {transaction.amount.toLocaleString()}
                </Text>
                <Text style={{ color: '#4f46e5', fontSize: 12, marginTop: 4 }}>
                    {transaction.status.toUpperCase()}
                </Text>
            </View>

            {/* Delivery Information */}
            {transaction.deliveryMethod === "delivery" && (
                <View style={[styles.section, styles.deliverySection]}>
                    <Text style={styles.sectionTitle}>Delivery Information</Text>

                    <View style={styles.row}>
                        <Text style={styles.label}>Status</Text>
                        <Text style={[
                            styles.deliveryStatus,
                            transaction.statusDelivery === 'pending' ? styles.deliveryStatusPending : styles.deliveryStatusSuccess
                        ]}>
                            {transaction.statusDelivery.toUpperCase()}
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Recipient</Text>
                        <Text style={styles.value}>{transaction.deliveryAddress.fullName}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Phone</Text>
                        <Text style={styles.value}>{transaction.deliveryAddress.phone}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Address</Text>
                        <Text style={styles.value}>
                            {transaction.deliveryAddress.streetAddress}
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>City</Text>
                        <Text style={styles.value}>
                            {transaction.deliveryAddress.city}, {transaction.deliveryAddress.province} {transaction.deliveryAddress.postalCode}
                        </Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Additional Info</Text>
                        <Text style={styles.value}>{transaction.deliveryAddress.details}</Text>
                    </View>

                    <View style={styles.row}>
                        <Text style={styles.label}>Location</Text>
                        <Text style={styles.mapLink}>
                            {`https://maps.google.com/?q=${transaction.deliveryAddress.district}`}
                        </Text>
                    </View>
                </View>
            )}

            {/* Project Information */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Project Details</Text>
                <View style={styles.row}>
                    <Text style={styles.label}>Project Title</Text>
                    <Text style={styles.value}>{transaction.projectTitle}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>License Type</Text>
                    <Text style={styles.value}>{transaction.licenseType}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Project ID</Text>
                    <Text style={styles.value}>{transaction.projectId}</Text>
                </View>
            </View>

            {/* Customer Information */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Customer Information</Text>
                <View style={styles.row}>
                    <Text style={styles.label}>Name</Text>
                    <Text style={styles.value}>{transaction.userName}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Email</Text>
                    <Text style={styles.value}>{transaction.userEmail}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>User ID</Text>
                    <Text style={styles.value}>{transaction.userId}</Text>
                </View>
            </View>

            {/* Payment Details */}
            <View style={styles.section}>
                <Text style={styles.sectionTitle}>Payment Information</Text>
                <View style={styles.row}>
                    <Text style={styles.label}>Payment Method</Text>
                    <Text style={styles.value}>{transaction.paymentMethod}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Payment Type</Text>
                    <Text style={styles.value}>{transaction.paymentDetails.payment_type.toUpperCase()}</Text>
                </View>
                {transaction.paymentDetails.biller_code && (
                    <>
                        <View style={styles.row}>
                            <Text style={styles.label}>Biller Code</Text>
                            <Text style={styles.value}>{transaction.paymentDetails.biller_code}</Text>
                        </View>
                        <View style={styles.row}>
                            <Text style={styles.label}>Bill Key</Text>
                            <Text style={styles.value}>{transaction.paymentDetails.bill_key}</Text>
                        </View>
                    </>
                )}
                <View style={styles.row}>
                    <Text style={styles.label}>Status</Text>
                    <Text style={styles.value}>{transaction.paymentDetails.transaction_status.toUpperCase()}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Transaction ID</Text>
                    <Text style={styles.value}>{transaction.transactionId}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Order ID</Text>
                    <Text style={styles.value}>{transaction.orderId}</Text>
                </View>
                <View style={styles.row}>
                    <Text style={styles.label}>Created At</Text>
                    <Text style={styles.value}>
                        {transaction.createdAt.toDate().toLocaleString('id-ID')}
                    </Text>
                </View>
            </View>

            {/* Footer */}
            <Text style={styles.footer}>
                This is an automatically generated receipt from Space Digitalia
            </Text>
        </Page>
    </Document>
);

// Update the payment method options to match the actual banks and payment methods
const paymentMethods = [
    // GoPay Section
    { value: 'gopay', label: 'GoPay/GoPay Later' },

    // Bank Transfer Section
    { value: 'bca', label: 'Bank BCA' },
    { value: 'mandiri', label: 'Bank Mandiri' },
    { value: 'bni', label: 'Bank BNI' },
    { value: 'bri', label: 'Bank BRI' },
    { value: 'permata', label: 'Bank Permata' },

    // QRIS Section
    { value: 'qris', label: 'QRIS' },
    { value: 'dana', label: 'DANA' },
    { value: 'ovo', label: 'OVO' },
    { value: 'linkaja', label: 'LinkAja' }
];

export default function TransactionLayout() {
    const [transactions, setTransactions] = useState<Transaction[]>([])
    const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>([])
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
    const [filters, setFilters] = useState<Filters>({
        status: [],
        paymentMethod: [],
        dateRange: {
            start: null,
            end: null
        },
        priceRange: {
            min: null,
            max: null
        }
    })

    const applyFilters = () => {
        let filtered = [...transactions];

        if (filters.status.length > 0) {
            filtered = filtered.filter(transaction =>
                filters.status.includes(transaction.status)
            );
        }

        if (filters.paymentMethod.length > 0) {
            filtered = filtered.filter(transaction => {
                const paymentType = transaction.paymentDetails.payment_type;
                const vaNumbers = transaction.paymentDetails.va_numbers;

                // Check for bank transfer methods
                if (vaNumbers && vaNumbers.length > 0) {
                    return filters.paymentMethod.includes(vaNumbers[0].bank);
                }

                // Check for e-wallet and QRIS methods
                return filters.paymentMethod.includes(paymentType);
            });
        }

        if (filters.dateRange.start || filters.dateRange.end) {
            filtered = filtered.filter(transaction => {
                const transactionDate = transaction.createdAt.toDate();
                const isAfterStart = !filters.dateRange.start || transactionDate >= filters.dateRange.start;
                const isBeforeEnd = !filters.dateRange.end || transactionDate <= filters.dateRange.end;
                return isAfterStart && isBeforeEnd;
            });
        }

        if (filters.priceRange.min !== null || filters.priceRange.max !== null) {
            filtered = filtered.filter(transaction => {
                const isAboveMin = filters.priceRange.min === null || transaction.amount >= filters.priceRange.min;
                const isBelowMax = filters.priceRange.max === null || transaction.amount <= filters.priceRange.max;
                return isAboveMin && isBelowMax;
            });
        }

        setFilteredTransactions(filtered);
    }

    useEffect(() => {
        const transactionsRef = collection(db, 'transactions')

        const unsubscribe = onSnapshot(transactionsRef, (snapshot) => {
            const transactionData = snapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            })) as Transaction[]
            setTransactions(transactionData)
            setFilteredTransactions(transactionData)
        })

        return () => unsubscribe()
    }, [])

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'unset'
        }

        return () => {
            document.body.style.overflow = 'unset'
        }
    }, [isModalOpen])

    // Replace FilterModal with inline filter section
    const FilterSection = () => (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {/* Status Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Status</label>
                    <div className="space-y-2">
                        {['pending', 'success', 'failed'].map((status) => (
                            <label key={status} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={filters.status.includes(status)}
                                    onChange={(e) => {
                                        const newStatus = e.target.checked
                                            ? [...filters.status, status]
                                            : filters.status.filter(s => s !== status);
                                        setFilters({ ...filters, status: newStatus });
                                    }}
                                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-gray-700 capitalize">{status}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Payment Method Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Payment Method</label>
                    <div className="space-y-2">
                        {paymentMethods.map(({ value, label }) => (
                            <label key={value} className="flex items-center">
                                <input
                                    type="checkbox"
                                    checked={filters.paymentMethod.includes(value)}
                                    onChange={(e) => {
                                        const newMethods = e.target.checked
                                            ? [...filters.paymentMethod, value]
                                            : filters.paymentMethod.filter(m => m !== value);
                                        setFilters({ ...filters, paymentMethod: newMethods });
                                    }}
                                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                                />
                                <span className="ml-2 text-gray-700">{label}</span>
                            </label>
                        ))}
                    </div>
                </div>

                {/* Price Range Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Price Range</label>
                    <div className="space-y-2">
                        <input
                            type="number"
                            placeholder="Min Price"
                            value={filters.priceRange.min || ''}
                            onChange={(e) => setFilters({
                                ...filters,
                                priceRange: {
                                    ...filters.priceRange,
                                    min: e.target.value ? Number(e.target.value) : null
                                }
                            })}
                            className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <input
                            type="number"
                            placeholder="Max Price"
                            value={filters.priceRange.max || ''}
                            onChange={(e) => setFilters({
                                ...filters,
                                priceRange: {
                                    ...filters.priceRange,
                                    max: e.target.value ? Number(e.target.value) : null
                                }
                            })}
                            className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                </div>

                {/* Date Range Filter */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
                    <div className="space-y-2">
                        <input
                            type="date"
                            placeholder="Start Date"
                            value={filters.dateRange.start?.toISOString().split('T')[0] || ''}
                            onChange={(e) => setFilters({
                                ...filters,
                                dateRange: {
                                    ...filters.dateRange,
                                    start: e.target.value ? new Date(e.target.value) : null
                                }
                            })}
                            className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                        <input
                            type="date"
                            placeholder="End Date"
                            value={filters.dateRange.end?.toISOString().split('T')[0] || ''}
                            onChange={(e) => setFilters({
                                ...filters,
                                dateRange: {
                                    ...filters.dateRange,
                                    end: e.target.value ? new Date(e.target.value) : null
                                }
                            })}
                            className="w-full rounded-lg border-gray-300 focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                </div>
            </div>

            {/* Filter Actions */}
            <div className="flex justify-end gap-4 mt-6">
                <button
                    onClick={() => {
                        setFilters({
                            status: [],
                            paymentMethod: [],
                            dateRange: { start: null, end: null },
                            priceRange: { min: null, max: null }
                        });
                        setFilteredTransactions(transactions);
                    }}
                    className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                    Reset Filters
                </button>
                <button
                    onClick={applyFilters}
                    className="px-4 py-2 text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                >
                    Apply Filters
                </button>
            </div>
        </div>
    );

    return (
        <section className='min-h-full px-0 sm:px-4'>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                        <h1 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'>
                            Transaction
                        </h1>
                        <p className='text-gray-500'>Manage and organize your transaction</p>
                    </div>

                    <button
                        onClick={() => setIsFilterModalOpen(!isFilterModalOpen)}
                        className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-indigo-100 hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        {isFilterModalOpen ? 'Hide Filters' : 'Show Filters'}
                    </button>
                </div>
            </div>

            {/* Show/Hide Filter Section */}
            {isFilterModalOpen && <FilterSection />}

            {/* Transaction Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredTransactions.map((transaction) => (
                    <div key={transaction.id} className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                        <div className="relative h-48 overflow-hidden">
                            <Image
                                src={transaction.imageUrl}
                                alt={transaction.projectTitle}
                                fill
                                className="object-cover"
                            />
                        </div>

                        <div className="p-4 space-y-3">
                            {/* Project Title */}
                            <h3 className="font-semibold text-gray-800 line-clamp-2">
                                {transaction.projectTitle}
                            </h3>

                            {/* Transaction Details */}
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-gray-500">Amount:</span>
                                    <span className="font-medium">Rp {transaction.amount.toLocaleString()}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-500">Status:</span>
                                    <span className={`font-medium ${transaction.status === 'success' ? 'text-green-600' :
                                        transaction.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                                        }`}>
                                        {transaction.status.charAt(0).toUpperCase() + transaction.status.slice(1)}
                                    </span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-500">Payment:</span>
                                    <span className="font-medium">{transaction.paymentMethod}</span>
                                </div>

                                <div className="flex justify-between">
                                    <span className="text-gray-500">License:</span>
                                    <span className="font-medium">{transaction.licenseType}</span>
                                </div>
                            </div>

                            {/* User Info */}
                            <div className="pt-3 border-t border-gray-100">
                                <div className="flex justify-between items-center text-sm">
                                    <span className="text-gray-500">User:</span>
                                    <span className="font-medium">{transaction.userName}</span>
                                </div>
                                <div className="text-xs text-gray-400 truncate">
                                    {transaction.userEmail}
                                </div>
                            </div>

                            {/* Date */}
                            <div className="text-xs text-gray-400">
                                {transaction.createdAt.toDate().toLocaleDateString('id-ID', {
                                    day: 'numeric',
                                    month: 'long',
                                    year: 'numeric',
                                    hour: '2-digit',
                                    minute: '2-digit'
                                })}
                            </div>

                            {/* View Details Button */}
                            <button
                                onClick={() => {
                                    setSelectedTransaction(transaction)
                                    setIsModalOpen(true)
                                }}
                                className="w-full mt-3 px-4 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-600 rounded-lg transition-colors duration-200 flex items-center justify-center gap-2"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                                </svg>
                                View Details
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {/* Detail Modal */}
            {isModalOpen && selectedTransaction && (
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto">
                    <div className="mockup-window border border-base-300 w-full max-w-4xl bg-white my-8">
                        <div className="p-6 max-h-[80vh] overflow-y-auto">
                            {/* Header */}
                            <div className="flex justify-between items-start mb-6">
                                <div>
                                    <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
                                        Transaction Details
                                    </h2>
                                    <p className="text-gray-500 mt-1">Order ID: {selectedTransaction.orderId}</p>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </div>

                            <div className="space-y-8">
                                {/* Project Overview Card */}
                                <div className="bg-gradient-to-br from-indigo-50 to-white rounded-xl p-4 shadow-sm">
                                    <div className="flex gap-6">
                                        {/* Project Image */}
                                        <div className="relative w-48 h-32 rounded-lg overflow-hidden shadow-md">
                                            <Image
                                                src={selectedTransaction.imageUrl}
                                                alt={selectedTransaction.projectTitle}
                                                fill
                                                className="object-cover"
                                            />
                                        </div>
                                        {/* Project Info */}
                                        <div className="flex-1">
                                            <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                                {selectedTransaction.projectTitle}
                                            </h3>
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="flex items-center gap-2">
                                                    <span className="text-gray-500">Amount:</span>
                                                    <span className="font-semibold text-green-600">
                                                        Rp {selectedTransaction.amount.toLocaleString()}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-2">
                                                    <span className="text-gray-500">Status:</span>
                                                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${selectedTransaction.status === 'success' ? 'bg-green-100 text-green-700' :
                                                        selectedTransaction.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                            'bg-red-100 text-red-700'
                                                        }`}>
                                                        {selectedTransaction.status.toUpperCase()}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Information Grid */}
                                <div className="grid grid-cols-2 gap-6">
                                    {/* User Information */}
                                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
                                        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            User Information
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">Name</span>
                                                    <span className="font-medium text-gray-800 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                                                        {selectedTransaction.userName}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">Email</span>
                                                    <span className="font-medium text-gray-800 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                                                        {selectedTransaction.userEmail}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">User ID</span>
                                                    <span className="font-medium text-gray-800 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100 text-sm">
                                                        {selectedTransaction.userId}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* License & Delivery */}
                                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
                                        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                            </svg>
                                            License & Delivery
                                        </h3>
                                        <div className="space-y-4">
                                            <div className="bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">License Type</span>
                                                    <span className="font-medium text-gray-800 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                                                        {selectedTransaction.licenseType}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">Delivery Method</span>
                                                    <span className="font-medium text-gray-800 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                                                        {selectedTransaction.deliveryMethod}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">Status Delivery</span>
                                                    <span className="font-medium text-gray-800 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                                                        {selectedTransaction.statusDelivery || 'N/A'}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Payment Details */}
                                    <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 col-span-2 hover:shadow-xl transition-shadow duration-300">
                                        <h3 className="text-lg font-semibold mb-6 flex items-center gap-3 text-gray-800">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                                            </svg>
                                            Payment Details
                                        </h3>
                                        <div className="grid grid-cols-3 gap-8">
                                            {/* Payment Method Section */}
                                            <div className="space-y-4">
                                                <div className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                                    <span className="text-sm font-medium text-gray-500 block mb-1">Payment Method</span>
                                                    <span className="font-semibold text-gray-800">{selectedTransaction.paymentMethod}</span>
                                                </div>
                                                <div className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                                    <span className="text-sm font-medium text-gray-500 block mb-1">Payment Type</span>
                                                    <span className="font-semibold text-gray-800">{selectedTransaction.paymentDetails.payment_type}</span>
                                                </div>
                                                <div className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                                    <span className="text-sm font-medium text-gray-500 block mb-1">Transaction Status</span>
                                                    <span className={`font-semibold ${selectedTransaction.paymentDetails.transaction_status === 'settlement' ? 'text-green-600' :
                                                        selectedTransaction.paymentDetails.transaction_status === 'pending' ? 'text-yellow-600' :
                                                            'text-red-600'
                                                        }`}>
                                                        {selectedTransaction.paymentDetails.transaction_status}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Bank Details Section */}
                                            <div className="space-y-4">
                                                <div className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                                    <span className="text-sm font-medium text-gray-500 block mb-1">Bank</span>
                                                    <span className="font-semibold text-gray-800">{selectedTransaction.paymentDetails.va_numbers?.[0]?.bank.toUpperCase() || 'N/A'}</span>
                                                </div>
                                                <div className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                                    <span className="text-sm font-medium text-gray-500 block mb-1">VA Number</span>
                                                    <span className="font-mono font-semibold text-gray-800">{selectedTransaction.paymentDetails.va_numbers?.[0]?.va_number || 'N/A'}</span>
                                                </div>
                                                <div className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                                    <span className="text-sm font-medium text-gray-500 block mb-1">Transaction Time</span>
                                                    <span className="font-semibold text-gray-800">{selectedTransaction.paymentDetails.transaction_time}</span>
                                                </div>
                                            </div>

                                            {/* Status Section */}
                                            <div className="space-y-4">
                                                <div className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                                    <span className="text-sm font-medium text-gray-500 block mb-1">Status Message</span>
                                                    <span className="font-semibold text-gray-800">{selectedTransaction.paymentDetails.status_message}</span>
                                                </div>
                                                <div className="bg-gray-50 p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                                    <span className="text-sm font-medium text-gray-500 block mb-1">Fraud Status</span>
                                                    <span className={`font-semibold ${selectedTransaction.paymentDetails.fraud_status === 'accept' ? 'text-green-600' : 'text-red-600'
                                                        }`}>
                                                        {selectedTransaction.paymentDetails.fraud_status}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Delivery Information */}
                                {selectedTransaction.deliveryMethod === "delivery" && (
                                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
                                        <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                            </svg>
                                            Delivery Information
                                        </h3>
                                        <div className="space-y-4">
                                            {/* Delivery Status */}
                                            <div className="bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">Status</span>
                                                    <span className={`font-medium px-3 py-1 rounded-full text-sm ${selectedTransaction.statusDelivery === 'pending'
                                                        ? 'bg-amber-100 text-amber-800'
                                                        : 'bg-green-100 text-green-800'
                                                        }`}>
                                                        {selectedTransaction.statusDelivery.toUpperCase()}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Recipient Info */}
                                            <div className="bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">Recipient</span>
                                                    <span className="font-medium text-gray-800 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                                                        {selectedTransaction.deliveryAddress.fullName}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Phone */}
                                            <div className="bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">Phone</span>
                                                    <span className="font-medium text-gray-800 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                                                        {selectedTransaction.deliveryAddress.phone}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Address */}
                                            <div className="bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">Address</span>
                                                    <span className="font-medium text-gray-800 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                                                        {selectedTransaction.deliveryAddress.streetAddress}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* City & Province */}
                                            <div className="bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">City</span>
                                                    <span className="font-medium text-gray-800 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                                                        {selectedTransaction.deliveryAddress.city}, {selectedTransaction.deliveryAddress.province} {selectedTransaction.deliveryAddress.postalCode}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Additional Info */}
                                            <div className="bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">Additional Info</span>
                                                    <span className="font-medium text-gray-800 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                                                        {selectedTransaction.deliveryAddress.details}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Location Map Link */}
                                            <div className="bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">Location</span>
                                                    <a
                                                        href={`https://maps.google.com/?q=${selectedTransaction.deliveryAddress.district}`}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="text-indigo-600 hover:text-indigo-700 font-medium text-sm flex items-center gap-1"
                                                    >
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        </svg>
                                                        View on Maps
                                                    </a>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Links & Actions */}
                                <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
                                    <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                        Quick Actions
                                    </h3>
                                    <div className="flex flex-wrap gap-4">
                                        <a
                                            href={selectedTransaction.downloadUrl || ''}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 text-white rounded-xl hover:from-indigo-700 hover:to-indigo-800 transition-all duration-300 shadow-sm hover:shadow-indigo-100 hover:shadow-lg transform hover:-translate-y-0.5"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </svg>
                                            Download Project
                                        </a>
                                        {selectedTransaction && (
                                            <PDFDownloadLink
                                                document={<TransactionPDF transaction={selectedTransaction} />}
                                                fileName={`transaction-${selectedTransaction.orderId}.pdf`}
                                                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-green-600 to-green-700 text-white rounded-xl hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-sm hover:shadow-green-100 hover:shadow-lg transform hover:-translate-y-0.5"
                                            >
                                                {({ loading }) =>
                                                    loading ?
                                                        <>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                                                            </svg>
                                                            Generating PDF...
                                                        </> :
                                                        <>
                                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                                            </svg>
                                                            Export as PDF
                                                        </>
                                                }
                                            </PDFDownloadLink>
                                        )}
                                        <a
                                            href={selectedTransaction.linkTransaction}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-sm hover:shadow-blue-100 hover:shadow-lg transform hover:-translate-y-0.5"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
                                            </svg>
                                            Transaction Link
                                        </a>
                                    </div>
                                </div>

                                {/* Timestamps */}
                                <div className="text-sm text-gray-500 flex justify-between pt-4 border-t">
                                    <span>Created: {selectedTransaction.createdAt.toDate().toLocaleString('id-ID')}</span>
                                    <span>Updated: {selectedTransaction.updatedAt.toDate().toLocaleString('id-ID')}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    )
}
