"use client"

import { useState, useEffect, useCallback, memo } from "react";

import Image from "next/image";

import { motion } from "framer-motion";

import { createPortal } from 'react-dom';

import { ProjectCardProps } from "@/components/ui/project/types/project";

import ProjectModal from "@/components/ui/project/content/ProjectModal";

function ProjectCard({ project, leftTimeline, rightTimeline }: ProjectCardProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleCardClick = useCallback((e: React.MouseEvent) => {
        e.stopPropagation();
        setIsModalOpen(true);
        leftTimeline?.play();
        rightTimeline?.play();
    }, [leftTimeline, rightTimeline]);

    const handleCloseModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const handleEsc = useCallback((event: KeyboardEvent) => {
        if (event.key === 'Escape') {
            setIsModalOpen(false);
        }
    }, []);

    useEffect(() => {
        if (isModalOpen) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', handleEsc);
        } else {
            document.body.style.overflow = 'unset';
        }

        return () => {
            document.body.style.overflow = 'unset';
            document.removeEventListener('keydown', handleEsc);
        };
    }, [isModalOpen, handleEsc]);

    return (
        <>
            <motion.div
                className="relative w-full aspect-video md:aspect-[16/10] flex-shrink-0 overflow-hidden rounded-xl sm:rounded-2xl group cursor-pointer"
                whileHover={{ scale: 1.02 }}
                onClick={handleCardClick}
            >
                <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    loading="lazy"
                    quality={75}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/20 to-black/90 group-hover:via-black/40 group-hover:to-black/95 transition-all duration-300">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                        </svg>
                    </div>
                </div>
            </motion.div>
            {isModalOpen && createPortal(
                <ProjectModal
                    project={project}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />,
                document.body
            )}
        </>
    );
}

export default memo(ProjectCard);