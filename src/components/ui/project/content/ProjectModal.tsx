"use client"

import { motion, useInView } from "framer-motion";

import Image from "next/image";

import { useRef } from "react";

import { ProjectModalProps } from "@/components/ui/project/types/project";

import { UrlBar } from "@/components/ui/project/content/ui/UrlBar";

import { Gallery } from "@/components/ui/project/content/ui/Gallery";

import { AuthorCard } from "@/components/ui/project/content/ui/AuthorCard";

import { ProjectDescription } from "@/components/ui/project/content/ui/ProjectDescription";

import { TechnologiesCard } from "@/components/ui/project/content/ui/Technologies";

import { StatsGrid } from "@/components/ui/project/content/ui/StatsGrid";

import { PriceCard } from "@/components/ui/project/content/ui/PriceCard";

import { DetailButton } from "@/components/ui/project/content/ui/DetailButton";

export const ProjectModal = ({ project, isOpen, onClose }: ProjectModalProps) => {
    // Add refs for animated sections
    const galleryRef = useRef(null);
    const contentRef = useRef(null);
    const authorRef = useRef(null);
    const detailsRef = useRef(null);

    // Create inView states with once=true
    const galleryInView = useInView(galleryRef, { once: true });
    const contentInView = useInView(contentRef, { once: true });
    const authorInView = useInView(authorRef, { once: true });
    const detailsInView = useInView(detailsRef, { once: true });

    if (!isOpen) return null;

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/95 backdrop-blur-md z-[9999] overflow-y-auto scrollbar-thin scrollbar-track-gray-800/40 scrollbar-thumb-gray-600/40"
            onClick={onClose}
        >
            <motion.div
                initial={{ scale: 0.95, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ type: "spring", duration: 0.5 }}
                className="container mx-auto min-h-screen p-4 md:p-6 lg:p-8 flex items-center justify-center"
                onClick={(e) => {
                    e.stopPropagation();
                    if (e.target === e.currentTarget) {
                        onClose();
                    }
                }}
            >
                <div className="relative w-full max-w-7xl bg-gradient-to-b from-gray-900/80 to-black/80 rounded-2xl shadow-2xl border border-gray-800/50 backdrop-blur-xl">
                    {/* URL Bar */}
                    <UrlBar linkPreview={project.linkPreview} />

                    <div className="max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-track-gray-800/40 scrollbar-thumb-gray-600/40">
                        {/* Hero Image */}
                        <div className="relative aspect-video w-full overflow-hidden">
                            <Image
                                src={project.imageUrl}
                                alt={project.title}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 1280px) 100vw, 1280px"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
                        </div>

                        {/* Gallery Grid */}
                        <Gallery
                            ref={galleryRef}
                            inView={galleryInView}
                            images={project.images}
                            title={project.title}
                        />

                        {/* Content Section with Glass Morphism */}
                        <motion.div
                            ref={contentRef}
                            initial={{ opacity: 0 }}
                            animate={contentInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            className="grid md:grid-cols-2 gap-6 md:gap-8 p-4 md:p-6 bg-gradient-to-b from-gray-900/60 to-black/60 backdrop-blur-md"
                        >
                            {/* Left Column */}
                            <div className="space-y-6">
                                {/* Author Info with Glass Effect */}
                                <AuthorCard
                                    ref={authorRef}
                                    inView={authorInView}
                                    author={project.author}
                                />

                                {/* Description and Details */}
                                <ProjectDescription
                                    ref={detailsRef}
                                    inView={detailsInView}
                                    description={project.description}
                                    content={project.content}
                                />
                            </div>

                            {/* Right Column */}
                            <div className="space-y-6">
                                {/* Technologies */}
                                <TechnologiesCard frameworks={project.frameworks} />

                                {/* Stats Grid */}
                                <StatsGrid
                                    downloads={project.downloads}
                                    stock={project.stock}
                                    sold={project.sold}
                                    delivery={project.delivery}
                                />

                                {/* Price Range Card */}
                                <PriceCard licenseDetails={project.licenseDetails} />

                                {/* View Details Button */}
                                <DetailButton
                                    typeCategory={project.typeCategory}
                                    typeTitle={project.typeTitle}
                                    slug={project.slug}
                                />
                            </div>
                        </motion.div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};