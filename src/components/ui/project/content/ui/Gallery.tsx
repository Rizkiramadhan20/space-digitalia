"use client"

import { motion } from "framer-motion";

import Image from "next/image";

import { forwardRef } from "react";

import { GalleryProps } from "@/components/ui/project/types/project";

export const Gallery = forwardRef<HTMLDivElement, GalleryProps>(
    ({ images, title, inView }, ref) => {
        return (
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
                transition={{ duration: 0.6, delay: 0.2, staggerChildren: 0.1 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-3 p-4 md:p-6"
            >
                {images.map((image, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={inView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        whileHover={{ scale: 1.02 }}
                        className="relative aspect-video rounded-xl overflow-hidden group"
                    >
                        <Image
                            src={image}
                            alt={`${title} - ${index + 1}`}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-110"
                            sizes="(max-width: 768px) 50vw, (max-width: 1280px) 25vw, 320px"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                    </motion.div>
                ))}
            </motion.div>
        );
    }
);

Gallery.displayName = "Gallery";