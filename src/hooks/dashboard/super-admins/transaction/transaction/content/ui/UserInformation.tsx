'use client'

import React from 'react'

import Image from 'next/image'

import { UserInformationProps } from '@/hooks/dashboard/super-admins/transaction/transaction/lib/schema'

export default function UserInformation({ transaction }: UserInformationProps) {
    return (
        <div className="bg-gradient-to-br from-white to-indigo-50/50 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.03] pointer-events-none">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%236366f1' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }} />
            </div>

            <div className="relative">
                <h3 className="text-lg font-semibold mb-8 flex items-center gap-2">
                    <span className="bg-indigo-600 text-white p-2 rounded-lg shadow-md">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                    </span>
                    <span className="bg-gradient-to-r from-indigo-600 to-indigo-800 bg-clip-text text-transparent">
                        User Information
                    </span>
                </h3>

                <div className="flex items-center gap-6">
                    <div className="relative w-32 h-32 rounded-2xl overflow-hidden shadow-lg border-4 border-white">
                        <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/20 to-transparent" />
                        <Image
                            src={transaction.userPhotoURL}
                            alt={transaction.userName}
                            fill
                            className="object-cover"
                        />
                    </div>

                    <div className="flex-1 space-y-4">
                        <div className="space-y-1">
                            <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                                FULL NAME
                            </span>
                            <div className="bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl shadow-sm border border-indigo-100/50">
                                <span className="font-semibold text-gray-800">
                                    {transaction.userName}
                                </span>
                            </div>
                        </div>

                        <div className="space-y-1">
                            <span className="text-xs font-medium text-indigo-600 bg-indigo-50 px-2.5 py-0.5 rounded-full">
                                EMAIL ADDRESS
                            </span>
                            <div className="bg-white/80 backdrop-blur-sm px-4 py-3 rounded-xl shadow-sm border border-indigo-100/50">
                                <span className="font-medium text-gray-600">
                                    {transaction.userEmail}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}