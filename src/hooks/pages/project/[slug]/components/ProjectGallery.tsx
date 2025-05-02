import React from 'react'

import Image from "next/image"

import { ProjectType } from '@/components/ui/project/types/project'

interface ProjectGalleryProps {
    project: ProjectType
    setSelectedImage: (image: string | null) => void
}

export default function ProjectGallery({ project, setSelectedImage }: ProjectGalleryProps) {
    return (
        <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-6 overflow-x-auto md:overflow-visible pb-4 snap-x snap-mandatory scrollbar-thin scrollbar-thumb-primary/20 scrollbar-track-transparent">
            {project.images?.map((previewImage, index) => (
                <button
                    key={index}
                    onClick={() => setSelectedImage(previewImage)}
                    className="relative h-[150px] md:h-[200px] w-[200px] md:w-full flex-shrink-0 rounded-xl overflow-hidden group
                        ring-1 ring-border/50 hover:ring-2 hover:ring-primary/30
                        transition-all duration-300 ease-in-out snap-center"
                >
                    <Image
                        src={previewImage}
                        alt={`${project.title} - Preview ${index + 1}`}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                        priority={index === 0}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 right-4 flex items-center gap-2 px-3 py-2
                        bg-black/70 backdrop-blur-sm rounded-lg text-white text-sm
                        opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0
                        transition-all duration-300">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
                        </svg>
                        Preview {index + 1}
                    </div>
                </button>
            ))}
        </div>
    )
} 