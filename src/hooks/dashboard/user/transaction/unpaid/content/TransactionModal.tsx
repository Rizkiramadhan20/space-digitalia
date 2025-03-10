import React from 'react';
import Image from 'next/image';
import { Transaction } from '../lib';

// Helper Components
const InfoSection: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div className="p-4 rounded-lg bg-gray-50 border border-gray-100">
        <p className="text-sm text-gray-500 mb-1">{label}</p>
        <p className="font-medium">{value}</p>
    </div>
);

const AddressItem: React.FC<{ label: string; value: string }> = ({ label, value }) => (
    <div>
        <span className="text-gray-500">{label}:</span>{' '}
        <span className="font-medium">{value}</span>
    </div>
);

interface TransactionModalProps {
    transaction: Transaction;
    isOpen: boolean;
    onClose: () => void;
}

export const TransactionModal: React.FC<TransactionModalProps> = ({
    transaction,
    isOpen,
    onClose
}) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[999] bg-black/40 backdrop-blur-sm overflow-hidden">
            <div className="min-h-screen px-4 py-4 sm:px-6 lg:px-8 flex items-center justify-center">
                <div className="w-full max-w-4xl bg-white rounded-2xl shadow-xl transform transition-all flex flex-col max-h-[calc(100vh-32px)]">
                    {/* Header Image Section */}
                    <div className="relative h-48 sm:h-44 w-full rounded-t-2xl overflow-hidden flex-shrink-0">
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent z-10" />
                        <Image
                            src={transaction.imageUrl}
                            alt={transaction.projectTitle}
                            fill
                            className="object-cover transition duration-300 hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            priority
                        />
                        <div className="absolute bottom-6 left-6 right-6 z-20">
                            <h3 className="text-xl sm:text-2xl font-bold text-white">
                                {transaction.projectTitle}
                            </h3>
                        </div>
                    </div>

                    {/* Content Section */}
                    <div className="p-4 sm:p-6 lg:p-8 overflow-y-auto flex-grow">
                        {/* Status Section */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            <div className="p-4 rounded-xl bg-white shadow-sm border border-gray-100 hover:border-gray-200 transition-all">
                                <p className="text-sm text-gray-500 mb-2">Status</p>
                                <div className="flex items-center gap-2">
                                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse" />
                                    <span className="font-medium text-gray-900">{transaction.status}</span>
                                </div>
                            </div>

                            <div className="p-4 rounded-xl bg-white shadow-sm border border-gray-100 hover:border-gray-200 transition-all">
                                <p className="text-sm text-gray-500 mb-2">Amount</p>
                                <p className="font-medium text-gray-900">Rp {transaction.amount.toLocaleString('id-ID')}</p>
                            </div>
                        </div>

                        {/* Order Details */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                            <div className="p-4 rounded-xl bg-white shadow-sm border border-gray-100 hover:border-gray-200 transition-all">
                                <p className="text-sm text-gray-500 mb-2">Order ID</p>
                                <p className="font-medium text-gray-900">#{transaction.orderId}</p>
                            </div>

                            {
                                transaction.paymentMethod === 'delivery' && (
                                    <div className="p-4 rounded-xl bg-white shadow-sm border border-gray-100 hover:border-gray-200 transition-all">
                                        <p className="text-sm text-gray-500 mb-2">Delivery Status</p>
                                        <div className="flex items-center gap-2">
                                            <span className="w-2.5 h-2.5 rounded-full bg-yellow-400 animate-pulse" />
                                            <span className="font-medium text-gray-900">{transaction.statusDelivery}</span>
                                        </div>
                                    </div>
                                )
                            }
                        </div>

                        {/* Transaction Details */}
                        <div className="space-y-4">
                            <InfoSection label="Transaction ID" value={transaction.transactionId || 'N/A'} />
                            <InfoSection label="License Type" value={transaction.licenseType || 'N/A'} />
                            <InfoSection label="Delivery Method" value={transaction.deliveryMethod || 'N/A'} />
                            <InfoSection label="Payment Method" value={transaction.paymentMethod || 'N/A'} />

                            {/* Customer Info */}
                            <div className="p-4 rounded-xl bg-white shadow-sm border border-gray-100 hover:border-gray-200 transition-all">
                                <p className="text-sm text-gray-500 mb-3">Customer</p>
                                <p className="font-medium text-gray-900">{transaction.userName}</p>
                                <p className="text-sm text-gray-500 mt-1">{transaction.userEmail}</p>
                            </div>

                            {/* Delivery Address */}
                            {transaction.deliveryAddress && (
                                <div className="p-4 rounded-xl bg-white shadow-sm border border-gray-100 hover:border-gray-200 transition-all">
                                    <p className="text-sm text-gray-500 mb-4">Delivery Address</p>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-3 gap-x-6 text-sm">
                                        <AddressItem label="Name" value={transaction.deliveryAddress.fullName} />
                                        <AddressItem label="Phone" value={transaction.deliveryAddress.phone} />
                                        <AddressItem label="Street" value={transaction.deliveryAddress.streetAddress} />
                                        <AddressItem label="Details" value={transaction.deliveryAddress.details} />
                                        <AddressItem label="District" value={transaction.deliveryAddress.district} />
                                        <AddressItem label="City" value={transaction.deliveryAddress.city} />
                                        <AddressItem label="Province" value={transaction.deliveryAddress.province} />
                                        <AddressItem label="Postal Code" value={transaction.deliveryAddress.postalCode} />
                                    </div>
                                </div>
                            )}

                            {/* Payment Details */}
                            {transaction.paymentDetails && (
                                <div className="p-6 rounded-2xl bg-white shadow-lg border border-gray-100 hover:border-gray-200 transition-all duration-300">
                                    <div className="flex items-center gap-3 mb-6">
                                        <div className="p-2 rounded-lg bg-indigo-50">
                                            <svg className="w-5 h-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <h3 className="text-lg font-semibold text-gray-900">Payment Details</h3>
                                    </div>
                                    <div className="space-y-4 text-sm">
                                        <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                                            <span className="text-gray-600">Status</span>
                                            <span className="font-medium text-gray-900">{transaction.paymentDetails.transaction_status}</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                                            <span className="text-gray-600">Message</span>
                                            <span className="font-medium text-gray-900">{transaction.paymentDetails.status_message}</span>
                                        </div>
                                        <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                                            <span className="text-gray-600">Payment Type</span>
                                            <span className="font-medium text-gray-900">{transaction.paymentDetails.payment_type}</span>
                                        </div>
                                        {transaction.paymentDetails.va_numbers && (
                                            <div className="border-t border-gray-100">
                                                {transaction.paymentDetails.va_numbers.map((va, index) => (
                                                    <div key={index} className="space-y-3">
                                                        <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                                                            <span className="text-gray-600">Bank</span>
                                                            <span className="font-medium text-gray-900">{va.bank}</span>
                                                        </div>
                                                        <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors">
                                                            <span className="text-gray-600">VA Number</span>
                                                            <span className="font-medium text-gray-900">{va.va_number}</span>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-4 sm:p-6 border-t border-gray-100 flex-shrink-0">
                        <button
                            type="button"
                            onClick={onClose}
                            className="w-full sm:w-auto px-6 py-3 bg-gray-900 text-white rounded-xl font-medium
                                     hover:bg-gray-800 active:bg-gray-950 transition-colors duration-200
                                     flex items-center justify-center gap-2 focus:outline-none focus:ring-2 
                                     focus:ring-gray-900 focus:ring-offset-2"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};