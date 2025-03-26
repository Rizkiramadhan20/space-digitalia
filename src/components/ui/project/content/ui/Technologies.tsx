"use client"

import { motion } from "framer-motion";

import Image from "next/image";

import { Framework, TechnologiesCardProps } from "@/components/ui/project/types/project";

export const TechnologiesCard = ({ frameworks }: TechnologiesCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="p-4 rounded-xl bg-gray-800/20 border border-gray-700/30"
        >
            <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">Technologies</h3>
            <div className="flex flex-wrap gap-2">
                {frameworks?.map((fw: Framework, index: number) => (
                    <div
                        key={index}
                        className="flex items-center gap-2 bg-gray-800/40 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-700/30 hover:border-indigo-500/50 transition-all duration-300 hover:scale-105"
                    >
                        <Image
                            src={fw.imageUrl}
                            alt={fw.title}
                            width={20}
                            height={20}
                            className="rounded-full"
                        />
                        <span className="text-gray-300 text-sm">{fw.title}</span>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};