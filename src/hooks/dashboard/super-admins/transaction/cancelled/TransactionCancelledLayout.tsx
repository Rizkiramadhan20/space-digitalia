"use client"

import React, { useEffect, useState } from 'react'

import { db } from '@/utils/firebase'

import { collection, query, where, getDocs } from 'firebase/firestore'

import { Transaction } from './lib/schema'

import Image from 'next/image'

export default function TransactionCancelledLayout() {
    const [cancelledTransactions, setCancelledTransactions] = useState<Transaction[]>([])

    useEffect(() => {
        const fetchCancelledTransactions = async () => {
            try {
                const q = query(
                    collection(db, 'transactions'),
                    where('status', '==', 'cancelled')
                )
                const querySnapshot = await getDocs(q)
                const transactions = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                })) as Transaction[]
                setCancelledTransactions(transactions)
            } catch (error) {
                console.error('Error fetching cancelled transactions:', error)
            }
        }

        fetchCancelledTransactions()
    }, [])

    return (
        <section className='min-h-full px-0 sm:px-4'>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                        <h1 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'>
                            Transaction Cancelled
                        </h1>
                        <p className='text-gray-500'>Manage and organize your transaction cancelled</p>
                    </div>

                    <button
                        className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-indigo-600 to-indigo-700 hover:from-indigo-700 hover:to-indigo-800 text-white rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-sm hover:shadow-indigo-100 hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                        </svg>
                        Show Filters
                    </button>
                </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4'>
                {cancelledTransactions.map(transaction => (
                    <div key={transaction.id}>
                        <div>
                            <Image src={transaction.imageUrl} alt={transaction.projectTitle} width={100} height={100} />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}
