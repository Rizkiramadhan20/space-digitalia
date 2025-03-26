"use client"

import { motion } from "framer-motion";

import { PriceCardProps } from "@/components/ui/project/types/project";

export const PriceCard = ({ licenseDetails }: PriceCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="relative p-8 rounded-3xl bg-gradient-to-br from-gray-800/30 via-gray-800/20 to-gray-800/10 border border-gray-700/30 backdrop-blur-sm hover:border-indigo-500/30 transition-all duration-300 overflow-hidden group"
        >
            {/* Background Glow Effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* Decorative Elements */}
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-indigo-500/10 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-cyan-500/10 rounded-full blur-3xl"></div>

            <div className="relative">
                <h3 className="text-xl font-semibold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400 flex items-center gap-3">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Harga Mulai dari
                </h3>

                <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6">
                    {/* Starting Price */}
                    <div className="flex flex-col">
                        <span className="text-sm text-gray-400 mb-1">
                            {licenseDetails.length > 1 ? "Starting from" : "Price"}
                        </span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-sm font-medium text-indigo-400">Rp</span>
                            <span className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                                {Math.min(...licenseDetails.map(l => l.price)).toLocaleString()}
                            </span>
                        </div>
                    </div>

                    {/* Separator and Maximum Price - Only show if there are multiple prices */}
                    {licenseDetails.length > 1 && (
                        <>
                            <div className="hidden sm:block w-px h-12 bg-gradient-to-b from-transparent via-gray-500/20 to-transparent"></div>
                            <div className="flex flex-col">
                                <span className="text-sm text-gray-400 mb-1">Up to</span>
                                <div className="flex items-baseline gap-1">
                                    <span className="text-sm font-medium text-cyan-400">Rp</span>
                                    <span className="text-3xl sm:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-indigo-400">
                                        {Math.max(...licenseDetails.map(l => l.price)).toLocaleString()}
                                    </span>
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Additional Info Badge - Only show if there are multiple prices */}
                {licenseDetails.length > 1 && (
                    <div className="mt-6 inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20">
                        <svg className="w-4 h-4 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        <span className="text-sm text-gray-300">Harga bervariasi berdasarkan jenis lisensi</span>
                    </div>
                )}
            </div>
        </motion.div>
    );
};