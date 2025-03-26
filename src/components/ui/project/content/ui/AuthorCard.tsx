"use client"

import { motion } from "framer-motion";

import Image from "next/image";

import { forwardRef } from "react";

import { AuthorCardProps } from "@/components/ui/project/types/project";

export const AuthorCard = forwardRef<HTMLDivElement, AuthorCardProps>(
    ({ author, inView }, ref) => {
        return (
            <motion.div
                ref={ref}
                initial={{ opacity: 0, x: -30 }}
                animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/20 border border-gray-700/30 backdrop-blur-md"
            >
                <Image
                    src={author.photoURL}
                    alt={author.name}
                    width={56}
                    height={56}
                    className="rounded-full ring-2 ring-indigo-500/30"
                />
                <div>
                    <h3 className="text-lg text-white font-medium">{author.name}</h3>
                    <p className="text-sm text-gray-400 capitalize">{author.role}</p>
                </div>
            </motion.div>
        );
    }
);

AuthorCard.displayName = "AuthorCard";