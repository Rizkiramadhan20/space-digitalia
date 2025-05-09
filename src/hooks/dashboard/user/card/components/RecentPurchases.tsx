'use client';

import React from 'react';

import Image from 'next/image';

import { RecentPurchasesProps } from "@/hooks/dashboard/user/card/types/types";

export default function RecentPurchases({ items }: RecentPurchasesProps) {
    return (
        <div className="w-full bg-white backdrop-blur-lg rounded-3xl p-6 md:p-8 border border-gray-300">
            <h3 className="text-xl md:text-2xl font-bold text-gray-800 mb-8">Pembelian Terakhir</h3>
            {items.length > 0 ? (
                <div className="flex flex-col gap-4">
                    {items.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-center justify-between p-4 hover:bg-gray-50/80 rounded-xl transition-all duration-200 border border-gray-100"
                        >
                            <div className="flex items-center gap-4">
                                <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                                    <Image
                                        src={item.image}
                                        alt={item.name}
                                        fill
                                        className="object-cover"
                                        sizes="(max-width: 64px) 100vw, 64px"
                                    />
                                </div>
                                <div className="flex flex-col">
                                    <p className="font-semibold text-gray-800 line-clamp-1">{item.name}</p>
                                    <p className="text-sm text-gray-500 mt-1">
                                        Rp {item.amount.toLocaleString('id-ID')}
                                    </p>
                                    <div className="flex items-center gap-2 mt-1">
                                        <span className="text-xs text-gray-500">
                                            {item.paymentType}
                                        </span>
                                        <span className="w-1 h-1 rounded-full bg-gray-300"></span>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${item.status === 'completed'
                                            ? 'bg-green-100 text-green-600'
                                            : 'bg-yellow-100 text-yellow-600'
                                            }`}>
                                            {item.status === 'completed' ? 'Selesai' : 'Proses'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center h-[250px] p-4 my-auto">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-gray-300 mb-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <p className="text-xl font-medium text-gray-600 mb-2">Tidak ada pembelian terakhir</p>
                    <p className="text-sm text-gray-500 text-center">Belum ada produk yang dibeli</p>
                </div>
            )}
        </div>
    );
} 