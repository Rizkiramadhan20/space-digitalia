"use client"

import Link from "next/link";

import { motion } from "framer-motion";

import { formatSlug } from '@/base/helper/formatSlug';

import { DetailButtonProps } from "@/components/ui/project/types/project";

export const DetailButton = ({ typeCategory, typeTitle, slug }: DetailButtonProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 1 }}
            className="p-4 rounded-xl bg-gray-800/20 border border-gray-700/30 w-full"
        >
            <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">
                Lihat Detail
            </h3>

            <Link href={`/project/${formatSlug(typeCategory)}/${formatSlug(typeTitle)}/${slug}`} className="w-full inline-flex items-center justify-center px-6 py-2.5 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-sm font-medium rounded-lg hover:from-indigo-600 hover:to-cyan-600 transition-all duration-300 transform hover:scale-[1.02] hover:shadow-lg hover:shadow-indigo-500/25 focus:ring-2 focus:ring-indigo-500/50 focus:ring-offset-2 focus:ring-offset-gray-900">
                <span>Lihat Detail</span>
            </Link>
        </motion.div>
    );
};