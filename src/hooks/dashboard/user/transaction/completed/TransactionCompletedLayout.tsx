"use client"

import React, { useEffect, useState } from 'react'

import { useAuth } from '@/utils/context/AuthContext'

import { db } from '@/utils/firebase'

import { collection, query, where, onSnapshot, doc, getDoc, addDoc, updateDoc, getDocs } from 'firebase/firestore'

import TransactionCompletedSkeleton from '@/hooks/dashboard/user/transaction/completed/TransactionCompletedSkelaton'

import { Transaction } from '@/hooks/dashboard/user/transaction/completed/lib/schema'

import Image from 'next/image'

import { IoEyeSharp } from "react-icons/io5";

import { FaDownload } from "react-icons/fa";

import Empty from '@/hooks/dashboard/user/transaction/completed/content/empaty'

import { motion, AnimatePresence } from 'framer-motion';

import { toast } from 'react-hot-toast';

interface RatingModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (rating: number, review: string) => void;
    projectTitle?: string;
    initialRating?: number;
    initialReview?: string;
}

const RatingModal: React.FC<RatingModalProps> = ({ isOpen, onClose, onSubmit, projectTitle, initialRating = 0, initialReview = '' }) => {
    const [rating, setRating] = useState(initialRating);
    const [review, setReview] = useState(initialReview);
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setRating(initialRating);
            setReview(initialReview);
        }
    }, [isOpen, initialRating, initialReview]);

    const handleSubmit = async () => {
        setIsSubmitting(true);
        await onSubmit(rating, review);
        setIsSubmitting(false);
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <motion.div
                        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    <motion.div
                        className="relative bg-white rounded-2xl w-[90%] max-w-md p-8 shadow-2xl"
                        initial={{ scale: 0.95, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.95, opacity: 0, y: 20 }}
                        transition={{ type: "spring", duration: 0.5 }}
                    >
                        {/* Header with modern gradient */}
                        <div className="text-center mb-8">
                            <h2 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-violet-500 bg-clip-text text-transparent">
                                How was your experience?
                            </h2>
                            <p className="text-gray-500 mt-2 text-sm">
                                Rate your experience with {projectTitle}
                            </p>
                        </div>

                        {/* Rating Stars with animation */}
                        <div className="mb-8">
                            <div className="flex justify-center gap-4 mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <motion.button
                                        key={star}
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.9 }}
                                        onClick={() => setRating(star)}
                                        className={`transition-colors duration-200 ${star <= rating
                                                ? 'text-yellow-400'
                                                : 'text-gray-300 hover:text-yellow-300'
                                            }`}
                                    >
                                        <svg className="w-10 h-10 filter drop-shadow-md" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </motion.button>
                                ))}
                            </div>
                            <p className="text-center text-sm text-gray-500">
                                {rating === 0 ? 'Select your rating' : `You rated ${rating} star${rating !== 1 ? 's' : ''}`}
                            </p>
                        </div>

                        {/* Modern textarea with focus effects */}
                        <div className="mb-8">
                            <textarea
                                className="w-full p-4 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-100 
                                    focus:border-indigo-300 resize-none transition-all duration-200 
                                    placeholder:text-gray-400 text-gray-700 bg-gray-50/50"
                                placeholder="Share your thoughts about the project..."
                                value={review}
                                onChange={(e) => setReview(e.target.value)}
                                rows={4}
                            />
                        </div>

                        {/* Modern action buttons with animations */}
                        <div className="flex gap-4">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={onClose}
                                disabled={isSubmitting}
                                className="flex-1 px-4 py-3 text-gray-600 bg-gray-50 rounded-xl
                                    hover:bg-gray-100 hover:shadow-md transition-all duration-200
                                    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-gray-50
                                    disabled:hover:shadow-none font-medium"
                            >
                                Cancel
                            </motion.button>
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={handleSubmit}
                                disabled={rating === 0 || isSubmitting}
                                className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-violet-500
                                    text-white rounded-xl transition-all duration-200
                                    hover:shadow-lg hover:from-indigo-500 hover:to-violet-400
                                    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none
                                    font-medium flex items-center justify-center gap-2"
                            >
                                {isSubmitting ? (
                                    <>
                                        <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                        </svg>
                                        <span>Submitting...</span>
                                    </>
                                ) : (
                                    'Submit Review'
                                )}
                            </motion.button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

interface ViewRatingModalProps {
    isOpen: boolean;
    onClose: () => void;
    rating: number;
    review: string;
    projectTitle?: string;
    setIsRatingModalOpen: (isOpen: boolean) => void;
    setViewingRating: (rating: { rating: number; review: string; projectTitle: string } | null) => void;
}

const ViewRatingModal: React.FC<ViewRatingModalProps> = ({
    isOpen,
    onClose,
    rating,
    review,
    projectTitle,
    setIsRatingModalOpen,
    setViewingRating
}) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center">
                    <motion.div
                        className="absolute inset-0 bg-black/30 backdrop-blur-sm"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                    />

                    <motion.div
                        className="relative bg-white rounded-2xl w-[90%] max-w-md p-6 shadow-2xl"
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        transition={{ type: "spring", duration: 0.3 }}
                    >
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800">Your Rating</h2>
                            <p className="text-gray-500 mt-1">{projectTitle}</p>
                        </div>

                        <div className="mb-6">
                            <div className="flex justify-center gap-3 mb-4">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <span
                                        key={star}
                                        className={star <= rating ? 'text-yellow-400' : 'text-gray-300'}
                                    >
                                        <svg className="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
                                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                        </svg>
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="mb-6">
                            <div className="w-full p-4 border border-gray-200 rounded-xl bg-gray-50">
                                <p className="text-gray-700">{review || 'No review provided'}</p>
                            </div>
                        </div>

                        <div className="flex justify-center gap-3">
                            <button
                                onClick={() => {
                                    onClose();
                                    setIsRatingModalOpen(true);
                                }}
                                className="px-6 py-3 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700"
                            >
                                Edit Rating
                            </button>
                            <button
                                onClick={() => {
                                    onClose();
                                    setViewingRating(null);
                                }}
                                className="px-6 py-3 bg-gray-100 text-gray-600 rounded-xl hover:bg-gray-200"
                            >
                                Close
                            </button>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default function TransactionCompletedLayout() {
    const { user } = useAuth();
    const [completedTransactions, setCompletedTransactions] = useState<Transaction[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedTransaction, setSelectedTransaction] = useState<Transaction | null>(null);
    const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);
    const [isViewRatingModalOpen, setIsViewRatingModalOpen] = useState(false);
    const [viewingRating, setViewingRating] = useState<{ rating: number; review: string; projectTitle: string } | null>(null);

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
            const transactionDoc = await getDoc(doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTIONS as string, transactionId));
            const transactionData = transactionDoc.data() as Transaction;

            const transaction = completedTransactions.find(t => t.id === transactionId);
            if (transaction) {
                setSelectedTransaction(transaction);

                if (transactionData?.rating) {
                    const ratingData = {
                        rating: transactionData.rating,
                        review: transactionData.review || '',
                        projectTitle: transactionData.projectTitle
                    };
                    setViewingRating(ratingData);
                    setIsViewRatingModalOpen(true);
                } else {
                    setIsRatingModalOpen(true);
                }
            }
        } catch (error) {
            console.error('Error checking rating:', error);
            toast.error('Something went wrong. Please try again.');
        }
    };

    const handleRatingSubmit = async (rating: number, review: string) => {
        try {
            if (!selectedTransaction || !user?.uid) return;

            const projectRef = doc(db, 'projects', selectedTransaction.projectId);
            const projectRatingsRef = collection(projectRef, 'ratings');
            const ratingsQuery = query(projectRatingsRef, where('transactionId', '==', selectedTransaction.id));
            const ratingsSnapshot = await getDocs(ratingsQuery);

            if (!ratingsSnapshot.empty) {
                const ratingDoc = ratingsSnapshot.docs[0];
                await updateDoc(doc(projectRatingsRef, ratingDoc.id), {
                    rating: rating,
                    review: review,
                    updatedAt: new Date()
                });
            } else {
                await addDoc(projectRatingsRef, {
                    userId: user.uid,
                    rating: rating,
                    review: review,
                    transactionId: selectedTransaction.id,
                    createdAt: new Date(),
                    userName: user.displayName || 'Anonymous',
                    userPhotoURL: user.photoURL || ''
                });
            }

            const transactionRef = doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTIONS as string, selectedTransaction.id);
            await updateDoc(transactionRef, {
                rating: rating,
                review: review
            });

            await getDoc(projectRef);
            const allRatingsSnapshot = await getDocs(collection(projectRef, 'ratings'));
            const totalRating = allRatingsSnapshot.docs.reduce((sum, doc) => sum + doc.data().rating, 0);
            const ratingCount = allRatingsSnapshot.docs.length;

            await updateDoc(projectRef, {
                ratingCount: ratingCount,
                ratingTotal: totalRating,
                averageRating: totalRating / ratingCount
            });

            setIsRatingModalOpen(false);
            setSelectedTransaction(null);
            toast.success('Rating updated successfully!');
        } catch (error) {
            console.error('Error submitting rating:', error);
            toast.error('Failed to submit rating. Please try again.');
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
                                        ? 'bg-green-50 text-green-600 hover:bg-green-100'
                                        : 'text-indigo-600 bg-indigo-50 hover:bg-indigo-100'
                                        } rounded-lg transition-all duration-300 text-sm font-medium hover:shadow-md`}
                                >
                                    {transaction.rating ? 'View Rating ★' : 'Rate Now'}
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
                initialRating={viewingRating?.rating || 0}
                initialReview={viewingRating?.review || ''}
            />

            {viewingRating && (
                <ViewRatingModal
                    isOpen={isViewRatingModalOpen}
                    onClose={() => {
                        setIsViewRatingModalOpen(false);
                    }}
                    rating={viewingRating.rating}
                    review={viewingRating.review}
                    projectTitle={viewingRating.projectTitle}
                    setIsRatingModalOpen={setIsRatingModalOpen}
                    setViewingRating={setViewingRating}
                />
            )}
        </section>
    )
}
