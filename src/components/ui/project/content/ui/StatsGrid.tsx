"use client"

import { motion } from "framer-motion";

import { StatsGridProps } from "@/components/ui/project/types/project";

export const StatsGrid = ({ downloads, stock, sold, delivery, averageRating = 0, ratingCount = 0 }: StatsGridProps) => {
    const stats = [
        { label: "Downloads", value: downloads },
        { label: "Stock", value: stock },
        { label: "Sold", value: sold },
        { label: "Delivery", value: `${delivery}` }
    ];

    return (
        <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.6 }}
            className="space-y-4"
        >
            {/* Rating Display */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.2 }}
                className="bg-gray-800/30 backdrop-blur-sm p-4 rounded-lg border border-gray-700/30 hover:border-indigo-500/30 transition-all duration-300"
            >
                <p className="text-gray-400 mb-2">Rating</p>
                <div className="flex items-center gap-2">
                    <div className="flex gap-1">
                        {[...Array(5)].map((_, i) => {
                            const rating = averageRating || 0;
                            const isFilled = i < Math.floor(rating);
                            const isHalf = i === Math.floor(rating) && rating % 1 >= 0.5;

                            return (
                                <svg key={i}
                                    className={`w-4 h-4 ${isFilled
                                        ? 'text-yellow-500'
                                        : isHalf
                                            ? 'text-yellow-500'
                                            : 'text-gray-400'
                                        }`}
                                    fill={isHalf ? "url(#half-star)" : "currentColor"}
                                    viewBox="0 0 24 24"
                                >
                                    {isHalf && (
                                        <defs>
                                            <linearGradient id="half-star" x1="0%" y1="0%" x2="100%" y2="0%">
                                                <stop offset="50%" stopColor="currentColor" />
                                                <stop offset="50%" stopColor="rgb(209 213 219)" />
                                            </linearGradient>
                                        </defs>
                                    )}
                                    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
                                </svg>
                            );
                        })}
                    </div>
                    <div className="flex items-baseline gap-1">
                        <span className="text-lg font-bold text-white">{(averageRating || 0).toFixed(1)}</span>
                        <span className="text-sm text-gray-400">/ 5.0</span>
                    </div>
                    <span className="text-sm text-gray-400 ml-2">
                        ({ratingCount || 0} ratings)
                    </span>
                </div>
            </motion.div>

            {/* Stats Grid */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: 0.6 }}
                className="grid grid-cols-2 gap-4"
            >
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: 0.2 + (index * 0.1) }}
                        className="bg-gray-800/30 backdrop-blur-sm p-4 rounded-lg border border-gray-700/30 hover:border-indigo-500/30 transition-all duration-300"
                    >
                        <p className="text-gray-400">{stat.label}</p>
                        <p className="text-xl font-semibold text-white">{stat.value}</p>
                    </motion.div>
                ))}
            </motion.div>
        </motion.div>
    );
};