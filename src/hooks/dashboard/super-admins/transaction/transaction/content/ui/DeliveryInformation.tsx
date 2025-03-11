'use client'

import React from 'react'

import { DeliveryInformationProps } from '@/hooks/dashboard/super-admins/transaction/transaction/lib/schema'

export default function DeliveryInformation({ transaction }: DeliveryInformationProps) {
    if (!transaction.deliveryAddress) return null

    return (
        <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 hover:shadow-lg transition-all duration-300">
            <h3 className="text-lg font-semibold mb-6 flex items-center gap-2 bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Informasi Pengiriman
            </h3>
            <div className="space-y-4">
                {/* Delivery Status */}
                <div className="bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">Status Pengiriman</span>
                        <span className={`font-medium px-3 py-1 rounded-full text-sm capitalize ${transaction.statusDelivery === 'pending'
                            ? 'bg-amber-100 text-amber-800'
                            : 'bg-green-100 text-green-800'
                            }`}>
                            {transaction.statusDelivery}
                        </span>
                    </div>
                </div>

                {/* Recipient Info */}
                <div className="bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">Nama Penerima</span>
                        <span className="font-medium text-gray-800 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                            {transaction.deliveryAddress.fullName}
                        </span>
                    </div>
                </div>

                {/* Phone */}
                <div className="bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">Nomor Telepon</span>
                        <span className="font-medium text-gray-800 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                            {transaction.deliveryAddress.phone}
                        </span>
                    </div>
                </div>

                {/* Address */}
                <div className="bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">Alamat</span>
                        <span className="font-medium text-gray-800 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                            {transaction.deliveryAddress.streetAddress}
                        </span>
                    </div>
                </div>

                {/* City & Province */}
                <div className="bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">Kota</span>
                        <span className="font-medium text-gray-800 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                            {transaction.deliveryAddress.city}, {transaction.deliveryAddress.province} {transaction.deliveryAddress.postalCode}
                        </span>
                    </div>
                </div>

                {/* Additional Info */}
                <div className="bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">Catatan Tambahan</span>
                        <span className="font-medium text-gray-800 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-100">
                            {transaction.deliveryAddress.details}
                        </span>
                    </div>
                </div>

                {/* Location Map Link */}
                <div className="bg-gray-50/50 p-4 rounded-xl hover:bg-gray-50 transition-all duration-200 group">
                    <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-500 group-hover:text-gray-600 transition-colors">Lokasi</span>
                        <a
                            href={`https://maps.google.com/?q=${transaction.deliveryAddress.district}`}
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
    )
}