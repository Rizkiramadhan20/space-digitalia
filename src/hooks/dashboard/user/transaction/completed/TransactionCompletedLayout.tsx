"use client"

import React, { useEffect, useState } from 'react'

import { useAuth } from '@/utils/context/AuthContext'

import { db } from '@/utils/firebase'

import { collection, query, where, onSnapshot, doc, getDoc, arrayUnion, updateDoc } from 'firebase/firestore'

import TransactionCompletedSkeleton from '@/hooks/dashboard/user/transaction/completed/TransactionCompletedSkelaton'

import { Transaction } from '@/hooks/dashboard/user/transaction/completed/lib/schema'

import Image from 'next/image'

import { IoEyeSharp } from "react-icons/io5";

import { FaDownload } from "react-icons/fa";

import Empty from '@/hooks/dashboard/user/transaction/completed/content/empaty'

interface RatingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (rating: number, review: string) => void;
    projectTitle?: string;
}

const RatingModal: React.FC<RatingModalProps> = ({ isOpen, onClose, onSubmit, projectTitle }) => {
    const [rating, setRating] = useState(0);
    const [review, setReview] = useState('');

    return (
        isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg w-96">
                    <h2 className="text-xl font-bold mb-4">Rate {projectTitle}</h2>
                    <div className="mb-4">
                        <div className="flex gap-2 mb-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    onClick={() => setRating(star)}
                                    className={`text-2xl ${star <= rating ? 'text-yellow-400' : 'text-gray-300'
                                        }`}
                                >
                                    ★
                                </button>
                            ))}
                        </div>
                        <textarea
                            className="w-full p-2 border rounded"
                            placeholder="Write your review..."
                            value={review}
                            onChange={(e) => setReview(e.target.value)}
                            rows={4}
                        />
                    </div>
                    <div className="flex justify-end gap-2">
                        <button
                            onClick={onClose}
                            className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={() => onSubmit(rating, review)}
                            disabled={rating === 0}
                            className="px-4 py-2 bg-indigo-600 text-white rounded disabled:bg-gray-400"
                        >
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        )
    );
};

export default function TransactionCompletedLayout() {
    const { user } = useAuth();
    const [completedTransactions, setCompletedTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);

    useEffect(() => {
        if (!user?.uid) return;

        const transactionsRef = collection(db, 'transactions');

        // Buat dua query terpisah untuk delivery dan download
        const deliveryQuery = query(
            transactionsRef,
            where('userId', '==', user.uid),
            where('status', '==', 'success'),
            where('deliveryMethod', '==', 'delivery'),
            where('statusDelivery', '==', 'completed')
        );

        const downloadQuery = query(
            transactionsRef,
            where('userId', '==', user.uid),
            where('status', '==', 'success'),
            where('deliveryMethod', '==', 'download')
        );

        // Subscribe to real-time updates
        const unsubscribeDelivery = onSnapshot(deliveryQuery, (deliverySnapshot) => {
            const deliveryDocs = deliverySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data()
            }));

            // Get download transactions
            const unsubscribeDownload = onSnapshot(downloadQuery, (downloadSnapshot) => {
                const downloadDocs = downloadSnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                // Combine both results
                const transactions = [...deliveryDocs, ...downloadDocs] as Transaction[];
                console.log('Real-time completed transactions:', transactions);
                setCompletedTransactions(transactions);
                setLoading(false);
            });

            // Cleanup download listener when delivery changes
            return () => unsubscribeDownload();
        });

        // Cleanup function
        return () => {
            unsubscribeDelivery();
        };
    }, [user?.uid]);

    if (loading) {
        return <TransactionCompletedSkeleton />;
    }

    if (completedTransactions.length === 0) {
        return (
            <Empty />
        );
    }

    const handleDownload = (downloadUrl: string) => {
        window.open(downloadUrl, '_blank');
    }

    const handleRating = async (transactionId: string) => {
        try {
            // Check if transaction has already been rated
            const transactionDoc = await getDoc(doc(db, 'transactions', transactionId));
            const transactionData = transactionDoc.data() as Transaction;

            if (transactionData?.rating) {
                alert('You have already rated this project!');
                return;
            }

            const transaction = completedTransactions.find(t => t.id === transactionId);
            if (transaction) {
                setSelectedTransaction(transaction);
                setIsRatingModalOpen(true);
            }
        } catch (error) {
            console.error('Error checking rating:', error);
            alert('Something went wrong. Please try again.');
        }
    };

    const handleRatingSubmit = async (rating: number, review: string) => {
        try {
            if (!selectedTransaction || !user?.uid) return;

            // Only update the transaction first
            const transactionRef = doc(db, 'transactions', selectedTransaction.id);
            await updateDoc(transactionRef, {
                rating: rating,
                review: review,
                ratedAt: new Date(),
                ratedBy: user.uid
            });

            // Since we have isAuthenticated() rule for projects, we can update directly
            const projectRef = doc(db, 'projects', selectedTransaction.projectId);
            const newRating = {
                userId: user.uid,
                rating: rating,
                review: review,
                transactionId: selectedTransaction.id,
                createdAt: new Date(),
                userName: user.displayName || 'Anonymous'
            };

            try {
                await updateDoc(projectRef, {
                    ratings: arrayUnion(newRating)
                });
            } catch (projectError) {
                console.error('Error updating project rating:', projectError);
                // Even if project update fails, we keep the transaction rating
            }

            setIsRatingModalOpen(false);
            setSelectedTransaction(null);
            alert('Thank you for your rating!');
        } catch (error) {
            console.error('Error submitting rating:', error);
            alert('Failed to submit rating. Please try again.');
        }
    };

    return (
        <section className='min-h-full px-0 sm:px-4'>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div className="space-y-1">
                        <h1 className='text-2xl sm:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent'>
                            Transaksi Selesai
                        </h1>
                        <p className='text-gray-500'>Kelola dan urutkan transaksi selesai anda</p>
                    </div>
                </div>
            </div>

            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {completedTransactions.map((transaction) => (
                    <div key={transaction.id} className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
                        <div className='relative w-full aspect-[16/9] sm:aspect-[4/3] lg:aspect-[16/9] overflow-hidden rounded-t-xl'>
                            <Image
                                src={transaction.imageUrl}
                                alt={transaction.projectTitle}
                                fill
                                className='object-cover transform group-hover:scale-110 transition-transform duration-500 ease-out'
                            />
                            {/* Modern overlay with glassmorphism effect */}
                            <div className='absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 ease-out'>
                                <div className='absolute inset-0 flex items-center justify-center gap-6'>
                                    {/* View button - comes from top */}
                                    <button className='relative p-3 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 transform translate-y-[-100%] group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-white/20'>
                                        <IoEyeSharp className='w-6 h-6 text-white' />
                                        <span className='absolute -bottom-8 left-1/2 -translate-x-1/2 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                                            View Details
                                        </span>
                                    </button>

                                    {/* Download button - comes from bottom */}
                                    {transaction.deliveryMethod === 'download' && (
                                        <button onClick={() => handleDownload(transaction.downloadUrl)} className='relative p-3 bg-white/10 rounded-full backdrop-blur-sm border border-white/20 transform translate-y-[100%] group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500 hover:bg-white/20'>
                                            <FaDownload className='w-6 h-6 text-white' />
                                            <span className='absolute -bottom-8 left-1/2 -translate-x-1/2 text-white text-xs whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                                                Download
                                            </span>
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className='p-5 flex flex-col gap-4'>
                            <div className='space-y-3'>
                                <h1 className='text-xl font-bold line-clamp-1 text-gray-800 group-hover:text-indigo-600 transition-colors duration-300'>
                                    {transaction.projectTitle}
                                </h1>
                                <div className='flex items-center gap-2'>
                                    <span className={`
                                        px-3 py-1.5 rounded-full text-sm font-medium transition-colors duration-300
                                        ${transaction.deliveryMethod === 'download'
                                            ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-100'
                                            : 'bg-purple-50 text-purple-600 group-hover:bg-purple-100'}
                                    `}>
                                        {transaction.deliveryMethod === 'download' ? 'Download' : 'Delivery'}
                                    </span>
                                </div>
                            </div>

                            <div className='flex flex-wrap items-center gap-3'>
                                <button
                                    onClick={() => handleRating(transaction.id)}
                                    className={`flex-1 px-4 py-2.5 ${transaction.rating
                                        ? 'bg-green-50 text-green-600'
                                        : 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100'
                                        } rounded-lg transition-all duration-300 text-sm font-medium hover:shadow-md`}
                                >
                                    {transaction.rating ? `Rated: ${transaction.rating}★` : 'Rate Now'}
                                </button>
                                <button className='flex-1 px-4 py-2.5 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 active:bg-indigo-800 transition-all duration-300 text-sm font-medium hover:shadow-md'>
                                    Chat Admin
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <RatingModal
                isOpen={isRatingModalOpen}
                onClose={() => setIsRatingModalOpen(false)}
                onSubmit={handleRatingSubmit}
                projectTitle={selectedTransaction?.projectTitle}
            />
        </section>
    )
}
