'use client'

import React from 'react'

import { TransactionModalProps } from '@/hooks/dashboard/super-admins/transaction/transaction/lib/schema'

import ProjectOverview from '@/hooks/dashboard/super-admins/transaction/transaction/content/ui/ProjectOverview'

import UserInformation from '@/hooks/dashboard/super-admins/transaction/transaction/content/ui/UserInformation'

import LicenseAndDelivery from '@/hooks/dashboard/super-admins/transaction/transaction/content/ui/LicenceAndDelivery'

import PaymentDetails from '@/hooks/dashboard/super-admins/transaction/transaction/content/ui/PaymentDetails'

import DeliveryInformation from '@/hooks/dashboard/super-admins/transaction/transaction/content/ui/DeliveryInformation'

import QuickActions from '@/hooks/dashboard/super-admins/transaction/transaction/content/ui/QuickActions'

import Timestamps from '@/hooks/dashboard/super-admins/transaction/transaction/content/ui/Timestamps'

export default function TransactionModal({
    selectedTransaction,
    handleClickOutside,
    setIsModalOpen
}: TransactionModalProps) {
    return (
        <div
            className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-2 sm:p-4 z-50 overflow-y-auto"
            onClick={handleClickOutside}
        >
            <div className="mockup-window border border-base-300 w-full max-w-4xl bg-white my-4 sm:my-8">
                <div className="p-4 sm:p-6 max-h-[90vh] sm:max-h-[80vh] overflow-y-auto">
                    {/* Header */}
                    <div className="flex justify-between items-start mb-4 sm:mb-6">
                        <div>
                            <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
                                Detail Transaksi
                            </h2>
                            <p className="text-sm sm:text-base text-gray-500 mt-1">Order ID: {selectedTransaction.orderId}</p>
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

                    {/* Content sections */}
                    <div className="space-y-6 sm:space-y-8">
                        <ProjectOverview transaction={selectedTransaction} />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                            <div className="col-span-1">
                                <UserInformation transaction={selectedTransaction} />
                            </div>
                            <div className="col-span-1">
                                <LicenseAndDelivery transaction={selectedTransaction} />
                            </div>
                            <div className="col-span-1 md:col-span-2">
                                <PaymentDetails transaction={selectedTransaction} />
                            </div>
                        </div>

                        {selectedTransaction.deliveryMethod === "delivery" &&
                            selectedTransaction.deliveryAddress && (
                                <div className="bg-white rounded-lg shadow-sm">
                                    <DeliveryInformation transaction={selectedTransaction} />
                                </div>
                            )}

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="col-span-1 sm:col-span-2">
                                <QuickActions transaction={selectedTransaction} />
                            </div>
                            <div className="col-span-1 sm:col-span-2">
                                <Timestamps transaction={selectedTransaction} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}