import React from 'react'

import Image from "next/image"

import Link from 'next/link'

import { ProjectHeaderProps } from '@/components/ui/project/types/project'

export default function ProjectHeader({ project }: ProjectHeaderProps) {
    return (
        <>
            {/* Breadcrumbs */}
            <div className="breadcrumbs text-xs md:text-sm mb-8">
                <ul className="flex flex-wrap items-center gap-3">
                    <li>
                        <Link
                            href="/"
                            className="flex items-center gap-2 px-4 py-2 rounded-lg
                                bg-card hover:bg-card/80
                                border border-border/50 hover:border-border
                                transition-all duration-200 ease-in-out"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="h-4 w-4 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                                />
                            </svg>
                            Home
                        </Link>
                    </li>
                    <li>
                        <Link
                            href={`/project/${project.typeCategory}`}
                            className="flex items-center gap-2 px-3 py-1.5 rounded-full
                                bg-primary/5 hover:bg-primary/10 
                                border border-primary/10 hover:border-primary/20
                                transition-all duration-200"
                        >
                            {project.typeTitle}
                        </Link>
                    </li>
                    <li>
                        <span className="flex items-center gap-2 px-3 py-1.5 rounded-full
                            bg-card text-primary font-medium">
                            {project.title}
                        </span>
                    </li>
                </ul>
            </div>

            {/* Hero Image */}
            <div className='relative h-[500px] rounded-2xl overflow-hidden group'>
                <Image
                    src={project.imageUrl}
                    alt={`${project.title} - Main Project Image`}
                    fill
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    priority
                />
                <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent 
                    flex flex-col items-start justify-end p-8 md:p-10
                    transform transition-all duration-500'>
                    <div className="absolute top-6 left-6 px-4 py-2 
                        bg-black/60 backdrop-blur-md rounded-lg 
                        text-sm text-white/90 border border-white/20 
                        flex items-center gap-2">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        Featured Image
                    </div>
                    <h1 className='text-white text-3xl md:text-4xl font-bold mb-4 
                        transform transition-all duration-500'>{project.title}</h1>
                    <p className='text-gray-200 max-w-2xl text-base md:text-lg
                        transform transition-all duration-500 line-clamp-2'>{project.description}</p>
                </div>
            </div>
        </>
    )
} 