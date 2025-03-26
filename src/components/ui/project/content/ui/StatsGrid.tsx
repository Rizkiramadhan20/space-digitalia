"use client"

import { motion } from "framer-motion";

import { StatsGridProps } from "@/components/ui/project/types/project";

export const StatsGrid = ({ downloads, stock, sold, delivery }: StatsGridProps) => {
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
    );
};