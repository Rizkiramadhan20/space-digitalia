import Image from 'next/image'

import { toast } from "react-hot-toast"

import { TransactionDetailsModalProps } from '@/hooks/dashboard/super-admins/transaction/unpaid/lib/schema'

export function TransactionDetailsModal({ transaction, onClose, handleClickOutside }: TransactionDetailsModalProps) {
    return (
        <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={handleClickOutside}
        >
            <div className="w-full max-w-5xl bg-white rounded-2xl shadow-xl my-4 max-h-[90vh] flex flex-col">
                {/* Modal Header - Sticky */}
                <div className="sticky top-0 bg-white z-10 p-6 border-b border-gray-100 rounded-t-2xl">
                    <div className="flex justify-between items-center">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                                Transaction Details
                            </h2>
                            <div className="flex items-center gap-2 mt-1">
                                <span className="text-sm text-gray-500">Order ID:</span>
                                <span className="text-sm font-medium text-gray-700">{transaction.orderId}</span>
                            </div>
                        </div>
                        <button
                            onClick={(e) => {
                                e.stopPropagation();
                                onClose();
                            }}
                            className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-all"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>

                {/* Modal Content - Scrollable */}
                <div className="flex-1 overflow-y-auto p-4 sm:p-6">
                    {/* Project Overview Card */}
                    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
                        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4">
                            <div className="relative w-full sm:w-40 h-40 rounded-lg overflow-hidden">
                                <Image
                                    src={transaction.imageUrl}
                                    alt={transaction.projectTitle}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-3">
                                    {transaction.projectTitle}
                                </h3>
                                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                                    <div>
                                        <span className="text-sm text-gray-500 block mb-1">Amount</span>
                                        <span className="text-base sm:text-lg font-semibold text-green-600">
                                            Rp {transaction.amount.toLocaleString('id-ID')}
                                        </span>
                                    </div>
                                    <div>
                                        <span className="text-sm text-gray-500 block mb-1">Status</span>
                                        <span className={`inline-flex px-3 py-1 text-sm font-medium rounded-full
                                            ${transaction.status === 'success' ? 'bg-green-100 text-green-700' :
                                                transaction.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                                                    'bg-red-100 text-red-700'}`}>
                                            {transaction.status.toUpperCase()}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6 mt-6">
                        {/* Basic Information */}
                        <div className="bg-gray-50 rounded-xl p-6">
                            <h4 className="text-base font-semibold text-gray-900 mb-4">Basic Information</h4>
                            <dl className="space-y-4">
                                <div className="flex justify-between">
                                    <dt className="text-sm text-gray-600">Project ID</dt>
                                    <dd className="text-sm font-medium text-gray-900">{transaction.projectId}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-sm text-gray-600">License Type</dt>
                                    <dd className="text-sm font-medium text-gray-900">{transaction.licenseType}</dd>
                                </div>
                                <div className="flex justify-between">
                                    <dt className="text-sm text-gray-600">Delivery Method</dt>
                                    <dd className="text-sm font-medium text-gray-900">{transaction.deliveryMethod}</dd>
                                </div>
                            </dl>
                        </div>

                        {/* User Information */}
                        <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200 shadow-sm">
                            <h4 className="text-base font-semibold text-gray-900 mb-6">User Information</h4>
                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                {/* User Photo */}
                                <div className="relative w-24 h-24 sm:w-32 sm:h-32">
                                    {transaction.userPhotoURL ? (
                                        <Image
                                            src={transaction.userPhotoURL}
                                            alt={transaction.userName}
                                            fill
                                            className="rounded-2xl object-cover ring-4 ring-white shadow-lg"
                                        />
                                    ) : (
                                        <div className="w-full h-full rounded-2xl bg-gradient-to-br from-indigo-100 to-indigo-50 flex items-center justify-center">
                                            <svg className="w-12 h-12 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                            </svg>
                                        </div>
                                    )}
                                </div>

                                {/* User Details */}
                                <div className="flex-1 min-w-0 text-center sm:text-left">
                                    <h5 className="text-xl font-bold text-gray-900 mb-2">
                                        {transaction.userName}
                                    </h5>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-600">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            <span className="text-sm">{transaction.userEmail}</span>
                                        </div>
                                        <div className="flex items-center justify-center sm:justify-start gap-2 text-gray-600">
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0m-5 8a2 2 0 100-4 2 2 0 000 4zm0 0c1.306 0 2.417.835 2.83 2M9 14a3.001 3.001 0 00-2.83 2M15 11h3m-3 4h2" />
                                            </svg>
                                            <span className="text-sm">ID: {transaction.userId.slice(0, 8)}...</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='grid grid-cols-2 gap-6 mt-6'>
                        {/* Payment Details */}
                        <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200 shadow-sm">
                            <h4 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                                </svg>
                                Payment Details
                            </h4>

                            <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                                {/* Status Badge - Full Width */}
                                <div className="col-span-1 sm:col-span-2 bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                                    <dt className="text-sm text-gray-500 mb-1">Transaction Status</dt>
                                    <dd className="flex items-center gap-2">
                                        <span className={`w-2 h-2 rounded-full ${transaction.paymentDetails?.transaction_status === 'success' ? 'bg-green-500' :
                                            transaction.paymentDetails?.transaction_status === 'pending' ? 'bg-yellow-500' :
                                                'bg-red-500'
                                            }`}></span>
                                        <span className="text-sm font-semibold text-gray-900">
                                            {transaction.paymentDetails?.status_message || 'Status not available'}
                                        </span>
                                    </dd>
                                </div>

                                {/* Amount - Highlighted */}
                                <div className="col-span-1 sm:col-span-2 bg-indigo-50 rounded-lg p-4 border border-indigo-100">
                                    <dt className="text-sm text-indigo-600 mb-1">Amount</dt>
                                    <dd className="text-2xl font-bold text-indigo-700">
                                        Rp {parseInt(transaction.paymentDetails?.gross_amount || '0').toLocaleString('id-ID')}
                                    </dd>
                                </div>

                                {/* Payment Method Info */}
                                <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                                    <dt className="text-sm text-gray-500 mb-1">Payment Method</dt>
                                    <dd className="text-sm font-semibold text-gray-900 capitalize">
                                        {(transaction.paymentDetails?.payment_type || 'Not specified').replace(/_/g, ' ')}
                                    </dd>
                                </div>

                                {/* Transaction Time */}
                                <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                                    <dt className="text-sm text-gray-500 mb-1">Transaction Time</dt>
                                    <dd className="text-sm font-semibold text-gray-900">
                                        {transaction.paymentDetails?.transaction_time ?
                                            new Date(transaction.paymentDetails.transaction_time).toLocaleString('id-ID') :
                                            'Not available'
                                        }
                                    </dd>
                                </div>

                                {/* VA Numbers */}
                                {transaction.paymentDetails?.va_numbers?.map((va, index) => (
                                    <div key={index} className="col-span-1 sm:col-span-2 bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                                        <dt className="text-sm text-gray-500 mb-1">Virtual Account ({va.bank.toUpperCase()})</dt>
                                        <dd className="flex items-center gap-3">
                                            <span className="text-lg font-mono font-semibold text-gray-900">{va.va_number}</span>
                                            <button
                                                onClick={() => {
                                                    navigator.clipboard.writeText(va.va_number);
                                                    toast.success('VA Number copied to clipboard');
                                                }}
                                                className="text-indigo-600 hover:text-indigo-700 p-1 hover:bg-indigo-50 rounded-md transition-colors"
                                                title="Copy VA Number"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                                </svg>
                                            </button>
                                        </dd>
                                    </div>
                                ))}

                                {/* Transaction IDs */}
                                <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                                    <dt className="text-sm text-gray-500 mb-1">Order ID</dt>
                                    <dd className="text-sm font-mono font-medium text-gray-900">
                                        {transaction.paymentDetails?.order_id || 'Not available'}
                                    </dd>
                                </div>

                                <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                                    <dt className="text-sm text-gray-500 mb-1">Transaction ID</dt>
                                    <dd className="text-sm font-mono font-medium text-gray-900">
                                        {transaction.paymentDetails?.transaction_id || 'Not available'}
                                    </dd>
                                </div>

                                {/* Fraud Status */}
                                <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                                    <dt className="text-sm text-gray-500 mb-1">Fraud Status</dt>
                                    <dd className={`text-sm font-medium ${transaction.paymentDetails?.fraud_status === 'accept' ? 'text-green-600' : 'text-red-600'
                                        }`}>
                                        {(transaction.paymentDetails?.fraud_status || 'UNKNOWN').toUpperCase()}
                                    </dd>
                                </div>

                                {/* Actions - Full Width */}
                                <div className="col-span-1 sm:col-span-2 mt-2">
                                    <dt className="text-sm text-gray-500 mb-3">Quick Actions</dt>
                                    <dd className="flex flex-wrap gap-3">
                                        {transaction.paymentDetails?.pdf_url && (
                                            <a
                                                href={transaction.paymentDetails.pdf_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                                            >
                                                <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                                </svg>
                                                Download Invoice PDF
                                            </a>
                                        )}
                                        {transaction.paymentDetails?.finish_redirect_url && (
                                            <a
                                                href={transaction.paymentDetails.finish_redirect_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex items-center gap-2 px-4 py-2 bg-indigo-50 border border-indigo-100 rounded-lg text-sm font-medium text-indigo-600 hover:bg-indigo-100 hover:border-indigo-200 transition-all duration-200"
                                            >
                                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                                                </svg>
                                                View Status Page
                                            </a>
                                        )}
                                    </dd>
                                </div>
                            </dl>
                        </div>

                        {/* Address */}
                        {transaction.deliveryAddress && (
                            <div className="bg-gradient-to-br from-white to-gray-50 rounded-xl p-6 border border-gray-200 shadow-sm">
                                <h4 className="text-lg font-semibold text-gray-900 mb-6 flex items-center gap-2">
                                    <svg className="w-5 h-5 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    Delivery Address
                                </h4>

                                <dl className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-4">
                                    {/* Full Name */}
                                    <div className="col-span-1 sm:col-span-2 bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                                        <dt className="text-sm text-gray-500 mb-1">Full Name</dt>
                                        <dd className="text-sm font-semibold text-gray-900">
                                            {transaction.deliveryAddress.fullName}
                                        </dd>
                                    </div>

                                    {/* Phone Number */}
                                    <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                                        <dt className="text-sm text-gray-500 mb-1">Phone Number</dt>
                                        <dd className="text-sm font-mono font-medium text-gray-900">
                                            {transaction.deliveryAddress.phone}
                                        </dd>
                                    </div>

                                    {/* Postal Code */}
                                    <div className="bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                                        <dt className="text-sm text-gray-500 mb-1">Postal Code</dt>
                                        <dd className="text-sm font-mono font-medium text-gray-900">
                                            {transaction.deliveryAddress.postalCode}
                                        </dd>
                                    </div>

                                    {/* Province & City */}
                                    <div className="col-span-1 sm:col-span-2 bg-white rounded-lg p-4 border border-gray-100 shadow-sm">
                                        <dt className="text-sm text-gray-500 mb-1">Province & City</dt>
                                        <dd className="text-sm font-medium text-gray-900">
                                            {transaction.deliveryAddress.province}, {transaction.deliveryAddress.city}
                                        </dd>
                                    </div>

                                    {/* District */}
                                    <div className="col-span-1 sm:col-span-2 bg-white rounded-lg p-4 border border-gray-100 shadow-sm h-fit">
                                        <dt className="text-sm text-gray-500 mb-1">District</dt>
                                        <iframe
                                            title="Location Map"
                                            width="100%"
                                            height="100%"
                                            frameBorder="0"
                                            src={`https://www.openstreetmap.org/export/embed.html?bbox=106.62206172943115%2C-6.576112400000001%2C106.64206172943115%2C-6.572112400000001&layer=mapnik&marker=${transaction.deliveryAddress.district}`}
                                            allowFullScreen
                                        />
                                    </div>

                                    {/* Full Address */}
                                    <div className="col-span-1 sm:col-span-2 bg-indigo-50 rounded-lg p-4 border border-indigo-100">
                                        <dt className="text-sm text-indigo-600 mb-1">Complete Address</dt>
                                        <dd className="text-sm font-medium text-gray-900">
                                            {transaction.deliveryAddress.streetAddress}
                                            {transaction.deliveryAddress.details && (
                                                <p className="mt-1 text-gray-600">
                                                    Additional Details: {transaction.deliveryAddress.details}
                                                </p>
                                            )}
                                        </dd>
                                    </div>

                                    {/* Copy Address Button */}
                                    <div className="col-span-1 sm:col-span-2 mt-2">
                                        <button
                                            onClick={() => {
                                                const fullAddress = `${transaction.deliveryAddress.streetAddress}, ${transaction.deliveryAddress.district}, ${transaction.deliveryAddress.city}, ${transaction.deliveryAddress.province}, ${transaction.deliveryAddress.postalCode}`;
                                                navigator.clipboard.writeText(fullAddress);
                                                toast.success('Address copied to clipboard');
                                            }}
                                            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all duration-200"
                                        >
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                                            </svg>
                                            Copy Complete Address
                                        </button>
                                    </div>
                                </dl>
                            </div>
                        )}
                    </div>

                    {/* URLs and Links */}
                    <div className="mt-6 pt-4 border-t border-gray-200">
                        <h4 className="text-base font-semibold text-gray-900 mb-4">URLs & Links</h4>
                        <div className="space-y-3">
                            <a href={transaction.linkTransaction} target="_blank" rel="noopener noreferrer" className="block py-2 text-indigo-600 hover:text-indigo-700">
                                Transaction Link ↗
                            </a>
                        </div>
                    </div>

                    {/* Timestamps */}
                    <div className="mt-6 pt-4 border-t border-gray-200">
                        <div className="flex justify-between text-sm">
                            <div>
                                <span className="text-gray-500">Created:</span>
                                <span className="ml-2 text-gray-900">{transaction.createdAt.toDate().toLocaleString('id-ID')}</span>
                            </div>

                            <div>
                                <span className="text-gray-500">Updated:</span>
                                <span className="ml-2 text-gray-900">{transaction.updatedAt.toDate().toLocaleString('id-ID')}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}