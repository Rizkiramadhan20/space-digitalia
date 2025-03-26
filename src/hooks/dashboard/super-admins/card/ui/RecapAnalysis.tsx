import React from 'react';

import { FiBarChart2, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

import { RecapAnalysisSectionProps } from '@/hooks/dashboard/super-admins/card/types/dashboard';

export default function RecapAnalysisSection({ recapStats }: RecapAnalysisSectionProps) {
    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Analisis Rekap Transaksi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Total Transaction Value Card */}
                <div className="bg-white backdrop-blur-lg rounded-3xl p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div className="w-14 h-14 bg-blue-100/50 backdrop-blur rounded-2xl flex items-center justify-center">
                            <FiBarChart2 className="w-7 h-7 text-blue-600" />
                        </div>
                        <span className="px-4 py-1.5 bg-blue-100/50 backdrop-blur text-blue-600 text-sm font-medium rounded-full">
                            Total Value
                        </span>
                    </div>
                    <div className="mt-6">
                        <h3 className="text-3xl font-bold mb-2">
                            Rp {recapStats.totalAmount.toLocaleString('id-ID')}
                        </h3>
                        <p className="text-slate-600 text-sm">Total Nilai Transaksi</p>
                    </div>
                </div>

                {/* Successful Transactions Card */}
                <div className="bg-white backdrop-blur-lg rounded-3xl p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div className="w-14 h-14 bg-green-100/50 backdrop-blur rounded-2xl flex items-center justify-center">
                            <FiTrendingUp className="w-7 h-7 text-green-600" />
                        </div>
                        <span className="px-4 py-1.5 bg-green-100/50 backdrop-blur text-green-600 text-sm font-medium rounded-full">
                            Success
                        </span>
                    </div>
                    <div className="mt-6">
                        <h3 className="text-3xl font-bold mb-2">
                            Rp {recapStats.successAmount.toLocaleString('id-ID')}
                        </h3>
                        <p className="text-slate-600 text-sm">
                            {recapStats.successTransactions} Transaksi Sukses
                        </p>
                    </div>
                </div>

                {/* Average Transaction Value Card */}
                <div className="bg-white backdrop-blur-lg rounded-3xl p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div className="w-14 h-14 bg-purple-100/50 backdrop-blur rounded-2xl flex items-center justify-center">
                            <FiBarChart2 className="w-7 h-7 text-purple-600" />
                        </div>
                        <span className="px-4 py-1.5 bg-purple-100/50 backdrop-blur text-purple-600 text-sm font-medium rounded-full">
                            Average
                        </span>
                    </div>
                    <div className="mt-6">
                        <h3 className="text-3xl font-bold mb-2">
                            Rp {recapStats.averageTransactionValue.toLocaleString('id-ID')}
                        </h3>
                        <p className="text-slate-600 text-sm">Rata-rata Transaksi</p>
                    </div>
                </div>

                {/* Pending Transactions Card */}
                <div className="bg-white backdrop-blur-lg rounded-3xl p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div className="w-14 h-14 bg-yellow-100/50 backdrop-blur rounded-2xl flex items-center justify-center">
                            <FiTrendingDown className="w-7 h-7 text-yellow-600" />
                        </div>
                        <span className="px-4 py-1.5 bg-yellow-100/50 backdrop-blur text-yellow-600 text-sm font-medium rounded-full">
                            Pending
                        </span>
                    </div>
                    <div className="mt-6">
                        <h3 className="text-3xl font-bold mb-2">
                            Rp {recapStats.pendingAmount.toLocaleString('id-ID')}
                        </h3>
                        <p className="text-slate-600 text-sm">
                            {recapStats.pendingTransactions} Transaksi Pending
                        </p>
                    </div>
                </div>

                {/* Failed Transactions Card */}
                <div className="bg-white backdrop-blur-lg rounded-3xl p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div className="w-14 h-14 bg-red-100/50 backdrop-blur rounded-2xl flex items-center justify-center">
                            <FiTrendingDown className="w-7 h-7 text-red-600" />
                        </div>
                        <span className="px-4 py-1.5 bg-red-100/50 backdrop-blur text-red-600 text-sm font-medium rounded-full">
                            Failed
                        </span>
                    </div>
                    <div className="mt-6">
                        <h3 className="text-3xl font-bold mb-2">
                            Rp {recapStats.failedAmount.toLocaleString('id-ID')}
                        </h3>
                        <p className="text-slate-600 text-sm">
                            {recapStats.failedTransactions} Transaksi Gagal
                        </p>
                    </div>
                </div>

                {/* Total Transactions Count Card */}
                <div className="bg-white backdrop-blur-lg rounded-3xl p-6 shadow-lg">
                    <div className="flex items-center justify-between">
                        <div className="w-14 h-14 bg-indigo-100/50 backdrop-blur rounded-2xl flex items-center justify-center">
                            <FiBarChart2 className="w-7 h-7 text-indigo-600" />
                        </div>
                        <span className="px-4 py-1.5 bg-indigo-100/50 backdrop-blur text-indigo-600 text-sm font-medium rounded-full">
                            Total
                        </span>
                    </div>
                    <div className="mt-6">
                        <h3 className="text-3xl font-bold mb-2">
                            {recapStats.totalTransactions}
                        </h3>
                        <p className="text-slate-600 text-sm">Total Jumlah Transaksi</p>
                    </div>
                </div>
            </div>
        </div>
    );
}