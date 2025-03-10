import React from 'react'
import { Filters, Transaction } from '@/hooks/dashboard/user/transaction/transaction/lib/schema'

interface FilterProps {
    setFilters: (filters: Filters | ((prev: Filters) => Filters)) => void;
    filters: Filters;
    setFilteredTransactions: (transactions: Transaction[]) => void;
    transactions: Transaction[];
    applyFilters: () => void;
}

export default function Filter({ setFilters, filters, setFilteredTransactions, transactions, applyFilters }: FilterProps) {
    return (
        <div className="bg-white/60 backdrop-blur-lg rounded-3xl shadow-xl mb-8 border border-gray-100/20">
            <div className="p-6 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {/* Status Filter */}
                    <div className="space-y-3">
                        <label className="text-gray-700 font-semibold flex items-center gap-2">
                            <span className="h-1.5 w-1.5 bg-indigo-600 rounded-full"></span>
                            Status Transaksi
                        </label>
                        <div className="flex flex-wrap gap-2">
                            {[
                                { id: 'pending', icon: '🕒', label: 'Pending' },
                                { id: 'success', icon: '✅', label: 'Success' },
                                { id: 'cancelled', icon: '❌', label: 'Cancelled' }
                            ].map(({ id, icon, label }) => (
                                <div
                                    key={id}
                                    onClick={() => {
                                        setFilters((prev: Filters) => ({
                                            ...prev,
                                            status: prev.status.includes(id) ? [] : [id]
                                        }));
                                    }}
                                    className={`cursor-pointer px-4 py-2.5 rounded-2xl border-2 transition-all duration-300 flex items-center gap-2 flex-1 min-w-[120px]
                                        ${filters.status.includes(id)
                                            ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-700 shadow-sm shadow-indigo-100'
                                            : 'bg-white/50 border-transparent hover:border-gray-200 text-gray-600 hover:bg-gray-50/50'
                                        }`}
                                >
                                    <span className="text-xl">{icon}</span>
                                    <span className="font-medium">{label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Payment Method Filter */}
                    <div className="space-y-3">
                        <label className="text-gray-700 font-semibold flex items-center gap-2">
                            <span className="h-1.5 w-1.5 bg-indigo-600 rounded-full"></span>
                            Metode Pengiriman
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { id: 'delivery', icon: '🚚', label: 'Delivery' },
                                { id: 'download', icon: '⬇️', label: 'Download' }
                            ].map(({ id, icon, label }) => (
                                <div
                                    key={id}
                                    onClick={() => {
                                        setFilters((prev: Filters) => ({
                                            ...prev,
                                            paymentMethod: prev.paymentMethod.includes(id) ? [] : [id]
                                        }));
                                    }}
                                    className={`cursor-pointer px-4 py-3 rounded-2xl border-2 transition-all duration-300 flex items-center gap-2
                                        ${filters.paymentMethod.includes(id)
                                            ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-700 shadow-sm shadow-indigo-100'
                                            : 'bg-white/50 border-transparent hover:border-gray-200 text-gray-600 hover:bg-gray-50/50'
                                        }`}
                                >
                                    <span className="text-xl">{icon}</span>
                                    <span className="font-medium">{label}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Payment Type Filter */}
                    <div className="space-y-3">
                        <label className="text-gray-700 font-semibold flex items-center gap-2">
                            <span className="h-1.5 w-1.5 bg-indigo-600 rounded-full"></span>
                            Tipe Pembayaran
                        </label>
                        <div className="grid grid-cols-2 gap-3">
                            {[
                                { id: 'bank_transfer', icon: '🏦', label: 'Bank Transfer' },
                                { id: 'echannel', icon: '💳', label: 'E-Channel' },
                                { id: 'gopay', icon: '📱', label: 'GoPay' },
                                { id: 'qris', icon: '📲', label: 'QRIS' },
                                {
                                    id: 'free',
                                    icon: (
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                                        </svg>
                                    ),
                                    label: 'Free'
                                }
                            ].map(({ id, icon, label }) => (
                                <div
                                    key={id}
                                    onClick={() => {
                                        setFilters((prev: Filters) => ({
                                            ...prev,
                                            paymentType: prev.paymentType.includes(id) ? [] : [id]
                                        }));
                                    }}
                                    className={`cursor-pointer px-4 py-3 rounded-2xl border-2 transition-all duration-300 flex items-center gap-2
                                        ${filters.paymentType.includes(id)
                                            ? 'bg-indigo-500/10 border-indigo-500/20 text-indigo-700 shadow-sm shadow-indigo-100'
                                            : 'bg-white/50 border-transparent hover:border-gray-200 text-gray-600 hover:bg-gray-50/50'
                                        }`}
                                >
                                    <span className={`text-xl ${typeof icon === 'string' ? '' : 'text-current'}`}>
                                        {icon}
                                    </span>
                                    <span className="font-medium">{label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Filter Actions */}
                <div className="flex justify-end gap-4 pt-4 border-t border-gray-100">
                    <button
                        onClick={() => {
                            setFilters({
                                status: [],
                                paymentMethod: [],
                                paymentType: []
                            });
                            setFilteredTransactions(transactions);
                        }}
                        className="px-6 py-2.5 rounded-xl border-2 border-gray-200 text-gray-600 hover:bg-gray-50 hover:border-gray-300 transition-all duration-300 flex items-center gap-2 font-medium"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                        Reset Filter
                    </button>
                    <button
                        onClick={applyFilters}
                        className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white transition-all duration-300 flex items-center gap-2 font-medium shadow-lg shadow-indigo-100 hover:shadow-xl hover:shadow-indigo-200 transform hover:-translate-y-0.5"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                        Terapkan Filter
                    </button>
                </div>
            </div>
        </div>
    )
}
