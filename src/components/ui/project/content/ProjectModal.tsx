"use client"

import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef, useCallback, memo } from "react";
import { ProjectModalProps } from "@/components/ui/project/types/project";
import { UrlBar } from "@/components/ui/project/content/ui/UrlBar";
import { Gallery } from "@/components/ui/project/content/ui/Gallery";
import { AuthorCard } from "@/components/ui/project/content/ui/AuthorCard";
import { ProjectDescription } from "@/components/ui/project/content/ui/ProjectDescription";
import { TechnologiesCard } from "@/components/ui/project/content/ui/Technologies";
import { StatsGrid } from "@/components/ui/project/content/ui/StatsGrid";
import { PriceCard } from "@/components/ui/project/content/ui/PriceCard";
import { DetailButton } from "@/components/ui/project/content/ui/DetailButton";

const StatusBadge = memo(({ status }: { status: string }) => {
    const getStatusClass = useCallback((status: string) => {
        return status === 'development' ? 'hover:border-blue-500/50' : 'hover:border-purple-500/50';
    }, []);

    const getStatusColor = useCallback((status: string) => {
        return status === 'development' ? 'bg-blue-500' : 'bg-purple-500';
    }, []);

    return (
        <div className={`
            flex items-center gap-2 bg-gray-800/40 backdrop-blur-sm rounded-lg px-3 py-2 border border-gray-700/30
            ${getStatusClass(status)}
            transition-all duration-300 hover:scale-105
        `}>
            <span className={`w-2 h-2 rounded-full ${getStatusColor(status)}`}></span>
            <div className="flex flex-col">
                <span className="text-gray-300 text-sm capitalize">{status}</span>
            </div>
        </div>
    );
});

StatusBadge.displayName = 'StatusBadge';

function ProjectModal({ project, isOpen, onClose }: ProjectModalProps) {
    const galleryRef = useRef(null);
    const contentRef = useRef(null);
    const authorRef = useRef(null);
    const detailsRef = useRef(null);

    const galleryInView = useInView(galleryRef, { once: true });
    const contentInView = useInView(contentRef, { once: true });
    const authorInView = useInView(authorRef, { once: true });
    const detailsInView = useInView(detailsRef, { once: true });

    const handleModalClick = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        if (e.target === e.currentTarget) {
            onClose();
        }
    }, [onClose]);

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
                onClick={handleModalClick}
            >
                <div className="relative w-full max-w-7xl bg-gradient-to-b from-gray-900/80 to-black/80 rounded-2xl shadow-2xl border border-gray-800/50 backdrop-blur-xl">
                    <UrlBar linkPreview={project.linkPreview} />

                    <div className="max-h-[85vh] overflow-y-auto scrollbar-thin scrollbar-track-gray-800/40 scrollbar-thumb-gray-600/40">
                        <div className="relative aspect-video w-full overflow-hidden">
                            <Image
                                src={project.imageUrl}
                                alt={project.title}
                                fill
                                className="object-cover"
                                priority
                                sizes="(max-width: 1280px) 100vw, 1280px"
                                quality={85}
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
                        </div>

                        <Gallery
                            ref={galleryRef}
                            inView={galleryInView}
                            images={project.images}
                            title={project.title}
                        />

                        <motion.div
                            ref={contentRef}
                            initial={{ opacity: 0 }}
                            animate={contentInView ? { opacity: 1 } : { opacity: 0 }}
                            transition={{ duration: 0.8 }}
                            className="grid md:grid-cols-2 gap-6 md:gap-8 p-4 md:p-6 bg-gradient-to-b from-gray-900/60 to-black/60 backdrop-blur-md"
                        >
                            <div className="space-y-6">
                                <AuthorCard
                                    ref={authorRef}
                                    inView={authorInView}
                                    author={project.author}
                                />

                                <ProjectDescription
                                    ref={detailsRef}
                                    inView={detailsInView}
                                    description={project.description}
                                    content={project.content}
                                />
                            </div>

                            <div className="space-y-6">
                                <TechnologiesCard frameworks={project.frameworks} />

                                <div className="space-y-4">
                                    <motion.div
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ duration: 0.6, delay: 0.5 }}
                                        className="p-4 rounded-xl bg-gray-800/20 border border-gray-700/30"
                                    >
                                        <h3 className="text-xl font-semibold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 to-cyan-400">Status Pengerjaan</h3>
                                        <div className="flex flex-wrap gap-2">
                                            <StatusBadge status={project.statusProject} />
                                        </div>
                                    </motion.div>

                                    <StatsGrid
                                        downloads={project.downloads}
                                        stock={project.stock}
                                        sold={project.sold}
                                        delivery={project.delivery}
                                        averageRating={project.averageRating}
                                        ratingCount={project.ratingCount}
                                    />
                                </div>

                                <PriceCard licenseDetails={project.licenseDetails} />

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
}

export default memo(ProjectModal);