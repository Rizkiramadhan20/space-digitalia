'use client'

import React from 'react'

import { TransactionHeaderProps } from '@/hooks/dashboard/super-admins/transaction/transaction/lib/schema'

export default function TransactionHeader({ isFilterModalOpen, setIsFilterModalOpen }: TransactionHeaderProps) {
    return (
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
            {/* Left side - Title and Description */}
            <div className="space-y-3">
                <div className="relative">
                    <h1 className="text-2xl lg:text-4xl font-bold">
                        <span className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent">
                            Transaksi
                        </span>
                    </h1>
                    <div className="absolute -bottom-2 left-0 w-12 h-1 bg-gradient-to-r from-indigo-600 to-indigo-400 rounded-full"></div>
                </div>
                <p className="text-gray-500 max-w-lg">
                    Manajemen dan mengorganisir transaksi Anda dengan fitur filter dan sorting yang canggih
                </p>
            </div>

            {/* Right side - Filter Button */}
            <button
                onClick={() => setIsFilterModalOpen(!isFilterModalOpen)}
                className="group relative w-full lg:w-auto px-6 py-3.5 bg-gradient-to-r from-indigo-600 to-indigo-500 hover:from-indigo-700 hover:to-indigo-600 text-white rounded-2xl transition-all duration-300 flex items-center justify-center gap-3 shadow-md hover:shadow-xl hover:shadow-indigo-100/50 transform hover:-translate-y-0.5 active:translate-y-0"
            >
                <div className="flex items-center gap-2">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`h-5 w-5 transition-transform duration-300 ${isFilterModalOpen ? 'rotate-180' : ''}`}
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
                        />
                    </svg>
                    <span className="font-medium">
                        {isFilterModalOpen ? 'Hide Filters' : 'Show Filters'}
                    </span>
                </div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-white/0 via-white/10 to-white/0 opacity-0 group-hover:opacity-100 blur-xl transition-opacity duration-300"></div>
            </button>
        </div>
    )
}