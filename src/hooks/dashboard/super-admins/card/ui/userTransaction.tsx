import React from 'react';

import Image from 'next/image';

import { FiShoppingCart, FiDollarSign } from 'react-icons/fi';

import { UserTransactionSectionProps } from '@/hooks/dashboard/super-admins/card/types/dashboard';

export default function UserTransactionSection({ userTransactions }: UserTransactionSectionProps) {
    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-6">Transaksi per Pengguna</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userTransactions.map((user) => (
                    <div key={`user-${user.userId}`} className="bg-white rounded-3xl p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                        <div className="flex items-center gap-4 mb-4">
                            <Image
                                src={user.photoURL}
                                alt={user.fullName}
                                width={48}
                                height={48}
                                className="rounded-full"
                            />
                            <div>
                                <h3 className="font-semibold text-gray-800">{user.fullName}</h3>
                                <p className="text-sm text-gray-500">{user.email}</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                <div className="flex items-center gap-2">
                                    <FiShoppingCart className="text-primary w-5 h-5" />
                                    <span className="text-sm font-medium">Total Transaksi</span>
                                </div>
                                <span className="font-semibold">{user.transactions.length}</span>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-xl">
                                <div className="flex items-center gap-2">
                                    <FiDollarSign className="text-green-600 w-5 h-5" />
                                    <span className="text-sm font-medium">Total Pembelian</span>
                                </div>
                                <span className="font-semibold">
                                    {new Intl.NumberFormat('id-ID', {
                                        style: 'currency',
                                        currency: 'IDR'
                                    }).format(user.totalAmount)}
                                </span>
                            </div>

                            <div className="mt-4">
                                <div className="flex justify-between items-center mb-2">
                                    <h4 className="text-sm font-medium text-gray-600">Riwayat Transaksi:</h4>
                                    <select
                                        className="text-xs border rounded-lg px-2 py-1 focus:ring-2 focus:ring-primary focus:border-transparent bg-gray-50"
                                        onChange={(e) => {
                                            const sortedTransactions = [...user.transactions].sort((a, b) => {
                                                if (e.target.value === 'newest') {
                                                    return new Date(b.date).getTime() - new Date(a.date).getTime();
                                                } else {
                                                    return new Date(a.date).getTime() - new Date(b.date).getTime();
                                                }
                                            });
                                            user.transactions = sortedTransactions;
                                        }}
                                    >
                                        <option value="newest">Terbaru</option>
                                        <option value="oldest">Terlama</option>
                                    </select>
                                </div>
                                <div className="space-y-2 max-h-60 overflow-y-auto">
                                    {user.transactions.map((transaction) => (
                                        <div
                                            key={`${user.userId}-transaction-${transaction.id}`}
                                            className="flex items-center justify-between bg-gray-50 p-3 rounded-lg"
                                        >
                                            <div className="flex items-center gap-2">
                                                <Image
                                                    src={transaction.productDetails.image}
                                                    alt={transaction.productDetails.title}
                                                    width={32}
                                                    height={32}
                                                    className="rounded-lg"
                                                />
                                                <div className="flex flex-col">
                                                    <span className="text-sm font-medium truncate">
                                                        {transaction.productDetails.title}
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        {transaction.date.toLocaleDateString('id-ID')}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <span className="text-sm font-medium text-green-600">
                                                    {new Intl.NumberFormat('id-ID', {
                                                        style: 'currency',
                                                        currency: 'IDR'
                                                    }).format(transaction.amount)}
                                                </span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="text-xs text-gray-500 mt-4">
                                Transaksi terakhir: {user.lastTransactionDate.toLocaleDateString('id-ID')}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}