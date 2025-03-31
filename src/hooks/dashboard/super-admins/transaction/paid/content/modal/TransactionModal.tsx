import Image from 'next/image'

import { TransactionModalProps } from '@/hooks/dashboard/super-admins/transaction/paid/lib/paid'

export default function TransactionModal({ isOpen, transaction, onClose }: TransactionModalProps) {
    if (!isOpen || !transaction) return null;

    const handleClickOutside = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="fixed inset-0 bg-black/75 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50" onClick={handleClickOutside}>
            <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl transform transition-all my-4">
                {/* Modal Header */}
                <div className="p-4 sm:p-6 border-b">
                    <div className="flex justify-between items-start sm:items-center gap-4">
                        <div className="space-y-1">
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Transaction Details</h2>
                            <p className="text-sm text-gray-500 flex items-center gap-2">
                                <span className="inline-block w-2 h-2 rounded-full bg-green-500"></span>
                                Order ID: {transaction.orderId}
                            </p>
                        </div>
                        <button
                            onClick={onClose}
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
                                src={transaction.imageUrl}
                                alt={transaction.projectTitle}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                                sizes="(max-width: 640px) 100vw, (max-width: 768px) 80vw, 700px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                            <div className="bg-gray-50 p-3 sm:p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                <span className="text-sm font-medium text-gray-500 block mb-1">Project Title</span>
                                <span className="font-semibold text-gray-800">{transaction.projectTitle}</span>
                            </div>

                            <div className="bg-gray-50 p-3 sm:p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                <span className="text-sm font-medium text-gray-500 block mb-1">Project ID</span>
                                <span className="font-mono font-semibold text-gray-800">{transaction.projectId}</span>
                            </div>

                            <div className="bg-gray-50 p-3 sm:p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                <span className="text-sm font-medium text-gray-500 block mb-1">License Type</span>
                                <span className="inline-flex px-3 py-1 text-sm font-medium rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                                    {transaction.licenseType}
                                </span>
                            </div>

                            <div className="bg-indigo-50 p-3 sm:p-4 rounded-xl hover:bg-indigo-100 transition-colors duration-200">
                                <span className="text-sm font-medium text-indigo-600 block mb-1">Amount</span>
                                <span className="font-semibold text-indigo-700">
                                    Rp {transaction.amount.toLocaleString('id-ID')}
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
                                <span className="font-semibold text-gray-800">{transaction.deliveryMethod}</span>
                            </div>
                            <div className="bg-gray-50 p-3 sm:p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                <span className="text-sm font-medium text-gray-500 block mb-1">Status Delivery</span>
                                {transaction.statusDelivery ? (
                                    <span className="font-medium text-gray-800">
                                        {(() => {
                                            const status = transaction.statusDelivery;
                                            const statusIcons = {
                                                pending: '🕒',
                                                processing: '⚙️',
                                                shipping: '🚚',
                                                delivered: '📦',
                                                completed: '✅',
                                                cancelled: '❌'
                                            };
                                            return `${statusIcons[status as keyof typeof statusIcons]} ${status.charAt(0).toUpperCase() + status.slice(1)}`;
                                        })()}
                                    </span>
                                ) : (
                                    <span className="font-semibold text-red-500">N/A</span>
                                )}
                            </div>
                        </div>

                        {transaction.deliveryAddress && (
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
                                            <div className="relative w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center overflow-hidden">
                                                {
                                                    transaction.userPhotoURL ? (
                                                        <Image
                                                            src={transaction.userPhotoURL}
                                                            alt={transaction.userName}
                                                            fill
                                                            sizes="32px"
                                                            className="object-cover"
                                                        />
                                                    ) : (
                                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                                        </svg>
                                                    )
                                                }
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-800">{transaction.deliveryAddress.fullName}</p>
                                                <p className="text-sm text-gray-600">{transaction.deliveryAddress.phone}</p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="col-span-2 space-y-3 sm:space-y-4">
                                        <div className="bg-gray-50 p-3 sm:p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                            <span className="text-sm font-medium text-gray-500 block mb-1">Street Address</span>
                                            <span className="font-medium text-gray-800">{transaction.deliveryAddress.streetAddress}</span>
                                        </div>

                                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6">
                                            <div className="bg-gray-50 p-3 sm:p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                                <span className="text-sm font-medium text-gray-500 block mb-1">City</span>
                                                <span className="font-medium text-gray-800">{transaction.deliveryAddress.city}</span>
                                            </div>
                                            <div className="bg-gray-50 p-3 sm:p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                                <span className="text-sm font-medium text-gray-500 block mb-1">Province</span>
                                                <span className="font-medium text-gray-800">{transaction.deliveryAddress.province}</span>
                                            </div>
                                            <div className="bg-gray-50 p-3 sm:p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                                <span className="text-sm font-medium text-gray-500 block mb-1">Postal Code</span>
                                                <span className="font-medium text-gray-800">{transaction.deliveryAddress.postalCode}</span>
                                            </div>
                                        </div>

                                        <div className="bg-gray-50 p-3 sm:p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                            <span className="text-sm font-medium text-gray-500 block mb-1">Additional Details</span>
                                            <span className="font-medium text-gray-800">{transaction.deliveryAddress.details}</span>
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
                                    <span className="font-semibold text-gray-800">{transaction.paymentMethod}</span>
                                </div>
                                <div className="bg-gray-50 p-3 sm:p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                    <span className="text-sm font-medium text-gray-500 block mb-1">Status Transaksi</span>
                                    <span className={`font-semibold ${transaction.status === 'success' ? 'text-green-600' :
                                        transaction.status === 'pending' ? 'text-yellow-600' :
                                            'text-red-600'
                                        }`}>
                                        {transaction.status.toUpperCase()}
                                    </span>
                                </div>
                                <div className="bg-gray-50 p-3 sm:p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                    <span className="text-sm font-medium text-gray-500 block mb-1">Transaction Time</span>
                                    <span className="font-semibold text-gray-800">
                                        {transaction.paymentDetails.transaction_time}
                                    </span>
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="space-y-3 sm:space-y-4">
                                <div className="bg-gray-50 p-3 sm:p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                    <span className="text-sm font-medium text-gray-500 block mb-1">Order ID</span>
                                    <span className="font-mono font-semibold text-gray-800">{transaction.orderId}</span>
                                </div>
                                <div className="bg-gray-50 p-3 sm:p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                    <span className="text-sm font-medium text-gray-500 block mb-1">Amount</span>
                                    <span className="font-semibold text-gray-800">Rp {transaction.amount.toLocaleString()}</span>
                                </div>
                                <div className="bg-gray-50 p-3 sm:p-4 rounded-xl hover:bg-gray-100 transition-colors duration-200">
                                    <span className="text-sm font-medium text-gray-500 block mb-1">Transaction ID</span>
                                    <span className="font-mono font-semibold text-gray-800">
                                        {transaction.paymentDetails.transaction_id}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* VA Numbers Section */}
                        {transaction.paymentDetails.va_numbers && transaction.paymentDetails.va_numbers.length > 0 && (
                            <div className="mt-6 sm:mt-8 pt-4 sm:pt-6 border-t border-gray-100">
                                <h4 className="text-base sm:text-md font-semibold mb-4 sm:mb-6 text-gray-700">Virtual Account Numbers</h4>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-6">
                                    {transaction.paymentDetails.va_numbers.map((va, index) => (
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
                                    <span className="font-semibold text-gray-800">{transaction.userName}</span>
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
                                    <span className="font-medium text-gray-800">{transaction.userEmail}</span>
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
                                    <span className="font-mono font-medium text-gray-800">{transaction.userId}</span>
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
                                            {transaction.createdAt.toDate().toLocaleString('id-ID', {
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
                                            {transaction.updatedAt.toDate().toLocaleString('id-ID', {
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
    );
}