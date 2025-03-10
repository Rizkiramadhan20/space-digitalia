import React from 'react';

import Image from 'next/image';

import { TransactionDetailsModalProps } from '@/hooks/dashboard/user/transaction/canceled/lib/schema';

export default function TransactionDetailsModal({ transaction, onClose }: TransactionDetailsModalProps) {
    const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50"
            onClick={handleClickOutside}
        >
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl overflow-hidden">
                {/* Modal Header */}
                <div className="sticky top-0 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80 border-b border-gray-100/80 px-6 sm:px-8 py-5 sm:py-6 z-10">
                    <div className="flex justify-between items-start sm:items-center gap-4">
                        <div className="flex-1 min-w-0">
                            <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent tracking-tight">
                                Transaction Details
                            </h2>
                            <div className="flex items-center gap-2 mt-2">
                                <span className="text-sm text-gray-500">Order ID:</span>
                                <div className="inline-flex items-center gap-1.5 px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-lg">
                                    <span className="text-sm font-medium text-gray-700">
                                        {transaction.orderId}
                                    </span>
                                    <button
                                        className="group"
                                        onClick={() => navigator.clipboard.writeText(transaction.orderId)}
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 text-gray-400 hover:text-gray-600 transition-colors"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <button
                            onClick={onClose}
                            className="group p-2 sm:p-2.5 rounded-xl bg-gray-50/80 hover:bg-gray-100 active:bg-gray-200 transition-all duration-200 -mr-2 sm:mr-0"
                            aria-label="Close modal"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-5 w-5 text-gray-500 group-hover:text-gray-700 transition-colors"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Modal Content */}
                <div className="p-8 max-h-[calc(100vh-150px)] overflow-y-auto">
                    {/* Project Overview Card */}
                    <div className="bg-gradient-to-br from-gray-50/50 to-white/80 backdrop-blur-sm rounded-2xl border border-gray-100/80 shadow-lg overflow-hidden mb-8 hover:shadow-xl transition-all duration-300">
                        <div className="flex flex-col md:flex-row gap-8 p-6 sm:p-8">
                            {/* Image Container with Hover Effect */}
                            <div className="relative w-full md:w-56 h-56 md:h-64 rounded-xl overflow-hidden shadow-md group">
                                <Image
                                    src={transaction.imageUrl}
                                    alt={transaction.projectTitle}
                                    fill
                                    className="object-cover transform transition-transform duration-300 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 384px"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            </div>

                            {/* Content Container */}
                            <div className="flex-1 min-w-0">
                                <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6 line-clamp-2">
                                    {transaction.projectTitle}
                                </h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    {/* Amount Card */}
                                    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-gray-100/80 shadow-sm hover:shadow-md transition-all duration-200">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-2 bg-green-50 rounded-lg">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <span className="text-sm font-medium text-gray-500">Amount</span>
                                        </div>
                                        <span className="text-lg sm:text-xl font-semibold text-green-600">
                                            Rp {transaction.amount.toLocaleString('id-ID')}
                                        </span>
                                    </div>

                                    {/* Status Card */}
                                    <div className="bg-white/80 backdrop-blur-sm p-4 rounded-xl border border-gray-100/80 shadow-sm hover:shadow-md transition-all duration-200">
                                        <div className="flex items-center gap-3 mb-2">
                                            <div className="p-2 bg-blue-50 rounded-lg">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                            </div>
                                            <span className="text-sm font-medium text-gray-500">Status</span>
                                        </div>
                                        <span className="inline-flex px-3 py-1 text-sm font-medium rounded-md bg-yellow-50 text-yellow-700 border border-yellow-200">
                                            {transaction.status}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Details List */}
                        <div className="border-t border-gray-100">
                            <dl className="divide-y divide-gray-100">
                                {/* Order ID */}
                                <div className="flex items-center p-3 hover:bg-gray-50/80 transition-colors duration-200">
                                    <dt className="flex-1 text-sm text-gray-600">Order ID</dt>
                                    <dd className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-gray-900">{transaction.orderId}</span>
                                        <button
                                            onClick={() => navigator.clipboard.writeText(transaction.orderId)}
                                            className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                                            title="Copy Order ID"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                            </svg>
                                        </button>
                                    </dd>
                                </div>

                                {/* Project ID */}
                                <div className="flex items-center p-3 hover:bg-gray-50/80 transition-colors duration-200">
                                    <dt className="flex-1 text-sm text-gray-600">Project ID</dt>
                                    <dd className="text-sm font-medium text-gray-900">{transaction.projectId}</dd>
                                </div>

                                {/* License Type */}
                                <div className="flex items-center p-3 hover:bg-gray-50/80 transition-colors duration-200">
                                    <dt className="flex-1 text-sm text-gray-600">License Type</dt>
                                    <dd className="inline-flex px-2.5 py-1 text-sm font-medium rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                                        {transaction.licenseType}
                                    </dd>
                                </div>

                                {/* Delivery Method */}
                                <div className="flex items-center p-3 hover:bg-gray-50/80 transition-colors duration-200">
                                    <dt className="flex-1 text-sm text-gray-600">Delivery Method</dt>
                                    <dd className="inline-flex px-2.5 py-1 text-sm font-medium rounded-md bg-purple-50 text-purple-700 border border-purple-100">
                                        {transaction.deliveryMethod}
                                    </dd>
                                </div>

                                {/* Status Delivery */}
                                <div className="flex items-center p-3 hover:bg-gray-50/80 transition-colors duration-200">
                                    <dt className="flex-1 text-sm text-gray-600">Status Delivery</dt>
                                    <dd className={`inline-flex px-2.5 py-1 text-sm font-medium rounded-md ${transaction.statusDelivery
                                        ? 'bg-green-50 text-green-700 border border-green-100'
                                        : 'bg-gray-50 text-gray-600 border border-gray-200'
                                        }`}>
                                        {transaction.statusDelivery || 'N/A'}
                                    </dd>
                                </div>
                            </dl>
                        </div>
                    </div>

                    {/* Payment Details */}
                    {transaction.paymentDetails && (
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-100/80 shadow-sm hover:shadow-md transition-all duration-300">
                            <div className="flex items-center gap-3 mb-5">
                                <div className="p-2 bg-emerald-50 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                    </svg>
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900">Payment Details</h4>
                            </div>

                            <dl className="space-y-4">
                                {/* Payment Type */}
                                <div className="flex items-center p-3 rounded-lg hover:bg-gray-50/80 transition-colors duration-200">
                                    <dt className="flex-1 text-sm text-gray-600">Payment Type</dt>
                                    <dd className="inline-flex px-2.5 py-1 text-sm font-medium rounded-md bg-blue-50 text-blue-700 border border-blue-100">
                                        {transaction.paymentDetails.payment_type.toUpperCase()}
                                    </dd>
                                </div>

                                {/* Transaction Status */}
                                <div className="flex items-center p-3 rounded-lg hover:bg-gray-50/80 transition-colors duration-200">
                                    <dt className="flex-1 text-sm text-gray-600">Status</dt>
                                    <dd className={`inline-flex px-2.5 py-1 text-sm font-medium rounded-md ${transaction.paymentDetails?.transaction_status === 'settlement' ? (
                                        'bg-green-50 text-green-700 border border-green-100'
                                    ) : transaction.paymentDetails?.transaction_status === 'pending' ? (
                                        'bg-yellow-50 text-yellow-700 border border-yellow-100'
                                    ) : (
                                        'bg-red-50 text-red-700 border border-red-100'
                                    )}`}>
                                        {transaction.paymentDetails?.transaction_status?.toUpperCase()}
                                    </dd>
                                </div>

                                {/* Fraud Status */}
                                <div className="flex items-center p-3 rounded-lg hover:bg-gray-50/80 transition-colors duration-200">
                                    <dt className="flex-1 text-sm text-gray-600">Fraud Status</dt>
                                    <dd className={`inline-flex px-2.5 py-1 text-sm font-medium rounded-md ${transaction.paymentDetails?.fraud_status === 'accept'
                                        ? 'bg-green-50 text-green-700 border border-green-100'
                                        : 'bg-red-50 text-red-700 border border-red-100'
                                        }`}>
                                        {transaction.paymentDetails?.fraud_status?.toUpperCase()}
                                    </dd>
                                </div>

                                {/* Transaction Time */}
                                <div className="flex items-center p-3 rounded-lg hover:bg-gray-50/80 transition-colors duration-200">
                                    <dt className="flex-1 text-sm text-gray-600">Transaction Time</dt>
                                    <dd className="flex items-center gap-2">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                        <span className="text-sm font-medium text-gray-900">
                                            {new Date(transaction.paymentDetails.transaction_time).toLocaleString('id-ID')}
                                        </span>
                                    </dd>
                                </div>

                                {/* Virtual Account Details */}
                                {transaction.paymentDetails?.va_numbers && transaction.paymentDetails.va_numbers[0] && (
                                    <>
                                        {/* Bank */}
                                        <div className="flex items-center p-3 rounded-lg hover:bg-gray-50/80 transition-colors duration-200">
                                            <dt className="flex-1 text-sm text-gray-600">Bank</dt>
                                            <dd className="inline-flex px-2.5 py-1 text-sm font-medium rounded-md bg-indigo-50 text-indigo-700 border border-indigo-100">
                                                {transaction.paymentDetails.va_numbers[0].bank.toUpperCase()}
                                            </dd>
                                        </div>

                                        {/* VA Number */}
                                        <div className="flex items-center p-3 rounded-lg hover:bg-gray-50/80 transition-colors duration-200">
                                            <dt className="flex-1 text-sm text-gray-600">VA Number</dt>
                                            <dd className="flex items-center gap-2">
                                                <span className="text-sm font-medium text-gray-900 font-mono">
                                                    {transaction.paymentDetails.va_numbers[0].va_number}
                                                </span>
                                                <button
                                                    onClick={() => navigator.clipboard.writeText(transaction.paymentDetails?.va_numbers?.[0]?.va_number ?? '')}
                                                    className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                                                    title="Copy VA Number"
                                                >
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                        <path
                                                            strokeLinecap="round"
                                                            strokeLinejoin="round"
                                                            strokeWidth={2}
                                                            d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                                                        />
                                                    </svg>
                                                </button>
                                            </dd>
                                        </div>
                                    </>
                                )}
                            </dl>
                        </div>
                    )}

                    {/* User Information */}
                    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-100/80 shadow-sm hover:shadow-md transition-all duration-300">
                        <div className="flex items-center gap-3 mb-5">
                            <div className="p-2 bg-violet-50 rounded-lg">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                </svg>
                            </div>
                            <h4 className="text-lg font-semibold text-gray-900">User Information</h4>
                        </div>

                        <dl className="space-y-4">
                            {/* User Name */}
                            <div className="flex items-center p-3 rounded-lg hover:bg-gray-50/80 transition-colors duration-200">
                                <div className="flex items-center gap-3 flex-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    <dt className="text-sm text-gray-600">Name</dt>
                                </div>
                                <dd className="text-sm font-medium text-gray-900">
                                    <div className="inline-flex px-3 py-1 rounded-lg bg-gray-50 border border-gray-100">
                                        {transaction.userName}
                                    </div>
                                </dd>
                            </div>

                            {/* User Email */}
                            <div className="flex items-center p-3 rounded-lg hover:bg-gray-50/80 transition-colors duration-200">
                                <div className="flex items-center gap-3 flex-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>
                                    <dt className="text-sm text-gray-600">Email</dt>
                                </div>
                                <dd className="flex items-center gap-2">
                                    <div className="inline-flex px-3 py-1 rounded-lg bg-gray-50 border border-gray-100">
                                        <span className="text-sm font-medium text-gray-900">{transaction.userEmail}</span>
                                    </div>
                                    <button
                                        onClick={() => navigator.clipboard.writeText(transaction.userEmail)}
                                        className="p-1 hover:bg-gray-100 rounded-md transition-colors"
                                        title="Copy Email"
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-gray-400 hover:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                                        </svg>
                                    </button>
                                </dd>
                            </div>
                        </dl>
                    </div>

                    {/* Delivery Information - Only show if deliveryAddress exists */}
                    {transaction.deliveryAddress && (
                        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border border-gray-100/80 shadow-sm hover:shadow-md transition-all duration-300 md:col-span-2">
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-orange-50 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-orange-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                </div>
                                <h4 className="text-lg font-semibold text-gray-900">Delivery Information</h4>
                            </div>

                            <dl className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Personal Information */}
                                <div className="space-y-4">
                                    {/* Full Name */}
                                    <div className="flex items-center p-3 rounded-lg hover:bg-gray-50/80 transition-colors duration-200">
                                        <div className="flex items-center gap-3 flex-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                            <dt className="text-sm text-gray-600">Full Name</dt>
                                        </div>
                                        <dd className="text-sm font-medium text-gray-900">{transaction.deliveryAddress.fullName}</dd>
                                    </div>

                                    {/* Phone */}
                                    <div className="flex items-center p-3 rounded-lg hover:bg-gray-50/80 transition-colors duration-200">
                                        <div className="flex items-center gap-3 flex-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            <dt className="text-sm text-gray-600">Phone</dt>
                                        </div>
                                        <dd className="text-sm font-medium text-gray-900">{transaction.deliveryAddress.phone}</dd>
                                    </div>

                                    {/* Postal Code */}
                                    <div className="flex items-center p-3 rounded-lg hover:bg-gray-50/80 transition-colors duration-200">
                                        <div className="flex items-center gap-3 flex-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                            </svg>
                                            <dt className="text-sm text-gray-600">Postal Code</dt>
                                        </div>
                                        <dd className="text-sm font-medium text-gray-900">{transaction.deliveryAddress.postalCode}</dd>
                                    </div>
                                </div>

                                {/* Address Information */}
                                <div className="space-y-4">
                                    {/* Province */}
                                    <div className="flex items-center p-3 rounded-lg hover:bg-gray-50/80 transition-colors duration-200">
                                        <div className="flex items-center gap-3 flex-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                            </svg>
                                            <dt className="text-sm text-gray-600">Province</dt>
                                        </div>
                                        <dd className="text-sm font-medium text-gray-900">{transaction.deliveryAddress.province}</dd>
                                    </div>

                                    {/* City */}
                                    <div className="flex items-center p-3 rounded-lg hover:bg-gray-50/80 transition-colors duration-200">
                                        <div className="flex items-center gap-3 flex-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <dt className="text-sm text-gray-600">City</dt>
                                        </div>
                                        <dd className="text-sm font-medium text-gray-900">{transaction.deliveryAddress.city}</dd>
                                    </div>

                                    {/* District */}
                                    <div className="flex items-center p-3 rounded-lg hover:bg-gray-50/80 transition-colors duration-200">
                                        <div className="flex items-center gap-3 flex-1">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                                            </svg>
                                            <dt className="text-sm text-gray-600">District</dt>
                                        </div>
                                        <dd className="text-sm font-medium text-gray-900">{transaction.deliveryAddress.district}</dd>
                                    </div>
                                </div>

                                {/* Street Address */}
                                <div className="md:col-span-2">
                                    <div className="flex items-start p-3 rounded-lg hover:bg-gray-50/80 transition-colors duration-200">
                                        <div className="flex items-center gap-3">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                            </svg>
                                            <dt className="text-sm text-gray-600">Street Address</dt>
                                        </div>
                                        <dd className="flex-1 text-sm font-medium text-gray-900 text-right">
                                            {transaction.deliveryAddress.streetAddress}
                                        </dd>
                                    </div>
                                </div>

                                {/* Additional Details - if exists */}
                                {transaction.deliveryAddress.details && (
                                    <div className="md:col-span-2">
                                        <div className="flex items-start p-3 rounded-lg hover:bg-gray-50/80 transition-colors duration-200">
                                            <div className="flex items-center gap-3">
                                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                </svg>
                                                <dt className="text-sm text-gray-600">Additional Details</dt>
                                            </div>
                                            <dd className="flex-1 text-sm font-medium text-gray-900 text-right">
                                                {transaction.deliveryAddress.details}
                                            </dd>
                                        </div>
                                    </div>
                                )}
                            </dl>
                        </div>
                    )}

                    {/* Timestamps */}
                    <div className="mt-6 pt-4 border-t border-gray-200">
                        <div className="flex flex-col sm:flex-row sm:justify-between gap-4">
                            <div>
                                <span className="text-sm text-gray-500">Created:</span>
                                <span className="ml-2 text-sm font-medium text-gray-900">
                                    {transaction.createdAt.toDate().toLocaleString('id-ID')}
                                </span>
                            </div>
                            <div>
                                <span className="text-sm text-gray-500">Last Updated:</span>
                                <span className="ml-2 text-sm font-medium text-gray-900">
                                    {transaction.updatedAt.toDate().toLocaleString('id-ID')}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}