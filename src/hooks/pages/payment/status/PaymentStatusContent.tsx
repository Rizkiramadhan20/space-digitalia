"use client"

import React, { useEffect, useState } from 'react'

import Link from 'next/link'

import { doc, getDoc } from 'firebase/firestore'

import { db } from '@/utils/firebase'

import { formatRupiah } from '@/base/helper/formatRupiah'

import Image from 'next/image'

import { TransactionData, PaymentStatusContentProps } from '@/hooks/pages/payment/status/lib/schema'

import badImage from "@/base/assets/pages/transaction/bad.jpg"

import { motion } from 'framer-motion'

import {
    loadingSpinnerAnimations,
    backgroundAnimations,
    contentVariants,
    itemVariants,
    shineAnimation
} from '@/hooks/pages/payment/status/lib/animation'

export default function PaymentStatusContent({ transactionId }: PaymentStatusContentProps) {
    const [transaction, setTransaction] = useState<TransactionData | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch transaction data
    useEffect(() => {
        const fetchTransaction = async () => {
            try {
                const docRef = doc(db, process.env.NEXT_PUBLIC_COLLECTIONS_TRANSACTIONS!, transactionId);
                const docSnap = await getDoc(docRef);

                if (docSnap.exists()) {
                    const data = docSnap.data() as TransactionData;
                    setTransaction(data);
                } else {
                    setError('Transaksi tidak ditemukan');
                }
            } catch {
                setError('Error loading transaction');
            } finally {
                // Set minimum loading time using setTimeout
                setTimeout(() => {
                    setLoading(false);
                }, 2000);
            }
        };

        fetchTransaction();
    }, [transactionId]); // Remove transaction and error from dependencies

    if (loading) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-tr from-slate-50 via-white to-blue-50/30">
                {/* Background Pattern */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e508_1px,transparent_1px),linear-gradient(to_bottom,#4f46e508_1px,transparent_1px)] bg-[size:14px_14px]"></div>
                    <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-indigo-50/50 to-transparent"></div>
                </div>

                {/* Loading Container */}
                <div className="relative z-10 flex flex-col items-center">
                    <motion.div className="relative w-20 h-20" initial={false}>
                        <motion.div
                            className="absolute inset-0 rounded-full border-[3px] border-indigo-100/30"
                            animate={loadingSpinnerAnimations.scale}
                        />
                        <motion.div
                            className="absolute inset-0 rounded-full border-[3px] border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent"
                            animate={loadingSpinnerAnimations.rotate}
                        />
                        <motion.div
                            className="absolute inset-2 rounded-full border-[3px] border-indigo-100/30"
                            animate={loadingSpinnerAnimations.innerScale}
                        />
                        <motion.div
                            className="absolute inset-2 rounded-full border-[3px] border-t-indigo-500 border-r-transparent border-b-transparent border-l-transparent"
                            animate={loadingSpinnerAnimations.innerRotate}
                        />
                        {/* Center Dot */}
                        <motion.div
                            className="absolute inset-[35%] bg-gradient-to-tr from-blue-500 to-indigo-500 rounded-full shadow-lg"
                            animate={loadingSpinnerAnimations.centerDot}
                        />
                    </motion.div>

                    {/* Text Content */}
                    <div className="mt-8 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        >
                            <motion.h2
                                className="text-2xl font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-clip-text text-transparent tracking-wider"
                                animate={{
                                    backgroundPosition: ["0% center", "100% center"],
                                    scale: [1, 1.02, 1]
                                }}
                                transition={{
                                    backgroundPosition: {
                                        duration: 3,
                                        repeat: Infinity,
                                        ease: "linear"
                                    },
                                    scale: {
                                        duration: 2,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }
                                }}
                                style={{ backgroundSize: "200% 100%" }}
                            >
                                SPACE DIGITALIA
                            </motion.h2>
                        </motion.div>

                        <motion.div
                            className="relative mt-3"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            <motion.p
                                className="text-sm text-gray-500/80 backdrop-blur-sm px-4 py-2 rounded-full bg-white/30 inline-block"
                                animate={{ y: [0, -2, 0] }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            >
                                Loading your transaction...
                            </motion.p>
                        </motion.div>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !transaction) {
        return (
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-slate-50 via-white to-blue-50/30"
            >
                {/* Enhanced Background with Multiple Layers */}
                <div className="absolute inset-0">
                    <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e508_1px,transparent_1px),linear-gradient(to_bottom,#4f46e508_1px,transparent_1px)] bg-[size:14px_14px]"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-red-50/30 via-transparent to-orange-50/30 animate-gradient"></div>
                    <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-b from-white to-transparent"></div>
                    {/* Animated Circles */}
                    <div className="absolute top-20 left-20 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
                    <div className="absolute top-40 right-20 w-72 h-72 bg-yellow-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
                    <div className="absolute -bottom-8 left-40 w-72 h-72 bg-pink-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
                </div>

                <motion.div
                    initial={{ y: 20 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.8, type: "spring" }}
                    className="relative w-full max-w-4xl mx-auto flex items-center justify-center"
                >
                    {/* Glass Morphism Card with Enhanced Effects */}
                    <motion.div
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        transition={{ duration: 0.5 }}
                        whileHover={{ scale: 1.02 }}
                        className="bg-white/80 backdrop-blur-xl rounded-3xl p-8 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.12)] border border-white/60 transition-all duration-300 hover:shadow-2xl hover:bg-white/90"
                    >
                        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                            {/* Enhanced Error Icon with 3D Effect */}
                            <motion.div
                                initial={{ rotate: -10, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                className="relative group perspective"
                            >
                                <div className="absolute inset-0 bg-red-100/80 rounded-2xl rotate-6 transform transition-transform group-hover:rotate-12 group-hover:scale-105"></div>
                                <div className="absolute inset-0 bg-red-50/80 rounded-2xl -rotate-3 transform transition-transform group-hover:-rotate-6 group-hover:scale-105"></div>
                                <motion.div
                                    animate={{
                                        rotate: [0, -5, 5, 0],
                                        scale: [1, 1.02, 0.98, 1]
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        repeatType: "reverse",
                                        ease: "easeInOut"
                                    }}
                                    className="relative bg-white rounded-2xl p-5 shadow-sm transform transition-all duration-300 group-hover:translate-y-1 group-hover:shadow-lg"
                                >
                                    <div className="relative w-24 h-24 transform transition-transform group-hover:scale-110">
                                        <Image
                                            src={badImage}
                                            alt="Error"
                                            className="w-full h-full object-contain drop-shadow-lg"
                                            style={{ filter: 'contrast(1.1)' }}
                                        />
                                        <motion.div
                                            animate={{
                                                opacity: [0.2, 0.4, 0.2],
                                                scale: [0.8, 1, 0.8]
                                            }}
                                            transition={{
                                                duration: 2,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                            className="absolute inset-0 bg-red-500/20 rounded-full filter blur-2xl"
                                        />
                                    </div>
                                </motion.div>
                            </motion.div>

                            <motion.div
                                initial={{ x: 20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                className="flex-1 text-center md:text-left"
                            >
                                {/* Enhanced Error Content */}
                                <div className="space-y-4 mb-8">
                                    <motion.h2
                                        animate={{
                                            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
                                        }}
                                        transition={{
                                            duration: 5,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }}
                                        className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 via-gray-700 to-gray-900 bg-clip-text text-transparent"
                                        style={{ backgroundSize: "200% 100%" }}
                                    >
                                        Ups! Ada yang salah
                                    </motion.h2>
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 0.6 }}
                                        className="text-red-600/90 font-medium bg-red-50/50 px-4 py-2 rounded-lg inline-block"
                                    >
                                        {error}
                                    </motion.p>
                                </div>

                                {/* Enhanced Button with Modern Effects */}
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: 0.8 }}
                                >
                                    <Link
                                        href="/"
                                        className="group relative inline-flex items-center justify-center w-full md:w-auto px-8 py-4 text-white font-medium rounded-xl bg-gradient-to-r from-red-500 via-rose-500 to-red-500 bg-size-200 transition-all duration-300 hover:bg-right-bottom hover:shadow-lg hover:shadow-red-500/25 active:scale-[0.98] overflow-hidden"
                                    >
                                        {/* Shine Effect */}
                                        <div className="absolute inset-0 w-1/4 h-full bg-white/20 skew-x-[25deg] transform -translate-x-32 group-hover:translate-x-96 transition-transform duration-1000"></div>
                                        {/* Button Content */}
                                        <div className="relative flex items-center space-x-2">
                                            <svg
                                                className="w-5 h-5 transition-transform duration-300 group-hover:-translate-x-1"
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                                                />
                                            </svg>
                                            <span className="relative">Kembali ke Beranda</span>
                                        </div>
                                    </Link>
                                </motion.div>
                            </motion.div>
                        </div>
                    </motion.div>
                </motion.div>
            </motion.section>
        );
    }

    const isSuccess = transaction.status === 'success';

    return (
        <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="min-h-screen flex items-center justify-center bg-gradient-to-tr from-slate-50 via-white to-blue-50/30 p-4 md:p-8 relative overflow-hidden"
        >
            {/* Enhanced Background Animation */}
            <motion.div
                className="absolute inset-0"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
            >
                <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-indigo-50/30 via-transparent to-purple-50/30"
                    animate={backgroundAnimations.gradient}
                />
                {/* Animated Grid Pattern */}
                <motion.div
                    className="absolute inset-0 bg-[linear-gradient(to_right,#4f46e508_1px,transparent_1px),linear-gradient(to_bottom,#4f46e508_1px,transparent_1px)] bg-[size:14px_14px]"
                    animate={backgroundAnimations.grid}
                />

                {/* Floating Particles */}
                <motion.div
                    className="absolute inset-0"
                    initial="initial"
                    animate="animate"
                    variants={{
                        initial: {},
                        animate: {
                            transition: {
                                staggerChildren: 0.2
                            }
                        }
                    }}
                >
                    {[...Array(5)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 rounded-full bg-indigo-500/20"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`
                            }}
                            variants={{
                                initial: {
                                    y: 0,
                                    opacity: 0
                                },
                                animate: {
                                    y: [-20, 20],
                                    opacity: [0, 1, 0],
                                    transition: {
                                        duration: 3 + Math.random() * 2,
                                        repeat: Infinity,
                                        repeatType: "reverse"
                                    }
                                }
                            }}
                        />
                    ))}
                </motion.div>
            </motion.div>

            {/* Main Content Container */}
            <motion.div
                className="relative container"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                    duration: 0.8,
                    type: "spring",
                    stiffness: 100
                }}
            >
                <motion.div className="flex flex-col lg:flex-row lg:gap-10">
                    {/* Left Column with Animation */}
                    <motion.div
                        className="flex flex-col space-y-6 lg:w-5/12 lg:sticky lg:top-8"
                        initial={{ x: -20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        {/* Status Card with Animation */}
                        <motion.div
                            whileHover={{ scale: 1.02 }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60"
                        >
                            <div className="flex flex-col items-start">
                                {/* Status Icon with Animation */}
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: "spring", stiffness: 260, damping: 20 }}
                                    className={`w-16 h-16 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 hover:scale-105
                                        ${isSuccess
                                            ? 'bg-gradient-to-br from-green-50 to-emerald-50/80 text-emerald-600'
                                            : 'bg-gradient-to-br from-amber-50 to-yellow-50/80 text-amber-600'}`
                                    }
                                >
                                    {isSuccess ? (
                                        <motion.svg
                                            initial={{ pathLength: 0 }}
                                            animate={{ pathLength: 1 }}
                                            transition={{ duration: 0.8, ease: "easeOut" }}
                                            className="w-7 h-7"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </motion.svg>
                                    ) : (
                                        <motion.svg
                                            animate={{ rotate: 360 }}
                                            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                                            className="w-7 h-7"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                                        </motion.svg>
                                    )}
                                </motion.div>

                                {/* Status Content with Animation */}
                                <motion.div
                                    initial="hidden"
                                    animate="visible"
                                    variants={contentVariants}
                                >
                                    <motion.h1
                                        variants={itemVariants}
                                        className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3"
                                    >
                                        {isSuccess ? 'Payment Successful!' : 'Payment Pending'}
                                    </motion.h1>

                                    <motion.p
                                        variants={itemVariants}
                                        className="text-gray-600 text-lg mb-8 leading-relaxed"
                                    >
                                        {isSuccess
                                            ? 'Great! Your payment has been successfully processed. You can now access your purchase.'
                                            : 'Please complete your payment using the provided payment instructions.'}
                                    </motion.p>
                                </motion.div>

                                {/* Summary */}
                                <motion.div
                                    className="w-full space-y-6"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5 }}
                                >
                                    <motion.h3
                                        className="font-semibold text-gray-900 text-lg"
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ duration: 0.5, delay: 0.2 }}
                                    >
                                        Order Summary
                                    </motion.h3>
                                    <motion.div
                                        className="space-y-4 divide-y divide-gray-100/80"
                                        initial="hidden"
                                        animate="visible"
                                        variants={{
                                            hidden: {},
                                            visible: {
                                                transition: {
                                                    staggerChildren: 0.1,
                                                    delayChildren: 0.3
                                                }
                                            }
                                        }}
                                    >
                                        {[
                                            { label: "Amount", value: formatRupiah(transaction.amount || 0) },
                                            { label: "Project", value: transaction.projectTitle },
                                            { label: "License", value: transaction.licenseType }
                                        ].map((item, index) => (
                                            <motion.div
                                                key={item.label}
                                                className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 gap-2 sm:gap-4"
                                                variants={{
                                                    hidden: { opacity: 0, y: 10 },
                                                    visible: {
                                                        opacity: 1,
                                                        y: 0,
                                                        transition: {
                                                            type: "spring",
                                                            stiffness: 100,
                                                            damping: 10
                                                        }
                                                    }
                                                }}
                                            >
                                                <motion.span
                                                    className="text-gray-600"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 0.3, delay: 0.1 * index }}
                                                >
                                                    {item.label}
                                                </motion.span>
                                                <motion.span
                                                    className="text-gray-900 font-medium break-all"
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    transition={{ duration: 0.3, delay: 0.2 * index }}
                                                >
                                                    {item.value}
                                                </motion.span>
                                            </motion.div>
                                        ))}
                                    </motion.div>
                                </motion.div>
                            </div>
                        </motion.div>

                        {/* Action Buttons with Animation */}
                        <motion.div
                            className="flex flex-col space-y-4"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                        >
                            {/* Download button for both paid and free transactions */}
                            {((transaction.status === 'success' || transaction.paymentMethod === "free") &&
                                transaction.deliveryMethod === "download" &&
                                transaction.downloadUrl) && (
                                    <motion.a
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        href={transaction.downloadUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="group relative inline-flex items-center justify-center px-8 py-4 text-lg font-medium text-white bg-emerald-500 rounded-xl overflow-hidden transition-all duration-300 hover:bg-emerald-600 hover:shadow-lg hover:shadow-emerald-500/25"
                                    >
                                        {/* Shine Effect */}
                                        <div className="absolute inset-0 w-1/4 h-full bg-white/20 skew-x-[25deg] transform -translate-x-32 group-hover:translate-x-96 transition-transform duration-1000"></div>
                                        {/* Button Content */}
                                        <div className="relative flex items-center space-x-3">
                                            <span>Download Project</span>
                                            <motion.svg
                                                className="w-6 h-6"
                                                initial={{ y: 0 }}
                                                animate={{ y: [0, -2, 0] }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                                fill="none"
                                                stroke="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                            </motion.svg>
                                        </div>
                                    </motion.a>
                                )}

                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Link
                                    href={`${process.env.NEXT_PUBLIC_URL!}/dashboard/user/transaction`}
                                    className="group relative inline-flex w-full items-center justify-center px-8 py-4 text-lg font-medium text-white bg-blue-500 rounded-xl overflow-hidden transition-all duration-300 hover:bg-blue-600 hover:shadow-lg hover:shadow-blue-500/25"
                                >
                                    {/* Shine Effect */}
                                    <div className="absolute inset-0 w-1/4 h-full bg-white/20 skew-x-[25deg] transform -translate-x-32 group-hover:translate-x-96 transition-transform duration-1000"></div>
                                    {/* Button Content */}
                                    <div className="relative flex items-center space-x-3">
                                        <span>{transaction.status === 'success' || transaction.paymentMethod === "free" ? 'View My Orders' : 'Check Payment Status'}</span>
                                        <motion.svg
                                            className="w-6 h-6"
                                            initial={{ x: 0 }}
                                            whileHover={{ x: 4 }}
                                            transition={{ type: "spring", stiffness: 400 }}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                                        </motion.svg>
                                    </div>
                                </Link>
                            </motion.div>

                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Link
                                    href="/"
                                    className="group relative inline-flex w-full items-center justify-center px-8 py-4 text-lg font-medium text-gray-700 bg-white rounded-xl overflow-hidden transition-all duration-300 hover:bg-gray-50 hover:shadow-lg border border-gray-200"
                                >
                                    {/* Button Content */}
                                    <div className="relative flex items-center space-x-3">
                                        <motion.svg
                                            className="w-6 h-6"
                                            initial={{ x: 0 }}
                                            whileHover={{ x: -4 }}
                                            transition={{ type: "spring", stiffness: 400 }}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                                        </motion.svg>
                                        <span>Back to Home</span>
                                    </div>
                                </Link>
                            </motion.div>
                        </motion.div>
                    </motion.div>

                    {/* Right Column with Animation */}
                    <motion.div
                        className="flex flex-col space-y-6 lg:w-7/12 mt-8 lg:mt-0"
                        initial={{ x: 20, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        {/* Transaction Details Card */}
                        <div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 transition-all duration-300 hover:shadow-lg hover:bg-white/80">
                            {/* Header with Icon and Title */}
                            <div className="flex items-center gap-4 mb-8">
                                <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-600 flex items-center justify-center">
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                                    </svg>
                                </div>
                                <h2 className="text-xl font-bold text-gray-900">Transaction Details</h2>
                            </div>

                            {/* Project Image */}
                            {transaction.imageUrl && (
                                <div className="mb-6">
                                    <div className="relative w-full h-[200px] md:h-[300px] rounded-xl overflow-hidden bg-gray-100">
                                        <Image
                                            src={transaction.imageUrl}
                                            alt={transaction.projectTitle}
                                            className="object-contain"
                                            fill
                                            sizes="(max-width: 768px) 100vw, 800px"
                                            priority
                                            quality={100}
                                        />
                                    </div>
                                </div>
                            )}

                            {/* Transaction Details */}
                            <motion.div
                                className="flex flex-col divide-y divide-gray-100"
                                initial="hidden"
                                animate="visible"
                                variants={{
                                    hidden: {},
                                    visible: {
                                        transition: {
                                            staggerChildren: 0.1
                                        }
                                    }
                                }}
                            >
                                {/* Transaction Detail Items */}
                                {[
                                    { label: "Order ID", value: transaction.orderId, isMono: true },
                                    { label: "Transaction ID", value: transaction.transactionId, isMono: true },
                                    { label: "User Name", value: transaction.userName },
                                    { label: "Email", value: transaction.userEmail },
                                    {
                                        label: "Status",
                                        value: transaction.paymentDetails?.status_message || transaction.status,
                                        isStatus: true
                                    },
                                    {
                                        label: "Amount",
                                        value: formatRupiah(transaction.amount)
                                    }
                                ].map((item, index) => (
                                    <motion.div
                                        key={item.label}
                                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 gap-2 sm:gap-4"
                                        variants={{
                                            hidden: { opacity: 0, x: -20 },
                                            visible: {
                                                opacity: 1,
                                                x: 0,
                                                transition: {
                                                    type: "spring",
                                                    stiffness: 100,
                                                    damping: 10,
                                                    delay: index * 0.1
                                                }
                                            }
                                        }}
                                        whileHover={{ scale: 1.01 }}
                                    >
                                        <span className="text-gray-600">{item.label}</span>
                                        {item.isStatus ? (
                                            <motion.span
                                                className={`px-3 py-1 rounded-full text-sm font-medium ${transaction.status === 'success'
                                                    ? 'bg-green-100 text-green-800'
                                                    : 'bg-yellow-100 text-yellow-800'
                                                    }`}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                {item.value}
                                            </motion.span>
                                        ) : (
                                            <motion.span
                                                className={`text-gray-900 font-medium ${item.isMono ? 'font-mono' : ''} break-all`}
                                                whileHover={{ scale: 1.02 }}
                                            >
                                                {item.value}
                                            </motion.span>
                                        )}
                                    </motion.div>
                                ))}

                                {/* Payment Method */}
                                {transaction.paymentDetails?.payment_type && (
                                    <motion.div
                                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 gap-2 sm:gap-4"
                                        variants={{
                                            hidden: { opacity: 0, x: -20 },
                                            visible: {
                                                opacity: 1,
                                                x: 0,
                                                transition: { type: "spring", stiffness: 100 }
                                            }
                                        }}
                                        whileHover={{ scale: 1.01 }}
                                    >
                                        <span className="text-gray-600">Payment Method</span>
                                        <motion.span
                                            className="text-gray-900 font-medium capitalize"
                                            whileHover={{ scale: 1.02 }}
                                        >
                                            {transaction.paymentDetails.payment_type.replace('_', ' ')}
                                        </motion.span>
                                    </motion.div>
                                )}

                                {/* Virtual Account */}
                                {transaction.paymentDetails?.va_numbers && transaction.paymentDetails.va_numbers.length > 0 && (
                                    <motion.div
                                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 gap-2 sm:gap-4"
                                        variants={{
                                            hidden: { opacity: 0, x: -20 },
                                            visible: {
                                                opacity: 1,
                                                x: 0,
                                                transition: { type: "spring", stiffness: 100 }
                                            }
                                        }}
                                        whileHover={{ scale: 1.01 }}
                                    >
                                        <span className="text-gray-600">Virtual Account</span>
                                        <motion.div
                                            className="text-right"
                                            whileHover={{ scale: 1.02 }}
                                        >
                                            <motion.p className="text-gray-900 font-medium uppercase">
                                                {transaction.paymentDetails.va_numbers[0].bank}
                                            </motion.p>
                                            <motion.p className="text-gray-900 font-mono">
                                                {transaction.paymentDetails.va_numbers[0].va_number}
                                            </motion.p>
                                        </motion.div>
                                    </motion.div>
                                )}

                                {/* Transaction Time */}
                                {transaction.paymentDetails?.transaction_time && (
                                    <motion.div
                                        className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 gap-2 sm:gap-4"
                                        variants={{
                                            hidden: { opacity: 0, x: -20 },
                                            visible: {
                                                opacity: 1,
                                                x: 0,
                                                transition: { type: "spring", stiffness: 100 }
                                            }
                                        }}
                                        whileHover={{ scale: 1.01 }}
                                    >
                                        <span className="text-gray-600">Transaction Time</span>
                                        <motion.span
                                            className="text-gray-900 font-medium"
                                            whileHover={{ scale: 1.02 }}
                                        >
                                            {new Date(transaction.paymentDetails.transaction_time).toLocaleString('en-US', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                                hour: '2-digit',
                                                minute: '2-digit'
                                            })}
                                        </motion.span>
                                    </motion.div>
                                )}
                            </motion.div>
                        </div>

                        {/* Delivery Details */}
                        {transaction.deliveryMethod === 'delivery' && transaction.deliveryAddress && (
                            <motion.div className="bg-white/70 backdrop-blur-xl rounded-3xl p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-white/60 transition-all duration-300 hover:shadow-lg hover:bg-white/80">
                                {/* Shipping Status */}
                                <div className="mb-6">
                                    <div className="flex items-center gap-3 p-4 rounded-xl bg-gradient-to-br from-gray-50/80 to-white/80 border border-gray-100/60">
                                        <div className={`w-3 h-3 rounded-full ${transaction.statusDelivery === 'delivered'
                                            ? 'bg-emerald-500 shadow-lg shadow-emerald-500/30'
                                            : transaction.statusDelivery === 'shipped'
                                                ? 'bg-blue-500 shadow-lg shadow-blue-500/30'
                                                : 'bg-amber-500 shadow-lg shadow-amber-500/30'
                                            }`}></div>
                                        <span className="font-medium text-gray-900 capitalize">
                                            {transaction.statusDelivery || 'Processing'}
                                        </span>
                                    </div>
                                </div>

                                {/* Address Details */}
                                <motion.div
                                    className="bg-gradient-to-br from-gray-50/80 to-white/80 rounded-xl p-6 space-y-4 border border-gray-100/60 relative overflow-hidden group"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.6 }}
                                    whileHover={{ scale: 1.01 }}
                                >
                                    {/* Modern Gradient Background Animation */}
                                    <motion.div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                        initial={{ backgroundPosition: "0% 0%" }}
                                        animate={{
                                            backgroundPosition: ["0% 0%", "100% 100%"],
                                            background: [
                                                "linear-gradient(45deg, rgba(59, 130, 246, 0.03) 0%, rgba(147, 51, 234, 0.03) 100%)",
                                                "linear-gradient(45deg, rgba(147, 51, 234, 0.03) 0%, rgba(59, 130, 246, 0.03) 100%)"
                                            ]
                                        }}
                                        transition={{
                                            repeat: Infinity,
                                            duration: 8,
                                            ease: "linear",
                                            repeatType: "reverse"
                                        }}
                                    />

                                    {/* Floating Particles */}
                                    <motion.div className="absolute inset-0 overflow-hidden opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                                        {[...Array(8)].map((_, i) => (
                                            <motion.div
                                                key={i}
                                                className="absolute w-1 h-1 bg-blue-500/10 rounded-full"
                                                initial={{
                                                    x: Math.random() * 100 + "%",
                                                    y: Math.random() * 100 + "%"
                                                }}
                                                animate={{
                                                    y: ["-20%", "120%"],
                                                    opacity: [0, 1, 0]
                                                }}
                                                transition={{
                                                    duration: 2 + Math.random() * 2,
                                                    repeat: Infinity,
                                                    delay: Math.random() * 2
                                                }}
                                            />
                                        ))}
                                    </motion.div>

                                    {/* Content Items with Enhanced Stagger Effect */}
                                    <motion.div
                                        initial="hidden"
                                        animate="visible"
                                        variants={{
                                            hidden: {},
                                            visible: {
                                                transition: {
                                                    staggerChildren: 0.12,
                                                    delayChildren: 0.1
                                                }
                                            }
                                        }}
                                        className="relative"
                                    >
                                        {/* Recipient Info */}
                                        <motion.div
                                            variants={{
                                                hidden: { opacity: 0, x: -20, filter: "blur(8px)" },
                                                visible: {
                                                    opacity: 1,
                                                    x: 0,
                                                    filter: "blur(0px)",
                                                    transition: {
                                                        type: "spring",
                                                        stiffness: 200,
                                                        damping: 20
                                                    }
                                                }
                                            }}
                                            className="flex justify-between items-center p-3 rounded-lg hover:bg-white/50 transition-colors duration-300"
                                        >
                                            <span className="text-gray-600 flex items-center gap-2">
                                                <motion.span
                                                    className="w-1.5 h-1.5 bg-blue-500/50 rounded-full inline-block"
                                                    animate={{
                                                        scale: [1, 1.2, 1],
                                                        opacity: [0.5, 1, 0.5]
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity
                                                    }}
                                                />
                                                Recipient
                                            </span>
                                            <motion.span
                                                className="text-gray-900 font-medium"
                                                whileHover={{
                                                    scale: 1.02,
                                                    color: "#3B82F6",
                                                    transition: { duration: 0.2 }
                                                }}
                                            >
                                                {transaction.deliveryAddress.fullName}
                                            </motion.span>
                                        </motion.div>

                                        {/* Phone Info */}
                                        <motion.div
                                            variants={{
                                                hidden: { opacity: 0, x: -20, filter: "blur(8px)" },
                                                visible: {
                                                    opacity: 1,
                                                    x: 0,
                                                    filter: "blur(0px)",
                                                    transition: {
                                                        type: "spring",
                                                        stiffness: 200,
                                                        damping: 20
                                                    }
                                                }
                                            }}
                                            className="flex justify-between items-center mt-4 p-3 rounded-lg hover:bg-white/50 transition-colors duration-300"
                                        >
                                            <span className="text-gray-600 flex items-center gap-2">
                                                <motion.span
                                                    className="w-1.5 h-1.5 bg-purple-500/50 rounded-full inline-block"
                                                    animate={{
                                                        scale: [1, 1.2, 1],
                                                        opacity: [0.5, 1, 0.5]
                                                    }}
                                                    transition={{
                                                        duration: 2,
                                                        repeat: Infinity,
                                                        delay: 0.5
                                                    }}
                                                />
                                                Phone
                                            </span>
                                            <motion.span
                                                className="text-gray-900 font-medium"
                                                whileHover={{
                                                    scale: 1.02,
                                                    color: "#8B5CF6",
                                                    transition: { duration: 0.2 }
                                                }}
                                            >
                                                {transaction.deliveryAddress.phone}
                                            </motion.span>
                                        </motion.div>

                                        {/* Shipping Address */}
                                        <motion.div
                                            variants={{
                                                hidden: { opacity: 0, x: -20, filter: "blur(8px)" },
                                                visible: {
                                                    opacity: 1,
                                                    x: 0,
                                                    filter: "blur(0px)",
                                                    transition: {
                                                        type: "spring",
                                                        stiffness: 200,
                                                        damping: 20
                                                    }
                                                }
                                            }}
                                            className="pt-4 mt-4 border-t border-gray-200/80"
                                        >
                                            <motion.div
                                                className="p-4 rounded-xl bg-gradient-to-br from-gray-50/50 to-white/50 hover:from-blue-50/50 hover:to-purple-50/50 transition-colors duration-500"
                                                whileHover={{ scale: 1.01 }}
                                            >
                                                <motion.h4
                                                    className="font-medium text-gray-900 mb-3 flex items-center gap-2"
                                                    variants={{
                                                        hidden: { opacity: 0, y: 10 },
                                                        visible: { opacity: 1, y: 0 }
                                                    }}
                                                >
                                                    <motion.span
                                                        className="w-1.5 h-1.5 bg-indigo-500/50 rounded-full inline-block"
                                                        animate={{
                                                            scale: [1, 1.2, 1],
                                                            opacity: [0.5, 1, 0.5]
                                                        }}
                                                        transition={{
                                                            duration: 2,
                                                            repeat: Infinity,
                                                            delay: 1
                                                        }}
                                                    />
                                                    Shipping Address
                                                </motion.h4>
                                                <motion.p
                                                    className="text-gray-600 leading-relaxed"
                                                    variants={{
                                                        hidden: { opacity: 0, y: 10 },
                                                        visible: { opacity: 1, y: 0 }
                                                    }}
                                                >
                                                    {transaction.deliveryAddress.streetAddress}
                                                    {transaction.deliveryAddress.details && (
                                                        <span className="text-gray-500/80 block mt-1">
                                                            {transaction.deliveryAddress.details}
                                                        </span>
                                                    )}
                                                    <span className="block mt-2">
                                                        {transaction.deliveryAddress.district}, {transaction.deliveryAddress.city}
                                                    </span>
                                                    <span className="block text-gray-500/80">
                                                        {transaction.deliveryAddress.province} {transaction.deliveryAddress.postalCode}
                                                    </span>
                                                </motion.p>
                                            </motion.div>
                                        </motion.div>
                                    </motion.div>

                                    {/* Modern Shine Effect */}
                                    <motion.div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                                        initial={{ rotate: -45, scale: 1.5 }}
                                        animate={shineAnimation}
                                        style={{
                                            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)",
                                            width: "50%"
                                        }}
                                    />
                                </motion.div>
                            </motion.div>
                        )}
                    </motion.div>
                </motion.div>
            </motion.div>
        </motion.section >
    );
} 