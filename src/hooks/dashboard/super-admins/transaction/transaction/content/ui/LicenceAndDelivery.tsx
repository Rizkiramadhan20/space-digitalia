'use client'

import React from 'react'

import { LicenseAndDeliveryProps } from '@/hooks/dashboard/super-admins/transaction/transaction/lib/schema'

export default function LicenseAndDelivery({ transaction }: LicenseAndDeliveryProps) {
    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
                Lisensi & Pengiriman
            </h3>
            <div className="space-y-4">
                <div className="bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">Tipe Lisensi</span>
                        <span className="font-medium text-gray-800 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                            {transaction.licenseType}
                        </span>
                    </div>
                </div>
                <div className="bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">Metode Pengiriman</span>
                        <span className="font-medium text-gray-800 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                            {transaction.deliveryMethod}
                        </span>
                    </div>
                </div>
                <div className="bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">Status Pengiriman</span>
                        <span className="font-medium text-gray-800 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                            {transaction.statusDelivery || 'N/A'}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}